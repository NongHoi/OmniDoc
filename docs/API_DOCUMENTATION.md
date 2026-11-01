# Tài Liệu API & Cấu Trúc Dữ Liệu (API Documentation)

Hệ thống OmniDoc Office Template Suite cung cấp chuẩn giao tiếp RESTful API hoàn chỉnh phục vụ cho cả hai sản phẩm: **Thư viện Mẫu Văn bản (Document Templates)** và **Thư viện Mẫu Trình chiếu (Presentation Templates)**.

---

## 1. Cấu Trúc Địa Chỉ Máy Chủ (Base URL)

- **Môi trường cục bộ (Local Server):** `http://localhost:5000`
- **Tiền tố API (API Prefix):** `/api`
- **Định dạng dữ liệu:** `Content-Type: application/json`

---

## 2. Mô Hình Dữ Liệu (Data Models)

### A. Document Template (Mẫu Văn bản)

```typescript
interface DocumentTemplate {
  id: string;               // Mã định danh duy nhất (UUID hoặc slug)
  title: string;            // Tiêu đề mẫu văn bản
  category: string;         // Danh mục (Hợp đồng, Nhân sự, Hành chính, Kinh doanh...)
  description: string;      // Mô tả tóm tắt nội dung mẫu
  thumbnailUrl: string;     // Đường dẫn ảnh xem trước
  filePath: string;         // Đường dẫn lưu trữ tệp mẫu gốc trên server
  fileFormat: 'docx'|'html';// Định dạng tệp tin
  tags: string[];           // Các từ khóa tìm kiếm
  version: string;          // Phiên bản mẫu (ví dụ: 2.5.0)
  author: string;           // Đơn vị/Tác giả phát hành
  downloadsCount: number;   // Số lượt sử dụng
  contentHtml: string;      // Nội dung mẫu dạng HTML semantic (chứa biến {{key}})
  fields: TemplateField[];  // Danh sách các biến cần điền
  createdAt: string;        // Thời gian tạo ISO-8601
  updatedAt: string;        // Thời gian cập nhật ISO-8601
}

interface TemplateField {
  key: string;              // Tên biến (ví dụ: ho_ten, muc_luong)
  label: string;            // Nhãn hiển thị cho người dùng
  defaultValue: string;     // Giá trị mặc định ban đầu
  type?: 'text'|'date'|'number'|'textarea';
}
```

### B. Presentation Template (Mẫu Trình chiếu)

```typescript
interface PresentationTemplate {
  id: string;               // Mã định danh duy nhất
  title: string;            // Tiêu đề bộ slide
  category: string;         // Danh mục (Khởi nghiệp, Kinh doanh, Marketing...)
  description: string;      // Mô tả nội dung bài thuyết trình
  thumbnailUrl: string;     // Ảnh thu nhỏ slide trang bìa
  filePath: string;         // Đường dẫn file PPTX mẫu
  fileFormat: 'pptx';       // Định dạng tệp trình chiếu
  tags: string[];           // Từ khóa
  slidesCount: number;      // Số lượng slide trong bộ
  theme: PresentationTheme; // Bảng màu chủ đề
  slides: Slide[];          // Danh sách các slide chi tiết
  createdAt: string;
  updatedAt: string;
}

interface Slide {
  id: string;
  slideNumber: number;      // Thứ tự slide (1, 2, 3...)
  title: string;            // Tiêu đề slide
  subtitle?: string;        // Phụ đề
  layout: 'title' | 'content-bullets' | 'two-columns' | 'stats-kpi' | 'quote';
  elements: SlideElement[]; // Các khối nội dung
  background?: string;      // Màu hoặc gradient nền slide
}

interface PresentationTheme {
  name: string;             // Tên chủ đề (Venture Indigo, Corporate Emerald...)
  primaryColor: string;     // Mã hex màu chủ đạo (#2563eb)
  secondaryColor: string;   // Mã hex màu thứ cấp
  accentColor: string;      // Màu nhấn
  backgroundColor: string;  // Màu nền slide
  textColor: string;        // Màu chữ chính
  fontHeading: string;
  fontBody: string;
}
```

### C. User Document & Presentation (Bản sao độc lập của người dùng)

```typescript
interface UserDocument {
  id: string;               // UUID mới tạo cho bản sao
  templateId: string;       // Tham chiếu tới mẫu gốc
  title: string;            // Tên tài liệu người dùng đặt
  category: string;
  contentHtml: string;      // Nội dung đã được chỉnh sửa
  fieldValues: Record<string, string>; // Giá trị các biến đã điền
  status: 'draft' | 'final';// Trạng thái: Bản nháp hoặc Đã hoàn thiện
  createdAt: string;
  updatedAt: string;
}

interface UserPresentation {
  id: string;               // UUID mới tạo cho bản sao
  templateId: string;       // Tham chiếu tới mẫu gốc
  title: string;
  category: string;
  theme: PresentationTheme; // Bảng màu tùy biến của người dùng
  slides: Slide[];          // Bộ slide đã được người dùng chỉnh sửa/thêm/xóa
  status: 'draft' | 'final';
  createdAt: string;
  updatedAt: string;
}
```

---

## 3. Danh Sách Endpoint Chi Tiết

### 3.1. Nhóm API Mẫu Văn Bản (Document Templates)

#### `GET /api/templates/documents`
Lấy danh sách các mẫu văn bản, hỗ trợ tìm kiếm và lọc.
- **Query Parameters:**
  - `search` *(string, optional)*: Từ khóa tìm theo tên, mô tả hoặc tag.
  - `category` *(string, optional)*: Lọc theo danh mục (`Hợp đồng`, `Nhân sự`, `Hành chính`, `Kinh doanh`, `Báo cáo`, `Tuyển dụng`).
  - `sortBy` *(string, optional)*: Sắp xếp theo `popular` (lượt dùng), `newest` (mới nhất), `title` (A-Z).
- **Phản hồi mẫu (200 OK):**
```json
{
  "success": true,
  "count": 6,
  "data": [
    {
      "id": "doc-01-hop-dong-lao-dong",
      "title": "Hợp đồng lao động tiêu chuẩn 2025",
      "category": "Hợp đồng",
      "description": "Mẫu hợp đồng lao động chuẩn theo quy định...",
      "downloadsCount": 1420,
      "version": "2.5.0",
      "fileFormat": "docx"
    }
  ]
}
```

#### `GET /api/templates/documents/:id`
Lấy chi tiết một mẫu văn bản bao gồm toàn bộ nội dung HTML và cấu trúc biến.
- **Phản hồi 404:** Nếu ID không tồn tại.

#### `POST /api/templates/documents`
Bổ sung một mẫu văn bản mới vào thư viện (tính năng mở rộng động không cần build lại UI).
- **Request Body:**
```json
{
  "title": "Biên bản Bàn giao Tài sản",
  "category": "Hành chính",
  "description": "Biên bản kiểm kê và bàn giao tài sản thiết bị công ty.",
  "contentHtml": "<h3>BIÊN BẢN BÀN GIAO</h3><p>Bên A bàn giao cho Bên B...</p>",
  "tags": ["Hành chính", "Tài sản"],
  "fields": [
    { "key": "nguoi_nhan", "label": "Người nhận", "defaultValue": "Nguyễn Văn A" }
  ]
}
```

---

### 3.2. Nhóm API Mẫu Trình Chiếu (Presentation Templates)

#### `GET /api/templates/presentations`
Lấy danh sách các bộ slide mẫu PowerPoint, hỗ trợ tìm kiếm và phân loại.
- **Query Parameters:**
  - `search` *(string)*, `category` *(string)*, `sortBy` *(string)*.
- **Phản hồi mẫu (200 OK):**
```json
{
  "success": true,
  "count": 4,
  "data": [
    {
      "id": "pres-01-startup-pitch-deck",
      "title": "Startup Pitch Deck - Gọi vốn nhà đầu tư",
      "category": "Khởi nghiệp",
      "slidesCount": 5,
      "theme": { "name": "Venture Indigo", "primaryColor": "#2563eb" },
      "slides": [ ... ]
    }
  ]
}
```

#### `GET /api/templates/presentations/:id`
Lấy chi tiết toàn bộ các slide trong bộ template để hiển thị trình xem trước filmstrip/carousel.

#### `POST /api/templates/presentations`
Thêm mới bộ slide trình chiếu vào hệ thống.

---

### 3.3. Nhóm API Tài Liệu Người Dùng (Zero-Destructive Operations)

#### `POST /api/documents`
Khởi tạo tài liệu văn bản mới từ mẫu (Tạo bản sao độc lập, bảo toàn file gốc 100%).
- **Request Body:**
```json
{
  "templateId": "doc-01-hop-dong-lao-dong",
  "customTitle": "Hợp đồng nhân sự - Nguyễn Văn B"
}
```
- **Phản hồi (201 Created):**
```json
{
  "success": true,
  "message": "Khởi tạo tài liệu mới từ mẫu thành công (Bảo toàn 100% mẫu gốc)",
  "data": {
    "id": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
    "templateId": "doc-01-hop-dong-lao-dong",
    "title": "Hợp đồng nhân sự - Nguyễn Văn B",
    "status": "draft",
    "contentHtml": "..."
  }
}
```

#### `GET /api/documents`
Lấy danh sách tất cả tài liệu văn bản người dùng đã tạo.

#### `GET /api/documents/:id`
Lấy chi tiết tài liệu theo ID để nạp vào trình soạn thảo.

#### `PUT /api/documents/:id`
Cập nhật nội dung, tiêu đề hoặc trạng thái hoàn thành của tài liệu.
- **Request Body:**
```json
{
  "title": "Hợp đồng đã ký - Nguyễn Văn B",
  "contentHtml": "<p>Nội dung cập nhật...</p>",
  "status": "final"
}
```

#### `DELETE /api/documents/:id`
Xóa tài liệu người dùng khỏi kho lưu trữ.

#### `GET /api/documents/:id/export/docx`
Xuất tài liệu người dùng thành tệp tin nhị phân Microsoft Word `.docx`.
- **Response Header:** `Content-Type: application/vnd.openxmlformats-officedocument.wordprocessingml.document`
- **Content-Disposition:** `attachment; filename="Ten_Tai_Lieu.docx"`

---

### 3.4. Nhóm API Trình Chiếu Người Dùng (Presentation User Documents)

#### `POST /api/presentations`
Khởi tạo bản trình chiếu mới từ template PowerPoint (Nhân bản toàn bộ các slide với ID mới, giữ nguyên template gốc).

#### `GET /api/presentations`
Lấy danh sách bài trình chiếu của người dùng.

#### `GET /api/presentations/:id`
Lấy dữ liệu bài trình chiếu để nạp vào trình chỉnh sửa slide.

#### `PUT /api/presentations/:id`
Lưu thay đổi của bộ slide (thêm slide, sửa tiêu đề, đổi layout, đổi bảng màu).

#### `DELETE /api/presentations/:id`
Xóa bản trình chiếu.

#### `GET /api/presentations/:id/export/pptx`
Đóng gói và tải xuống file PowerPoint `.pptx` chuẩn Microsoft Office.
- **Response Header:** `Content-Type: application/vnd.openxmlformats-officedocument.presentationml.presentation`
- **Content-Disposition:** `attachment; filename="Ten_Trinh_Chieu.pptx"`

---

### 3.5. Nhóm API Tiện Ích & Thống Kê

#### `GET /api/categories`
Trả về số lượng mẫu trong từng danh mục cho cả Văn bản và Trình chiếu.

#### `GET /health`
Kiểm tra trạng thái sẵn sàng của dịch vụ API.

