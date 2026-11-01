import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  FileText, 
  Eye, 
  ArrowRight, 
  Download, 
  User, 
  Sparkles, 
  RefreshCw, 
  FolderOpen, 
  CheckCircle2, 
  SlidersHorizontal, 
  Plus,
  Edit3,
  Trash2,
  ShieldCheck
} from '../icons/index.js';
import { DocumentTemplate } from '../types/index.js';

interface DocumentLibraryViewProps {
  templates: DocumentTemplate[];
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
  onPreview: (template: DocumentTemplate) => void;
  onUseTemplate: (template: DocumentTemplate) => void;
  onCreateBlankDoc?: () => void;
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  categories: Record<string, number>;
  isAdmin?: boolean;
  onOpenAddModal?: () => void;
  onEditTemplate?: (template: DocumentTemplate) => void;
  onDeleteTemplate?: (template: DocumentTemplate) => void;
}

export const DocumentLibraryView: React.FC<DocumentLibraryViewProps> = ({
  templates,
  loading,
  error,
  onRefresh,
  onPreview,
  onUseTemplate,
  onCreateBlankDoc,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  categories,
  isAdmin = false,
  onOpenAddModal,
  onEditTemplate,
  onDeleteTemplate
}) => {
  const [internalSearchQuery, setInternalSearchQuery] = useState('');
  const [internalSelectedCategory, setInternalSelectedCategory] = useState('Tất cả');

  const activeSearch = searchQuery !== undefined ? searchQuery : internalSearchQuery;
  const handleSearchChange = onSearchChange || setInternalSearchQuery;

  const activeCat = selectedCategory !== undefined ? selectedCategory : internalSelectedCategory;
  const handleCatChange = onSelectCategory || setInternalSelectedCategory;

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'popular' | 'newest' | 'title'>('popular');

  const categoryList = useMemo(() => {
    const defaultCats = ['Tất cả', 'Hợp đồng', 'Nhân sự', 'Hành chính', 'Kinh doanh', 'Báo cáo', 'Tuyển dụng'];
    const dynamicCats = Object.keys(categories);
    const set = new Set([...defaultCats, ...dynamicCats]);
    return Array.from(set);
  }, [categories]);

  const filteredTemplates = useMemo(() => {
    return templates.filter(t => {
      const matchCat = activeCat === 'Tất cả' || t.category.toLowerCase() === activeCat.toLowerCase();
      const matchSearch = !activeSearch.trim() || 
        t.title.toLowerCase().includes(activeSearch.toLowerCase()) ||
        t.description.toLowerCase().includes(activeSearch.toLowerCase()) ||
        t.tags.some(tag => tag.toLowerCase().includes(activeSearch.toLowerCase()));
      return matchCat && matchSearch;
    }).sort((a, b) => {
      if (sortBy === 'popular') return (b.downloadsCount || 0) - (a.downloadsCount || 0);
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return a.title.localeCompare(b.title, 'vi');
    });
  }, [templates, activeCat, activeSearch, sortBy]);

  const getCategoryBadgeClass = (category: string) => {
    switch (category.toLowerCase()) {
      case 'hợp đồng':
        return 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-500/20';
      case 'nhân sự':
        return 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20';
      case 'hành chính':
        return 'bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-500/20';
      case 'kinh doanh':
        return 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/20';
      case 'báo cáo':
        return 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border-cyan-200 dark:border-cyan-500/20';
      default:
        return 'bg-slate-100 dark:bg-slate-500/10 text-slate-700 dark:text-slate-400 border-slate-200 dark:border-slate-500/20';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Hero Workspace Header (Anti-Slop Editorial Design) */}
      <div className="relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-xs">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-2.5 py-1 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-lg text-xs font-medium text-blue-700 dark:text-blue-300 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Sản phẩm 1 • Thư viện Mẫu Văn bản</span>
            </div>

            <h1 className="text-2xl sm:text-[26px] font-bold tracking-tight text-slate-900 dark:text-white leading-snug">
              Kho Mẫu Tài Liệu & Hợp Đồng Văn Phòng
            </h1>
            
            <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
              Tìm kiếm, xem trước định dạng chuẩn và khởi tạo văn bản ngay lập tức. Tích hợp trình soạn thảo WYSIWYG, điền biến thông minh và xuất Microsoft Word (.DOCX) bảo toàn định dạng.
            </p>

            {/* Quick Metrics Bar */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-slate-900 dark:text-slate-200 font-semibold tabular-nums">{templates.length} mẫu chuẩn</span>
              </div>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="text-slate-700 dark:text-slate-300">Bảo toàn bản gốc</span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="text-slate-700 dark:text-slate-300">Xuất DOCX, PDF, HTML</span>
            </div>
          </div>

          {/* Admin Hero Action Button */}
          {isAdmin && onOpenAddModal && (
            <div className="shrink-0 flex flex-col sm:flex-row md:flex-col gap-2">
              <button
                onClick={onOpenAddModal}
                className="flex items-center justify-center space-x-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-500/25 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>+ Thêm mẫu mới vào kho</span>
              </button>
              <div className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold text-center md:text-right flex items-center justify-center md:justify-end space-x-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Quyền Admin: Thêm / Sửa / Xóa</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Search, Filter & View Controls */}
      <div className="bg-white dark:bg-slate-900/70 backdrop-blur-xl p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-md space-y-4 transition-colors">
        
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={activeSearch}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Tìm kiếm mẫu văn bản theo tên, nội dung hoặc từ khóa..."
              className="w-full pl-10 pr-10 py-2.5 text-sm bg-slate-50 dark:bg-slate-950/80 border border-slate-300 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            {activeSearch && (
              <button 
                onClick={() => handleSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-200 dark:bg-slate-800 rounded-full w-5 h-5 flex items-center justify-center transition-colors"
              >
                ✕
              </button>
            )}
          </div>

          {/* Sort & View Mode Controls */}
          <div className="flex items-center flex-wrap gap-2">
            
            <div className="flex items-center space-x-1.5 bg-slate-100 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl px-2.5 py-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-xs text-slate-700 dark:text-slate-300 focus:outline-none font-medium pr-1 py-1 cursor-pointer"
              >
                <option value="popular" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">Phổ biến nhất</option>
                <option value="newest" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">Mới cập nhật</option>
                <option value="title" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">Tên A-Z</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-950/80 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-all ${
                  viewMode === 'grid' 
                    ? 'bg-white dark:bg-blue-600 text-blue-600 dark:text-white shadow-xs' 
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
                title="Hiển thị dạng lưới (Grid)"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-all ${
                  viewMode === 'list' 
                    ? 'bg-white dark:bg-blue-600 text-blue-600 dark:text-white shadow-xs' 
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
                title="Hiển thị dạng danh sách (List)"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={onRefresh}
              className="group p-2 text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800/80 active:scale-90 rounded-xl transition-all border border-slate-200 dark:border-slate-800"
              title="Làm mới dữ liệu"
            >
              <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500 ease-out" />
            </button>

            {onCreateBlankDoc && (
              <button
                onClick={onCreateBlankDoc}
                className="flex items-center space-x-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-semibold rounded-xl shadow-xs hover:shadow-md transition-all duration-150 shrink-0"
                title="Tạo văn bản mới từ đầu (trống)"
              >
                <Plus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Soạn văn bản mới</span>
              </button>
            )}
          </div>
        </div>

        {/* Category Pills Filter */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none -mx-1 px-1">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mr-1 shrink-0">
            Danh mục:
          </span>
          {categoryList.map(cat => {
            const count = cat === 'Tất cả' 
              ? templates.length 
              : categories[cat] || templates.filter(t => t.category.toLowerCase() === cat.toLowerCase()).length;
            const isSelected = activeCat.toLowerCase() === cat.toLowerCase();

            return (
              <button
                key={cat}
                onClick={() => handleCatChange(cat)}
                className={`whitespace-nowrap px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all duration-150 active:scale-95 flex items-center space-x-2 ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-slate-100 dark:bg-slate-950/70 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800/60 border border-slate-200 dark:border-slate-800/80'
                }`}
              >
                <span>{cat}</span>
                <span className={`px-1.5 py-0.2 text-xs rounded-full font-medium tabular-nums ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3, 4, 5, 6].map(n => (
            <div key={n} className="bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4">
              <div className="w-full h-40 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4"></div>
              <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-full"></div>
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 rounded-2xl p-6 text-center text-red-700 dark:text-red-300">
          <p className="font-semibold text-base">Đã xảy ra lỗi khi tải mẫu văn bản</p>
          <p className="text-sm mt-1 text-red-600 dark:text-red-400">{error}</p>
          <button
            onClick={onRefresh}
            className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-semibold rounded-xl transition-colors"
          >
            Thử lại
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && filteredTemplates.length === 0 && (
        <div className="bg-white dark:bg-slate-900/50 rounded-3xl border border-slate-200 dark:border-slate-800 p-12 text-center max-w-lg mx-auto shadow-sm">
          <div className="w-16 h-16 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-2xl mx-auto flex items-center justify-center mb-4 border border-blue-200 dark:border-blue-500/20">
            <FolderOpen className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Không tìm thấy mẫu phù hợp</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Không có mẫu văn bản nào khớp với từ khóa "{activeSearch}" hoặc danh mục "{activeCat}".
          </p>
          <button
            onClick={() => { handleSearchChange(''); handleCatChange('Tất cả'); }}
            className="mt-5 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl shadow-md transition-all"
          >
            Xóa bộ lọc & Xem tất cả
          </button>
        </div>
      )}

      {/* Template Grid View */}
      {!loading && !error && filteredTemplates.length > 0 && (
        <>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredTemplates.map((tpl, idx) => {
                const badgeClass = getCategoryBadgeClass(tpl.category);
                return (
                  <div
                    key={tpl.id}
                    style={{ animationDelay: `${Math.min(idx * 40, 300)}ms` }}
                    className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-400/60 dark:hover:border-blue-500/50 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col overflow-hidden animate-fade-in-up"
                  >
                    {/* Realistic A4 Document Preview Thumbnail */}
                    <div className="relative h-48 bg-slate-50 dark:bg-slate-950 p-4 flex items-center justify-center border-b border-slate-200 dark:border-slate-800/80 overflow-hidden">
                      
                      {/* Document Mockup Paper */}
                      <div className="w-28 h-36 bg-white rounded-md shadow-xs p-3 flex flex-col justify-between border border-slate-200/90 group-hover:scale-105 transition-transform duration-200">
                        <div className="flex items-center justify-between border-b border-slate-200 pb-1">
                          <FileText className="w-3.5 h-3.5 text-blue-600" />
                          <span className="text-xs font-semibold text-slate-500 font-mono">Word</span>
                        </div>
                        <div className="space-y-1.5 my-auto">
                          <div className="w-full h-1 bg-slate-700 dark:bg-slate-300 rounded"></div>
                          <div className="w-4/5 h-1 bg-slate-300 dark:bg-slate-600 rounded"></div>
                          <div className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded"></div>
                          <div className="w-3/4 h-1 bg-slate-200 dark:bg-slate-700 rounded"></div>
                          <div className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded"></div>
                        </div>
                        <div className="flex justify-between items-center pt-1 border-t border-slate-100">
                          <div className="w-6 h-1 bg-blue-600 rounded"></div>
                          <div className="w-4 h-1 bg-slate-300 rounded"></div>
                        </div>
                      </div>

                      {/* Top Category Badge */}
                      <span className={`absolute top-3 left-3 px-2.5 py-0.5 text-xs font-medium rounded-lg border backdrop-blur-md ${badgeClass}`}>
                        {tpl.category}
                      </span>

                      {/* Version Pill & Admin Actions */}
                      <div className="absolute top-3 right-3 flex items-center space-x-1.5">
                        {isAdmin && (
                          <div className="flex items-center space-x-1 mr-1">
                            {onEditTemplate && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onEditTemplate(tpl);
                                }}
                                className="p-1 bg-white/90 hover:bg-blue-600 text-slate-700 hover:text-white dark:bg-slate-900/90 dark:text-slate-300 dark:hover:text-white rounded-md border border-slate-200 dark:border-slate-800 shadow-xs transition-all cursor-pointer"
                                title="Sửa mẫu này (Admin)"
                              >
                                <Edit3 className="w-3 h-3" />
                              </button>
                            )}
                            {onDeleteTemplate && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onDeleteTemplate(tpl);
                                }}
                                className="p-1 bg-white/90 hover:bg-red-600 text-slate-700 hover:text-white dark:bg-slate-900/90 dark:text-slate-300 dark:hover:text-white rounded-md border border-slate-200 dark:border-slate-800 shadow-xs transition-all cursor-pointer"
                                title="Xóa mẫu này (Admin)"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        )}
                        <span className="px-2 py-0.5 text-xs font-mono text-slate-600 dark:text-slate-400 bg-white/90 dark:bg-slate-900/80 rounded-md border border-slate-200 dark:border-slate-800 shadow-2xs">
                          v{tpl.version}
                        </span>
                      </div>
                    </div>

                    {/* Card Content Body */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                          {tpl.title}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                          {tpl.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {tpl.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="text-xs px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-md border border-slate-200 dark:border-slate-700/60">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Card Footer */}
                      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80">
                        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-3">
                          <span className="flex items-center truncate max-w-[150px]">
                            <User className="w-3 h-3 mr-1 text-slate-400 dark:text-slate-500" /> {tpl.author}
                          </span>
                          <span className="flex items-center font-medium text-slate-600 dark:text-slate-300 tabular-nums">
                            <Download className="w-3 h-3 mr-1 text-slate-400 dark:text-slate-500" /> {tpl.downloadsCount} lượt
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => onPreview(tpl)}
                            className="group/prev flex items-center justify-center space-x-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700/80 active:scale-95 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700/70 transition-all duration-150 cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 group-hover/prev:scale-110 transition-transform duration-200" />
                            <span>Xem trước</span>
                          </button>
                          <button
                            onClick={() => onUseTemplate(tpl)}
                            className="group/use flex items-center justify-center space-x-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-semibold rounded-xl shadow-xs hover:shadow-md transition-all duration-150 cursor-pointer"
                          >
                            <span>Sử dụng</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover/use:translate-x-1 transition-transform duration-200" />
                          </button>
                        </div>

                        {/* Admin Action Row in Grid Footer */}
                        {isAdmin && (
                          <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80 text-[11px]">
                            <span className="text-slate-400 font-medium">Quyền Admin:</span>
                            <div className="flex items-center space-x-1.5">
                              {onEditTemplate && (
                                <button
                                  onClick={() => onEditTemplate(tpl)}
                                  className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 font-medium transition-colors flex items-center space-x-1 cursor-pointer"
                                  title="Chỉnh sửa thông tin mẫu"
                                >
                                  <Edit3 className="w-3 h-3" />
                                  <span>Sửa mẫu</span>
                                </button>
                              )}
                              {onDeleteTemplate && (
                                <button
                                  onClick={() => onDeleteTemplate(tpl)}
                                  className="px-2 py-0.5 rounded-md bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800 hover:bg-red-100 font-medium transition-colors flex items-center space-x-1 cursor-pointer"
                                  title="Xóa mẫu khỏi thư viện"
                                >
                                  <Trash2 className="w-3 h-3" />
                                  <span>Xóa</span>
                                </button>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* List View */
            <div className="bg-white dark:bg-slate-900/70 rounded-2xl border border-slate-200 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800/80 shadow-sm dark:shadow-md overflow-hidden">
              {filteredTemplates.map(tpl => {
                const badgeClass = getCategoryBadgeClass(tpl.category);
                return (
                  <div key={tpl.id} className="p-4 sm:p-5 hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-14 bg-blue-50 dark:bg-gradient-to-br dark:from-blue-900/50 dark:to-indigo-950/50 border border-blue-200 dark:border-blue-500/20 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-0.5 text-xs font-medium rounded-md border ${badgeClass}`}>
                            {tpl.category}
                          </span>
                          <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100">{tpl.title}</h3>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-2xl line-clamp-1">{tpl.description}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-slate-400 dark:text-slate-500">
                          <span>Tác giả: {tpl.author}</span>
                          <span>•</span>
                          <span>{tpl.downloadsCount} lượt dùng</span>
                          <span>•</span>
                          <span className="font-mono">v{tpl.version}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 self-end sm:self-auto shrink-0">
                      {/* Admin List Actions */}
                      {isAdmin && (
                        <>
                          {onEditTemplate && (
                            <button
                              onClick={() => onEditTemplate(tpl)}
                              className="px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 text-xs font-semibold rounded-xl flex items-center space-x-1 border border-blue-200 dark:border-blue-800 transition-colors cursor-pointer"
                              title="Sửa mẫu này"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">Sửa</span>
                            </button>
                          )}
                          {onDeleteTemplate && (
                            <button
                              onClick={() => onDeleteTemplate(tpl)}
                              className="px-2.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 text-xs font-semibold rounded-xl flex items-center space-x-1 border border-red-200 dark:border-red-800 transition-colors cursor-pointer"
                              title="Xóa mẫu này"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">Xóa</span>
                            </button>
                          )}
                        </>
                      )}

                      <button
                        onClick={() => onPreview(tpl)}
                        className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-xl flex items-center space-x-1.5 border border-slate-200 dark:border-slate-700 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Xem trước</span>
                      </button>
                      <button
                        onClick={() => onUseTemplate(tpl)}
                        className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl flex items-center space-x-1.5 shadow-md shadow-blue-500/20 cursor-pointer"
                      >
                        <span>Sử dụng mẫu</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

    </div>
  );
};
