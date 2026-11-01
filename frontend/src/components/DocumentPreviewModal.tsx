import React from 'react';
import { 
  X, 
  FileText, 
  ArrowRight, 
  Download, 
  Calendar, 
  User, 
  Layers, 
  CheckCircle2,
  Sparkles,
  Edit3,
  Trash2
} from '../icons/index.js';
import { DocumentTemplate } from '../types/index.js';

interface DocumentPreviewModalProps {
  template: DocumentTemplate | null;
  isOpen: boolean;
  onClose: () => void;
  onUseTemplate: (template: DocumentTemplate) => void;
  isAdmin?: boolean;
  onEditTemplate?: (template: DocumentTemplate) => void;
  onDeleteTemplate?: (template: DocumentTemplate) => void;
}

export const DocumentPreviewModal: React.FC<DocumentPreviewModalProps> = ({
  template,
  isOpen,
  onClose,
  onUseTemplate,
  isAdmin = false,
  onEditTemplate,
  onDeleteTemplate
}) => {
  if (!isOpen || !template) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-modal-backdrop"
      onClick={onClose}
    >
      <div 
        className="relative bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden text-slate-800 dark:text-slate-200 transition-colors animate-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/80">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 text-xs font-semibold bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30 rounded-md">
                  {template.category}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">Phiên bản {template.version}</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                {template.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {isAdmin && (
              <>
                {onEditTemplate && (
                  <button
                    onClick={() => {
                      onClose();
                      onEditTemplate(template);
                    }}
                    className="flex items-center space-x-1.5 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 text-xs font-semibold rounded-xl border border-blue-200 dark:border-blue-800 transition-colors cursor-pointer"
                    title="Chỉnh sửa mẫu này (Admin)"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Sửa mẫu</span>
                  </button>
                )}
                {onDeleteTemplate && (
                  <button
                    onClick={() => {
                      onClose();
                      onDeleteTemplate(template);
                    }}
                    className="flex items-center space-x-1.5 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 text-xs font-semibold rounded-xl border border-red-200 dark:border-red-800 transition-colors cursor-pointer"
                    title="Xóa mẫu này (Admin)"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Xóa</span>
                  </button>
                )}
              </>
            )}

            <button
              onClick={() => {
                onClose();
                onUseTemplate(template);
              }}
              className="group/use flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-95 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-150 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 group-hover/use:rotate-12 transition-transform duration-200" />
              <span>Sử dụng mẫu này</span>
              <ArrowRight className="w-4 h-4 group-hover/use:translate-x-1 transition-transform duration-200" />
            </button>
            <button
              onClick={onClose}
              className="group/close p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors active:scale-95"
              title="Đóng (Esc)"
            >
              <X className="w-5 h-5 group-hover/close:rotate-90 transition-transform duration-200" />
            </button>
          </div>
        </div>

        {/* Content Body: Two columns (Main document preview + Sidebar info) */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 bg-slate-100 dark:bg-slate-950">
          
          {/* Document Canvas Preview (Left 8 cols) */}
          <div className="lg:col-span-8 p-4 sm:p-8 flex justify-center overflow-y-auto bg-slate-100 dark:bg-slate-950">
            <div className="bg-white rounded-xl shadow-xl dark:shadow-2xl border border-slate-200/80 w-full max-w-[760px] min-h-[640px] p-8 sm:p-12 font-serif leading-relaxed text-slate-900 relative">
              <div 
                className="prose prose-slate max-w-none text-sm sm:text-base"
                dangerouslySetInnerHTML={{ __html: template.contentHtml }}
              />
            </div>
          </div>

          {/* Sidebar Metadata (Right 4 cols) */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-900 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-800 p-6 space-y-6 overflow-y-auto">
            
            {/* Template Overview */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Thông tin tài liệu mẫu
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {template.description}
              </p>
            </div>

            {/* Quick Details */}
            <div className="bg-slate-50 dark:bg-slate-950/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-center justify-between">
                <span className="flex items-center text-slate-500 dark:text-slate-400">
                  <User className="w-3.5 h-3.5 mr-1.5 text-slate-400 dark:text-slate-500" /> Đơn vị phát hành:
                </span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{template.author}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center text-slate-500 dark:text-slate-400">
                  <Download className="w-3.5 h-3.5 mr-1.5 text-slate-400 dark:text-slate-500" /> Lượt sử dụng:
                </span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{template.downloadsCount} lượt</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center text-slate-500 dark:text-slate-400">
                  <Calendar className="w-3.5 h-3.5 mr-1.5 text-slate-400 dark:text-slate-500" /> Cập nhật lần cuối:
                </span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {new Date(template.updatedAt).toLocaleDateString('vi-VN')}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center text-slate-500 dark:text-slate-400">
                  <Layers className="w-3.5 h-3.5 mr-1.5 text-slate-400 dark:text-slate-500" /> Định dạng file:
                </span>
                <span className="font-bold uppercase text-blue-600 dark:text-blue-400 font-mono">{template.fileFormat}</span>
              </div>
            </div>

            {/* Detected Placeholder Fields */}
            {template.fields && template.fields.length > 0 && (
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center justify-between">
                  <span>Trường dữ liệu điền tự động</span>
                  <span className="text-[10px] bg-blue-50 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30 px-2 py-0.5 rounded-full font-bold">
                    {template.fields.length} trường
                  </span>
                </h4>
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {template.fields.map(field => (
                    <div key={field.key} className="p-3 bg-slate-50 dark:bg-slate-950/70 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
                      <div className="font-semibold text-slate-800 dark:text-slate-200">{field.label}</div>
                      <div className="text-[11px] font-mono text-blue-600 dark:text-blue-400 mt-0.5">{`{{${field.key}}}`}</div>
                      <div className="text-slate-500 dark:text-slate-400 italic mt-1 text-[11px] truncate">
                        Mặc định: "{field.defaultValue}"
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Từ khóa liên quan
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {template.tags.map(tag => (
                  <span key={tag} className="text-xs px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg border border-slate-200 dark:border-slate-700/60">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Non-destructive notice */}
            <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl flex items-start space-x-2.5 text-xs text-emerald-800 dark:text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-emerald-900 dark:text-emerald-200">Bảo toàn 100% mẫu gốc:</strong> Khởi tạo bản sao độc lập, mọi chỉnh sửa chỉ ghi vào tài liệu cá nhân của bạn.
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>ID mẫu: <code className="font-mono text-slate-700 dark:text-slate-300">{template.id}</code></span>
          <div className="flex space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 active:scale-95 text-slate-700 dark:text-slate-200 font-semibold rounded-xl transition-all"
            >
              Đóng
            </button>
            <button
              onClick={() => {
                onClose();
                onUseTemplate(template);
              }}
              className="group/btn px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-95 text-white font-semibold rounded-xl flex items-center space-x-1.5 shadow-md shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-150"
            >
              <span>Khởi tạo tài liệu ngay</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
