import React, { useState } from 'react';
import { 
  X, 
  FileText, 
  Presentation, 
  Plus, 
  Sparkles, 
  AlertCircle 
} from '../icons/index.js';
import { createDocumentTemplate, createPresentationTemplate } from '../services/api.js';
import { DocumentTemplate, PresentationTemplate } from '../types/index.js';

interface AddTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessDoc: (newTemplate: DocumentTemplate) => void;
  onSuccessPres: (newTemplate: PresentationTemplate) => void;
}

export const AddTemplateModal: React.FC<AddTemplateModalProps> = ({
  isOpen,
  onClose,
  onSuccessDoc,
  onSuccessPres
}) => {
  const [type, setType] = useState<'document' | 'presentation'>('document');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Hợp đồng');
  const [description, setDescription] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [contentHtml, setContentHtml] = useState(`
<div style="font-family: 'Times New Roman', serif; line-height: 1.6; max-width: 800px; margin: 0 auto; color: #111;">
  <h2 style="text-align: center; color: #1e3a8a; text-transform: uppercase;">TIÊU ĐỀ TÀI LIỆU MẪU MỚI</h2>
  <p>Hôm nay, ngày ... tháng ... năm ..., chúng tôi gồm có:</p>
  <p><strong>Bên A:</strong> {{ten_ben_a}}</p>
  <p><strong>Bên B:</strong> {{ten_ben_b}}</p>
  <h4>NỘI DUNG THỎA THUẬN:</h4>
  <p>Hai bên nhất trí các điều khoản hợp tác kinh doanh theo quy định pháp luật.</p>
</div>
  `);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const finalTitle = title.trim();
    if (!finalTitle) {
      setErrorMsg('Vui lòng nhập tiêu đề');
      return;
    }

    const finalCategory = category.trim() || (type === 'document' ? 'Hợp đồng' : 'Kinh doanh');
    const finalDescription = description.trim() || `Mẫu ${type === 'document' ? 'văn bản' : 'trình chiếu'} ${finalCategory} tiêu chuẩn`;

    const tags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    setSubmitting(true);
    try {
      if (type === 'document') {
        const created = await createDocumentTemplate({
          title: finalTitle,
          category: finalCategory,
          description: finalDescription,
          contentHtml: contentHtml.trim() || '<p>Nội dung mẫu văn bản...</p>',
          tags: tags.length ? tags : ['Tự tạo', finalCategory],
          fileFormat: 'docx',
          version: '1.0.0',
          author: 'Quản trị viên'
        });
        onSuccessDoc(created);
        onClose();
      } else {
        // Presentation Template
        const created = await createPresentationTemplate({
          title: finalTitle,
          category: finalCategory,
          description: finalDescription,
          tags: tags.length ? tags : ['Tự tạo', finalCategory],
          theme: {
            name: 'Venture Indigo',
            primaryColor: '#2563eb',
            secondaryColor: '#1e40af',
            accentColor: '#3b82f6',
            backgroundColor: '#ffffff',
            textColor: '#0f172a',
            fontHeading: 'Plus Jakarta Sans',
            fontBody: 'Plus Jakarta Sans'
          },
          slides: [
            {
              id: `slide-1`,
              slideNumber: 1,
              title: finalTitle,
              subtitle: finalDescription,
              layout: 'title',
              elements: [
                { id: 'el-1', type: 'heading', content: finalTitle },
                { id: 'el-2', type: 'subtitle', content: finalDescription }
              ]
            },
            {
              id: `slide-2`,
              slideNumber: 2,
              title: 'Mục tiêu & Kế hoạch Thực hiện',
              subtitle: 'Các bước triển khai trọng tâm',
              layout: 'content-bullets',
              elements: [
                {
                  id: 'el-3',
                  type: 'bullets',
                  content: [
                    'Nội dung chiến lược hành động thứ nhất',
                    'Nội dung phân công trách nhiệm thứ hai',
                    'Chỉ số đánh giá nghiệm thu cuối kỳ'
                  ]
                }
              ]
            }
          ]
        });
        onSuccessPres(created);
        onClose();
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Lỗi khi tạo mẫu mới');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-modal-backdrop"
      onClick={onClose}
    >
      <div 
        className="relative bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden text-slate-800 dark:text-slate-200 animate-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Bổ Sung Mẫu Mới Vào Thư Viện</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Mở rộng thư viện linh hoạt mà không cần viết lại giao diện</p>
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          {errorMsg && (
            <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 rounded-xl text-xs text-red-600 dark:text-red-300 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Type Switcher */}
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">Loại mẫu cần thêm:</label>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => { setType('document'); setCategory('Hợp đồng'); }}
                className={`py-2.5 px-3.5 text-xs font-semibold rounded-xl border flex items-center justify-center space-x-2 transition-all duration-150 active:scale-95 ${
                  type === 'document' 
                    ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-500/20' 
                    : 'bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Mẫu Văn bản (Document)</span>
              </button>
              <button
                type="button"
                onClick={() => { setType('presentation'); setCategory('Kinh doanh'); }}
                className={`py-2.5 px-3.5 text-xs font-semibold rounded-xl border flex items-center justify-center space-x-2 transition-all duration-150 active:scale-95 ${
                  type === 'presentation' 
                    ? 'bg-orange-600 text-white border-orange-500 shadow-md shadow-orange-500/20' 
                    : 'bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                <Presentation className="w-4 h-4" />
                <span>Mẫu Trình chiếu (Presentation)</span>
              </button>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Tiêu đề mẫu: <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="VD: Mẫu Biên bản Bàn giao Thiết bị 2025"
              className="w-full text-xs px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Category & Tags */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Danh mục:</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="VD: Hành chính, Hợp đồng..."
                className="w-full text-xs px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Từ khóa (phân cách bằng dấu phẩy):</label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="VD: Bàn giao, Thiết bị"
                className="w-full text-xs px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Mô tả ngắn: <span className="text-red-500">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              placeholder="Tóm tắt công dụng và đối tượng áp dụng của mẫu này..."
              className="w-full text-xs px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Initial HTML (if document) */}
          {type === 'document' && (
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Nội dung HTML mẫu (hỗ trợ biến mẫu như &#123;&#123;ten_bien&#125;&#125;):
              </label>
              <textarea
                value={contentHtml}
                onChange={(e) => setContentHtml(e.target.value)}
                rows={5}
                className="w-full font-mono text-[11px] p-3 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-300"
              />
            </div>
          )}

          {/* Footer Submit */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 active:scale-95 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-xl transition-all"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="group/submit px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-95 text-white text-xs font-semibold rounded-xl flex items-center space-x-1.5 shadow-md shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-150 disabled:opacity-50"
            >
              <Sparkles className={`w-3.5 h-3.5 ${submitting ? 'animate-spin' : 'group-hover/submit:rotate-12 transition-transform duration-200'}`} />
              <span>{submitting ? 'Đang thêm...' : 'Lưu mẫu vào thư viện'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
