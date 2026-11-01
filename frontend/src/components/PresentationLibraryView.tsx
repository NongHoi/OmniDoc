import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Presentation, 
  Eye, 
  ArrowRight, 
  Layers, 
  Sparkles, 
  RefreshCw, 
  FolderOpen, 
  SlidersHorizontal, 
  MonitorPlay, 
  Download, 
  Plus,
  Edit3,
  Trash2,
  ShieldCheck
} from '../icons/index.js';
import { PresentationTemplate } from '../types/index.js';

interface PresentationLibraryViewProps {
  templates: PresentationTemplate[];
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
  onPreview: (template: PresentationTemplate) => void;
  onUseTemplate: (template: PresentationTemplate) => void;
  onCreateBlankPres?: () => void;
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  categories: Record<string, number>;
  isAdmin?: boolean;
  onOpenAddModal?: () => void;
  onEditTemplate?: (template: PresentationTemplate) => void;
  onDeleteTemplate?: (template: PresentationTemplate) => void;
}

export const PresentationLibraryView: React.FC<PresentationLibraryViewProps> = ({
  templates,
  loading,
  error,
  onRefresh,
  onPreview,
  onUseTemplate,
  onCreateBlankPres,
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
  const [sortBy, setSortBy] = useState<'newest' | 'title'>('newest');

  const categoryList = useMemo(() => {
    const defaultCats = ['Tất cả', 'Kinh doanh', 'Báo cáo', 'Đào tạo', 'Marketing', 'Khởi nghiệp', 'Doanh nghiệp'];
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
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return a.title.localeCompare(b.title, 'vi');
    });
  }, [templates, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="space-y-6">
      
      {/* Hero Workspace Header (Anti-Slop Editorial Design) */}
      <div className="relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-xs">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-2.5 py-1 bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 rounded-lg text-xs font-medium text-orange-700 dark:text-orange-300 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
              <span>Sản phẩm 2 • Thư viện Mẫu Trình chiếu PowerPoint</span>
            </div>

            <h1 className="text-2xl sm:text-[26px] font-bold tracking-tight text-slate-900 dark:text-white leading-snug">
              Kho Mẫu Slide Thuyết Trình & Pitch Deck Chuẩn
            </h1>

            <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
              Xem trước toàn bộ các slide trong từng template, nhân bản bản sao độc lập với 1 cú click. Tích hợp trình biên tập slide, chế độ trình chiếu và xuất file PowerPoint (.PPTX) tiêu chuẩn.
            </p>

            {/* Quick Metrics Bar */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                <span className="text-slate-900 dark:text-slate-200 font-semibold tabular-nums">{templates.length} bộ template</span>
              </div>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="text-slate-700 dark:text-slate-300">Trình chiếu Toàn màn hình</span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="text-slate-700 dark:text-slate-300">Xuất Microsoft PowerPoint (.PPTX)</span>
            </div>
          </div>

          {/* Admin Hero Action Button */}
          {isAdmin && onOpenAddModal && (
            <div className="shrink-0 flex flex-col sm:flex-row md:flex-col gap-2">
              <button
                onClick={onOpenAddModal}
                className="flex items-center justify-center space-x-2 px-4 py-2.5 bg-orange-600 hover:bg-orange-700 active:scale-95 text-white text-xs font-bold rounded-xl shadow-md shadow-orange-500/25 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>+ Thêm mẫu slide vào kho</span>
              </button>
              <div className="text-[11px] text-orange-600 dark:text-orange-400 font-semibold text-center md:text-right flex items-center justify-center md:justify-end space-x-1">
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
              placeholder="Tìm kiếm mẫu slide theo tên, chủ đề, từ khóa..."
              className="w-full pl-10 pr-10 py-2.5 text-sm bg-slate-50 dark:bg-slate-950/80 border border-slate-300 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
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
                    ? 'bg-white dark:bg-orange-600 text-orange-600 dark:text-white shadow-xs' 
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
                title="Hiển thị dạng lưới"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-all ${
                  viewMode === 'list' 
                    ? 'bg-white dark:bg-orange-600 text-orange-600 dark:text-white shadow-xs' 
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
                title="Hiển thị dạng danh sách"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={onRefresh}
              className="group p-2 text-slate-500 hover:text-orange-600 dark:text-slate-400 dark:hover:text-orange-400 hover:bg-slate-100 dark:hover:bg-slate-800/80 active:scale-90 rounded-xl transition-all border border-slate-200 dark:border-slate-800"
              title="Làm mới dữ liệu"
            >
              <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500 ease-out" />
            </button>

            {onCreateBlankPres && (
              <button
                onClick={onCreateBlankPres}
                className="flex items-center space-x-1.5 px-3 py-2 bg-orange-600 hover:bg-orange-700 active:scale-95 text-white text-xs font-semibold rounded-xl shadow-xs hover:shadow-md transition-all duration-150 shrink-0"
                title="Tạo bản trình chiếu mới (trống)"
              >
                <Plus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Tạo slide mới</span>
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
                    ? 'bg-orange-600 text-white shadow-md shadow-orange-500/20'
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
          {[1, 2, 3, 4].map(n => (
            <div key={n} className="bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4">
              <div className="w-full aspect-video bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4"></div>
              <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-full"></div>
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 rounded-2xl p-6 text-center text-red-700 dark:text-red-300">
          <p className="font-semibold text-base">Đã xảy ra lỗi khi tải mẫu trình chiếu</p>
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
          <div className="w-16 h-16 bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-2xl mx-auto flex items-center justify-center mb-4 border border-orange-200 dark:border-orange-500/20">
            <FolderOpen className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Không tìm thấy mẫu slide phù hợp</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Không có mẫu trình chiếu nào khớp với từ khóa "{activeSearch}" hoặc danh mục "{activeCat}".
          </p>
          <button
            onClick={() => { handleSearchChange(''); handleCatChange('Tất cả'); }}
            className="mt-5 px-5 py-2.5 bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold rounded-xl shadow-md transition-all"
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
                const coverSlide = tpl.slides[0];
                return (
                  <div
                    key={tpl.id}
                    style={{ animationDelay: `${Math.min(idx * 40, 300)}ms` }}
                    className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-orange-400/60 dark:hover:border-orange-500/50 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col overflow-hidden animate-fade-in-up"
                  >
                    {/* Slide 16:9 Aspect Ratio Preview Thumbnail */}
                    <div 
                      className="relative aspect-video p-5 flex flex-col justify-between overflow-hidden cursor-pointer"
                      style={{
                        background: coverSlide?.background || `linear-gradient(135deg, ${tpl.theme?.secondaryColor || '#7c2d12'} 0%, ${tpl.theme?.primaryColor || '#c43e1c'} 100%)`
                      }}
                      onClick={() => onPreview(tpl)}
                    >
                      {/* Top Badges */}
                      <div className="flex items-center justify-between z-10">
                        <span className="px-2.5 py-0.5 text-xs font-medium bg-black/50 backdrop-blur-md text-white rounded-lg border border-white/10">
                          {tpl.category}
                        </span>
                        <div className="flex items-center space-x-1.5">
                          {isAdmin && (
                            <div className="flex items-center space-x-1 mr-1">
                              {onEditTemplate && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onEditTemplate(tpl);
                                  }}
                                  className="p-1 bg-black/60 hover:bg-orange-600 text-white rounded-md border border-white/20 transition-colors cursor-pointer"
                                  title="Sửa mẫu slide này (Admin)"
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
                                  className="p-1 bg-black/60 hover:bg-red-600 text-white rounded-md border border-white/20 transition-colors cursor-pointer"
                                  title="Xóa mẫu slide này (Admin)"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                          )}
                          <span className="px-2.5 py-0.5 text-xs font-medium bg-black/50 backdrop-blur-md text-orange-200 rounded-lg flex items-center space-x-1.5 border border-white/10 tabular-nums">
                            <Layers className="w-3 h-3 text-orange-400" />
                            <span>{tpl.slidesCount || tpl.slides.length} slides</span>
                          </span>
                        </div>
                      </div>

                      {/* Cover Slide Title Preview */}
                      <div className="my-auto z-10 text-center px-4 group-hover:scale-105 transition-transform duration-200">
                        <h4 className="text-white font-extrabold text-base sm:text-lg line-clamp-2 drop-shadow-md">
                          {coverSlide?.title || tpl.title}
                        </h4>
                        {coverSlide?.subtitle && (
                          <p className="text-white/80 text-xs line-clamp-1 mt-1.5 drop-shadow-sm font-medium">
                            {coverSlide.subtitle}
                          </p>
                        )}
                      </div>

                      {/* Bottom Banner Info */}
                      <div className="flex items-center justify-between text-xs text-white/80 z-10 pt-2 border-t border-white/15">
                        <span className="font-mono text-xs bg-white/20 px-2 py-0.5 rounded font-medium">PowerPoint</span>
                        <span className="text-orange-200 flex items-center font-semibold group-hover:underline">
                          <Eye className="w-3.5 h-3.5 mr-1" /> Xem toàn bộ slide
                        </span>
                      </div>

                      {/* Vignette Overlay */}
                      <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/40 pointer-events-none" />
                    </div>

                    {/* Template Card Details */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <div 
                            className="w-3 h-3 rounded-full shrink-0 shadow-xs" 
                            style={{ backgroundColor: tpl.theme?.primaryColor || '#c43e1c' }}
                            title={`Theme: ${tpl.theme?.name || 'Mặc định'}`}
                          />
                          <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-1">
                            {tpl.title}
                          </h3>
                        </div>
                        
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                          {tpl.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {tpl.tags.map(tag => (
                            <span key={tag} className="text-xs px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-md border border-slate-200 dark:border-slate-700/60">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Card Footer Actions */}
                      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => onPreview(tpl)}
                            className="group/prev flex items-center justify-center space-x-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700/80 active:scale-95 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700/70 transition-all duration-150 cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 group-hover/prev:scale-110 transition-transform duration-200" />
                            <span>Xem trước slide</span>
                          </button>
                          <button
                            onClick={() => onUseTemplate(tpl)}
                            className="group/use flex items-center justify-center space-x-1.5 px-3 py-2 bg-orange-600 hover:bg-orange-700 active:scale-95 text-white text-xs font-semibold rounded-xl shadow-xs hover:shadow-md transition-all duration-150 cursor-pointer"
                          >
                            <span>Sử dụng mẫu</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover/use:translate-x-1 transition-transform duration-200" />
                          </button>
                        </div>

                        {/* Admin Action Row in Grid Footer */}
                        {isAdmin && (
                          <div className="flex items-center justify-between pt-1.5 border-t border-slate-100 dark:border-slate-800/80 text-[11px]">
                            <span className="text-slate-400 font-medium">Quyền Admin:</span>
                            <div className="flex items-center space-x-1.5">
                              {onEditTemplate && (
                                <button
                                  onClick={() => onEditTemplate(tpl)}
                                  className="px-2 py-0.5 rounded-md bg-orange-50 dark:bg-orange-950 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800 hover:bg-orange-100 font-medium transition-colors flex items-center space-x-1 cursor-pointer"
                                  title="Chỉnh sửa thông tin mẫu slide"
                                >
                                  <Edit3 className="w-3 h-3" />
                                  <span>Sửa mẫu</span>
                                </button>
                              )}
                              {onDeleteTemplate && (
                                <button
                                  onClick={() => onDeleteTemplate(tpl)}
                                  className="px-2 py-0.5 rounded-md bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800 hover:bg-red-100 font-medium transition-colors flex items-center space-x-1 cursor-pointer"
                                  title="Xóa mẫu slide khỏi thư viện"
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
              {filteredTemplates.map(tpl => (
                <div key={tpl.id} className="p-4 sm:p-5 hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start space-x-4">
                    <div 
                      className="w-16 h-12 rounded-xl flex items-center justify-center text-white shrink-0 shadow-md font-bold"
                      style={{ background: tpl.theme?.primaryColor || '#c43e1c' }}
                    >
                      <Presentation className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 text-xs font-medium bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400 border border-orange-200 dark:border-orange-500/20 rounded-md">
                          {tpl.category}
                        </span>
                        <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100">{tpl.title}</h3>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-2xl line-clamp-1">{tpl.description}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-slate-500">
                        <span>{tpl.slidesCount || tpl.slides.length} slide chuẩn</span>
                        <span>•</span>
                        <span>Bảng màu: {tpl.theme?.name}</span>
                        <span>•</span>
                        <span className="font-mono text-orange-600 dark:text-orange-400">Định dạng PPTX</span>
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
                            className="px-2.5 py-1.5 bg-orange-50 hover:bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300 text-xs font-semibold rounded-xl flex items-center space-x-1 border border-orange-200 dark:border-orange-800 transition-colors cursor-pointer"
                            title="Sửa mẫu slide này"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Sửa</span>
                          </button>
                        )}
                        {onDeleteTemplate && (
                          <button
                            onClick={() => onDeleteTemplate(tpl)}
                            className="px-2.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 text-xs font-semibold rounded-xl flex items-center space-x-1 border border-red-200 dark:border-red-800 transition-colors cursor-pointer"
                            title="Xóa mẫu slide này"
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
                      <span>Xem trước slide</span>
                    </button>
                    <button
                      onClick={() => onUseTemplate(tpl)}
                      className="px-4 py-1.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold rounded-xl flex items-center space-x-1.5 shadow-md shadow-orange-500/20 cursor-pointer"
                    >
                      <span>Tạo bài thuyết trình</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

    </div>
  );
};
