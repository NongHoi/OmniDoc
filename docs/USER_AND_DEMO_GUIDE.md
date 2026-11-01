# Kịch Bản Kiểm Thử & Hướng Dẫn Trải Nghiệm (Test Walkthrough & Demo Guide)

Tài liệu này được biên soạn nhằm hỗ trợ Hội đồng Đánh giá / Giám khảo kiểm thử toàn diện tất cả các tiêu chí chức năng của **Sản phẩm 1** và **Sản phẩm 2** trên ứng dụng thực tế.

---

## 1. Khởi Động Ứng Dụng (Quick Start)

Từ thư mục gốc dự án:
```bash
# 1. Cài đặt các gói phụ thuộc (nếu chưa cài)
npm run install:all

# 2. Khởi chạy đồng thời cả Backend API và Frontend Web App
npm run dev
```

- Mở trình duyệt và truy cập: **`http://localhost:5173`**
- Máy chủ Backend API chạy tại: **`http://localhost:5000`**

---

## 2. Kịch Bản Kiểm Thử SẢN PHẨM 1: Thư Viện Mẫu Văn Bản

### Bước 1: Duyệt danh sách và lọc mẫu
1. Tại tab mặc định **"Mẫu Văn bản"**, quan sát 6 mẫu văn bản thử nghiệm thực tế:
   - *Hợp đồng lao động tiêu chuẩn 2025*
   - *Đơn xin nghỉ phép năm*
   - *Biên bản cuộc họp ban dự án / giám đốc*
   - *Báo cáo tiến độ dự án định kỳ*
   - *Thư mời nhận việc (Offer Letter)*
   - *Hợp đồng cung cấp dịch vụ công nghệ thông tin*
2. Nhấp vào các thẻ danh mục phía trên: **"Hợp đồng"**, **"Nhân sự"**, **"Hành chính"**, **"Báo cáo"**, **"Tuyển dụng"** để kiểm tra việc lọc dữ liệu tức thì.
3. Nhập từ khóa vào ô tìm kiếm: ví dụ `nghỉ phép` hoặc `lương` để kiểm tra bộ tìm kiếm theo thời gian thực.
4. Chuyển đổi giữa chế độ **Hiển thị Lưới (Grid)** và **Hiển thị Danh sách (List)** qua 2 biểu tượng góc phải.

### Bước 2: Xem trước mẫu (Template Preview)
1. Bấm nút **"Xem trước"** trên bất kỳ mẫu nào (ví dụ: *Hợp đồng lao động*).
2. Quan sát cửa sổ Pop-up hiển thị trang văn bản A4 chuẩn với đầy đủ định dạng:
   - Tiêu đề Quốc hiệu Tiêu ngữ, số hợp đồng.
   - Bảng biểu thông tin Bên A, Bên B.
   - Các điều khoản pháp lý và khu vực chữ ký hai bên.
   - Cột bên phải hiển thị danh sách các biến mẫu phát hiện được (`{{nguoi_su_dung_lao_dong}}`, `{{ho_ten_nguoi_lao_dong}}`...).
3. Bấm **"Sử dụng mẫu này"** (hoặc nút "Sử dụng" ngoài thư viện).

### Bước 3: Soạn thảo trong trình chỉnh sửa tích hợp
1. Hệ thống tự động tạo một bản sao mới và chuyển đến **Trình Soạn Thảo Văn Bản Tích Hợp**.
2. Thử nghiệm thanh công cụ định dạng:
   - Bôi đen một đoạn văn bản và chọn **Đậm (B)**, **Nghiêng (I)**, **Gạch chân (U)**.
   - Thử đổi kiểu tiêu đề thành **H1**, **H2** hoặc **P**.
   - Thử căn lề giữa, căn phải, căn đều hai bên.
   - Nhấn nút **"Chèn bảng"** để chèn một bảng biểu mới vào tài liệu.
3. **Thử nghiệm tính năng "Điền biến thông minh":**
   - Tại thanh bên phải, sửa các trường dữ liệu như `Họ tên người lao động`, `Mức lương cơ bản`...
   - Quan sát giá trị lập tức được cập nhật trực tiếp trên trang tài liệu.
4. Bấm **"Lưu tài liệu"** -> Thông báo đã lưu hiển thị thời gian chính xác.

### Bước 4: Tải xuống tài liệu (DOCX / PDF / HTML / TXT)
1. Bấm nút **"Tải xuống"** góc trên bên phải.
2. Chọn **"Microsoft Word (.DOCX)"**: File `.docx` sẽ được tạo và tải về máy tính. Mở file bằng Microsoft Word để kiểm tra văn bản giữ nguyên cấu trúc tiêu đề, bảng biểu và căn lề.
3. Chọn **"Xuất PDF / In ấn"**: Cửa sổ in ấn mở ra với giao diện A4 sạch sẽ không chứa các nút điều hướng.
4. Bấm mũi tên quay lại **[←]** góc trên bên trái để trở về thư viện.

---

## 3. Kịch Bản Kiểm Thử SẢN PHẨM 2: Thư Viện Mẫu Trình Chiếu

### Bước 1: Duyệt danh sách mẫu slide
1. Chuyển sang tab **"Mẫu Trình chiếu"** trên thanh điều hướng đầu trang.
2. Quan sát 4 bộ template PowerPoint hoàn chỉnh:
   - *Startup Pitch Deck - Gọi vốn nhà đầu tư (5 slides)*
   - *Báo cáo kết quả kinh doanh quý - Business Review (5 slides)*
   - *Kế hoạch ra mắt sản phẩm mới - Product Launch (5 slides)*
   - *Company Profile - Hồ sơ năng lực doanh nghiệp (4 slides)*
3. Thử nghiệm tìm kiếm theo từ khóa `pitch` hoặc `kinh doanh` và lọc theo danh mục.

### Bước 2: Xem trước toàn bộ bộ slide (Slide Deck Preview)
1. Bấm nút **"Xem trước"** trên mẫu *Startup Pitch Deck*.
2. Cửa sổ trình chiếu mở ra với màn hình tỷ lệ 16:9 chuẩn.
3. Dùng phím mũi tên bàn phím **[→]** hoặc các nút điều hướng để duyệt qua từng slide:
   - **Slide 1:** Slide trang bìa nổi bật.
   - **Slide 2:** Slide nêu vấn đề thị trường dạng gạch đầu dòng (bullets).
   - **Slide 3:** Slide chia hai cột so sánh giải pháp (two-columns).
   - **Slide 4:** Slide các thẻ chỉ số tăng trưởng kinh doanh (KPI Metrics cards).
   - **Slide 5:** Slide mục tiêu và kế hoạch sử dụng vốn.
4. Bấm nút **"Khởi tạo bài trình chiếu"**.

### Bước 3: Chỉnh sửa bài trình chiếu trong Trình soạn thảo Slide
1. Hệ thống chuyển tới không gian làm việc của **Trình Chỉnh Sửa Trình Chiếu**:
   - Cột bên trái hiển thị danh sách filmstrip các slide trong bộ.
   - Khu vực trung tâm là khung slide 16:9 cho phép click vào chỉnh sửa trực tiếp tiêu đề, phụ đề, nội dung bullets và các chỉ số KPI.
2. **Thao tác quản lý slide:**
   - Bấm **"Thêm Slide mới"** -> Slide mới được tạo và bổ sung vào cuối bộ.
   - Bấm biểu tượng **Di chuyển lên [↑] / xuống [↓]** để đảo thứ tự slide.
   - Bấm biểu tượng **Nhân bản (Duplicate)** để tạo bản sao một slide có sẵn.
   - Bấm biểu tượng **Thùng rác** để xóa bớt slide không cần thiết.
3. **Đổi bố cục & Đổi chủ đề màu (Themes):**
   - Thay đổi bố cục slide hiện tại sang dạng *Chỉ số & KPI nổi bật* hoặc *Hai cột so sánh*.
   - Mở menu **Chủ đề màu** ở góc trên và chọn các bảng màu khác nhau: *Corporate Emerald*, *Modern Crimson*, *Royal Purple*, *Slate Minimalist* -> Toàn bộ slide đổi sang tông màu mới.

### Bước 4: Trình chiếu Toàn màn hình & Xuất file PPTX
1. Bấm nút **"Trình chiếu"** (biểu tượng Play xanh lá):
   - Ứng dụng chuyển sang chế độ Fullscreen Presenter Mode.
   - Dùng phím mũi tên hoặc phím cách (Space) để lật slide thuyết trình.
   - Bấm `Esc` để thoát chế độ trình chiếu.
2. Bấm nút **"Tải PPTX"**:
   - Tệp PowerPoint `.pptx` được đóng gói hoàn chỉnh bằng thư viện `pptxgenjs` và tải về máy.
   - Mở tệp tin này bằng PowerPoint để kiểm tra: các slide, khối văn bản và màu sắc hiển thị chuẩn xác và hoàn toàn chỉnh sửa được.

---

## 4. Kịch Bản Kiểm Tra Tính Độc Lập Của Bản Sao (Zero-Destruction Verification)

1. Mở tab **"Tài liệu của tôi"** trên thanh điều hướng.
2. Quan sát toàn bộ các tài liệu văn bản và bài trình chiếu bạn vừa tạo và chỉnh sửa ở các bước trên đều được liệt kê đầy đủ.
3. Quay trở lại tab **"Mẫu Văn bản"** hoặc **"Mẫu Trình chiếu"** và bấm **"Xem trước"** mẫu gốc ban đầu:
   - **Kết quả:** Nội dung mẫu gốc vẫn hoàn toàn nguyên vẹn 100%, không hề bị ảnh hưởng bởi những nội dung bạn đã chỉnh sửa trong tài liệu cá nhân.

---

## 5. Kịch Bản Kiểm Tra Khả Năng Mở Rộng (Bổ Sung Mẫu Mới)

1. Nhấn nút **"Thêm mẫu mới"** ở góc trên bên phải thanh Navbar.
2. Chọn loại mẫu muốn thêm (Văn bản hoặc Trình chiếu).
3. Nhập tiêu đề mẫu mới (ví dụ: `Biên bản Bàn giao Ca trực 2025`), danh mục `Hành chính`, mô tả và nhấn **"Lưu mẫu vào thư viện"**.
4. **Kết quả:** Mẫu mới lập tức xuất hiện ngay trên giao diện thư viện, có thể tìm kiếm, xem trước và khởi tạo tài liệu bình thường mà không cần sửa một dòng code nào!

---

## 6. Chạy Bộ Kiểm Thử Tự Động (Automated Test Suite)

Trong terminal, chạy lệnh:
```bash
npm run test
```
- **Kết quả:** Toàn bộ 12 test cases kiểm tra API, tính bất biến của template và export file DOCX / PPTX đều vượt qua (12 passed).

