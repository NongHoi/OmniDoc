import React, { useState, useEffect } from 'react';
import { 
  X, 
  Save, 
  Edit3, 
  ShieldAlert, 
  Sparkles, 
  FileText, 
  Presentation 
} from '../icons/index.js';
import { DocumentTemplate, PresentationTemplate } from '../types/index.js';

interface EditTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: DocumentTemplate | PresentationTemplate | null;
  type: 'document' | 'presentation';
  onSave: (id: string, updates: any) => Promise<void>;
}

export const EditTemplateModal: React.FC<EditTemplateModalProps> = ({
  isOpen,
  onClose,
  template,
  type,
  onSave
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [contentHtml, setContentHtml] = useState('');
  const [primaryColor, setPrimaryColor] = useState('#2563eb');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (template) {
      setTitle(template.title || '');
      setCategory(template.category || '');
      setDescription(template.description || '');
      setTags((template.tags || []).join(', '));
      if (type === 'document') {
        setContentHtml((template as DocumentTemplate).contentHtml || '');
      } else {
        const pres = template as PresentationTemplate;
        setPrimaryColor(pres.theme?.primaryColor || '#c43e1c');
      }
      setError(null);
    }
  }, [template, type, isOpen]);

  if (!isOpen || !template) return null;

  const docCategories = ['Hợp đồng', 'Nhân sự', 'Hành chính', 'Kinh doanh', 'Báo cáo', 'Tuyển dụng'];
  const presCategories = ['Khởi nghiệp', 'Marketing', 'Kinh doanh', 'Đào tạo', 'Báo cáo'];
  const currentCategories = type === 'document' ? docCategories : presCategories;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Tiêu đề mẫu không được để trống');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const parsedTags = tags
        .split(',')
        .map(t => t.trim())
        .filter(t => t.length > 0);

      const updates: any = {
        title: title.trim(),
        category: category.trim(),
        description: description.trim(),
        tags: parsedTags
      };

      if (type === 'document') {
        updates.contentHtml = contentHtml;
      } else {
        const pres = template as PresentationTemplate;
        updates.theme = {
          ...pres.theme,
          primaryColor
        };
      }

      await onSave(template.id, updates);
      setIsLoading(false);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Lỗi khi cập nhật mẫu');
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-modal-backdrop"
      onClick={onClose}
    >
      <div 
        className="relative bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-2xl overflow-hidden text-slate-800 dark:text-slate-100 animate-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-xs font-bold ${
              type === 'document' ? 'bg-blue-600' : 'bg-orange-600'
            }`}>
              {type === 'document' ? <FileText className="w-5 h-5" /> : <Presentation className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                  Quyền Admin
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  ID: {template.id}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                Chỉnh Sửa Mẫu {type === 'document' ? 'Văn Bản' : 'Trình Chiếu'} Dùng Chung
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl transition-all cursor-pointer"
            title="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Admin Authority Banner */}
          <div className="p-3 bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/40 rounded-2xl flex items-center space-x-2.5 text-xs text-blue-900 dark:text-blue-300">
            <ShieldAlert className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
            <span>
              <strong>Thao tác Quản trị viên:</strong> Nội dung chỉnh sửa sẽ được lưu vào kho mẫu chuẩn dùng chung cho toàn bộ nhân viên.
            </span>
          </div>

          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-xl text-xs text-red-700 dark:text-red-300">
              {error}
            </div>
          )}

          {/* Title Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Tên mẫu tài liệu *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="VD: Hợp đồng cung cấp dịch vụ công nghệ"
              className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category Dropdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Phân loại danh mục
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {currentCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Từ khóa tags (cách nhau bởi dấu phẩy)
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="VD: Hợp đồng, Dịch vụ, 2026"
                className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Description Textarea */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Mô tả tóm tắt mẫu
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Mô tả phạm vi áp dụng, đối tượng sử dụng..."
              className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Specific field for document: contentHtml */}
          {type === 'document' ? (
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Khung nội dung văn bản gốc (HTML Template)
              </label>
              <textarea
                rows={5}
                value={contentHtml}
                onChange={(e) => setContentHtml(e.target.value)}
                placeholder="<p>Nội dung mẫu văn bản...</p>"
                className="w-full px-3.5 py-2 text-xs font-mono bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ) : (
            /* Specific field for presentation: primaryColor */
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Màu sắc chủ đạo Theme
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-800 cursor-pointer p-0.5 bg-transparent"
                />
                <input
                  type="text"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-32 px-3 py-1.5 text-xs font-mono bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white"
                />
              </div>
            </div>
          )}

          {/* Modal Footer */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all cursor-pointer"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center space-x-1.5 px-5 py-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-600/20 transition-all cursor-pointer"
            >
              {isLoading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Đang lưu...</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>Lưu Thay Đổi Mẫu</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

