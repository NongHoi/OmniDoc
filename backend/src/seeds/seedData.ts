import { DocumentTemplate, PresentationTemplate } from '../types/index.js';

export const initialDocumentTemplates: DocumentTemplate[] = [
  {
    id: 'doc-01-hop-dong-lao-dong',
    title: 'Hợp đồng lao động tiêu chuẩn 2025',
    category: 'Hợp đồng',
    description: 'Mẫu hợp đồng lao động chuẩn theo quy định Bộ luật Lao động, bao gồm đầy đủ điều khoản về công việc, tiền lương, bảo hiểm và quyền lợi của người lao động.',
    thumbnailUrl: '/thumbnails/doc-hop-dong.svg',
    filePath: 'templates/documents/hop-dong-lao-dong.docx',
    fileFormat: 'docx',
    tags: ['Hợp đồng', 'Nhân sự', 'Pháp lý', 'Tiêu chuẩn'],
    version: '2.5.0',
    author: 'Phòng Pháp chế & Nhân sự',
    downloadsCount: 1420,
    fields: [
      { key: 'nguoi_su_dung_lao_dong', label: 'Tên Doanh nghiệp (Bên A)', defaultValue: 'CÔNG TY CỔ PHẦN CÔNG NGHỆ OMNIDOC', type: 'text' },
      { key: 'dai_dien_ben_a', label: 'Đại diện bên A (Họ tên - Chức vụ)', defaultValue: 'Ông Nguyễn Văn An - Tổng Giám đốc', type: 'text' },
      { key: 'dia_chi_ben_a', label: 'Địa chỉ doanh nghiệp', defaultValue: 'Tầng 12, Tòa nhà Innovation, Cầu Giấy, Hà Nội', type: 'text' },
      { key: 'ho_ten_nguoi_lao_dong', label: 'Họ tên Người lao động (Bên B)', defaultValue: 'Trần Thị Bình', type: 'text' },
      { key: 'ngay_sinh', label: 'Ngày tháng năm sinh', defaultValue: '15/08/1996', type: 'date' },
      { key: 'so_cccd', label: 'Số CCCD/Hộ chiếu', defaultValue: '001196001234', type: 'text' },
      { key: 'chuc_danh_chuyen_mon', label: 'Chức danh công việc', defaultValue: 'Kỹ sư Phần mềm Cao cấp', type: 'text' },
      { key: 'muc_luong_chinh', label: 'Mức lương cơ bản (VNĐ/tháng)', defaultValue: '35,000,000 VNĐ', type: 'text' },
      { key: 'ngay_bat_dau', label: 'Ngày bắt đầu hợp đồng', defaultValue: '01/11/2025', type: 'date' }
    ],
    contentHtml: `
<div style="font-family: 'Times New Roman', serif; line-height: 1.6; max-width: 800px; margin: 0 auto; color: #111;">
  <div style="text-align: center; margin-bottom: 24px;">
    <h3 style="margin: 0; font-size: 14pt; font-weight: bold; text-transform: uppercase;">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h3>
    <p style="margin: 4px 0 0; font-size: 13pt; font-weight: bold;">Độc lập - Tự do - Hạnh phúc</p>
    <div style="width: 160px; height: 1px; background: #000; margin: 6px auto 18px;"></div>
    <h2 style="margin: 16px 0 6px; font-size: 16pt; font-weight: bold; text-transform: uppercase; color: #1a365d;">HỢP ĐỒNG LAO ĐỘNG</h2>
    <p style="margin: 0; font-style: italic; font-size: 11pt;">Số: 2025/HĐLĐ-OMNI</p>
  </div>

  <p>Hôm nay, ngày <em>... tháng ... năm 2025</em>, tại trụ sở Công ty Cổ phần Công nghệ OmniDoc, chúng tôi gồm có:</p>

  <h4 style="font-size: 13pt; font-weight: bold; margin-top: 16px; border-bottom: 1px solid #ccc; padding-bottom: 4px;">I. BÊN SỬ DỤNG LAO ĐỘNG (BÊN A):</h4>
  <table style="width: 100%; border-collapse: collapse; margin-bottom: 12px;">
    <tr><td style="width: 30%; padding: 4px 0;"><strong>Tên doanh nghiệp:</strong></td><td style="padding: 4px 0;">{{nguoi_su_dung_lao_dong}}</td></tr>
    <tr><td style="padding: 4px 0;"><strong>Đại diện pháp luật:</strong></td><td style="padding: 4px 0;">{{dai_dien_ben_a}}</td></tr>
    <tr><td style="padding: 4px 0;"><strong>Địa chỉ:</strong></td><td style="padding: 4px 0;">{{dia_chi_ben_a}}</td></tr>
    <tr><td style="padding: 4px 0;"><strong>Mã số thuế:</strong></td><td style="padding: 4px 0;">0108999888</td></tr>
  </table>

  <h4 style="font-size: 13pt; font-weight: bold; margin-top: 16px; border-bottom: 1px solid #ccc; padding-bottom: 4px;">II. BÊN NGƯỜI LAO ĐỘNG (BÊN B):</h4>
  <table style="width: 100%; border-collapse: collapse; margin-bottom: 12px;">
    <tr><td style="width: 30%; padding: 4px 0;"><strong>Họ và tên:</strong></td><td style="padding: 4px 0;"><strong>{{ho_ten_nguoi_lao_dong}}</strong></td></tr>
    <tr><td style="padding: 4px 0;"><strong>Ngày sinh:</strong></td><td style="padding: 4px 0;">{{ngay_sinh}}</td></tr>
    <tr><td style="padding: 4px 0;"><strong>Số CCCD:</strong></td><td style="padding: 4px 0;">{{so_cccd}}</td></tr>
    <tr><td style="padding: 4px 0;"><strong>Vị trí đảm nhiệm:</strong></td><td style="padding: 4px 0;"><strong>{{chuc_danh_chuyen_mon}}</strong></td></tr>
  </table>

  <h4 style="font-size: 13pt; font-weight: bold; margin-top: 16px; border-bottom: 1px solid #ccc; padding-bottom: 4px;">III. ĐIỀU KHOẢN HỢP ĐỒNG:</h4>
  <p><strong>Điều 1. Thời hạn và công việc:</strong></p>
  <ul>
    <li>Loại hợp đồng: Hợp đồng lao động xác định thời hạn 24 tháng.</li>
    <li>Bắt đầu từ ngày: <strong>{{ngay_bat_dau}}</strong>.</li>
    <li>Địa điểm làm việc: Trụ sở Bên A hoặc theo sự phân công thực tế của dự án.</li>
  </ul>

  <p><strong>Điều 2. Chế độ làm việc và quyền lợi tiền lương:</strong></p>
  <ul>
    <li>Thời gian làm việc: 40 giờ/tuần (Thứ Hai đến Thứ Sáu, từ 8h30 đến 17h30).</li>
    <li>Mức lương chính thức: <strong>{{muc_luong_chinh}}</strong>.</li>
    <li>Hình thức trả lương: Chuyển khoản ngân hàng vào ngày 05 hàng tháng.</li>
    <li>Chế độ thưởng, phụ cấp ăn trưa, công tác phí theo Quy chế tài chính công ty.</li>
    <li>Được đóng BHXH, BHYT, BHTN theo đúng quy định pháp luật lao động hiện hành.</li>
  </ul>

  <p><strong>Điều 3. Nghĩa vụ và bảo mật thông tin:</strong></p>
  <p>Người lao động cam kết tuân thủ nội quy lao động, an toàn lao động và cam kết bảo mật tuyệt đối các thông tin kinh doanh, mã nguồn và dữ liệu khách hàng của Bên A.</p>

  <table style="width: 100%; margin-top: 40px; text-align: center;">
    <tr>
      <td style="width: 50%;">
        <strong>ĐẠI DIỆN BÊN A</strong><br/>
        <em>(Ký, ghi rõ họ tên và đóng dấu)</em><br/><br/><br/><br/>
        <strong>{{dai_dien_ben_a}}</strong>
      </td>
      <td style="width: 50%;">
        <strong>NGƯỜI LAO ĐỘNG (BÊN B)</strong><br/>
        <em>(Ký và ghi rõ họ tên)</em><br/><br/><br/><br/>
        <strong>{{ho_ten_nguoi_lao_dong}}</strong>
      </td>
    </tr>
  </table>
</div>
    `,
    createdAt: '2025-01-15T08:00:00Z',
    updatedAt: '2025-10-10T14:30:00Z'
  },
  {
    id: 'doc-02-don-xin-nghi-phep',
    title: 'Đơn xin nghỉ phép năm',
    category: 'Nhân sự',
    description: 'Biểu mẫu tiêu chuẩn dành cho cán bộ nhân viên đăng ký nghỉ phép năm, nghỉ phép chế độ có kế hoạch bàn giao công việc chi tiết.',
    thumbnailUrl: '/thumbnails/doc-don-nghi-phep.svg',
    filePath: 'templates/documents/don-xin-nghi-phep.docx',
    fileFormat: 'docx',
    tags: ['Nhân sự', 'Nghỉ phép', 'Biểu mẫu', 'Nội bộ'],
    version: '1.4.0',
    author: 'Phòng Nhân sự & Hành chính',
    downloadsCount: 2310,
    fields: [
      { key: 'kinh_gui', label: 'Kính gửi (Bộ phận / Quản lý)', defaultValue: 'Ban Giám đốc & Trưởng phòng Kỹ thuật', type: 'text' },
      { key: 'ho_ten', label: 'Họ và tên nhân viên', defaultValue: 'Nguyễn Hoàng Long', type: 'text' },
      { key: 'ma_nhan_vien', label: 'Mã nhân viên', defaultValue: 'EMP-2024-88', type: 'text' },
      { key: 'chuc_vu', label: 'Chức danh', defaultValue: 'Chuyên viên Phát triển Frontend', type: 'text' },
      { key: 'so_ngay_nghi', label: 'Số ngày nghỉ dự kiến', defaultValue: '03 ngày', type: 'text' },
      { key: 'thoi_gian_nghi', label: 'Thời gian nghỉ (Từ ngày - Đến ngày)', defaultValue: 'Từ ngày 10/11/2025 đến hết ngày 12/11/2025', type: 'text' },
      { key: 'ly_do_nghi', label: 'Lý do xin nghỉ', defaultValue: 'Giải quyết việc cá nhân gia đình tại quê', type: 'textarea' },
      { key: 'nguoi_ban_giao', label: 'Người nhận bàn giao công việc', defaultValue: 'Phạm Minh Tuấn (Senior Dev)', type: 'text' }
    ],
    contentHtml: `
<div style="font-family: 'Times New Roman', serif; line-height: 1.6; max-width: 750px; margin: 0 auto; color: #111;">
  <div style="text-align: center; margin-bottom: 20px;">
    <h3 style="margin: 0; font-size: 13pt; font-weight: bold; text-transform: uppercase;">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h3>
    <p style="margin: 4px 0 0; font-size: 12pt; font-weight: bold;">Độc lập - Tự do - Hạnh phúc</p>
    <div style="width: 140px; height: 1px; background: #000; margin: 6px auto 16px;"></div>
    <h2 style="margin: 16px 0 4px; font-size: 16pt; font-weight: bold; text-transform: uppercase; color: #1e3a8a;">ĐƠN XIN NGHỈ PHÉP NĂM</h2>
  </div>

  <p><strong>Kính gửi:</strong> {{kinh_gui}}</p>

  <p>Tôi tên là: <strong>{{ho_ten}}</strong></p>
  <p>Mã nhân viên: <strong>{{ma_nhan_vien}}</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Chức vụ: <strong>{{chuc_vu}}</strong></p>
  <p>Bộ phận công tác: Khối Công nghệ Thông tin</p>

  <p>Nay tôi làm đơn này kính xin phép được nghỉ làm việc:</p>
  <ul>
    <li>Số ngày xin nghỉ: <strong>{{so_ngay_nghi}}</strong></li>
    <li>Thời gian nghỉ: <strong>{{thoi_gian_nghi}}</strong></li>
    <li>Lý do: {{ly_do_nghi}}</li>
  </ul>

  <p><strong>Phương án bàn giao và đảm bảo công việc:</strong></p>
  <p>Trong thời gian tôi nghỉ phép, toàn bộ công việc và nhiệm vụ trực sprint đã được bàn giao chi tiết cho đồng nghiệp: <strong>{{nguoi_ban_giao}}</strong>. Tôi cam kết giữ liên lạc qua điện thoại trong trường hợp khẩn cấp.</p>

  <p>Kính mong Ban Giám đốc và Trưởng bộ phận xem xét phê duyệt.</p>

  <table style="width: 100%; margin-top: 36px; text-align: center;">
    <tr>
      <td style="width: 33%;">
        <strong>TRƯỞNG BỘ PHẬN</strong><br/>
        <em>(Ký & duyệt)</em><br/><br/><br/><br/>
      </td>
      <td style="width: 33%;">
        <strong>NGƯỜI NHẬN BÀN GIAO</strong><br/>
        <em>(Xác nhận nhận việc)</em><br/><br/><br/><br/>
        <em>{{nguoi_ban_giao}}</em>
      </td>
      <td style="width: 34%;">
        <strong>NGƯỜI LÀM ĐƠN</strong><br/>
        <em>(Ký và ghi rõ họ tên)</em><br/><br/><br/><br/>
        <strong>{{ho_ten}}</strong>
      </td>
    </tr>
  </table>
</div>
    `,
    createdAt: '2025-02-01T09:00:00Z',
    updatedAt: '2025-09-18T10:00:00Z'
  },
  {
    id: 'doc-03-bien-ban-cuoc-hop',
    title: 'Biên bản cuộc họp ban dự án / giám đốc',
    category: 'Hành chính',
    description: 'Mẫu biên bản cuộc họp tổng hợp chương trình, thành phần tham dự, các quyết sách quan trọng và bảng phân công hành động (Action Items) có thời hạn.',
    thumbnailUrl: '/thumbnails/doc-bien-ban.svg',
    filePath: 'templates/documents/bien-ban-cuoc-hop.docx',
    fileFormat: 'docx',
    tags: ['Hành chính', 'Cuộc họp', 'Quản lý dự án', 'Báo cáo'],
    version: '1.3.0',
    author: 'Văn phòng Thư ký',
    downloadsCount: 1850,
    fields: [
      { key: 'ten_cuoc_hop', label: 'Tên cuộc họp', defaultValue: 'Cuộc họp Đánh giá Tiến độ Dự án Nâng cấp Hệ thống ERP', type: 'text' },
      { key: 'thoi_gian', label: 'Thời gian tổ chức', defaultValue: '09:00 - 11:30 ngày 25/10/2025', type: 'text' },
      { key: 'dia_diem', label: 'Địa điểm / Phòng họp', defaultValue: 'Phòng họp Lotus (Tầng 8) & Kết nối Trực tuyến Google Meet', type: 'text' },
      { key: 'chu_tri', label: 'Chủ trì cuộc họp', defaultValue: 'Lê Quang Hải - Giám đốc Công nghệ (CTO)', type: 'text' },
      { key: 'thu_ky', label: 'Thư ký ghi chép', defaultValue: 'Vũ Thu Trang', type: 'text' }
    ],
    contentHtml: `
<div style="font-family: 'Times New Roman', serif; line-height: 1.6; max-width: 800px; margin: 0 auto; color: #111;">
  <div style="text-align: center; margin-bottom: 20px;">
    <h2 style="margin: 0 0 6px; font-size: 16pt; font-weight: bold; text-transform: uppercase; color: #0f172a;">BIÊN BẢN CUỘC HỌP</h2>
    <p style="margin: 0; font-size: 13pt; font-weight: bold; color: #2563eb;">{{ten_cuoc_hop}}</p>
  </div>

  <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
    <tr><td style="width: 25%; padding: 4px 0;"><strong>Thời gian:</strong></td><td>{{thoi_gian}}</td></tr>
    <tr><td style="padding: 4px 0;"><strong>Địa điểm:</strong></td><td>{{dia_diem}}</td></tr>
    <tr><td style="padding: 4px 0;"><strong>Chủ trì:</strong></td><td>{{chu_tri}}</td></tr>
    <tr><td style="padding: 4px 0;"><strong>Thư ký:</strong></td><td>{{thu_ky}}</td></tr>
    <tr><td style="padding: 4px 0;"><strong>Thành phần tham dự:</strong></td><td>Đại diện Ban Giám đốc, Tech Lead, Product Owner, QA Lead (Tổng cộng: 12 thành viên, có mặt đủ).</td></tr>
  </table>

  <h4 style="font-size: 12pt; font-weight: bold; text-transform: uppercase; margin-top: 16px; border-bottom: 2px solid #334155; padding-bottom: 4px;">I. NỘI DUNG VÀ TIẾN ĐỘ THẢO LUẬN</h4>
  <ol>
    <li><strong>Đánh giá tiến độ Sprint 14:</strong> Đạt 92% khối lượng công việc, hoàn thành tích hợp Module Thanh toán và Phân quyền người dùng.</li>
    <li><strong>Các tồn đọng kỹ thuật:</strong> Ghi nhận hiệu năng tải dữ liệu tại bảng báo cáo tài chính cần tối ưu hóa chỉ số Database Index.</li>
    <li><strong>Kế hoạch UAT:</strong> Thống nhất bắt đầu bàn giao cho khách hàng thử nghiệm vào ngày 05/11/2025.</li>
  </ol>

  <h4 style="font-size: 12pt; font-weight: bold; text-transform: uppercase; margin-top: 16px; border-bottom: 2px solid #334155; padding-bottom: 4px;">II. KẾT LUẬN VÀ PHÂN CÔNG HÀNH ĐỘNG (ACTION ITEMS)</h4>
  <table style="width: 100%; border-collapse: collapse; margin-top: 8px; border: 1px solid #cbd5e1;">
    <thead>
      <tr style="background-color: #f1f5f9; text-align: left;">
        <th style="border: 1px solid #cbd5e1; padding: 8px;">STT</th>
        <th style="border: 1px solid #cbd5e1; padding: 8px;">Nhiệm vụ cụ thể</th>
        <th style="border: 1px solid #cbd5e1; padding: 8px;">Người phụ trách</th>
        <th style="border: 1px solid #cbd5e1; padding: 8px;">Hạn chót (Deadline)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="border: 1px solid #cbd5e1; padding: 8px; text-align: center;">1</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px;">Tối ưu hóa Database Query và Cache Redis cho báo cáo</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px;">Đội Backend (Anh Tuấn)</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px;">30/10/2025</td>
      </tr>
      <tr>
        <td style="border: 1px solid #cbd5e1; padding: 8px; text-align: center;">2</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px;">Hoàn thiện bộ tài liệu hướng dẫn sử dụng phiên bản 2.0</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px;">Chị Hằng (Technical Writer)</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px;">03/11/2025</td>
      </tr>
      <tr>
        <td style="border: 1px solid #cbd5e1; padding: 8px; text-align: center;">3</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px;">Chuẩn bị môi trường UAT Staging có dữ liệu mẫu</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px;">Đội DevOps (Anh Nam)</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px;">02/11/2025</td>
      </tr>
    </tbody>
  </table>

  <table style="width: 100%; margin-top: 36px; text-align: center;">
    <tr>
      <td style="width: 50%;">
        <strong>CHỦ TRÌ CUỘC HỌP</strong><br/>
        <em>(Ký xác nhận)</em><br/><br/><br/><br/>
        <strong>{{chu_tri}}</strong>
      </td>
      <td style="width: 50%;">
        <strong>THƯ KÝ CUỘC HỌP</strong><br/>
        <em>(Ký xác nhận)</em><br/><br/><br/><br/>
        <strong>{{thu_ky}}</strong>
      </td>
    </tr>
  </table>
</div>
    `,
    createdAt: '2025-02-10T10:00:00Z',
    updatedAt: '2025-10-25T11:45:00Z'
  },
  {
    id: 'doc-04-bao-cao-tien-do-du-an',
    title: 'Báo cáo tiến độ dự án định kỳ',
    category: 'Báo cáo',
    description: 'Mẫu báo cáo tiến độ quản lý dự án tiêu chuẩn dành cho Project Manager (PM), bao gồm tiến độ các mốc Milestone, chỉ số KPI, rủi ro và kiến nghị.',
    thumbnailUrl: '/thumbnails/doc-bao-cao.svg',
    filePath: 'templates/documents/bao-cao-tien-do-du-an.docx',
    fileFormat: 'docx',
    tags: ['Báo cáo', 'Dự án', 'Tiến độ', 'KPI'],
    version: '2.0.0',
    author: 'Project Management Office (PMO)',
    downloadsCount: 1620,
    fields: [
      { key: 'ten_du_an', label: 'Tên dự án', defaultValue: 'Dự án Xây dựng Nền tảng Thư viện Số OmniDoc', type: 'text' },
      { key: 'ky_bao_cao', label: 'Kỳ báo cáo', defaultValue: 'Tuần 4 - Tháng 10/2025', type: 'text' },
      { key: 'quan_ly_du_an', label: 'Quản lý dự án (PM)', defaultValue: 'Đoàn Nhật Minh', type: 'text' },
      { key: 'ty_le_hoan_thanh', label: 'Tỷ lệ hoàn thành tổng thể', defaultValue: '78.5%', type: 'text' },
      { key: 'tinh_trang_suc_khoe', label: 'Tình trạng sức khỏe dự án', defaultValue: 'Xanh (On-track theo đúng tiến độ)', type: 'text' }
    ],
    contentHtml: `
<div style="font-family: 'Times New Roman', serif; line-height: 1.6; max-width: 800px; margin: 0 auto; color: #111;">
  <div style="border-bottom: 2px solid #2563eb; padding-bottom: 12px; margin-bottom: 20px;">
    <h2 style="margin: 0; font-size: 17pt; color: #1e3a8a; text-transform: uppercase;">BÁO CÁO TIẾN ĐỘ DỰ ÁN ĐỊNH KỲ</h2>
    <p style="margin: 4px 0 0; font-size: 12pt; color: #475569;">Dự án: <strong>{{ten_du_an}}</strong> | Kỳ báo cáo: <strong>{{ky_bao_cao}}</strong></p>
  </div>

  <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
    <tr><td style="width: 30%; padding: 4px 0;"><strong>Quản lý dự án (PM):</strong></td><td>{{quan_ly_du_an}}</td></tr>
    <tr><td style="padding: 4px 0;"><strong>Tiến độ hoàn thành:</strong></td><td><strong style="color: #16a34a; font-size: 13pt;">{{ty_le_hoan_thanh}}</strong></td></tr>
    <tr><td style="padding: 4px 0;"><strong>Trạng thái sức khỏe:</strong></td><td><strong>{{tinh_trang_suc_khoe}}</strong></td></tr>
  </table>

  <h4 style="font-size: 12pt; font-weight: bold; color: #1e3a8a; margin-top: 20px;">1. KẾT QUẢ ĐẠT ĐƯỢC TRONG KỲ:</h4>
  <ul>
    <li>Hoàn tất giao diện Thư viện Mẫu Văn bản và Trình chiếu theo chuẩn Responsive.</li>
    <li>Tích hợp thành công trình soạn thảo WYSIWYG có khả năng điền tự động dữ liệu biến mẫu.</li>
    <li>Thiết lập bộ xuất file tài liệu DOCX và PPTX tiêu chuẩn tương thích Office 365.</li>
  </ul>

  <h4 style="font-size: 12pt; font-weight: bold; color: #1e3a8a; margin-top: 20px;">2. QUẢN LÝ RỦI RO VÀ GIẢI PHÁP:</h4>
  <p>- Rủi ro: Dung lượng file PPTX lớn khi nhúng nhiều hình ảnh slide phân giải cao.<br/>
  - Giải pháp khắc phục: Bổ sung thuật toán nén ảnh client-side trước khi đóng gói tệp tin trình chiếu.</p>

  <h4 style="font-size: 12pt; font-weight: bold; color: #1e3a8a; margin-top: 20px;">3. KẾ HOẠCH CHO KỲ TIẾP THEO:</h4>
  <ul>
    <li>Tiến hành kiểm thử hiệu năng chịu tải API đồng thời (Load testing).</li>
    <li>Triển khai cơ chế phân quyền bảo mật nhiều cấp cho người dùng tổ chức.</li>
  </ul>

  <div style="margin-top: 40px; text-align: right;">
    <p style="margin: 0;"><em>Hà Nội, ngày 28 tháng 10 năm 2025</em></p>
    <p style="margin: 4px 0 0;"><strong>QUẢN LÝ DỰ ÁN</strong></p>
    <br/><br/><br/>
    <p style="margin: 0; font-weight: bold;">{{quan_ly_du_an}}</p>
  </div>
</div>
    `,
    createdAt: '2025-03-01T10:00:00Z',
    updatedAt: '2025-10-28T16:00:00Z'
  },
  {
    id: 'doc-05-thu-moi-nhan-viec',
    title: 'Thư mời nhận việc (Offer Letter)',
    category: 'Tuyển dụng',
    description: 'Thư mời làm việc trang trọng gửi ứng viên trúng tuyển, thông báo vị trí tuyển dụng, thu nhập, chế độ phúc lợi và hướng dẫn ngày đầu tiên nhận việc.',
    thumbnailUrl: '/thumbnails/doc-offer-letter.svg',
    filePath: 'templates/documents/thu-moi-nhan-viec.docx',
    fileFormat: 'docx',
    tags: ['Tuyển dụng', 'Nhân sự', 'Offer Letter', 'Chào đón'],
    version: '1.2.0',
    author: 'Phòng Tuyển dụng Talent Acquisition',
    downloadsCount: 1190,
    fields: [
      { key: 'ho_ten_ung_vien', label: 'Họ tên Ứng viên', defaultValue: 'Đặng Mai Phương', type: 'text' },
      { key: 'vi_tri_tuyen_dung', label: 'Vị trí công việc', defaultValue: 'Chuyên viên Thiết kế Trải nghiệm Sản phẩm (Product Designer)', type: 'text' },
      { key: 'ngay_nhan_viec', label: 'Ngày bắt đầu đi làm', defaultValue: '15/11/2025', type: 'date' },
      { key: 'muc_luong_gross', label: 'Mức lương cơ bản (Gross/tháng)', defaultValue: '28,000,000 VNĐ', type: 'text' },
      { key: 'dia_diem_lam_viec', label: 'Địa điểm làm việc', defaultValue: 'Trụ sở OmniDoc, Cầu Giấy, Hà Nội', type: 'text' },
      { key: 'nguoi_lien_he_hr', label: 'Cán bộ HR hỗ trợ', defaultValue: 'Chị Mai Linh - Tel: 0988.123.456', type: 'text' }
    ],
    contentHtml: `
<div style="font-family: 'Times New Roman', serif; line-height: 1.6; max-width: 780px; margin: 0 auto; color: #111;">
  <div style="text-align: center; margin-bottom: 24px;">
    <h2 style="color: #1e3a8a; margin: 0; font-size: 17pt; text-transform: uppercase;">THƯ MỜI NHẬN VIỆC (JOB OFFER LETTER)</h2>
    <p style="font-style: italic; color: #64748b; margin: 4px 0 0;">Chào mừng bạn gia nhập đại gia đình OmniDoc</p>
  </div>

  <p>Thân gửi bạn: <strong>{{ho_ten_ung_vien}}</strong>,</p>

  <p>Thay mặt Công ty, chúng tôi xin chúc mừng bạn đã vượt qua các vòng phỏng vấn xuất sắc. Chúng tôi rất vinh dự gửi đến bạn thư mời nhận việc chính thức với các thông tin chi tiết như sau:</p>

  <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px; margin: 16px 0;">
    <table style="width: 100%; border-collapse: collapse;">
      <tr><td style="width: 35%; padding: 6px 0;"><strong>Vị trí đảm nhiệm:</strong></td><td><strong>{{vi_tri_tuyen_dung}}</strong></td></tr>
      <tr><td style="padding: 6px 0;"><strong>Bộ phận:</strong></td><td>Phòng Phát triển Trải nghiệm Người dùng (Product Design)</td></tr>
      <tr><td style="padding: 6px 0;"><strong>Ngày bắt đầu công tác:</strong></td><td><strong style="color: #2563eb;">{{ngay_nhan_viec}}</strong></td></tr>
      <tr><td style="padding: 6px 0;"><strong>Mức lương hàng tháng:</strong></td><td><strong style="color: #16a34a; font-size: 12pt;">{{muc_luong_gross}}</strong></td></tr>
      <tr><td style="padding: 6px 0;"><strong>Địa điểm làm việc:</strong></td><td>{{dia_diem_lam_viec}}</td></tr>
    </table>
  </div>

  <p><strong>Chính sách đãi ngộ và phúc lợi:</strong></p>
  <ul>
    <li>Thưởng hiệu quả công việc tháng lương 13 + thưởng hoàn thành dự án hàng năm.</li>
    <li>Gói bảo hiểm sức khỏe chăm sóc cao cấp toàn diện (OmniCare).</li>
    <li>15 ngày phép năm có hưởng nguyên lương và chế độ làm việc Hybrid linh hoạt.</li>
  </ul>

  <p>Nếu bạn đồng ý với lời mời này, vui lòng ký phản hồi trước 17h00 ngày 05/11/2025. Mọi thắc mắc xin liên hệ trực tiếp: <strong>{{nguoi_lien_he_hr}}</strong>.</p>

  <table style="width: 100%; margin-top: 36px; text-align: center;">
    <tr>
      <td style="width: 50%;">
        <strong>ĐẠI DIỆN CÔNG TY</strong><br/>
        <em>Giám đốc Nhân sự</em><br/><br/><br/><br/>
        <strong>Lê Hoàng Yến</strong>
      </td>
      <td style="width: 50%;">
        <strong>XÁC NHẬN CỦA ỨNG VIÊN</strong><br/>
        <em>Tôi đồng ý tiếp nhận công việc này</em><br/><br/><br/><br/>
        <strong>{{ho_ten_ung_vien}}</strong>
      </td>
    </tr>
  </table>
</div>
    `,
    createdAt: '2025-03-10T11:00:00Z',
    updatedAt: '2025-10-15T09:30:00Z'
  },
  {
    id: 'doc-06-hop-dong-dich-vu-cntt',
    title: 'Hợp đồng cung cấp dịch vụ công nghệ thông tin',
    category: 'Kinh doanh',
    description: 'Mẫu hợp đồng kinh tế dịch vụ phần mềm B2B hoàn chỉnh, gồm các điều khoản về phạm vi triển khai, mốc bàn giao nghiệm thu, thanh toán và bảo hành.',
    thumbnailUrl: '/thumbnails/doc-hop-dong-cntt.svg',
    filePath: 'templates/documents/hop-dong-dich-vu-cntt.docx',
    fileFormat: 'docx',
    tags: ['Kinh doanh', 'Hợp đồng', 'Công nghệ', 'B2B'],
    version: '2.1.0',
    author: 'Ban Pháp chế & Kinh doanh',
    downloadsCount: 940,
    fields: [
      { key: 'ten_khach_hang', label: 'Tên Đơn vị Khách hàng (Bên B)', defaultValue: 'CÔNG TY TNHH GIẢI PHÁP BÁN LẺ VIỆT', type: 'text' },
      { key: 'dai_dien_khach_hang', label: 'Đại diện Khách hàng (Họ tên - Chức vụ)', defaultValue: 'Bà Hoàng Thị Mỹ Lan - Giám đốc Điều hành', type: 'text' },
      { key: 'pham_vi_dich_vu', label: 'Phạm vi cung cấp dịch vụ', defaultValue: 'Thiết kế, xây dựng và tích hợp Hệ thống Thư viện Văn phòng Số', type: 'text' },
      { key: 'gia_tri_hop_dong', label: 'Tổng giá trị hợp đồng (Chưa VAT)', defaultValue: '250,000,000 VNĐ', type: 'text' },
      { key: 'thoi_gian_trien_khai', label: 'Thời gian thực hiện', defaultValue: '60 ngày làm việc kể từ ngày ký', type: 'text' }
    ],
    contentHtml: `
<div style="font-family: 'Times New Roman', serif; line-height: 1.6; max-width: 800px; margin: 0 auto; color: #111;">
  <div style="text-align: center; margin-bottom: 20px;">
    <h3 style="margin: 0; font-size: 13pt; font-weight: bold; text-transform: uppercase;">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h3>
    <p style="margin: 4px 0 0; font-size: 12pt; font-weight: bold;">Độc lập - Tự do - Hạnh phúc</p>
    <div style="width: 140px; height: 1px; background: #000; margin: 6px auto 16px;"></div>
    <h2 style="margin: 16px 0 4px; font-size: 16pt; font-weight: bold; text-transform: uppercase; color: #1e3a8a;">HỢP ĐỒNG CUNG CẤP DỊCH VỤ CÔNG NGHỆ</h2>
    <p style="margin: 0; font-style: italic;">Số: 2025/HĐDV-TECH</p>
  </div>

  <p>Hôm nay, ngày ký hợp đồng, các bên gồm có:</p>
  <p><strong>BÊN CUNG CẤP DỊCH VỤ (BÊN A): CÔNG TY CỔ PHẦN CÔNG NGHỆ OMNIDOC</strong><br/>
  Địa chỉ: Tòa nhà Innovation, Cầu Giấy, Hà Nội.<br/>
  Đại diện: Ông Nguyễn Văn An - Tổng Giám đốc.</p>

  <p><strong>BÊN SỬ DỤNG DỊCH VỤ (BÊN B): {{ten_khach_hang}}</strong><br/>
  Đại diện: {{dai_dien_khach_hang}}</p>

  <h4 style="font-size: 12pt; font-weight: bold; margin-top: 16px; border-bottom: 1px solid #ccc; padding-bottom: 4px;">ĐIỀU 1: PHẠM VI DỊCH VỤ VÀ THỜI GIAN</h4>
  <p>Bên A đồng ý cung ứng cho Bên B dịch vụ: <strong>{{pham_vi_dich_vu}}</strong>.</p>
  <p>Thời gian triển khai thực hiện: <strong>{{thoi_gian_trien_khai}}</strong>.</p>

  <h4 style="font-size: 12pt; font-weight: bold; margin-top: 16px; border-bottom: 1px solid #ccc; padding-bottom: 4px;">ĐIỀU 2: GIÁ TRỊ VÀ PHƯƠNG THỨC THANH TOÁN</h4>
  <p>Tổng giá trị hợp đồng: <strong>{{gia_tri_hop_dong}}</strong> (Hai trăm năm mươi triệu đồng chẵn).</p>
  <p>Phương thức thanh toán chia làm 02 đợt qua chuyển khoản ngân hàng:</p>
  <ul>
    <li>Đợt 1: Tạm ứng 40% giá trị hợp đồng ngay sau khi ký kết.</li>
    <li>Đợt 2: Thanh toán 60% còn lại trong vòng 07 ngày sau khi ký biên bản nghiệm thu bàn giao hệ thống.</li>
  </ul>

  <table style="width: 100%; margin-top: 40px; text-align: center;">
    <tr>
      <td style="width: 50%;">
        <strong>ĐẠI DIỆN BÊN A</strong><br/>
        <em>(Ký, đóng dấu)</em><br/><br/><br/><br/>
        <strong>Nguyễn Văn An</strong>
      </td>
      <td style="width: 50%;">
        <strong>ĐẠI DIỆN BÊN B</strong><br/>
        <em>(Ký, đóng dấu)</em><br/><br/><br/><br/>
        <strong>{{dai_dien_khach_hang}}</strong>
      </td>
    </tr>
  </table>
</div>
    `,
    createdAt: '2025-04-01T08:00:00Z',
    updatedAt: '2025-10-20T14:00:00Z'
  }
];

export const initialPresentationTemplates: PresentationTemplate[] = [
  {
    id: 'pres-01-startup-pitch-deck',
    title: 'Startup Pitch Deck - Gọi vốn nhà đầu tư',
    category: 'Khởi nghiệp',
    description: 'Bộ slide thuyết trình chuẩn quốc tế 5 slide dành cho startup gọi vốn vòng hạt giống (Seed / Series A), tối ưu hóa cấu trúc Problem-Solution-Market-Traction-Financials.',
    thumbnailUrl: '/thumbnails/pres-pitch-deck.svg',
    filePath: 'templates/presentations/startup-pitch-deck.pptx',
    fileFormat: 'pptx',
    tags: ['Pitch Deck', 'Khởi nghiệp', 'Gọi vốn', 'Nhà đầu tư', 'Chiến lược'],
    slidesCount: 5,
    theme: {
      name: 'Venture Indigo',
      primaryColor: '#2563eb',
      secondaryColor: '#1e40af',
      accentColor: '#f59e0b',
      backgroundColor: '#ffffff',
      textColor: '#0f172a',
      fontHeading: 'Plus Jakarta Sans',
      fontBody: 'Plus Jakarta Sans'
    },
    slides: [
      {
        id: 'slide-101',
        slideNumber: 1,
        title: 'NỀN TẢNG THƯ VIỆN SỐ OMNIDOC',
        subtitle: 'Giải pháp tự động hóa tài liệu & trình chiếu thế hệ mới cho doanh nghiệp hiện đại',
        layout: 'title',
        elements: [
          { id: 'el-1', type: 'heading', content: 'NỀN TẢNG THƯ VIỆN SỐ OMNIDOC' },
          { id: 'el-2', type: 'subtitle', content: 'Thuyết trình Gọi vốn Đầu tư Vòng Hạt Giống (Seed Round - $500,000)' },
          { id: 'el-3', type: 'paragraph', content: 'Diễn giả: Nguyễn Văn An - Sáng lập viên & CEO | Tháng 11/2025' }
        ],
        background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)'
      },
      {
        id: 'slide-102',
        slideNumber: 2,
        title: 'VẤN ĐỀ CỦA THỊ TRƯỜNG & CƠ HỘI',
        subtitle: 'Doanh nghiệp đang lãng phí hàng ngàn giờ lao động cho các biểu mẫu thủ công rời rạc',
        layout: 'content-bullets',
        elements: [
          {
            id: 'el-4',
            type: 'bullets',
            content: [
              'Hơn 73% nhân viên văn phòng mất từ 30-45 phút để tìm kiếm và định dạng lại tài liệu mẫu cũ.',
              'Nguy cơ sai sót pháp lý nghiêm trọng do các phiên bản hợp đồng không đồng nhất trên ổ đĩa cá nhân.',
              'Các giải pháp hiện nay hoặc quá cồng kềnh (ERP phức tạp) hoặc thiếu tính năng tùy biến nội dung sâu.',
              'Nhu cầu cấp thiết về một thư viện trung tâm: chuẩn hóa, an toàn dữ liệu và tạo mới tức thì.'
            ]
          }
        ]
      },
      {
        id: 'slide-103',
        slideNumber: 3,
        title: 'GIẢI PHÁP ĐỘT PHÁ CỦA CHÚNG TÔI',
        subtitle: 'Kho tài nguyên thông minh + Trình chỉnh sửa văn bản & slide tích hợp 100%',
        layout: 'two-columns',
        elements: [
          {
            id: 'el-5',
            type: 'paragraph',
            content: 'OmniDoc biến các mẫu tài liệu tĩnh thành các bản ghi thông minh có thể điền trường dữ liệu tức thì, xem trước trực quan và tải xuống định dạng chuẩn Microsoft Office.'
          },
          {
            id: 'el-6',
            type: 'bullets',
            content: [
              'Thư viện hơn 500+ mẫu hợp đồng & bộ slide được chuyên gia thẩm định.',
              'Trình soạn thảo trực quan hỗ trợ xuất định dạng .DOCX và .PPTX tương thích tuyệt đối.',
              'Cơ chế bảo vệ file gốc (Zero-Destructive Copy) an toàn và độc lập hoàn toàn.'
            ]
          }
        ]
      },
      {
        id: 'slide-104',
        slideNumber: 4,
        title: 'CHỈ SỐ TĂNG TRƯỞNG & DỰ THU',
        subtitle: 'Tăng trưởng vượt bậc với mô hình SaaS B2B có tỷ lệ giữ chân khách hàng cao',
        layout: 'stats-kpi',
        elements: [
          {
            id: 'el-7',
            type: 'kpis',
            content: [
              { label: 'Doanh thu định kỳ (ARR)', value: '$1.2M', desc: '+185% so với năm trước' },
              { label: 'Khách hàng Doanh nghiệp', value: '450+', desc: 'Bao gồm top 50 công ty Fintech' },
              { label: 'Tỷ lệ duy trì hàng tháng', value: '96.4%', desc: 'Net Revenue Retention: 124%' },
              { label: 'Tài liệu khởi tạo mỗi ngày', value: '25,000+', desc: 'Tiết kiệm 85,000 giờ làm việc' }
            ]
          }
        ]
      },
      {
        id: 'slide-105',
        slideNumber: 5,
        title: 'MỤC TIÊU SỬ DỤNG VỐN & LỜI KÊU GỌI',
        subtitle: 'Tìm kiếm vòng đầu tư $500,000 để mở rộng quy mô sản phẩm và chiếm lĩnh thị trường Đông Nam Á',
        layout: 'content-bullets',
        elements: [
          {
            id: 'el-8',
            type: 'bullets',
            content: [
              '50% R&D: Tích hợp trợ lý trí tuệ nhân tạo AI gợi ý điều khoản hợp đồng thông minh.',
              '30% Go-to-Market: Mở rộng đội ngũ bán hàng Doanh nghiệp tại TP.HCM và Singapore.',
              '20% Vận hành & Bảo mật: Đạt chứng chỉ bảo mật quốc tế SOC2 Type II và ISO 27001.',
              'Liên hệ đầu tư: an.nguyen@omnidoc.io | Hotline: (+84) 912 345 678'
            ]
          }
        ]
      }
    ],
    createdAt: '2025-01-20T10:00:00Z',
    updatedAt: '2025-10-18T15:20:00Z'
  },
  {
    id: 'pres-02-bao-cao-kinh-doanh-quy',
    title: 'Báo cáo kết quả kinh doanh quý (Business Review)',
    category: 'Kinh doanh',
    description: 'Bộ slide báo cáo điều hành chuyên nghiệp dành cho cuộc họp HĐQT và Ban Giám đốc, phân tích doanh thu, chi phí, chỉ số tăng trưởng và mục tiêu chiến lược.',
    thumbnailUrl: '/thumbnails/pres-business-review.svg',
    filePath: 'templates/presentations/bao-cao-kinh-doanh-quy.pptx',
    fileFormat: 'pptx',
    tags: ['Kinh doanh', 'Báo cáo', 'Tài chính', 'HĐQT', 'KPI'],
    slidesCount: 5,
    theme: {
      name: 'Corporate Emerald',
      primaryColor: '#059669',
      secondaryColor: '#047857',
      accentColor: '#10b981',
      backgroundColor: '#ffffff',
      textColor: '#0f172a',
      fontHeading: 'Plus Jakarta Sans',
      fontBody: 'Plus Jakarta Sans'
    },
    slides: [
      {
        id: 'slide-201',
        slideNumber: 1,
        title: 'BÁO CÁO KẾT QUẢ KINH DOANH QUÝ 3 / 2025',
        subtitle: 'Đánh giá hoạt động kinh doanh toàn diện và định hướng chiến lược tăng tốc quý 4',
        layout: 'title',
        elements: [
          { id: 'el-21', type: 'heading', content: 'BÁO CÁO KẾT QUẢ KINH DOANH QUÝ 3 / 2025' },
          { id: 'el-22', type: 'subtitle', content: 'Ban Giám đốc Điều hành | Báo cáo Hội đồng Quản trị' },
          { id: 'el-23', type: 'paragraph', content: 'Thời gian: Tháng 10/2025 | Bảo mật nội bộ cấp 1' }
        ],
        background: 'linear-gradient(135deg, #064e3b 0%, #059669 100%)'
      },
      {
        id: 'slide-202',
        slideNumber: 2,
        title: 'TỔNG QUAN HOẠT ĐỘNG ĐIỀU HÀNH',
        subtitle: 'Vượt chỉ tiêu kế hoạch quý trên cả 3 trụ cột doanh thu, lợi nhuận và mở rộng tệp khách hàng',
        layout: 'content-bullets',
        elements: [
          {
            id: 'el-24',
            type: 'bullets',
            content: [
              'Doanh thu thuần hợp nhất đạt 115% kế hoạch đề ra đầu quý.',
              'Biên lợi nhuận gộp cải thiện 4.2% nhờ tối ưu chi phí hạ tầng điện toán đám mây.',
              'Mở rộng thành công 35 tài khoản khách hàng doanh nghiệp thuộc nhóm Top 500 VNR.',
              'Hoàn thiện hệ sinh thái mẫu biểu điện tử và hệ thống chữ ký số tích hợp.'
            ]
          }
        ]
      },
      {
        id: 'slide-203',
        slideNumber: 3,
        title: 'CÁC CHỈ SỐ TÀI CHÍNH THEN CHỐT',
        subtitle: 'Tăng trưởng tài chính lành mạnh và dòng tiền hoạt động dương liên tục 4 quý',
        layout: 'stats-kpi',
        elements: [
          {
            id: 'el-25',
            type: 'kpis',
            content: [
              { label: 'Tổng doanh thu quý 3', value: '48.5 Tỷ VNĐ', desc: '+22.4% so với cùng kỳ' },
              { label: 'Lợi nhuận trước thuế', value: '12.8 Tỷ VNĐ', desc: 'Đạt 118% kế hoạch quý' },
              { label: 'Chi phí bán hàng (CAC)', value: '3.2 Triệu VNĐ', desc: 'Giảm 14% nhờ Inbound Marketing' },
              { label: 'Giá trị vòng đời (LTV)', value: '68 Triệu VNĐ', desc: 'Tỷ lệ LTV/CAC đạt mức 21x' }
            ]
          }
        ]
      },
      {
        id: 'slide-204',
        slideNumber: 4,
        title: 'PHÂN TÍCH THỊ PHẦN THEO KHU VỰC',
        subtitle: 'Thị trường miền Bắc và miền Nam đóng góp chủ lực, thị trường miền Trung bứt phá mạnh mẽ',
        layout: 'two-columns',
        elements: [
          {
            id: 'el-26',
            type: 'paragraph',
            content: 'Thị trường Hà Nội và TP.HCM tiếp tục giữ vững vị thế đầu tàu với hơn 75% tỷ trọng doanh thu. Đáng chú ý, phân khúc doanh nghiệp vừa và nhỏ (SME) tại Đà Nẵng và Hải Phòng ghi nhận mức độ áp dụng giải pháp số hóa tài liệu tăng gấp đôi.'
          },
          {
            id: 'el-27',
            type: 'bullets',
            content: [
              'Hà Nội: 45% tổng doanh số (Đội ngũ Bán hàng Doanh nghiệp lớn).',
              'TP. Hồ Chí Minh: 38% tổng doanh số (Tập trung nhóm ngành Bán lẻ & Tài chính).',
              'Các tỉnh thành khác: 17% tổng doanh số và duy trì đà tăng trưởng 3 chữ số.'
            ]
          }
        ]
      },
      {
        id: 'slide-205',
        slideNumber: 5,
        title: 'MỤC TIÊU CHIẾN LƯỢC QUÝ 4 / 2025',
        subtitle: 'Tập trung cán đích doanh thu năm và chuẩn bị nền tảng bứt phá cho năm tài chính 2026',
        layout: 'content-bullets',
        elements: [
          {
            id: 'el-28',
            type: 'bullets',
            content: [
              'Cán mốc 60 Tỷ VNĐ doanh thu quý 4 để hoàn thành 100% mục tiêu cả năm.',
              'Ra mắt tính năng tạo mẫu slide tự động bằng AI và đồng bộ dữ liệu thời gian thực.',
              'Tổ chức Hội nghị Khách hàng Thường niên tri ân hơn 500 đối tác chiến lược.',
              'Hoàn tất thẩm định kế hoạch ngân sách và chỉ tiêu kinh doanh cho năm tài chính 2026.'
            ]
          }
        ]
      }
    ],
    createdAt: '2025-02-15T09:00:00Z',
    updatedAt: '2025-10-22T17:15:00Z'
  },
  {
    id: 'pres-03-ke-hoach-ra-mat-san-pham',
    title: 'Kế hoạch ra mắt sản phẩm mới (Product Launch)',
    category: 'Marketing',
    description: 'Chiến lược Go-to-Market toàn diện cho đợt ra mắt sản phẩm công nghệ mới, xác định định vị, chân dung khách hàng, kế hoạch truyền thông đa kênh và lộ trình thực thi.',
    thumbnailUrl: '/thumbnails/pres-product-launch.svg',
    filePath: 'templates/presentations/ke-hoach-ra-mat-san-pham.pptx',
    fileFormat: 'pptx',
    tags: ['Marketing', 'Sản phẩm', 'GTM', 'Chiến dịch', 'Launch'],
    slidesCount: 5,
    theme: {
      name: 'Modern Crimson',
      primaryColor: '#c43e1c',
      secondaryColor: '#9a3412',
      accentColor: '#ea580c',
      backgroundColor: '#ffffff',
      textColor: '#0f172a',
      fontHeading: 'Plus Jakarta Sans',
      fontBody: 'Plus Jakarta Sans'
    },
    slides: [
      {
        id: 'slide-301',
        slideNumber: 1,
        title: 'KẾ HOẠCH RA MẮT SẢN PHẨM MỚI: OMNI STUDIO 2.0',
        subtitle: 'Chiến dịch truyền thông & Lộ trình Go-to-Market Quý 4/2025',
        layout: 'title',
        elements: [
          { id: 'el-31', type: 'heading', content: 'KẾ HOẠCH RA MẮT SẢN PHẨM MỚI: OMNI STUDIO 2.0' },
          { id: 'el-32', type: 'subtitle', content: 'Định nghĩa lại trải nghiệm làm việc với tài liệu & bài thuyết trình chuyên nghiệp' },
          { id: 'el-33', type: 'paragraph', content: 'Bộ phận Marketing & Quản trị Sản phẩm | Tháng 11/2025' }
        ],
        background: 'linear-gradient(135deg, #7c2d12 0%, #c43e1c 100%)'
      },
      {
        id: 'slide-302',
        slideNumber: 2,
        title: 'TẦM NHÌN SẢN PHẨM & ĐỊNH VỊ',
        subtitle: 'Cung cấp giải pháp văn phòng tất-cả-trong-một với tốc độ phản hồi tính bằng mili-giây',
        layout: 'two-columns',
        elements: [
          {
            id: 'el-34',
            type: 'paragraph',
            content: 'Omni Studio 2.0 không chỉ là kho mẫu tĩnh. Đây là không gian làm việc số nơi người dùng có thể tìm mẫu chuẩn xác trong 3 giây, điền biến thông minh chỉ với 1 cú click và xuất bản tài liệu ngay lập tức với định dạng chuẩn Microsoft Office.'
          },
          {
            id: 'el-35',
            type: 'bullets',
            content: [
              'Tốc độ tải siêu nhanh dưới 1.2 giây.',
              'Giao diện trực quan chuẩn thiết kế hiện đại.',
              'Bảo vệ dữ liệu tuyệt đối với cơ chế cách ly bản sao.'
            ]
          }
        ]
      },
      {
        id: 'slide-303',
        slideNumber: 3,
        title: 'CHÂN DUNG KHÁCH HÀNG MỤC TIÊU',
        subtitle: 'Tập trung vào 3 nhóm đối tượng mang lại giá trị sử dụng cao nhất',
        layout: 'content-bullets',
        elements: [
          {
            id: 'el-36',
            type: 'bullets',
            content: [
              'Nhóm 1 - Khối Doanh nghiệp vừa và nhỏ (SMEs): Tiết kiệm chi phí thuê luật sư hay đội thiết kế slide riêng.',
              'Nhóm 2 - Quản lý Dự án & Kỹ sư Công nghệ (PMs/Tech Leads): Soạn thảo biên bản, báo cáo tiến độ theo chuẩn chuyên nghiệp.',
              'Nhóm 3 - Chuyên viên Tuyển dụng & Hành chính Nhân sự (HR): Quản lý kho hợp đồng lao động và thư mời việc đồng bộ.'
            ]
          }
        ]
      },
      {
        id: 'slide-304',
        slideNumber: 4,
        title: 'CÁC MỐC THỜI GIAN TRIỂN KHAI (TIMELINE)',
        subtitle: 'Lộ trình 4 tuần chuẩn bị cho sự kiện Launching bùng nổ trên truyền thông',
        layout: 'content-bullets',
        elements: [
          {
            id: 'el-37',
            type: 'bullets',
            content: [
              'Tuần 1 (01/11 - 07/11): Thử nghiệm Private Beta với 100 doanh nghiệp thân thiết.',
              'Tuần 2 (08/11 - 14/11): Hoàn tất tối ưu hạ tầng, mở cổng đăng ký Early Bird nhận ưu đãi 40%.',
              'Tuần 3 (15/11): Họp báo công bố chính thức và Livestream Demo sản phẩm trên các nền tảng mạng xã hội.',
              'Tuần 4 (22/11 trở đi): Chạy chiến dịch Performance Marketing và chuỗi Webinar đào tạo sử dụng.'
            ]
          }
        ]
      },
      {
        id: 'slide-305',
        slideNumber: 5,
        title: 'CHỈ SỐ THÀNH CÔNG DỰ KIẾN (KPI LAUNCH)',
        subtitle: 'Đặt mục tiêu tiếp cận hơn 100,000 lượt tải và tạo mới tài liệu trong 30 ngày đầu',
        layout: 'stats-kpi',
        elements: [
          {
            id: 'el-38',
            type: 'kpis',
            content: [
              { label: 'Tài khoản đăng ký mới', value: '25,000+', desc: 'Trong 30 ngày đầu ra mắt' },
              { label: 'Tỷ lệ kích hoạt tài liệu', value: '68%', desc: 'Tạo ít nhất 1 tài liệu sau khi đăng ký' },
              { label: 'Điểm đánh giá trải nghiệm (NPS)', value: '82/100', desc: 'Mức hài lòng xuất sắc' },
              { label: 'Doanh thu đợt mở bán sớm', value: '2.5 Tỷ VNĐ', desc: 'Gói thành viên Doanh nghiệp 1 năm' }
            ]
          }
        ]
      }
    ],
    createdAt: '2025-03-05T08:30:00Z',
    updatedAt: '2025-10-24T14:10:00Z'
  },
  {
    id: 'pres-04-ho-so-nang-luc-cong-ty',
    title: 'Company Profile - Hồ sơ năng lực doanh nghiệp',
    category: 'Doanh nghiệp',
    description: 'Mẫu thuyết trình giới thiệu tổng quan về năng lực, đội ngũ lãnh đạo, dịch vụ trọng tâm và danh sách dự án tiêu biểu gửi tới khách hàng và đối tác.',
    thumbnailUrl: '/thumbnails/pres-company-profile.svg',
    filePath: 'templates/presentations/ho-so-nang-luc-cong-ty.pptx',
    fileFormat: 'pptx',
    tags: ['Hồ sơ năng lực', 'Doanh nghiệp', 'Giới thiệu', 'Đối tác', 'B2B'],
    slidesCount: 4,
    theme: {
      name: 'Royal Purple',
      primaryColor: '#7c3aed',
      secondaryColor: '#6d28d9',
      accentColor: '#a855f7',
      backgroundColor: '#ffffff',
      textColor: '#0f172a',
      fontHeading: 'Plus Jakarta Sans',
      fontBody: 'Plus Jakarta Sans'
    },
    slides: [
      {
        id: 'slide-401',
        slideNumber: 1,
        title: 'HỒ SƠ NĂNG LỰC DOANH NGHIỆP',
        subtitle: 'Kiến tạo giải pháp công nghệ văn phòng số dẫn đầu kỷ nguyên mới',
        layout: 'title',
        elements: [
          { id: 'el-41', type: 'heading', content: 'HỒ SƠ NĂNG LỰC DOANH NGHIỆP' },
          { id: 'el-42', type: 'subtitle', content: 'Công ty Cổ phần Công nghệ OmniDoc Việt Nam' },
          { id: 'el-43', type: 'paragraph', content: 'Khát vọng Việt - Vươn tầm Quốc tế | Hồ sơ năm 2025' }
        ],
        background: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)'
      },
      {
        id: 'slide-402',
        slideNumber: 2,
        title: 'VỀ CHÚNG TÔI & TẦM NHÌN',
        subtitle: 'Hơn 8 năm kinh nghiệm đồng hành cùng chuyển đổi số của hàng trăm tổ chức',
        layout: 'two-columns',
        elements: [
          {
            id: 'el-44',
            type: 'paragraph',
            content: 'Được thành lập bởi đội ngũ kỹ sư hàng đầu có đam mê chuẩn hóa quy trình làm việc, OmniDoc đã phát triển từ một startup công nghệ thành đơn vị cung cấp giải pháp mẫu tài liệu văn phòng số tin cậy cho khối ngân hàng, viễn thông và tập đoàn sản xuất.'
          },
          {
            id: 'el-45',
            type: 'bullets',
            content: [
              'Sứ mệnh: Xóa bỏ rào cản hành chính thủ công, giải phóng sáng tạo cho người lao động.',
              'Tầm nhìn: Trở thành nền tảng quản trị tài liệu văn phòng số số 1 Việt Nam trước năm 2028.',
              'Giá trị cốt lõi: Đổi mới sáng tạo - An toàn dữ liệu - Trải nghiệm khách hàng vượt trội.'
            ]
          }
        ]
      },
      {
        id: 'slide-403',
        slideNumber: 3,
        title: 'CÁC LĨNH VỰC NĂNG LỰC CỐT LÕI',
        subtitle: 'Hệ sinh thái sản phẩm và dịch vụ công nghệ toàn diện',
        layout: 'content-bullets',
        elements: [
          {
            id: 'el-46',
            type: 'bullets',
            content: [
              '1. Thư viện Tài liệu Số hóa Thông minh: Tự động hóa soạn thảo văn bản, hợp đồng, đơn từ với mẫu biểu chuẩn hóa.',
              '2. Công cụ Trình chiếu Slide Tương tác: Trực quan hóa dữ liệu kinh doanh thành bài thuyết trình ấn tượng.',
              '3. Tích hợp API Doanh nghiệp: Kết nối mượt mà vào hệ thống CRM, ERP, HRM nội bộ của doanh nghiệp.',
              '4. Dịch vụ Tư vấn Chuẩn hóa Quy trình: Đội ngũ chuyên gia pháp lý và thiết kế tùy biến riêng theo nhu cầu doanh nghiệp.'
            ]
          }
        ]
      },
      {
        id: 'slide-404',
        slideNumber: 4,
        title: 'THÀNH TỰU & KHÁCH HÀNG TIÊU BIỂU',
        subtitle: 'Minh chứng cho chất lượng dịch vụ và niềm tin của cộng đồng doanh nghiệp',
        layout: 'stats-kpi',
        elements: [
          {
            id: 'el-47',
            type: 'kpis',
            content: [
              { label: 'Doanh nghiệp tin dùng', value: '1,500+', desc: 'Trên toàn quốc' },
              { label: 'Tài liệu khởi tạo', value: '2.8 Triệu', desc: 'Bảo mật an toàn 100%' },
              { label: 'Độ hài lòng dịch vụ', value: '99.2%', desc: 'Đánh giá 5 sao từ đối tác' },
              { label: 'Giải thưởng Công nghệ', value: 'Top 10', desc: 'Sản phẩm Make in Vietnam' }
            ]
          }
        ]
      }
    ],
    createdAt: '2025-03-20T10:00:00Z',
    updatedAt: '2025-10-26T11:00:00Z'
  }
];

