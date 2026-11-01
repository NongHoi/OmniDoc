import React from 'react';
import { 
  X, 
  CheckCircle2, 
  Layers, 
  Server, 
  Database, 
  ShieldCheck, 
  Code2, 
  FileText, 
  Presentation,
  Cpu
} from '../icons/index.js';

interface ArchitectureGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureGuideModal: React.FC<ArchitectureGuideModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-modal-backdrop"
      onClick={onClose}
    >
      <div 
        className="relative bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden text-slate-700 dark:text-slate-300 animate-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Kiến Trúc Kỹ Thuật & Báo Cáo Sản Phẩm</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Tài liệu kiến trúc hệ thống OmniDoc Office Template Suite</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="group/close p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all active:scale-95"
            title="Đóng (Esc)"
          >
            <X className="w-5 h-5 group-hover/close:rotate-90 transition-transform duration-200" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-slate-700 dark:text-slate-300">
          
          {/* Tech Stack Pillars */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center">
              <Cpu className="w-4 h-4 mr-1.5 text-blue-500" /> Công nghệ sử dụng (Technology Stack)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              <div className="p-4 bg-slate-50 dark:bg-slate-950/60 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div className="font-bold text-slate-900 dark:text-white flex items-center text-xs">
                  <Code2 className="w-4 h-4 mr-1.5 text-blue-500" /> Frontend
                </div>
                <ul className="mt-2.5 space-y-1.5 text-[11px] text-slate-600 dark:text-slate-400">
                  <li>• React 18 + TypeScript</li>
                  <li>• Tailwind CSS v3 (Chủ đề Sáng & Tối)</li>
                  <li>• Lucide Icons</li>
                  <li>• Vite 6 (Ultra-fast build & HMR)</li>
                </ul>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-950/60 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div className="font-bold text-slate-900 dark:text-white flex items-center text-xs">
                  <Server className="w-4 h-4 mr-1.5 text-emerald-500" /> Backend
                </div>
                <ul className="mt-2.5 space-y-1.5 text-[11px] text-slate-600 dark:text-slate-400">
                  <li>• Node.js + Express REST API</li>
                  <li>• Zod Schema Validation</li>
                  <li>• Vitest Unit & Integration Test Suite</li>
                  <li>• Multer & Cors Support</li>
                </ul>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-950/60 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div className="font-bold text-slate-900 dark:text-white flex items-center text-xs">
                  <Database className="w-4 h-4 mr-1.5 text-purple-500" /> Lưu trữ & Xuất file
                </div>
                <ul className="mt-2.5 space-y-1.5 text-[11px] text-slate-600 dark:text-slate-400">
                  <li>• JSON Atomic Storage / Schema DB</li>
                  <li>• <strong>docx</strong> (Đóng gói Word .docx OpenXML)</li>
                  <li>• <strong>pptxgenjs</strong> (Đóng gói PowerPoint .pptx)</li>
                  <li>• Zero-dependency portability</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Zero-Destruction Mechanism */}
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl space-y-2">
            <h4 className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center text-xs">
              <ShieldCheck className="w-4 h-4 mr-1.5 text-emerald-600 dark:text-emerald-400" />
              Cơ chế Đảm bảo Không Thay đổi File Mẫu Gốc (Zero-Destructive Copy)
            </h4>
            <p className="text-[11px] text-emerald-900 dark:text-emerald-400/90 leading-relaxed">
              Khi người dùng chọn bất kỳ mẫu văn bản hoặc bài trình chiếu nào, hệ thống thực thi <strong>Deep-Copy Cloner</strong> để tạo một thực thể độc lập hoàn toàn trong cơ sở dữ liệu (`user_documents` / `user_presentations`) với một UUID riêng biệt. Toàn bộ thao tác chỉnh sửa, điền biến hoặc xóa sau đó chỉ tác động lên bản ghi độc lập của người dùng, đảm bảo 100% tệp mẫu gốc và dữ liệu template không bao giờ bị ghi đè.
            </p>
          </div>

          {/* Requirements Checklist */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">Bảng đối chiếu yêu cầu bài toán</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-[11px]">
              
              {/* Product 1 */}
              <div className="p-4 bg-slate-50 dark:bg-slate-950/60 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2.5">
                <div className="font-bold text-blue-600 dark:text-blue-400 flex items-center">
                  <FileText className="w-4 h-4 mr-1.5" /> Sản phẩm 1: Thư viện Mẫu Văn bản
                </div>
                <ul className="space-y-1.5 text-slate-700 dark:text-slate-300">
                  <li className="flex items-center text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 shrink-0" /> Danh sách mẫu dạng lưới / danh sách có thumbnail
                  </li>
                  <li className="flex items-center text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 shrink-0" /> Tìm kiếm & lọc theo danh mục chuẩn xác
                  </li>
                  <li className="flex items-center text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 shrink-0" /> Cửa sổ xem trước mẫu A4 chi tiết
                  </li>
                  <li className="flex items-center text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 shrink-0" /> Trình soạn thảo văn bản trực quan tích hợp
                  </li>
                  <li className="flex items-center text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 shrink-0" /> Xuất file Word (.DOCX), PDF in ấn, HTML, TXT
                  </li>
                  <li className="flex items-center text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 shrink-0" /> 6 mẫu văn bản thử nghiệm thực tế (Hợp đồng, Đơn từ...)
                  </li>
                </ul>
              </div>

              {/* Product 2 */}
              <div className="p-4 bg-slate-50 dark:bg-slate-950/60 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2.5">
                <div className="font-bold text-orange-600 dark:text-orange-400 flex items-center">
                  <Presentation className="w-4 h-4 mr-1.5" /> Sản phẩm 2: Thư viện Mẫu Trình chiếu
                </div>
                <ul className="space-y-1.5 text-slate-700 dark:text-slate-300">
                  <li className="flex items-center text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 shrink-0" /> Thumbnail 16:9 cho từng bộ template PowerPoint
                  </li>
                  <li className="flex items-center text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 shrink-0" /> Tìm kiếm & phân loại mẫu theo chủ đề
                  </li>
                  <li className="flex items-center text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 shrink-0" /> Xem trước toàn bộ bộ slide trong từng template
                  </li>
                  <li className="flex items-center text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 shrink-0" /> Trình chỉnh sửa slide trực quan + Chế độ Trình chiếu
                  </li>
                  <li className="flex items-center text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 shrink-0" /> Tải xuống file PowerPoint (.PPTX) tiêu chuẩn
                  </li>
                  <li className="flex items-center text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 shrink-0" /> 4 bộ template thử nghiệm (Pitch deck, Kinh doanh...)
                  </li>
                </ul>
              </div>

            </div>
          </div>

          {/* Third party libraries & licenses */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2.5">Thư viện bên thứ ba & Giấy phép</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[11px] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                <thead className="bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-300 font-bold">
                  <tr>
                    <th className="p-2.5 border-b border-slate-200 dark:border-slate-800">Thư viện</th>
                    <th className="p-2.5 border-b border-slate-200 dark:border-slate-800">Mục đích</th>
                    <th className="p-2.5 border-b border-slate-200 dark:border-slate-800">Giấy phép (License)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800/80">
                  <tr>
                    <td className="p-2.5 font-mono font-semibold text-blue-600 dark:text-blue-400">docx (v9.2)</td>
                    <td className="p-2.5">Đóng gói tài liệu cấu trúc thành định dạng Microsoft Word .docx</td>
                    <td className="p-2.5 font-mono text-emerald-600 dark:text-emerald-400">MIT License</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-mono font-semibold text-orange-600 dark:text-orange-400">pptxgenjs (v3.12)</td>
                    <td className="p-2.5">Khởi tạo và đóng gói bài trình chiếu Microsoft PowerPoint .pptx</td>
                    <td className="p-2.5 font-mono text-emerald-600 dark:text-emerald-400">MIT License</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-mono font-semibold text-slate-700 dark:text-slate-300">express & cors</td>
                    <td className="p-2.5">Máy chủ backend API RESTful</td>
                    <td className="p-2.5 font-mono text-emerald-600 dark:text-emerald-400">MIT License</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-mono font-semibold text-slate-700 dark:text-slate-300">lucide-react</td>
                    <td className="p-2.5">Bộ icon giao diện chuẩn hiện đại</td>
                    <td className="p-2.5 font-mono text-emerald-600 dark:text-emerald-400">ISC License</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-mono font-semibold text-slate-700 dark:text-slate-300">vitest & supertest</td>
                    <td className="p-2.5">Khung kiểm thử tự động API và tính bất biến của template</td>
                    <td className="p-2.5 font-mono text-emerald-600 dark:text-emerald-400">MIT License</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <div className="flex items-center space-x-1.5">
            <span>Bản quyền sáng tác dự án:</span>
            <strong className="text-slate-900 dark:text-white font-semibold">Nông Vay Hội</strong>
            <a href="mailto:nonghoi2004@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">
              (nonghoi2004@gmail.com)
            </a>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 active:scale-95 text-slate-800 dark:text-white font-semibold text-xs rounded-xl transition-all cursor-pointer"
          >
            Đóng
          </button>
        </div>

      </div>
    </div>
  );
};
