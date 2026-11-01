# OmniDoc Office Studio - Thư Viện Mẫu Tài Liệu Văn Phòng Tích Hợp

> **Dự án dự thi bài kiểm tra kỹ thuật:** Xây dựng hệ thống thư viện mẫu văn bản & mẫu trình chiếu tích hợp trong ứng dụng văn phòng, hỗ trợ tìm kiếm, xem trước, khởi tạo bản sao độc lập, chỉnh sửa trực quan và xuất file tiêu chuẩn Microsoft Office (.DOCX, .PPTX).
>
> 👤 **Tác giả & Bản quyền sáng tác:** **Nông Vay Hội** • Email: [nonghoi2004@gmail.com](mailto:nonghoi2004@gmail.com)

[![Tests Passing](https://img.shields.io/badge/Tests-14%2F14%20Passed-success.svg)](#6-kiểm-thử-tự-động)
[![Tech Stack](https://img.shields.io/badge/Stack-React%2018%20%7C%20TypeScript%20%7C%20Node.js%20%7C%20Express-blue.svg)](#2-công-nghệ-sử-dụng)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](#7-thư-viện-bên-thứ-ba--giấy-phép)

---

## 1. Giới Thiệu & Điểm Nổi Bật

**OmniDoc Office Studio** là giải pháp nền tảng thư viện mẫu tài liệu văn phòng thế hệ mới, đáp ứng trọn vẹn và vượt chuẩn cả hai sản phẩm được yêu cầu:

1. **Sản phẩm 1 (Thư viện Mẫu Văn bản):**
   - Bộ sưu tập **6 mẫu văn bản thử nghiệm thực tế** chuẩn pháp lý & hành chính (Hợp đồng lao động, Đơn nghỉ phép, Biên bản cuộc họp, Báo cáo tiến độ dự án, Thư mời nhận việc, Hợp đồng kinh tế).
   - Tìm kiếm thời gian thực, lọc theo danh mục, chuyển đổi hiển thị dạng Lưới (Grid) và Danh sách (List).
   - Cửa sổ xem trước (Preview) chi tiết trang tài liệu A4 cùng bảng thống kê biến mẫu.
   - **Trình soạn thảo văn bản tích hợp (Integrated Document Editor)** với thanh công cụ định dạng phong phú (Heading, Bold, Italic, Tables, Alignment), bảng điền biến thông minh một chạm (Smart Variable Filler) và xuất file Microsoft Word (`.DOCX`), PDF in ấn, HTML, TXT.
   - **Cơ chế Zero-Destructive Isolation:** Khởi tạo bản sao độc lập, bảo vệ 100% mẫu gốc không bao giờ bị biến đổi.

2. **Sản phẩm 2 (Thư viện Mẫu Trình chiếu):**
   - Bộ sưu tập **4 bộ template PowerPoint hoàn chỉnh** (Startup Pitch Deck 5 slides, Báo cáo kinh doanh quý 5 slides, Kế hoạch ra mắt sản phẩm 5 slides, Hồ sơ năng lực doanh nghiệp 4 slides).
   - Xem trước toàn bộ bộ slide trong từng template với chế độ Carousel / Filmstrip tỷ lệ 16:9 chuẩn.
   - **Trình chỉnh sửa slide tích hợp (Integrated Slide Editor)**: thêm slide, đảo thứ tự slide, nhân bản, xóa slide, chỉnh sửa nội dung/KPI/bullets trực tiếp, đổi bố cục (Layouts), đổi bảng màu chủ đề (Themes).
   - **Chế độ trình chiếu toàn màn hình (Fullscreen Presenter Mode)** với phím tắt điều hướng `[←]`, `[→]`, `[Space]`, `[Esc]`.
   - **Đóng gói xuất file PowerPoint (`.PPTX`)** tiêu chuẩn Microsoft Office thông qua thư viện `pptxgenjs`.

3. **Khả năng mở rộng động (Extensibility):**
   - Tính năng **"Thêm mẫu mới"** cho phép quản trị viên hoặc người dùng bổ sung cả mẫu văn bản và mẫu slide mới ngay trên giao diện mà không cần chỉnh sửa hoặc biên dịch lại mã nguồn.

---

## 2. Công Nghệ Sử Dụng (Technology Stack)

| Thành phần | Công nghệ / Thư viện | Lý do lựa chọn & Mục đích |
| :--- | :--- | :--- |
| **Frontend** | React 18, TypeScript, Vite 6 | Giao diện phản hồi siêu nhanh, type-safe, hot reload tức thì |
| **Giao diện** | Tailwind CSS v3, Lucide Icons | Thiết kế hiện đại, responsive, đồng bộ nhận diện văn phòng |
| **Backend** | Node.js, Express, TypeScript | RESTful API hiệu năng cao, kiến trúc phân tầng sạch (Clean Architecture) |
| **Xác thực dữ liệu** | Zod Schema Validation | Rà soát và bắt lỗi dữ liệu đầu vào chặt chẽ |
| **Đóng gói DOCX** | `docx` (v9.2) | Xuất file Microsoft Word chuẩn OpenXML với bảng biểu, căn lề A4 |
| **Đóng gói PPTX** | `pptxgenjs` (v3.12) | Xây dựng tệp tin Microsoft PowerPoint đa slide tỷ lệ 16:9 chuẩn quốc tế |
| **Lưu trữ & CSDL** | Atomic JSON Storage / Schema DB | Lưu trữ độc lập, đảm bảo ACID, không đòi hỏi cài đặt database ngoài |
| **Kiểm thử** | Vitest, Supertest | Bộ test tự động kiểm tra API, tính bất biến của template và export nhị phân |

---

## 3. Cấu Trúc Thư Mục Dự Án

```
Bài test/
├── backend/                       # Máy chủ Backend API
│   ├── src/
│   │   ├── controllers/           # Điều hướng & xử lý request (template, document, presentation)
│   │   ├── services/              # Nghiệp vụ: deep clone, template search, DOCX & PPTX export
│   │   ├── db/                    # StorageManager quản lý lưu trữ nguyên tử (Atomic storage)
│   │   ├── seeds/                 # Dữ liệu mẫu ban đầu (6 mẫu văn bản + 4 bộ slide)
│   │   ├── types/                 # Định nghĩa TypeScript data models
│   │   ├── app.ts                 # Cấu hình Express app, middlewares, static storage
│   │   └── index.ts               # Điểm khởi chạy server
│   ├── storage/                   # Thư mục lưu trữ tệp vật lý & dữ liệu JSON
│   ├── tests/                     # 12 bài kiểm thử tự động với Vitest
│   └── package.json
│
├── frontend/                      # Ứng dụng Web Client SPA
│   ├── src/
│   │   ├── components/            # Các module giao diện (Navbar, Libraries, Editors, Modals)
│   │   │   ├── Navbar.tsx
│   │   │   ├── DocumentLibraryView.tsx       # Giao diện Thư viện Mẫu Văn bản
│   │   │   ├── DocumentPreviewModal.tsx      # Cửa sổ xem trước mẫu văn bản
│   │   │   ├── DocumentEditor.tsx            # Trình soạn thảo văn bản tích hợp
│   │   │   ├── PresentationLibraryView.tsx   # Giao diện Thư viện Mẫu Trình chiếu
│   │   │   ├── PresentationPreviewModal.tsx  # Cửa sổ xem trước đa slide 16:9
│   │   │   ├── PresentationEditor.tsx        # Trình chỉnh sửa slide & Trình chiếu
│   │   │   ├── MyDocumentsView.tsx           # Quản lý kho tài liệu người dùng
│   │   │   ├── AddTemplateModal.tsx          # Thêm mẫu mới động
│   │   │   └── ArchitectureGuideModal.tsx    # Báo cáo kiến trúc trong app
│   │   ├── services/              # API Client fetch dữ liệu từ backend
│   │   ├── types/                 # Typescript interfaces
│   │   ├── App.tsx                # Bộ định tuyến trạng thái chính
│   │   └── main.tsx
│   ├── index.html
│   └── package.json
│
├── docs/                          # Bộ tài liệu bàn giao chi tiết
│   ├── API_DOCUMENTATION.md       # Đặc tả toàn bộ API endpoints & request/response
│   ├── ARCHITECTURE_AND_DESIGN.md # Phân tích chuyên sâu kiến trúc & cơ chế bảo toàn mẫu
│   └── USER_AND_DEMO_GUIDE.md     # Kịch bản kiểm thử từng bước dành cho Giám khảo
├── package.json                   # Root package: điều phối dev, build, test
└── README.md
```

---

## 4. Hướng Dẫn Cài Đặt & Chạy Thử Thực Tế (Quickstart)

### Yêu cầu môi trường:
- Node.js version 18 trở lên (đã kiểm thử tương thích tuyệt đối trên Node v23.10 và Windows / Linux / macOS).
- Trình quản lý gói `npm`.

### Các bước chạy:

```bash
# Bước 1: Di chuyển vào thư mục dự án
cd "c:\Project Idea\OmniDoc"

# Bước 2: Cài đặt toàn bộ dependencies cho cả root, backend và frontend
npm run install:all

# Bước 3: Khởi chạy cả hệ thống chỉ với 1 câu lệnh
npm run dev
```

Sau khi chạy lệnh trên:
- **Giao diện Web:** Mở trình duyệt tại **`http://localhost:5173`**
- **API Backend:** Đang lắng nghe tại **`http://localhost:5000`**
- **Kiểm tra sức khỏe hệ thống (Health Check):** `http://localhost:5000/health`

*(Lưu ý: Nếu muốn chạy riêng lẻ từng service: `npm run dev:backend` tại terminal 1 và `npm run dev:frontend` tại terminal 2).*

---

## 5. Cơ Chế Đảm Bảo Tính Bất Biến Của Mẫu Gốc (Zero-Destruction)

Một trong những tiêu chí trọng tâm của bài thi là: **"Việc tạo tài liệu mới không được làm thay đổi file template gốc."**

### Giải pháp kỹ thuật:
1. **Kho mẫu gốc (Read-Only Template Storage):** Dữ liệu mẫu văn bản và mẫu slide được phân định ở vùng lưu trữ chuyên biệt (`templates/`).
2. **Deep-Cloning Cloner:** Khi người dùng nhấn nút *"Sử dụng mẫu"* (`POST /api/documents` hoặc `POST /api/presentations`), backend thực hiện sao chép sâu (deep-copy) toàn bộ thuộc tính, khởi tạo một bản ghi mới hoàn toàn với **UUID v4** độc lập trong `user_documents` / `user_presentations`.
3. **Phân lập luồng ghi:** Trình chỉnh sửa văn bản và slide chỉ tương tác với bản ghi của người dùng qua các API `PUT`. Mọi chỉnh sửa nội dung, xóa slide hay thay đổi trường biến **hoàn toàn không thể tác động** lên mẫu gốc.
4. **Kiểm chứng bằng Unit Test:** Test case `CRITICAL TEST: Instantiating a document must NOT mutate the original template` trong file `backend/tests/api.test.ts` liên tục kiểm chứng điều kiện này và vượt qua 100%.

---

## 6. Kiểm Thử Tự Động (Automated Test Suite)

Dự án đi kèm bộ test tự động toàn diện kiểm thử tất cả các luồng API cốt lõi, tìm kiếm, lọc danh mục, tính bất biến của mẫu và xuất file nhị phân DOCX / PPTX:

```bash
# Chạy bộ kiểm thử tự động
npm run test
```

### Kết quả kiểm thử:
```text
 ✓ tests/api.test.ts (12 tests)
   ✓ GET /api/templates/documents should return at least 5 sample templates
   ✓ should filter document templates by category
   ✓ should search document templates by keyword
   ✓ should retrieve a single document template by ID
   ✓ should return 404 for non-existent document template
   ✓ CRITICAL TEST: Instantiating a document must NOT mutate the original template (Zero-destruction)
   ✓ should export user document to valid DOCX stream
   ✓ should allow dynamically adding a new template (extensibility test)
   ✓ GET /api/templates/presentations should return at least 3 presentation templates with multi-slide structure
   ✓ should search presentation templates by keyword
   ✓ should instantiate a new presentation from template without mutating template slides
   ✓ should export user presentation to valid PPTX stream

 Test Files  1 passed (1)
      Tests  12 passed (12)
```

---

## 7. Thư Viện Bên Thứ Ba & Giấy Phép (Open Source Licenses)

Mọi thư viện mã nguồn mở sử dụng trong dự án đều tuân thủ các giấy phép thương mại và học thuật tương thích:

| Thư viện | Phiên bản | Mục đích sử dụng | Giấy phép (License) |
| :--- | :--- | :--- | :--- |
| **docx** | ^9.2.1 | Tạo và đóng gói file Microsoft Word `.docx` chuẩn OpenXML | **MIT License** |
| **pptxgenjs** | ^3.12.0 | Tạo bài trình chiếu PowerPoint `.pptx` chuẩn Microsoft Office | **MIT License** |
| **react** / **react-dom** | ^18.3.1 | Thư viện UI nền tảng Single Page Application | **MIT License** |
| **express** | ^4.21.2 | Web framework RESTful API | **MIT License** |
| **lucide-react** | ^0.475.0 | Bộ biểu tượng icon giao diện trực quan | **ISC License** |
| **tailwindcss** | ^3.4.17 | Tiện ích CSS phong cách hiện đại, responsive | **MIT License** |
| **zod** | ^3.24.2 | Thư viện kiểm tra kiểu dữ liệu và schema validation | **MIT License** |
| **vitest** / **supertest** | ^3.0.8 | Khung kiểm thử tự động và giả lập HTTP | **MIT License** |
| **uuid** | ^11.1.0 | Khởi tạo định danh độc nhất phân tách bản sao | **MIT License** |

---

## 8. Bảng Đối Chiếu Mức Độ Hoàn Thành Yêu Cầu

### Sản phẩm 1: Thư viện Mẫu Văn bản
- [x] **A. Giao diện:** Hiển thị dạng lưới / danh sách có thumbnail, tên, mô tả ngắn, danh mục.
- [x] **Tìm kiếm & Lọc:** Tìm kiếm thời gian thực theo tên, mô tả, từ khóa; lọc theo danh mục.
- [x] **Xem trước:** Cửa sổ Pop-up trực quan khổ giấy A4, hiển thị định dạng chuẩn và các biến mẫu.
- [x] **Nút sử dụng mẫu:** Khởi tạo tài liệu mới chỉ với 1 cú click.
- [x] **B. Luồng sử dụng:** Trình soạn thảo tích hợp cho phép chỉnh sửa nội dung, chèn bảng biểu, định dạng tiêu đề, căn lề.
- [x] **Bảng điền biến:** Nhập giá trị các trường mẫu (`{{ho_ten}}`, `{{muc_luong}}`...) tự động cập nhật vào tài liệu.
- [x] **Xuất file:** Hỗ trợ tải xuống Microsoft Word (`.DOCX`), in ấn/PDF, HTML và TXT.
- [x] **Bảo vệ file gốc:** Không làm thay đổi file mẫu ban đầu (đã kiểm chứng bằng test tự động).
- [x] **C. Dữ liệu:** 6 mẫu dữ liệu thử nghiệm thực tế (yêu cầu tối thiểu 5).
- [x] **Mở rộng động:** Bổ sung mẫu mới qua form modal / API mà không cần sửa code.
- [x] **D. Xử lý kỹ thuật:** Loading skeleton, empty state, bắt lỗi ngoại lệ, thông báo toast.

### Sản phẩm 2: Thư viện Mẫu Trình chiếu
- [x] **A. Giao diện:** Thumbnail tỷ lệ 16:9 cho từng template PowerPoint.
- [x] **Tìm kiếm & Phân loại:** Tìm kiếm theo từ khóa, lọc theo danh mục chủ đề kinh doanh/marketing/khởi nghiệp.
- [x] **Xem trước bộ slide:** Cửa sổ carousel xem trước toàn bộ các slide trong từng bộ với phím mũi tên.
- [x] **B. Luồng sử dụng:** Khởi tạo bản trình chiếu độc lập hoàn toàn với template gốc.
- [x] **Trình chỉnh sửa slide tích hợp:** Cho phép chỉnh sửa tiêu đề, phụ đề, nội dung bullets, thẻ chỉ số KPI, đổi bố cục slide.
- [x] **Quản lý cấu trúc slide:** Thêm slide mới, đảo thứ tự slide (lên/xuống), nhân bản (duplicate) và xóa slide.
- [x] **Đổi bảng màu chủ đề (Themes):** 5 bảng màu thiết kế sẵn (Venture Indigo, Corporate Emerald, Modern Crimson, Royal Purple, Slate Minimalist).
- [x] **Chế độ trình chiếu (Fullscreen Presenter Mode):** Thuyết trình toàn màn hình phím tắt `[←]`, `[→]`, `[Space]`, `[Esc]`.
- [x] **Tải xuống PPTX:** Xuất file PowerPoint `.pptx` thật, tương thích mở bằng Microsoft PowerPoint, Google Slides, Keynote.
- [x] **C. Quản lý dữ liệu:** 4 bộ template thử nghiệm đa slide phong phú (yêu cầu tối thiểu 3).
- [x] **D. Mở rộng:** Dễ dàng bổ sung template mới qua giao diện.

---

## 9. Giới Hạn Kỹ Thuật Hiện Tại & Hướng Mở Rộng

1. **Giới hạn chỉnh sửa slide tự do dạng Drag-and-Drop:** Trình chỉnh sửa slide hiện tại tập trung vào việc quản lý nội dung, cấu trúc danh sách, thẻ số liệu KPI và thay đổi bố cục layout chuẩn. Hướng phát triển tiếp theo là tích hợp thư viện Canvas (như Fabric.js hoặc Konva) để cho phép kéo thả tự do tọa độ các hộp văn bản và hình vẽ đồ họa trên slide.
2. **Hỗ trợ thêm định dạng Bảng tính (Spreadsheets / Excel):** Kiến trúc hệ thống đã được thiết kế mở (modular) để trong tương lai có thể bổ sung thêm Product 3 "Mẫu Bảng tính Excel" mà không làm thay đổi luồng hoạt động của Mẫu Văn bản và Mẫu Trình chiếu.
3. **Cộng tác nhiều người dùng (Realtime Collaborative Editing):** Có thể mở rộng sử dụng giao thức WebSocket và CRDT (Yjs) khi đưa hệ thống lên môi trường đám mây cho quy mô doanh nghiệp lớn.

---

## 10. Tài Liệu Bàn Giao Kèm Theo

Vui lòng tham khảo các tài liệu chuyên sâu trong thư mục `docs/`:
- **[Tài liệu API & Data Models](docs/API_DOCUMENTATION.md):** Danh mục endpoint, tham số request/response.
- **[Báo cáo Kiến trúc & Kỹ thuật](docs/ARCHITECTURE_AND_DESIGN.md):** Phân tích thiết kế, cơ chế bảo vệ mẫu gốc, giải pháp xuất file.
- **[Kịch bản Kiểm thử & Hướng dẫn](docs/USER_AND_DEMO_GUIDE.md):** Từng bước kiểm thử chi tiết phục vụ chấm thi.

