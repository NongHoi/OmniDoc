import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowLeft, 
  Save, 
  Download, 
  Bold, 
  Italic, 
  Underline, 
  Strikethrough, 
  Heading1, 
  Heading2, 
  List, 
  ListOrdered, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  AlignJustify, 
  TableIcon, 
  Printer, 
  FileDown, 
  Clock, 
  Sparkles, 
  RotateCcw, 
  SlidersHorizontal, 
  ChevronDown, 
  Layers,
  CheckCircle2,
  FileText
} from '../icons/index.js';
import { UserDocument } from '../types/index.js';
import { updateUserDocument, getDocxExportUrl } from '../services/api.js';

interface DocumentEditorProps {
  document: UserDocument;
  onBack: () => void;
  onSaveSuccess: (updated: UserDocument) => void;
}

export const DocumentEditor: React.FC<DocumentEditorProps> = ({
  document: initialDoc,
  onBack,
  onSaveSuccess
}) => {
  const [doc, setDoc] = useState<UserDocument>(initialDoc);
  const [title, setTitle] = useState(initialDoc.title);
  const [contentHtml, setContentHtml] = useState(initialDoc.contentHtml);
  const [status, setStatus] = useState<'draft' | 'final'>(initialDoc.status);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);
  const [showVariableFiller, setShowVariableFiller] = useState(true);
  const [fieldReplacements, setFieldReplacements] = useState<Record<string, string>>(initialDoc.fieldValues || {});

  const editorRef = useRef<HTMLDivElement>(null);

  // Sync internal HTML with contentEditable
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== contentHtml) {
      editorRef.current.innerHTML = contentHtml;
    }
  }, []);

  const handleContentInput = () => {
    if (editorRef.current) {
      setContentHtml(editorRef.current.innerHTML);
    }
  };

  // Rich Text ExecCommands
  const format = (command: string, value: string | undefined = undefined) => {
    window.document.execCommand(command, false, value);
    if (editorRef.current) {
      editorRef.current.focus();
      setContentHtml(editorRef.current.innerHTML);
    }
  };

  // Insert Table
  const insertTable = () => {
    const tableHtml = `
      <table style="width: 100%; border-collapse: collapse; margin: 16px 0; border: 1px solid #cbd5e1;">
        <thead>
          <tr style="background-color: #f8fafc;">
            <th style="border: 1px solid #cbd5e1; padding: 8px; font-weight: bold; text-align: left;">Mục</th>
            <th style="border: 1px solid #cbd5e1; padding: 8px; font-weight: bold; text-align: left;">Nội dung chi tiết</th>
            <th style="border: 1px solid #cbd5e1; padding: 8px; font-weight: bold; text-align: left;">Ghi chú</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border: 1px solid #cbd5e1; padding: 8px;">01</td>
            <td style="border: 1px solid #cbd5e1; padding: 8px;">Nội dung điều khoản thứ nhất</td>
            <td style="border: 1px solid #cbd5e1; padding: 8px; color: #16a34a;">Đạt yêu cầu</td>
          </tr>
          <tr>
            <td style="border: 1px solid #cbd5e1; padding: 8px;">02</td>
            <td style="border: 1px solid #cbd5e1; padding: 8px;">Nội dung điều khoản thứ hai</td>
            <td style="border: 1px solid #cbd5e1; padding: 8px; color: #2563eb;">Đang thực hiện</td>
          </tr>
        </tbody>
      </table>
      <p><br></p>
    `;
    format('insertHTML', tableHtml);
  };

  // Save to backend
  const handleSave = async (markAsFinal?: boolean) => {
    setSaving(true);
    try {
      const newStatus = markAsFinal !== undefined ? (markAsFinal ? 'final' : 'draft') : status;
      const updated = await updateUserDocument(doc.id, {
        title,
        contentHtml,
        fieldValues: fieldReplacements,
        status: newStatus
      });
      setDoc(updated);
      setStatus(newStatus);
      setLastSaved(new Date().toLocaleTimeString('vi-VN'));
      onSaveSuccess(updated);
    } catch (err: any) {
      alert(`Lỗi khi lưu tài liệu: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  // Smart Variable Batch Replacement
  const handleApplyFieldReplacement = (key: string, value: string) => {
    setFieldReplacements(prev => ({ ...prev, [key]: value }));
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'gi');
    const newHtml = contentHtml.replace(regex, value);
    setContentHtml(newHtml);
    if (editorRef.current) {
      editorRef.current.innerHTML = newHtml;
    }
  };

  // Word count & Char count
  const wordCount = contentHtml.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).filter(Boolean).length;
  const charCount = contentHtml.replace(/<[^>]+>/g, '').length;

  // Export actions
  const exportDocx = () => {
    window.open(getDocxExportUrl(doc.id), '_blank');
    setIsExportMenuOpen(false);
  };

  const exportPdf = () => {
    setIsExportMenuOpen(false);
    window.print();
  };

  const exportHtml = () => {
    setIsExportMenuOpen(false);
    const blob = new Blob([contentHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/[^a-zA-Z0-9\u00C0-\u1EF9]/gi, '_')}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportTxt = () => {
    setIsExportMenuOpen(false);
    const plainText = contentHtml.replace(/<br\s*[\/]?>/gi, '\n').replace(/<[^>]+>/g, '');
    const blob = new Blob([plainText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/[^a-zA-Z0-9\u00C0-\u1EF9]/gi, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex flex-col text-slate-800 dark:text-slate-100 transition-colors">
      
      {/* Top Header Bar */}
      <div className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 py-2.5 flex items-center justify-between shadow-xs">
        
        {/* Left: Back & Document Title */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
            title="Quay lại danh sách"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="font-bold text-slate-900 dark:text-white text-sm sm:text-base px-2.5 py-1 bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 focus:bg-white dark:focus:bg-slate-800 border border-transparent hover:border-slate-300 dark:hover:border-slate-700 focus:border-blue-500 rounded-xl focus:outline-none transition-all flex-1 min-w-[120px] max-w-xs sm:max-w-md truncate"
            />
            <span className={`hidden sm:inline-block px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full border shrink-0 ${
              status === 'final' 
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' 
                : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
            }`}>
              {status === 'final' ? 'Chính thức' : 'Bản nháp'}
            </span>
          </div>
        </div>

        {/* Right: Saving indicator, Save & Export */}
        <div className="flex items-center space-x-2">
          {lastSaved && (
            <span className="hidden md:flex items-center text-xs text-slate-500 dark:text-slate-400 mr-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mr-1" />
              Đã lưu lúc {lastSaved}
            </span>
          )}

          <button
            onClick={() => setShowVariableFiller(!showVariableFiller)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl flex items-center space-x-1.5 transition-colors border ${
              showVariableFiller 
                ? 'bg-blue-600 text-white border-blue-500 shadow-sm shadow-blue-500/20' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700'
            }`}
            title="Bật/tắt thanh điền biến tự động"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Điền biến</span>
          </button>

          <button
            onClick={() => handleSave()}
            disabled={saving}
            className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white text-xs sm:text-sm font-semibold rounded-xl flex items-center space-x-1.5 border border-slate-300 dark:border-slate-700 transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>{saving ? 'Đang lưu...' : 'Lưu tài liệu'}</span>
          </button>

          {/* Export Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsExportMenuOpen(!isExportMenuOpen)}
              className="px-3.5 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-semibold rounded-xl flex items-center space-x-1.5 shadow-md shadow-blue-500/20 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Tải xuống</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {isExportMenuOpen && (
              <div 
                className="absolute right-0 mt-2 w-60 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="px-3.5 py-1.5 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                  Chọn định dạng xuất file
                </div>
                <button
                  onClick={exportDocx}
                  className="w-full px-3.5 py-2 text-left text-xs sm:text-sm text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 flex items-center space-x-2.5 transition-colors"
                >
                  <FileDown className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <div>
                    <div className="font-semibold">Microsoft Word (.DOCX)</div>
                    <div className="text-[10px] text-slate-400">Định dạng chuẩn OpenXML</div>
                  </div>
                </button>
                <button
                  onClick={exportPdf}
                  className="w-full px-3.5 py-2 text-left text-xs sm:text-sm text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-red-600 dark:hover:text-red-400 flex items-center space-x-2.5 transition-colors"
                >
                  <Printer className="w-4 h-4 text-red-500" />
                  <div>
                    <div className="font-semibold">Xuất PDF / In ấn</div>
                    <div className="text-[10px] text-slate-400">Khổ A4 tiêu chuẩn</div>
                  </div>
                </button>
                <button
                  onClick={exportHtml}
                  className="w-full px-3.5 py-2 text-left text-xs sm:text-sm text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-amber-600 dark:hover:text-amber-400 flex items-center space-x-2.5 transition-colors"
                >
                  <Layers className="w-4 h-4 text-amber-500" />
                  <div>
                    <div className="font-semibold">Tệp HTML (.HTML)</div>
                    <div className="text-[10px] text-slate-400">Trang web định dạng</div>
                  </div>
                </button>
                <button
                  onClick={exportTxt}
                  className="w-full px-3.5 py-2 text-left text-xs sm:text-sm text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-slate-300 flex items-center space-x-2.5 transition-colors"
                >
                  <FileDown className="w-4 h-4 text-slate-400" />
                  <div>
                    <div className="font-semibold">Văn bản thuần (.TXT)</div>
                    <div className="text-[10px] text-slate-400">Chỉ nội dung văn bản</div>
                  </div>
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Formatting Ribbon */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 py-1.5 flex items-center space-x-1 sm:space-x-2 overflow-x-auto shadow-xs text-xs">
        <div className="flex items-center space-x-0.5 border-r border-slate-200 dark:border-slate-800 pr-2">
          <button onClick={() => format('bold')} className="p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg hover:text-slate-900 dark:hover:text-white" title="Đậm (Ctrl+B)"><Bold className="w-4 h-4" /></button>
          <button onClick={() => format('italic')} className="p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg hover:text-slate-900 dark:hover:text-white" title="Nghiêng (Ctrl+I)"><Italic className="w-4 h-4" /></button>
          <button onClick={() => format('underline')} className="p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg hover:text-slate-900 dark:hover:text-white" title="Gạch chân (Ctrl+U)"><Underline className="w-4 h-4" /></button>
          <button onClick={() => format('strikeThrough')} className="p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg hover:text-slate-900 dark:hover:text-white" title="Gạch ngang"><Strikethrough className="w-4 h-4" /></button>
        </div>

        <div className="flex items-center space-x-0.5 border-r border-slate-200 dark:border-slate-800 pr-2">
          <button onClick={() => format('formatBlock', '<h1>')} className="p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg hover:text-slate-900 dark:hover:text-white font-bold" title="Tiêu đề 1"><Heading1 className="w-4 h-4" /></button>
          <button onClick={() => format('formatBlock', '<h2>')} className="p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg hover:text-slate-900 dark:hover:text-white font-bold" title="Tiêu đề 2"><Heading2 className="w-4 h-4" /></button>
          <button onClick={() => format('formatBlock', '<p>')} className="px-2 py-1 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg font-semibold" title="Đoạn văn">P</button>
        </div>

        <div className="flex items-center space-x-0.5 border-r border-slate-200 dark:border-slate-800 pr-2">
          <button onClick={() => format('insertUnorderedList')} className="p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg hover:text-slate-900 dark:hover:text-white" title="Danh sách chấm"><List className="w-4 h-4" /></button>
          <button onClick={() => format('insertOrderedList')} className="p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg hover:text-slate-900 dark:hover:text-white" title="Danh sách số"><ListOrdered className="w-4 h-4" /></button>
        </div>

        <div className="flex items-center space-x-0.5 border-r border-slate-200 dark:border-slate-800 pr-2">
          <button onClick={() => format('justifyLeft')} className="p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg" title="Căn trái"><AlignLeft className="w-4 h-4" /></button>
          <button onClick={() => format('justifyCenter')} className="p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg" title="Căn giữa"><AlignCenter className="w-4 h-4" /></button>
          <button onClick={() => format('justifyRight')} className="p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg" title="Căn phải"><AlignRight className="w-4 h-4" /></button>
          <button onClick={() => format('justifyFull')} className="p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg" title="Căn đều"><AlignJustify className="w-4 h-4" /></button>
        </div>

        <div className="flex items-center space-x-1">
          <button onClick={insertTable} className="px-2.5 py-1 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg font-semibold flex items-center space-x-1" title="Chèn bảng biểu">
            <TableIcon className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Chèn bảng</span>
          </button>
          <button onClick={() => format('removeFormat')} className="p-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg" title="Xóa định dạng"><RotateCcw className="w-3.5 h-3.5" /></button>
        </div>

        <div className="ml-auto text-[11px] text-slate-500 font-mono hidden md:block">
          {wordCount} từ • {charCount} ký tự
        </div>
      </div>

      {/* Main Workspace: Left Paper Canvas + Right Smart Variable Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Document Page Canvas */}
        <div className="flex-1 overflow-y-auto p-2 sm:p-6 lg:p-10 flex justify-center bg-slate-200/50 dark:bg-slate-950">
          <div className="bg-white shadow-xl dark:shadow-2xl rounded-xl border border-slate-300 dark:border-slate-800 w-full max-w-[840px] min-h-[980px] p-5 sm:p-10 lg:p-14 font-serif text-slate-900 leading-relaxed outline-none focus:ring-4 focus:ring-blue-500/20">
            <div
              ref={editorRef}
              contentEditable
              onInput={handleContentInput}
              className="prose prose-slate max-w-none text-base min-h-[880px] outline-none text-slate-900"
              style={{ fontFamily: "'Times New Roman', Times, serif" }}
            />
          </div>
        </div>

        {/* Right Sidebar: Smart Template Variable Replacer */}
        {showVariableFiller && (
          <>
            {/* Mobile backdrop overlay */}
            <div 
              onClick={() => setShowVariableFiller(false)}
              className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs lg:hidden"
            />
            <div className="fixed lg:static top-0 right-0 z-50 h-screen lg:h-auto w-84 max-w-[85vw] bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 p-5 overflow-y-auto flex flex-col justify-between shadow-2xl lg:shadow-none animate-in slide-in-from-right duration-200">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-4">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">Điền biến thông minh</h3>
                </div>
                <button
                  onClick={() => setShowVariableFiller(false)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 text-xs p-1"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                Nhập nhanh các giá trị để tự động điền vào các vị trí biến mẫu trong tài liệu:
              </p>

              {/* Detected or Configured Fields */}
              <div className="space-y-3.5">
                {Object.keys(fieldReplacements).length > 0 ? (
                  Object.entries(fieldReplacements).map(([key, val]) => (
                    <div key={key} className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block capitalize">
                        {key.replace(/_/g, ' ')}
                      </label>
                      <input
                        type="text"
                        value={val}
                        onChange={(e) => handleApplyFieldReplacement(key, e.target.value)}
                        className="w-full text-xs px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={`Nhập ${key}...`}
                      />
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-slate-500 text-xs bg-slate-50 dark:bg-slate-950/40 rounded-xl border border-slate-200 dark:border-slate-800/80 p-4">
                    Tất cả các biến mẫu đã được điền hoặc tài liệu này không chứa biến mẫu.
                  </div>
                )}
              </div>
            </div>

            {/* Document Status Switcher */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 mt-6 space-y-2">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Trạng thái tài liệu:</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleSave(false)}
                  className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                    status === 'draft'
                      ? 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/40 shadow-xs font-bold'
                      : 'bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  Bản nháp
                </button>
                <button
                  onClick={() => handleSave(true)}
                  className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                    status === 'final'
                      ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/40 shadow-xs font-bold'
                      : 'bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  Hoàn thành
                </button>
              </div>
            </div>

          </div>
        </>
      )}

      </div>
    </div>
  );
};
