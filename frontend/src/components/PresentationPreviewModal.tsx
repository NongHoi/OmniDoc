import React, { useState, useEffect } from 'react';
import { 
  X, 
  Presentation, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles,
  Palette,
  Edit3,
  Trash2
} from '../icons/index.js';
import { PresentationTemplate, Slide } from '../types/index.js';

interface PresentationPreviewModalProps {
  template: PresentationTemplate | null;
  isOpen: boolean;
  onClose: () => void;
  onUseTemplate: (template: PresentationTemplate) => void;
  isAdmin?: boolean;
  onEditTemplate?: (template: PresentationTemplate) => void;
  onDeleteTemplate?: (template: PresentationTemplate) => void;
}

export const PresentationPreviewModal: React.FC<PresentationPreviewModalProps> = ({
  template,
  isOpen,
  onClose,
  onUseTemplate,
  isAdmin = false,
  onEditTemplate,
  onDeleteTemplate
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    setCurrentSlideIndex(0);
  }, [template]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen || !template) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        setCurrentSlideIndex(prev => Math.min(prev + 1, template.slides.length - 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlideIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, template, onClose]);

  if (!isOpen || !template) return null;

  const currentSlide: Slide = template.slides[currentSlideIndex] || template.slides[0];
  const theme = template.theme;

  const getSlideStyle = (slide: Slide) => {
    const hasCustomBg = Boolean(slide.background && slide.background.trim());
    const bg = hasCustomBg ? slide.background : (theme.backgroundColor || '#ffffff');
    const textColor = hasCustomBg ? '#ffffff' : (theme.textColor || '#0f172a');
    return {
      background: bg,
      color: textColor,
      fontFamily: `'Plus Jakarta Sans', system-ui, -apple-system, sans-serif`
    };
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 animate-modal-backdrop"
      onClick={onClose}
    >
      <div 
        className="relative bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-6xl max-h-[94vh] flex flex-col overflow-hidden text-slate-800 dark:text-slate-200 animate-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950">
          <div className="flex items-center space-x-3">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md font-bold"
              style={{ backgroundColor: theme.primaryColor || '#c43e1c' }}
            >
              <Presentation className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 text-xs font-semibold bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 rounded-md">
                  {template.category}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                  Slide {currentSlideIndex + 1} / {template.slides.length}
                </span>
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
                    className="flex items-center space-x-1.5 px-3 py-2 bg-orange-50 hover:bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300 text-xs font-semibold rounded-xl border border-orange-200 dark:border-orange-800 transition-colors cursor-pointer"
                    title="Chỉnh sửa mẫu slide này (Admin)"
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
                    title="Xóa mẫu slide này (Admin)"
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
              className="group/use flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 active:scale-95 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 transition-all duration-150 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 group-hover/use:rotate-12 transition-transform duration-200" />
              <span>Sử dụng mẫu này</span>
              <ArrowRight className="w-4 h-4 group-hover/use:translate-x-1 transition-transform duration-200" />
            </button>
            <button
              onClick={onClose}
              className="group/close p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl transition-all duration-150 active:scale-95"
              title="Đóng (Esc)"
            >
              <X className="w-5 h-5 group-hover/close:rotate-90 transition-transform duration-200" />
            </button>
          </div>
        </div>

        {/* Modal Main Area: Left Filmstrip + Center 16:9 Viewport */}
        <div className="flex-1 flex overflow-hidden bg-slate-100/70 dark:bg-slate-950">
          
          {/* Left Thumbnail Strip */}
          <div className="w-64 bg-slate-50 dark:bg-slate-950 p-4 border-r border-slate-200 dark:border-slate-800/80 overflow-y-auto space-y-3 hidden md:block">
            <div className="text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider mb-2 flex items-center justify-between">
              <span>Danh sách slide</span>
              <span className="text-orange-600 dark:text-orange-400 font-semibold">{template.slides.length} slides</span>
            </div>
            {template.slides.map((s, idx) => {
              const isSelected = idx === currentSlideIndex;
              return (
                <div
                  key={s.id || idx}
                  onClick={() => setCurrentSlideIndex(idx)}
                  className={`cursor-pointer rounded-xl p-3 transition-all border ${
                    isSelected
                      ? 'bg-orange-50/70 dark:bg-slate-900 border-orange-500 shadow-md ring-1 ring-orange-500/40 text-slate-900 dark:text-white'
                      : 'bg-white dark:bg-slate-900/40 border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] mb-1.5">
                    <span className="font-bold text-slate-700 dark:text-slate-300">#{s.slideNumber}</span>
                    <span className="text-[9px] uppercase font-mono px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {s.layout}
                    </span>
                  </div>
                  <div className="text-xs font-semibold truncate">
                    {s.title}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Center 16:9 Slide Canvas */}
          <div className="flex-1 p-4 sm:p-8 flex flex-col items-center justify-center relative overflow-hidden bg-slate-200/50 dark:bg-slate-950">
            
            {/* 16:9 Slide Aspect Ratio Card */}
            <div 
              className="w-full max-w-4xl aspect-video rounded-2xl shadow-2xl relative overflow-hidden flex flex-col justify-between p-8 sm:p-12 transition-all duration-300 border border-slate-300 dark:border-slate-800 bg-white"
              style={getSlideStyle(currentSlide)}
            >
              {/* Accent Header Bar for Standard Slides */}
              {!currentSlide.background && (
                <div 
                  className="absolute top-0 left-0 right-0 h-2.5"
                  style={{ backgroundColor: theme.primaryColor || '#c43e1c' }}
                />
              )}

              {/* Render Slide by Layout */}
              {currentSlide.layout === 'title' ? (
                /* Cover Slide */
                <div className="my-auto text-center space-y-4">
                  <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight drop-shadow-md">
                    {currentSlide.title}
                  </h1>
                  {currentSlide.subtitle && (
                    <p className="text-sm sm:text-lg opacity-90 max-w-2xl mx-auto leading-relaxed font-medium">
                      {currentSlide.subtitle}
                    </p>
                  )}
                  {currentSlide.elements.map(el => (
                    el.type === 'paragraph' && (
                      <p key={el.id} className="text-xs sm:text-sm opacity-75 font-medium pt-2">
                        {String(el.content)}
                      </p>
                    )
                  ))}
                </div>
              ) : currentSlide.layout === 'stats-kpi' ? (
                /* Stats / KPI Layout */
                <div className="space-y-6">
                  <div>
                    <h2 
                      className="text-xl sm:text-2xl font-extrabold tracking-tight"
                      style={{ color: currentSlide.background ? '#ffffff' : theme.primaryColor }}
                    >
                      {currentSlide.title}
                    </h2>
                    {currentSlide.subtitle && (
                      <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        {currentSlide.subtitle}
                      </p>
                    )}
                  </div>

                  {/* KPI Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-2">
                    {currentSlide.elements.map(el => {
                      if (el.type === 'kpis' && Array.isArray(el.content)) {
                        return (el.content as any[]).map((kpi, kIdx) => (
                          <div 
                            key={kIdx} 
                            className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-center shadow-xs"
                          >
                            <div 
                              className="text-2xl sm:text-3xl font-extrabold tracking-tight"
                              style={{ color: theme.primaryColor }}
                            >
                              {kpi.value}
                            </div>
                            <div className="text-xs font-bold text-slate-800 mt-1">
                              {kpi.label}
                            </div>
                            {kpi.desc && (
                              <div className="text-[10px] text-slate-400 mt-1">
                                {kpi.desc}
                              </div>
                            )}
                          </div>
                        ));
                      }
                      return null;
                    })}
                  </div>
                </div>
              ) : currentSlide.layout === 'two-columns' ? (
                /* Two Columns Layout */
                <div className="space-y-4">
                  <div>
                    <h2 
                      className="text-xl sm:text-2xl font-extrabold tracking-tight"
                      style={{ color: currentSlide.background ? '#ffffff' : theme.primaryColor }}
                    >
                      {currentSlide.title}
                    </h2>
                    {currentSlide.subtitle && (
                      <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        {currentSlide.subtitle}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    {currentSlide.elements.map((el, eIdx) => (
                      <div key={el.id || eIdx} className="space-y-2">
                        {el.type === 'paragraph' && (
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
                            {String(el.content)}
                          </p>
                        )}
                        {el.type === 'bullets' && Array.isArray(el.content) && (
                          <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                            {(el.content as string[]).map((bullet, bIdx) => (
                              <li key={bIdx} className="flex items-start space-x-2">
                                <span 
                                  className="w-2 h-2 rounded-full mt-1.5 shrink-0" 
                                  style={{ backgroundColor: theme.primaryColor }}
                                />
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* Standard Content & Bullets */
                <div className="space-y-6">
                  <div>
                    <h2 
                      className="text-xl sm:text-2xl font-extrabold tracking-tight"
                      style={{ color: currentSlide.background ? '#ffffff' : theme.primaryColor }}
                    >
                      {currentSlide.title}
                    </h2>
                    {currentSlide.subtitle && (
                      <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        {currentSlide.subtitle}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3 pt-2">
                    {currentSlide.elements.map((el, eIdx) => {
                      if (el.type === 'bullets' && Array.isArray(el.content)) {
                        return (
                          <ul key={el.id || eIdx} className="space-y-3 text-xs sm:text-base text-slate-700">
                            {(el.content as string[]).map((b, bIdx) => (
                              <li key={bIdx} className="flex items-start space-x-3">
                                <span 
                                  className="w-2 h-2 rounded-full mt-2 shrink-0" 
                                  style={{ backgroundColor: theme.primaryColor }}
                                />
                                <span className="leading-relaxed">{b}</span>
                              </li>
                            ))}
                          </ul>
                        );
                      }
                      if (el.type === 'paragraph') {
                        return (
                          <p key={el.id || eIdx} className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                            {String(el.content)}
                          </p>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              )}

              {/* Slide Bottom Footer */}
              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-4 border-t border-slate-100">
                <span>{template.title}</span>
                <span className="font-mono">Trang {currentSlide.slideNumber} / {template.slides.length}</span>
              </div>
            </div>

            {/* Navigation Carousel Arrows */}
            <button
              onClick={() => setCurrentSlideIndex(prev => Math.max(prev - 1, 0))}
              disabled={currentSlideIndex === 0}
              className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 dark:bg-slate-900/90 hover:bg-white dark:hover:bg-slate-800 text-slate-800 dark:text-white disabled:opacity-30 disabled:pointer-events-none transition-all duration-150 active:scale-90 hover:scale-105 border border-slate-200 dark:border-slate-800 shadow-xl"
              title="Slide trước (←)"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentSlideIndex(prev => Math.min(prev + 1, template.slides.length - 1))}
              disabled={currentSlideIndex === template.slides.length - 1}
              className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 dark:bg-slate-900/90 hover:bg-white dark:hover:bg-slate-800 text-slate-800 dark:text-white disabled:opacity-30 disabled:pointer-events-none transition-all duration-150 active:scale-90 hover:scale-105 border border-slate-200 dark:border-slate-800 shadow-xl"
              title="Slide tiếp theo (→)"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center space-x-3">
            <span className="flex items-center text-slate-700 dark:text-slate-300 font-medium">
              <Palette className="w-3.5 h-3.5 mr-1 text-orange-500" /> Bảng màu: <strong>{theme.name}</strong>
            </span>
            <span>•</span>
            <span className="text-slate-400 dark:text-slate-500">Phím tắt: [←] [→]</span>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 active:scale-95 text-slate-700 dark:text-slate-200 font-semibold rounded-xl transition-all"
            >
              Đóng
            </button>
            <button
              onClick={() => {
                onClose();
                onUseTemplate(template);
              }}
              className="group/btn px-5 py-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 active:scale-95 text-white font-semibold rounded-xl flex items-center space-x-1.5 shadow-md shadow-orange-500/20 hover:shadow-orange-500/30 transition-all duration-150"
            >
              <span>Khởi tạo bài trình chiếu</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
