import React, { useState } from 'react';
import { 
  FileText, 
  Presentation, 
  Edit3, 
  Download, 
  Trash2, 
  Clock, 
  FolderOpen,
  Layers,
  CheckCircle2
} from '../icons/index.js';
import { UserDocument, UserPresentation } from '../types/index.js';
import { getDocxExportUrl, getPptxExportUrl } from '../services/api.js';

interface MyDocumentsViewProps {
  documents: UserDocument[];
  presentations: UserPresentation[];
  onOpenDocument: (doc: UserDocument) => void;
  onOpenPresentation: (pres: UserPresentation) => void;
  onDeleteDocument: (id: string) => void;
  onDeletePresentation: (id: string) => void;
  onNavigateToTemplates: (tab: 'documents' | 'presentations') => void;
  onCreateBlankDoc?: () => void;
  onCreateBlankPres?: () => void;
}

export const MyDocumentsView: React.FC<MyDocumentsViewProps> = ({
  documents,
  presentations,
  onOpenDocument,
  onOpenPresentation,
  onDeleteDocument,
  onDeletePresentation,
  onNavigateToTemplates,
  onCreateBlankDoc,
  onCreateBlankPres
}) => {
  const [filterType, setFilterType] = useState<'all' | 'documents' | 'presentations'>('all');

  const totalCount = documents.length + presentations.length;
  const completedDocsCount = documents.filter(d => d.status === 'final').length;

  return (
    <div className="space-y-6">
      
      {/* Top Stats Overview Cards (Editorial Workspace) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between transition-colors">
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Tổng tài liệu</p>
            <p className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1 tabular-nums tracking-tight">{totalCount}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center">
            <Layers className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between transition-colors">
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Văn bản đã tạo</p>
            <p className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 mt-1 tabular-nums tracking-tight">{documents.length}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between transition-colors">
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Bài trình chiếu</p>
            <p className="text-3xl font-extrabold text-orange-600 dark:text-orange-400 mt-1 tabular-nums tracking-tight">{presentations.length}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 flex items-center justify-center">
            <Presentation className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between transition-colors">
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Văn bản hoàn tất</p>
            <p className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1 tabular-nums tracking-tight">{completedDocsCount}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter and Description Bar */}
      <div className="bg-white dark:bg-slate-900/80 backdrop-blur-xl p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Kho Tài Liệu Cá Nhân
            </h2>
            <span className="px-2.5 py-0.5 text-xs font-bold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 rounded-full">
              Bảo vệ mẫu gốc 100%
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Các bản sao độc lập được tạo từ mẫu. Mọi thay đổi nội dung ở đây không ảnh hưởng đến template gốc ban đầu.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-950 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 self-start md:self-auto">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all duration-150 active:scale-95 ${
              filterType === 'all' 
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs' 
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Tất cả ({totalCount})
          </button>
          <button
            onClick={() => setFilterType('documents')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all duration-150 active:scale-95 flex items-center space-x-1.5 ${
              filterType === 'documents' 
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20' 
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Văn bản ({documents.length})</span>
          </button>
          <button
            onClick={() => setFilterType('presentations')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all duration-150 active:scale-95 flex items-center space-x-1.5 ${
              filterType === 'presentations' 
                ? 'bg-orange-600 text-white shadow-sm shadow-orange-500/20' 
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Presentation className="w-3.5 h-3.5" />
            <span>Trình chiếu ({presentations.length})</span>
          </button>
        </div>

        {/* Quick Create Buttons */}
        <div className="flex items-center space-x-2">
          {onCreateBlankDoc && (
            <button
              onClick={onCreateBlankDoc}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
              title="Tạo văn bản mới từ đầu"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Soạn văn bản</span>
            </button>
          )}
          {onCreateBlankPres && (
            <button
              onClick={onCreateBlankPres}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
              title="Tạo bản trình chiếu mới từ đầu"
            >
              <Presentation className="w-3.5 h-3.5" />
              <span>Tạo slide</span>
            </button>
          )}
        </div>
      </div>

      {/* Empty State */}
      {totalCount === 0 && (
        <div className="bg-white dark:bg-slate-900/50 rounded-3xl border border-slate-200 dark:border-slate-800 p-12 text-center max-w-lg mx-auto shadow-sm">
          <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-2xl mx-auto flex items-center justify-center mb-4 border border-slate-200 dark:border-slate-700">
            <FolderOpen className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">Chưa có tài liệu nào được tạo</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Hãy khám phá kho mẫu văn bản hoặc mẫu trình chiếu để khởi tạo tài liệu đầu tiên!
          </p>
          <div className="flex justify-center space-x-3 mt-6">
            <button
              onClick={() => onNavigateToTemplates('documents')}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl shadow-md transition-all"
            >
              Chọn Mẫu Văn Bản
            </button>
            <button
              onClick={() => onNavigateToTemplates('presentations')}
              className="px-4 py-2.5 bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold rounded-xl shadow-md transition-all"
            >
              Chọn Mẫu Slide
            </button>
          </div>
        </div>
      )}

      {/* User Documents Section */}
      {(filterType === 'all' || filterType === 'documents') && documents.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Văn bản của tôi ({documents.length})</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {documents.map((doc, idx) => (
              <div 
                key={doc.id}
                style={{ animationDelay: `${Math.min(idx * 40, 300)}ms` }}
                className="group bg-white dark:bg-slate-900/80 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500/50 p-5 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between animate-fade-in-up"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-0.5 text-xs font-semibold uppercase bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 rounded-md border border-blue-200 dark:border-blue-500/20">
                      {doc.category}
                    </span>
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-md border ${
                      doc.status === 'final' 
                        ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20' 
                        : 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/20'
                    }`}>
                      {doc.status === 'final' ? 'Chính thức' : 'Bản nháp'}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{doc.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center">
                    <Clock className="w-3 h-3 mr-1 text-slate-400" />
                    Cập nhật: {new Date(doc.updatedAt).toLocaleString('vi-VN')}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <button
                    onClick={() => onOpenDocument(doc)}
                    className="group/btn px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-semibold rounded-xl flex items-center space-x-1.5 shadow-sm hover:shadow transition-all duration-150"
                  >
                    <Edit3 className="w-3.5 h-3.5 group-hover/btn:rotate-12 transition-transform duration-200" />
                    <span>Mở chỉnh sửa</span>
                  </button>

                  <div className="flex items-center space-x-1">
                    <a
                      href={getDocxExportUrl(doc.id)}
                      download
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-90 hover:scale-105 rounded-xl transition-all duration-150 border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                      title="Tải xuống Word (.DOCX)"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => {
                        if (confirm(`Bạn có chắc chắn muốn xóa tài liệu "${doc.title}"?`)) {
                          onDeleteDocument(doc.id);
                        }
                      }}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 active:scale-90 hover:scale-105 rounded-xl transition-all duration-150 border border-transparent hover:border-red-200 dark:hover:border-red-900/50"
                      title="Xóa tài liệu này"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* User Presentations Section */}
      {(filterType === 'all' || filterType === 'presentations') && presentations.length > 0 && (
        <div className="space-y-3 pt-4">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            <Presentation className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            <span>Bài trình chiếu của tôi ({presentations.length})</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {presentations.map((pres, idx) => (
              <div 
                key={pres.id}
                style={{ animationDelay: `${Math.min(idx * 40, 300)}ms` }}
                className="group bg-white dark:bg-slate-900/80 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-orange-400 dark:hover:border-orange-500/50 p-5 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between animate-fade-in-up"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2.5 py-0.5 text-xs font-semibold uppercase bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400 rounded-md border border-orange-200 dark:border-orange-500/20">
                      {pres.category}
                    </span>
                    <span className="px-2 py-0.5 text-xs font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700">
                      {pres.slides.length} slides
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 dark:text-white line-clamp-1 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">{pres.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center">
                    <Clock className="w-3 h-3 mr-1 text-slate-400" />
                    Cập nhật: {new Date(pres.updatedAt).toLocaleString('vi-VN')}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <button
                    onClick={() => onOpenPresentation(pres)}
                    className="group/btn px-3.5 py-1.5 bg-orange-600 hover:bg-orange-700 active:scale-95 text-white text-xs font-semibold rounded-xl flex items-center space-x-1.5 shadow-sm hover:shadow transition-all duration-150"
                  >
                    <Edit3 className="w-3.5 h-3.5 group-hover/btn:rotate-12 transition-transform duration-200" />
                    <span>Mở chỉnh sửa</span>
                  </button>

                  <div className="flex items-center space-x-1">
                    <a
                      href={getPptxExportUrl(pres.id)}
                      download
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 text-slate-500 hover:text-orange-600 dark:text-slate-400 dark:hover:text-orange-400 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-90 hover:scale-105 rounded-xl transition-all duration-150 border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                      title="Tải xuống PowerPoint (.PPTX)"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => {
                        if (confirm(`Bạn có chắc chắn muốn xóa bài trình chiếu "${pres.title}"?`)) {
                          onDeletePresentation(pres.id);
                        }
                      }}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 active:scale-90 hover:scale-105 rounded-xl transition-all duration-150 border border-transparent hover:border-red-200 dark:hover:border-red-900/50"
                      title="Xóa bài trình chiếu này"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
