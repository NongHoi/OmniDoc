# Báo Cáo Kiến Trúc & Thiết Kế Kỹ Thuật (Architecture & Technical Design)

Tài liệu này phân tích chi tiết quyết định kiến trúc, giải pháp công nghệ, cơ chế bảo toàn mẫu gốc, và khả năng mở rộng của hệ thống **OmniDoc Office Studio**.

---

## 1. Tổng Quan Kiến Trúc (Architectural Overview)

Hệ thống được thiết kế theo mô hình **Monorepo Client-Server phân tầng rõ ràng (Clean Layered Architecture)**:

```
[ Người Dùng / Trình Duyệt ]
             │
             ▼
[ Frontend Web App (Vite + React 18 + TypeScript + Tailwind CSS) ]
  ├── Thư viện Mẫu Văn bản (Document Library View)
  ├── Thư viện Mẫu Trình chiếu (Presentation Library View)
  ├── Trình soạn thảo Văn bản Trực quan (Integrated Document Editor)
  ├── Trình chỉnh sửa Slide & Trình chiếu (Integrated Slide Editor & Player)
  └── Quản lý Kho Tài liệu Cá nhân (My Documents Hub)
             │
             ▼ RESTful API (HTTP / JSON / Binary Streams)
[ Backend API Server (Node.js + Express + TypeScript) ]
  ├── Controllers: Xác thực request (Zod Validation), xử lý mã phản hồi HTTP
  ├── Services: Logic nghiệp vụ, tách biệt tầng hiển thị
  ├── Export Engine:
  │     ├── Docx Engine (docx library - Packer)
  │     └── Pptx Engine (pptxgenjs library - Presentation Generator)
  └── Storage Manager: ACID-compliant Atomic JSON/File DB
             │
             ▼
[ File & Data Storage ]
  ├── storage/data/ (templates_doc.json, templates_pres.json, user_docs.json...)
  ├── storage/templates/ (Original template assets)
  └── storage/user_files/ (Generated exports)
```

---

## 2. Giải Pháp Cách Ly Bản Sao (Zero-Destructive Copy Mechanism)

Một yêu cầu tối quan trọng trong đề bài là:
> **"Việc tạo tài liệu mới không được làm thay đổi file template gốc."**

### Cơ chế kỹ thuật được áp dụng:
1. **Immutable Template Repository:**
   - Dữ liệu template được lưu trong kho lưu trữ riêng (`templates_doc.json` và `templates_pres.json`), chỉ được đọc (Read-only) trong các luồng người dùng thông thường.
   - Thư mục vật lý `storage/templates/` lưu trữ các file mẫu chuẩn và không bao giờ bị can thiệp bởi các thao tác sửa đổi tài liệu.
2. **Deep-Cloning Cloner:**
   - Khi người dùng gửi yêu cầu `POST /api/documents` hoặc `POST /api/presentations`:
     - Hệ thống đọc mẫu gốc tương ứng theo `templateId`.
     - Thực hiện deep-clone toàn bộ nội dung HTML hoặc mảng slides, cấp phát một **UUID v4 duy nhất**.
     - Khởi tạo bản ghi mới độc lập nằm trong bảng `user_documents` hoặc `user_presentations`.
3. **Phân quyền thao tác (Data Segregation):**
   - Trình soạn thảo chỉ có quyền gọi các endpoint `PUT /api/documents/:id` hoặc `PUT /api/presentations/:id` trên bản ghi do người dùng sở hữu.
   - Hoàn toàn không có liên kết ghi ngược (No write-back link) trở lại template gốc.
4. **Kiểm thử tự động (Automated Verification):**
   - File kiểm thử `backend/tests/api.test.ts` có test case riêng biệt:
     - Tạo tài liệu mới từ template `doc-02`.
     - Sửa đổi nội dung tài liệu người dùng thành chuỗi khác biệt hoàn toàn.
     - Kiểm tra trực tiếp bản ghi template `doc-02` trong storage để khẳng định 100% nội dung gốc vẫn nguyên vẹn.

---

## 3. Kỹ Thuật Bảo Toàn Định Dạng (Formatting Preservation)

### 3.1. Đối với Mẫu Văn Bản (DOCX)
- Trình soạn thảo sử dụng mô hình semantic rich HTML, bao gồm các thẻ chuẩn:
  - Tiêu đề: `<h1>`, `<h2>`, `<h3>`
  - Bảng biểu: `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<td>`, `<th>` có viền và khoảng đệm (padding) chuẩn văn bản hành chính.
  - Đoạn văn & Danh sách: `<p>`, `<ul>`, `<ol>`, `<li>`
  - Thuộc tính chữ: `<strong>`, `<em>`, `<u>`, `text-align`
- Khi xuất sang định dạng `.docx`, module `ExportService` chuyển đổi cấu trúc cây DOM thành các đối tượng `docx.Paragraph`, `docx.TextRun`, `docx.Table` và `docx.TableRow` với thông số căn lề chuẩn trang A4 (Margins 1 inch = 1440 twips) và font chữ `Times New Roman 12pt`.

### 3.2. Đối với Mẫu Trình Chiếu (PPTX)
- Slide được mô hình hóa theo cấu trúc dữ liệu phân cấp (`Slide` -> `SlideElement` -> `Content`).
- Hỗ trợ đa dạng bố cục:
  - `title`: Slide bìa trang trọng với banner hoặc gradient.
  - `content-bullets`: Nội dung chính điểm dòng với bullet color đồng bộ theo bảng màu.
  - `two-columns`: Bố cục chia đôi hai cột để so sánh giải pháp.
  - `stats-kpi`: Thẻ chỉ số nổi bật (metric cards) với số liệu to đậm và nhãn mô tả.
- Module `ExportService` sử dụng `pptxgenjs` để xây dựng slide tỷ lệ 16:9 (`LAYOUT_16x9`), thiết lập màu sắc RGB, kích thước font chữ, căn chỉnh tọa độ chính xác, tương thích mở bằng Microsoft PowerPoint, Google Slides, Keynote và LibreOffice Impress.

---

## 4. Xử Lý Ngoại Lệ & Trạng Thái Ứng Dụng (State & Error Handling)

1. **Trạng thái tải (Loading Skeletons):** Giao diện sử dụng hiệu ứng skeleton nạp dữ liệu động, tránh giật lag layout.
2. **Trạng thái rỗng (Empty States):** Khi tìm kiếm không có kết quả, hiển thị thông báo thân thiện và nút "Xóa bộ lọc".
3. **Trạng thái lỗi (Error Handling):** Có cơ chế retry, báo lỗi qua toast banner và bắt ngoại lệ ở cả tầng frontend lẫn middleware backend.
4. **Kiểm thử tự động (Unit & Integration Tests):** Toàn bộ các luồng quan trọng đều được kiểm thử tự động với 12 test cases xanh 100%.

---

## 5. Hướng Phát Triển Mở Rộng Trong Tương Lai (Roadmap)

1. **Tích hợp thêm Bảng tính (Spreadsheets / Excel):**
   - Bổ sung tab thứ 3 "Mẫu Bảng tính Excel" sử dụng engine `xlsx` hoặc `Handsontable` để xem trước và điền các công thức tính toán tài chính.
2. **Bộ phân tích cú pháp PPTX chuyên sâu (Deep PPTX AST Parser):**
   - Bổ sung backend worker giải nén cấu trúc XML của file `.pptx` tải lên (`ppt/slides/slide1.xml`) để chuyển đổi tự động thành schema slide của hệ thống.
3. **Cộng tác thời gian thực (Real-time Collaboration):**
   - Tích hợp WebSocket / WebRTC và CRDT (Yjs) cho phép nhiều người dùng đồng thời chỉnh sửa một văn bản hoặc bộ slide.
4. **AI Assistant Co-pilot:**
   - Hỗ trợ tạo dàn ý bài thuyết trình tự động từ văn bản tóm tắt hoặc viết tiếp điều khoản hợp đồng bằng AI.

