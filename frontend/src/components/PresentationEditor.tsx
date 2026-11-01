import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Save, 
  Download, 
  Plus, 
  Trash2, 
  Copy, 
  ArrowUp, 
  ArrowDown, 
  Play, 
  CheckCircle, 
  Clock, 
  ChevronDown, 
  X,
  Presentation,
  SlidersHorizontal,
  Sparkles,
  Palette,
  Layout,
  Type,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  Quote,
  Milestone,
  MessageSquare,
  Columns,
  Maximize2,
  Minimize2,
  List
} from '../icons/index.js';
import { UserPresentation, Slide, SlideLayout, PresentationTheme, SlideElement } from '../types/index.js';
import { updateUserPresentation, getPptxExportUrl } from '../services/api.js';

interface PresentationEditorProps {
  presentation: UserPresentation;
  onBack: () => void;
  onSaveSuccess: (updated: UserPresentation) => void;
}

const AVAILABLE_THEMES: PresentationTheme[] = [
  {
    name: 'Venture Indigo',
    primaryColor: '#2563eb',
    secondaryColor: '#1e40af',
    accentColor: '#3b82f6',
    backgroundColor: '#ffffff',
    textColor: '#0f172a',
    fontHeading: 'Plus Jakarta Sans',
    fontBody: 'Plus Jakarta Sans'
  },
  {
    name: 'Corporate Emerald',
    primaryColor: '#059669',
    secondaryColor: '#064e3b',
    accentColor: '#10b981',
    backgroundColor: '#ffffff',
    textColor: '#0f172a',
    fontHeading: 'Plus Jakarta Sans',
    fontBody: 'Plus Jakarta Sans'
  },
  {
    name: 'Modern Crimson',
    primaryColor: '#c43e1c',
    secondaryColor: '#7c2d12',
    accentColor: '#ea580c',
    backgroundColor: '#ffffff',
    textColor: '#0f172a',
    fontHeading: 'Plus Jakarta Sans',
    fontBody: 'Plus Jakarta Sans'
  },
  {
    name: 'Royal Purple',
    primaryColor: '#7c3aed',
    secondaryColor: '#4c1d95',
    accentColor: '#a855f7',
    backgroundColor: '#ffffff',
    textColor: '#0f172a',
    fontHeading: 'Plus Jakarta Sans',
    fontBody: 'Plus Jakarta Sans'
  },
  {
    name: 'Slate Minimalist',
    primaryColor: '#334155',
    secondaryColor: '#0f172a',
    accentColor: '#64748b',
    backgroundColor: '#ffffff',
    textColor: '#0f172a',
    fontHeading: 'Plus Jakarta Sans',
    fontBody: 'Plus Jakarta Sans'
  },
  {
    name: 'Amber Gold',
    primaryColor: '#d97706',
    secondaryColor: '#b45309',
    accentColor: '#f59e0b',
    backgroundColor: '#ffffff',
    textColor: '#0f172a',
    fontHeading: 'Plus Jakarta Sans',
    fontBody: 'Plus Jakarta Sans'
  }
];

const BACKGROUND_PRESETS = [
  { label: 'Trắng Tinh', value: '#ffffff', isDark: false },
  { label: 'Xám Nhẹ', value: '#f8fafc', isDark: false },
  { label: 'Navy Đêm', value: '#0f172a', isDark: true },
  { label: 'Đen Than', value: '#18181b', isDark: true },
  { label: 'Xanh Lục Bảo', value: '#064e3b', isDark: true },
  { label: 'Đỏ Rượu Vang', value: '#450a0a', isDark: true },
  { label: 'Tím Hoàng Gia', value: '#2e1065', isDark: true },
  { label: 'Gradient Biển Sâu', value: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)', isDark: true },
  { label: 'Gradient Hoàng Hôn', value: 'linear-gradient(135deg, #7c2d12 0%, #ea580c 100%)', isDark: true },
  { label: 'Gradient Cực Quang', value: 'linear-gradient(135deg, #064e3b 0%, #059669 100%)', isDark: true },
  { label: 'Gradient Tím Đêm', value: 'linear-gradient(135deg, #4c1d95 0%, #8b5cf6 100%)', isDark: true }
];

const FONT_PRESETS = [
  { label: 'Plus Jakarta Sans (Hiện đại)', value: 'Plus Jakarta Sans' },
  { label: 'Inter (Giao diện tinh gọn)', value: 'Inter' },
  { label: 'Be Vietnam Pro (Việt ngữ chuẩn)', value: 'Be Vietnam Pro' },
  { label: 'Playfair Display (Trang trọng)', value: 'Playfair Display' },
  { label: 'Roboto (Tiêu chuẩn)', value: 'Roboto' },
  { label: 'JetBrains Mono (Kỹ thuật)', value: 'JetBrains Mono' }
];

export const PresentationEditor: React.FC<PresentationEditorProps> = ({
  presentation: initialPres,
  onBack,
  onSaveSuccess
}) => {
  const [pres, setPres] = useState<UserPresentation>(initialPres);
  const [title, setTitle] = useState(initialPres.title);
  const [slides, setSlides] = useState<Slide[]>(initialPres.slides);
  const [theme, setTheme] = useState<PresentationTheme>(initialPres.theme || AVAILABLE_THEMES[0]);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  // Advanced Customization Controls State
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '4:3'>('16:9');
  const [isInspectorOpen, setIsInspectorOpen] = useState(() => typeof window !== 'undefined' ? window.innerWidth >= 1024 : true);
  const [isMobileFilmstripOpen, setIsMobileFilmstripOpen] = useState(false);
  const [inspectorTab, setInspectorTab] = useState<'layout' | 'typography' | 'notes'>('layout');
  const [isSpeakerNotesOpen, setIsSpeakerNotesOpen] = useState(false);
  const [isLayoutMenuOpen, setIsLayoutMenuOpen] = useState(false);

  // Fullscreen slideshow state
  const [isFullscreenPresent, setIsFullscreenPresent] = useState(false);
  const [presentSlideIndex, setPresentSlideIndex] = useState(0);
  const [showPresentNotes, setShowPresentNotes] = useState(false);
  const [presentationSeconds, setPresentationSeconds] = useState(0);

  const currentSlide: Slide = slides[activeSlideIndex] || slides[0];

  // Helper to detect if background is dark
  const isSlideDark = (slide: Slide): boolean => {
    if (!slide.background || !slide.background.trim()) return false;
    const bg = slide.background.toLowerCase();
    if (bg === '#ffffff' || bg === '#f8fafc' || bg === '#f1f5f9' || bg === 'white') return false;
    return true;
  };

  const getSlideStyle = (slide: Slide) => {
    const hasCustomBg = Boolean(slide.background && slide.background.trim());
    const bg = hasCustomBg ? slide.background : (theme.backgroundColor || '#ffffff');
    const isDark = isSlideDark(slide);
    const textColor = isDark ? '#ffffff' : (theme.textColor || '#0f172a');

    return {
      background: bg,
      color: textColor,
      fontFamily: `'${theme.fontBody || 'Plus Jakarta Sans'}', system-ui, -apple-system, sans-serif`
    };
  };

  // Fullscreen slideshow keyboard and timer listeners
  useEffect(() => {
    if (!isFullscreenPresent) return;

    setPresentationSeconds(0);
    const timerInterval = setInterval(() => {
      setPresentationSeconds(prev => prev + 1);
    }, 1000);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        setPresentSlideIndex(prev => Math.min(prev + 1, slides.length - 1));
      } else if (e.key === 'ArrowLeft') {
        setPresentSlideIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Escape') {
        setIsFullscreenPresent(false);
      } else if (e.key.toLowerCase() === 'n') {
        setShowPresentNotes(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(timerInterval);
    };
  }, [isFullscreenPresent, slides.length]);

  // Update current slide helper
  const updateCurrentSlide = (updates: Partial<Slide>) => {
    setSlides(prev => {
      const updated = [...prev];
      updated[activeSlideIndex] = { ...updated[activeSlideIndex], ...updates };
      return updated;
    });
  };

  // Apply current slide's background to all slides in presentation
  const handleApplyBackgroundToAll = () => {
    const targetBg = currentSlide.background;
    setSlides(prev => prev.map(s => ({ ...s, background: targetBg })));
    alert('Đã áp dụng màu nền hiện tại cho toàn bộ các trang slide trong bài!');
  };

  // Add new slide with layout
  const handleAddSlide = (layout: SlideLayout = 'content-bullets') => {
    let elements: SlideElement[] = [];

    switch (layout) {
      case 'title':
        elements = [
          { id: `el-${Date.now()}-1`, type: 'paragraph', content: 'Thuyết trình viên: Ban Dự Án • Ngày: ' + new Date().toLocaleDateString('vi-VN') }
        ];
        break;
      case 'two-columns':
        elements = [
          { id: `el-${Date.now()}-1`, type: 'paragraph', content: 'Nội dung phân tích cột bên trái: Đánh giá cơ hội và lợi thế thị trường hiện tại.' },
          { id: `el-${Date.now()}-2`, type: 'paragraph', content: 'Nội dung phân tích cột bên phải: Nhận diện thách thức và giải pháp ứng phó cụ thể.' }
        ];
        break;
      case 'stats-kpi':
        elements = [
          {
            id: `el-${Date.now()}-1`,
            type: 'kpis',
            content: [
              { label: 'Tăng trưởng Doanh thu', value: '+142%', desc: 'So với cùng kỳ quý trước' },
              { label: 'Khách hàng Doanh nghiệp', value: '2,450+', desc: 'Hoạt động thường xuyên' },
              { label: 'Tỷ lệ Duy trì', value: '98.5%', desc: 'Hợp đồng tái ký' },
              { label: 'Thời gian Phản hồi', value: '< 1.2s', desc: 'Độ trễ vận hành' }
            ]
          }
        ];
        break;
      case 'quote':
        elements = [
          { id: `el-${Date.now()}-1`, type: 'quote', content: 'Đổi mới sáng tạo không chỉ là công nghệ, mà là việc phụng sự con người tốt hơn mỗi ngày.' },
          { id: `el-${Date.now()}-2`, type: 'paragraph', content: '— Giám đốc Điều hành (CEO), Thông điệp Tầm nhìn 2026' }
        ];
        break;
      case 'timeline':
        elements = [
          {
            id: `el-${Date.now()}-1`,
            type: 'bullets',
            content: [
              'Giai đoạn 1: Khảo sát & Thiết kế kiến trúc',
              'Giai đoạn 2: Phát triển phiên bản thử nghiệm (Beta)',
              'Giai đoạn 3: Triển khai vận hành chính thức',
              'Giai đoạn 4: Tối ưu hóa và mở rộng quy mô'
            ]
          }
        ];
        break;
      default:
        elements = [
          {
            id: `el-${Date.now()}-1`,
            type: 'bullets',
            content: [
              'Nội dung luận điểm trọng tâm thứ nhất',
              'Nội dung luận điểm phân tích giải pháp thứ hai',
              'Kế hoạch triển khai và thời hạn hoàn thành cam kết'
            ]
          }
        ];
    }

    const newSlide: Slide = {
      id: `slide-${Date.now()}`,
      slideNumber: slides.length + 1,
      title: layout === 'title' ? 'Tiêu Đề Trình Chiếu Mới' : 'Tiêu Đề Nội Dung Slide',
      subtitle: 'Mô tả thông điệp chính và mục tiêu cốt lõi của trang này',
      layout,
      elements,
      background: currentSlide?.background || '',
      notes: ''
    };

    setSlides(prev => [...prev, newSlide]);
    setActiveSlideIndex(slides.length);
    setIsLayoutMenuOpen(false);
  };

  // Add specific element to active slide
  const handleAddElementToSlide = (type: 'bullets' | 'paragraph' | 'kpis' | 'quote') => {
    let newElement: SlideElement;
    if (type === 'bullets') {
      newElement = {
        id: `el-${Date.now()}`,
        type: 'bullets',
        content: ['Luận điểm bổ sung mới...']
      };
    } else if (type === 'paragraph') {
      newElement = {
        id: `el-${Date.now()}`,
        type: 'paragraph',
        content: 'Đoạn văn bản diễn giải chi tiết cho nội dung trình bày...'
      };
    } else if (type === 'quote') {
      newElement = {
        id: `el-${Date.now()}`,
        type: 'quote',
        content: '“Trích dẫn hoặc thông điệp quan trọng cần nhấn mạnh tại đây.”'
      };
    } else {
      newElement = {
        id: `el-${Date.now()}`,
        type: 'kpis',
        content: [{ label: 'Chỉ số mới', value: '100%', desc: 'Mục tiêu hoàn thành' }]
      };
    }

    updateCurrentSlide({
      elements: [...currentSlide.elements, newElement]
    });
  };

  // Remove element from active slide
  const handleRemoveElement = (elementId: string) => {
    updateCurrentSlide({
      elements: currentSlide.elements.filter(el => el.id !== elementId)
    });
  };

  // Duplicate slide
  const handleDuplicateSlide = (index: number) => {
    const target = slides[index];
    const duplicated: Slide = JSON.parse(JSON.stringify(target));
    duplicated.id = `slide-${Date.now()}`;
    duplicated.title = `${duplicated.title} (Bản sao)`;
    duplicated.slideNumber = index + 2;

    const updated = [...slides];
    updated.splice(index + 1, 0, duplicated);
    updated.forEach((s, idx) => (s.slideNumber = idx + 1));
    setSlides(updated);
    setActiveSlideIndex(index + 1);
  };

  // Delete slide
  const handleDeleteSlide = (index: number) => {
    if (slides.length <= 1) {
      alert('Bài thuyết trình cần có ít nhất 1 slide!');
      return;
    }
    const updated = slides.filter((_, idx) => idx !== index);
    updated.forEach((s, idx) => (s.slideNumber = idx + 1));
    setSlides(updated);
    setActiveSlideIndex(Math.max(0, index - 1));
  };

  // Move slide up/down
  const handleMoveSlide = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= slides.length) return;

    const updated = [...slides];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    updated.forEach((s, idx) => (s.slideNumber = idx + 1));
    setSlides(updated);
    setActiveSlideIndex(targetIdx);
  };

  // Save changes to backend
  const handleSave = async () => {
    setSaving(true);
    try {
      const updated = await updateUserPresentation(pres.id, {
        title,
        slides,
        theme
      });
      setPres(updated);
      setLastSaved(new Date().toLocaleTimeString('vi-VN'));
      onSaveSuccess(updated);
    } catch (err: any) {
      alert(`Lỗi khi lưu bài trình chiếu: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  // Download PPTX
  const handleDownloadPptx = () => {
    window.open(getPptxExportUrl(pres.id), '_blank');
  };

  // Start Fullscreen Slideshow
  const startSlideshow = () => {
    setPresentSlideIndex(activeSlideIndex);
    setIsFullscreenPresent(true);
  };

  // Format presentation seconds to MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isCurrentSlideDark = isSlideDark(currentSlide);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex flex-col text-slate-800 dark:text-slate-100 transition-colors">
      
      {/* 1. TOP HEADER BAR */}
      <div className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3 shadow-xs">
        
        {/* Left: Back & Presentation Title */}
        <div className="flex items-center space-x-3 min-w-0">
          <button
            onClick={onBack}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700 shrink-0"
            title="Quay lại danh sách"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-1.5 sm:space-x-2 min-w-0 flex-1">
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 hidden sm:flex items-center justify-center shrink-0">
              <Presentation className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm lg:text-base px-2 py-1 bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 focus:bg-white dark:focus:bg-slate-800 border border-transparent hover:border-slate-300 dark:hover:border-slate-700 focus:border-orange-500 rounded-xl focus:outline-none transition-all flex-1 min-w-[60px] max-w-[130px] sm:max-w-xs md:max-w-md truncate"
              title={title}
            />
            <span className="hidden md:inline-block px-2.5 py-0.5 text-[10px] font-mono uppercase bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 rounded-md font-bold shrink-0">
              {slides.length} slides
            </span>
          </div>
        </div>

        {/* Right: Quick Action Controls */}
        <div className="flex items-center space-x-1 sm:space-x-2 shrink-0">
          {lastSaved && (
            <span className="hidden xl:flex items-center text-xs text-slate-500 dark:text-slate-400 mr-2">
              <Clock className="w-3.5 h-3.5 mr-1 text-emerald-500" /> Đã lưu {lastSaved}
            </span>
          )}

          {/* Mobile/iPad Slide Deck Drawer Button */}
          <button
            onClick={() => setIsMobileFilmstripOpen(true)}
            className="lg:hidden px-2 sm:px-2.5 py-1.5 text-xs font-semibold rounded-xl flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 shrink-0"
            title="Mở danh sách slide"
          >
            <List className="w-3.5 h-3.5 text-orange-500" />
            <span className="text-xs font-bold">Slide ({slides.length})</span>
          </button>

          {/* Aspect Ratio Switcher */}
          <div className="hidden md:flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
            <button
              onClick={() => setAspectRatio('16:9')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                aspectRatio === '16:9'
                  ? 'bg-white dark:bg-slate-900 text-orange-600 dark:text-orange-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Tỉ lệ màn rộng 16:9 (Chuẩn hiện đại)"
            >
              16:9
            </button>
            <button
              onClick={() => setAspectRatio('4:3')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                aspectRatio === '4:3'
                  ? 'bg-white dark:bg-slate-900 text-orange-600 dark:text-orange-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Tỉ lệ chuẩn 4:3 (Cổ điển)"
            >
              4:3
            </button>
          </div>

          {/* Toggle Inspector Sidebar */}
          <button
            onClick={() => setIsInspectorOpen(!isInspectorOpen)}
            className={`p-2 sm:px-3 sm:py-1.5 text-xs font-semibold rounded-xl flex items-center space-x-1.5 border transition-all ${
              isInspectorOpen
                ? 'bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-300 border-orange-300 dark:border-orange-800'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
            }`}
            title="Bật/Tắt bảng tùy biến chuyên sâu"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Bảng Thiết Kế</span>
          </button>

          {/* Present Slideshow Mode */}
          <button
            onClick={startSlideshow}
            className="p-2 sm:px-3.5 sm:py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs sm:text-sm font-semibold rounded-xl flex items-center space-x-1.5 shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
            title="Trình chiếu toàn màn hình (Fullscreen)"
          >
            <Play className="w-4 h-4 fill-white" />
            <span className="hidden sm:inline">Trình chiếu</span>
          </button>

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={saving}
            className="p-2 sm:px-4 sm:py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white text-xs sm:text-sm font-semibold rounded-xl flex items-center space-x-1.5 border border-slate-300 dark:border-slate-700 transition-all disabled:opacity-50 cursor-pointer"
            title="Lưu bài trình chiếu"
          >
            <Save className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            <span className="hidden sm:inline">{saving ? 'Đang lưu...' : 'Lưu'}</span>
          </button>

          {/* Download PPTX Button */}
          <button
            onClick={handleDownloadPptx}
            className="p-2 sm:px-4 sm:py-1.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white text-xs sm:text-sm font-semibold rounded-xl flex items-center space-x-1.5 shadow-md shadow-orange-500/20 transition-all cursor-pointer"
            title="Tải xuống tệp tin PowerPoint (.PPTX)"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Tải PPTX</span>
          </button>
        </div>

      </div>

      {/* 2. MAIN WORKSPACE FRAME */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Mobile/iPad Filmstrip Backdrop */}
        {isMobileFilmstripOpen && (
          <div 
            onClick={() => setIsMobileFilmstripOpen(false)}
            className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs lg:hidden"
          />
        )}

        {/* LEFT FILMSTRIP: SLIDE DECK THUMBNAILS */}
        <aside className={`fixed lg:static top-0 left-0 z-50 h-screen lg:h-auto w-72 max-w-[85vw] bg-white dark:bg-slate-950 p-3.5 border-r border-slate-200 dark:border-slate-800 overflow-y-auto space-y-3 flex flex-col justify-between shrink-0 shadow-2xl lg:shadow-none transition-transform duration-200 ${
          isMobileFilmstripOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}>
          <div className="space-y-2.5 overflow-y-auto pr-1">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 px-1 py-0.5">
              <span>DANH SÁCH SLIDE ({slides.length})</span>
              <div className="flex items-center space-x-1">
                <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">16:9 / 4:3</span>
                <button
                  onClick={() => setIsMobileFilmstripOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg lg:hidden"
                  title="Đóng danh sách"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {slides.map((s, idx) => {
              const isSelected = idx === activeSlideIndex;
              const isDark = isSlideDark(s);
              return (
                <div
                  key={s.id || idx}
                  onClick={() => {
                    setActiveSlideIndex(idx);
                    setIsMobileFilmstripOpen(false);
                  }}
                  className={`group relative rounded-xl p-3 cursor-pointer border transition-all ${
                    isSelected
                      ? 'bg-orange-50/70 dark:bg-slate-900 border-orange-500 shadow-md ring-1 ring-orange-500/50 text-slate-900 dark:text-white'
                      : 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] mb-1.5">
                    <div className="flex items-center space-x-1.5">
                      <span className="font-bold text-slate-700 dark:text-slate-300">#{s.slideNumber}</span>
                      {s.background && (
                        <div 
                          className="w-2.5 h-2.5 rounded-full border border-slate-300 dark:border-slate-600 shrink-0" 
                          style={{ background: s.background }}
                          title="Màu nền tùy chỉnh"
                        />
                      )}
                    </div>
                    <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono">
                      {s.layout}
                    </span>
                  </div>

                  <div className="text-xs font-semibold truncate">
                    {s.title || 'Slide không có tiêu đề'}
                  </div>

                  {/* Thumbnail Card Micro-Actions */}
                  <div className="mt-2.5 pt-1.5 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between opacity-80 group-hover:opacity-100">
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={(e) => { e.stopPropagation(); handleMoveSlide(idx, 'up'); }}
                        disabled={idx === 0}
                        className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 disabled:opacity-20"
                        title="Di chuyển lên"
                      >
                        <ArrowUp className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleMoveSlide(idx, 'down'); }}
                        disabled={idx === slides.length - 1}
                        className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 disabled:opacity-20"
                        title="Di chuyển xuống"
                      >
                        <ArrowDown className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="flex items-center space-x-1">
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDuplicateSlide(idx); }}
                        className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                        title="Nhân bản slide"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDeleteSlide(idx); }}
                        className="p-1 hover:bg-red-50 dark:hover:bg-red-950/60 rounded-lg text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400"
                        title="Xóa slide"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add Slide Button with Layout Dropdown */}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 relative">
            <button
              onClick={() => setIsLayoutMenuOpen(!isLayoutMenuOpen)}
              className="w-full py-2.5 bg-orange-50 hover:bg-orange-100 dark:bg-orange-950/30 dark:hover:bg-orange-950/50 text-orange-600 dark:text-orange-400 text-xs font-bold rounded-xl border border-orange-200 dark:border-orange-900/60 flex items-center justify-center space-x-1.5 transition-all shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm Trang Slide Mới</span>
              <ChevronDown className="w-3 h-3 ml-1" />
            </button>

            {isLayoutMenuOpen && (
              <div 
                className="absolute bottom-full left-0 right-0 mb-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl p-2 z-50 space-y-1 animate-in fade-in zoom-in-95 duration-100"
              >
                <div className="text-[10px] font-bold uppercase text-slate-400 px-2 py-1">
                  Chọn bố cục khởi tạo
                </div>
                <button
                  onClick={() => handleAddSlide('content-bullets')}
                  className="w-full px-2.5 py-1.5 rounded-lg text-xs flex items-center space-x-2 text-left hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
                >
                  <List className="w-3.5 h-3.5 text-blue-500" />
                  <span>Nội dung & Điểm nhấn (Bullets)</span>
                </button>
                <button
                  onClick={() => handleAddSlide('title')}
                  className="w-full px-2.5 py-1.5 rounded-lg text-xs flex items-center space-x-2 text-left hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
                >
                  <Layout className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Trang Bìa / Tiêu đề (Cover)</span>
                </button>
                <button
                  onClick={() => handleAddSlide('two-columns')}
                  className="w-full px-2.5 py-1.5 rounded-lg text-xs flex items-center space-x-2 text-left hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
                >
                  <Columns className="w-3.5 h-3.5 text-emerald-500" />
                  <span>So sánh 2 cột (Two Columns)</span>
                </button>
                <button
                  onClick={() => handleAddSlide('stats-kpi')}
                  className="w-full px-2.5 py-1.5 rounded-lg text-xs flex items-center space-x-2 text-left hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Chỉ số & KPI nổi bật</span>
                </button>
                <button
                  onClick={() => handleAddSlide('quote')}
                  className="w-full px-2.5 py-1.5 rounded-lg text-xs flex items-center space-x-2 text-left hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
                >
                  <Quote className="w-3.5 h-3.5 text-purple-500" />
                  <span>Trích dẫn lãnh đạo (Quote)</span>
                </button>
                <button
                  onClick={() => handleAddSlide('timeline')}
                  className="w-full px-2.5 py-1.5 rounded-lg text-xs flex items-center space-x-2 text-left hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
                >
                  <Milestone className="w-3.5 h-3.5 text-rose-500" />
                  <span>Lộ trình triển khai (Timeline)</span>
                </button>
              </div>
            )}
          </div>
        </aside>

        {/* CENTER LIVE EDITABLE CANVAS */}
        <main className="flex-1 p-2 sm:p-4 lg:p-8 flex flex-col items-center justify-center overflow-y-auto bg-slate-200/60 dark:bg-slate-950">
          
          {/* Top Quick Elements Toolbar */}
          <div className="w-full max-w-4xl mb-3 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 gap-2">
            
            {/* Quick Insert Elements Buttons */}
            <div className="flex items-center space-x-1.5 overflow-x-auto py-1">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mr-1 hidden sm:inline">
                Chèn nhanh:
              </span>
              <button
                onClick={() => handleAddElementToSlide('bullets')}
                className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-medium flex items-center space-x-1 shadow-xs"
              >
                <Plus className="w-3 h-3 text-orange-500" />
                <span>Điểm nhấn</span>
              </button>
              <button
                onClick={() => handleAddElementToSlide('paragraph')}
                className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-medium flex items-center space-x-1 shadow-xs"
              >
                <Plus className="w-3 h-3 text-blue-500" />
                <span>Đoạn văn</span>
              </button>
              <button
                onClick={() => handleAddElementToSlide('quote')}
                className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-medium flex items-center space-x-1 shadow-xs"
              >
                <Quote className="w-3 h-3 text-purple-500" />
                <span>Trích dẫn</span>
              </button>
              <button
                onClick={() => handleAddElementToSlide('kpis')}
                className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-medium flex items-center space-x-1 shadow-xs"
              >
                <Sparkles className="w-3 h-3 text-emerald-500" />
                <span>KPI</span>
              </button>
            </div>

            {/* Slide Index Counter & Speaker Notes Toggle */}
            <div className="flex items-center space-x-2 shrink-0">
              <button
                onClick={() => setIsSpeakerNotesOpen(!isSpeakerNotesOpen)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center space-x-1 border transition-colors ${
                  isSpeakerNotesOpen || (currentSlide.notes && currentSlide.notes.trim())
                    ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-300 border-blue-200 dark:border-blue-800'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700'
                }`}
                title="Ghi chú của người thuyết trình"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Ghi chú {currentSlide.notes ? '•' : ''}</span>
              </button>
              <span className="text-[11px] font-mono text-slate-500">
                Slide {activeSlideIndex + 1} / {slides.length}
              </span>
            </div>

          </div>

          {/* Interactive Slide Canvas */}
          <div 
            className={`w-full max-w-4xl ${aspectRatio === '16:9' ? 'aspect-video' : 'aspect-[4/3]'} rounded-2xl shadow-2xl relative overflow-hidden flex flex-col justify-between p-4 sm:p-8 lg:p-12 transition-all duration-300 border border-slate-300 dark:border-slate-800 bg-white`}
            style={getSlideStyle(currentSlide)}
          >
            {/* Top Accent Strip for Standard Slides */}
            {!currentSlide.background && (
              <div 
                className="absolute top-0 left-0 right-0 h-2"
                style={{ backgroundColor: theme.primaryColor || '#2563eb' }}
              />
            )}

            {/* Layout 1: Title / Cover Slide */}
            {currentSlide.layout === 'title' ? (
              <div className="my-auto text-center space-y-2 sm:space-y-4">
                <input
                  type="text"
                  value={currentSlide.title}
                  onChange={(e) => updateCurrentSlide({ title: e.target.value })}
                  placeholder="Nhập tiêu đề lớn của bài thuyết trình..."
                  className="w-full text-center text-lg sm:text-2xl lg:text-4xl font-extrabold bg-transparent border-b border-transparent hover:border-white/40 focus:border-white focus:outline-none transition-all placeholder:text-white/40 leading-snug"
                  style={{ color: isCurrentSlideDark ? '#ffffff' : theme.textColor }}
                />
                <input
                  type="text"
                  value={currentSlide.subtitle || ''}
                  onChange={(e) => updateCurrentSlide({ subtitle: e.target.value })}
                  placeholder="Nhập phụ đề hoặc thông điệp cốt lõi..."
                  className="w-full text-center text-xs sm:text-sm lg:text-lg bg-transparent border-b border-transparent hover:border-white/30 focus:border-white focus:outline-none transition-all opacity-90 placeholder:text-white/40 max-w-2xl mx-auto block"
                />

                {/* Additional elements on title slide if any */}
                {currentSlide.elements.map(el => (
                  <div key={el.id} className="relative group/el pt-2">
                    <input
                      type="text"
                      value={String(el.content)}
                      onChange={(e) => {
                        updateCurrentSlide({
                          elements: currentSlide.elements.map(item =>
                            item.id === el.id ? { ...item, content: e.target.value } : item
                          )
                        });
                      }}
                      className="w-full text-center text-xs sm:text-sm bg-transparent border-b border-transparent hover:border-white/20 focus:outline-none opacity-75"
                    />
                    <button
                      onClick={() => handleRemoveElement(el.id)}
                      className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover/el:opacity-100 p-1 text-red-400 hover:text-red-500"
                      title="Xóa khối này"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            ) : currentSlide.layout === 'stats-kpi' ? (
              /* Layout 2: KPI & Metrics */
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    value={currentSlide.title}
                    onChange={(e) => updateCurrentSlide({ title: e.target.value })}
                    placeholder="Tiêu đề báo cáo chỉ số..."
                    className="w-full text-xl sm:text-2xl font-extrabold bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-500 focus:outline-none transition-all"
                    style={{ color: isCurrentSlideDark ? '#ffffff' : theme.primaryColor }}
                  />
                  <input
                    type="text"
                    value={currentSlide.subtitle || ''}
                    onChange={(e) => updateCurrentSlide({ subtitle: e.target.value })}
                    placeholder="Mô tả mục tiêu đạt được..."
                    className="w-full text-xs sm:text-sm text-slate-500 bg-transparent border-b border-transparent hover:border-slate-300 focus:outline-none mt-1"
                  />
                </div>

                {/* KPI Cards (Editable) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  {currentSlide.elements.map(el => {
                    if (el.type === 'kpis' && Array.isArray(el.content)) {
                      return (el.content as any[]).map((kpi, kIdx) => (
                        <div 
                          key={kIdx} 
                          className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-3.5 border border-slate-200 dark:border-slate-800 text-center shadow-xs relative group/kpi"
                        >
                          <input
                            type="text"
                            value={kpi.value}
                            onChange={(e) => {
                              const updatedContent = [...(el.content as any[])];
                              updatedContent[kIdx].value = e.target.value;
                              updateCurrentSlide({
                                elements: currentSlide.elements.map(item => 
                                  item.id === el.id ? { ...item, content: updatedContent } : item
                                )
                              });
                            }}
                            className="w-full text-center text-xl sm:text-2xl font-extrabold bg-transparent focus:outline-none"
                            style={{ color: theme.primaryColor }}
                          />
                          <input
                            type="text"
                            value={kpi.label}
                            onChange={(e) => {
                              const updatedContent = [...(el.content as any[])];
                              updatedContent[kIdx].label = e.target.value;
                              updateCurrentSlide({
                                elements: currentSlide.elements.map(item => 
                                  item.id === el.id ? { ...item, content: updatedContent } : item
                                )
                              });
                            }}
                            className="w-full text-center text-xs font-bold text-slate-800 dark:text-slate-200 bg-transparent focus:outline-none mt-1"
                          />
                          <input
                            type="text"
                            value={kpi.desc || ''}
                            onChange={(e) => {
                              const updatedContent = [...(el.content as any[])];
                              updatedContent[kIdx].desc = e.target.value;
                              updateCurrentSlide({
                                elements: currentSlide.elements.map(item => 
                                  item.id === el.id ? { ...item, content: updatedContent } : item
                                )
                              });
                            }}
                            placeholder="Ghi chú tăng trưởng..."
                            className="w-full text-center text-[10px] text-slate-400 bg-transparent focus:outline-none mt-1"
                          />
                        </div>
                      ));
                    }
                    return null;
                  })}
                </div>
              </div>
            ) : currentSlide.layout === 'quote' ? (
              /* Layout 3: Editorial Quote */
              <div className="my-auto space-y-4 px-4 sm:px-8">
                <Quote className="w-10 h-10 opacity-30" style={{ color: theme.primaryColor }} />
                <textarea
                  rows={3}
                  value={currentSlide.title}
                  onChange={(e) => updateCurrentSlide({ title: e.target.value })}
                  placeholder="Nhập nội dung trích dẫn phát biểu hoặc phương châm..."
                  className="w-full text-xl sm:text-3xl font-extrabold italic bg-transparent border-b border-transparent hover:border-slate-300 focus:outline-none transition-all leading-snug resize-none"
                  style={{ color: isCurrentSlideDark ? '#ffffff' : theme.primaryColor }}
                />
                <input
                  type="text"
                  value={currentSlide.subtitle || ''}
                  onChange={(e) => updateCurrentSlide({ subtitle: e.target.value })}
                  placeholder="— Tên tác giả, chức danh hoặc nguồn phát ngôn..."
                  className="w-full text-sm sm:text-base font-semibold text-slate-500 bg-transparent border-b border-transparent hover:border-slate-300 focus:outline-none mt-2"
                />
              </div>
            ) : currentSlide.layout === 'two-columns' ? (
              /* Layout 4: Two Columns */
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    value={currentSlide.title}
                    onChange={(e) => updateCurrentSlide({ title: e.target.value })}
                    placeholder="Tiêu đề trang so sánh 2 cột..."
                    className="w-full text-xl sm:text-2xl font-extrabold bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-500 focus:outline-none transition-all"
                    style={{ color: isCurrentSlideDark ? '#ffffff' : theme.primaryColor }}
                  />
                  <input
                    type="text"
                    value={currentSlide.subtitle || ''}
                    onChange={(e) => updateCurrentSlide({ subtitle: e.target.value })}
                    placeholder="Phụ đề tóm tắt bối cảnh..."
                    className="w-full text-xs sm:text-sm text-slate-500 bg-transparent border-b border-transparent hover:border-slate-300 focus:outline-none mt-1"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  {currentSlide.elements.slice(0, 2).map((el, colIdx) => (
                    <div key={el.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Cột {colIdx === 0 ? 'Trái' : 'Phải'}
                      </div>
                      <textarea
                        rows={5}
                        value={String(el.content)}
                        onChange={(e) => {
                          updateCurrentSlide({
                            elements: currentSlide.elements.map(item =>
                              item.id === el.id ? { ...item, content: e.target.value } : item
                            )
                          });
                        }}
                        className="w-full text-xs sm:text-sm bg-transparent focus:outline-none resize-none leading-relaxed"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : currentSlide.layout === 'timeline' ? (
              /* Layout 5: Timeline / Roadmap */
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    value={currentSlide.title}
                    onChange={(e) => updateCurrentSlide({ title: e.target.value })}
                    placeholder="Tiêu đề lộ trình triển khai..."
                    className="w-full text-xl sm:text-2xl font-extrabold bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-500 focus:outline-none transition-all"
                    style={{ color: isCurrentSlideDark ? '#ffffff' : theme.primaryColor }}
                  />
                  <input
                    type="text"
                    value={currentSlide.subtitle || ''}
                    onChange={(e) => updateCurrentSlide({ subtitle: e.target.value })}
                    placeholder="Phụ đề mốc thời gian..."
                    className="w-full text-xs sm:text-sm text-slate-500 bg-transparent border-b border-transparent hover:border-slate-300 focus:outline-none mt-1"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
                  {currentSlide.elements.map(el => {
                    if (el.type === 'bullets' && Array.isArray(el.content)) {
                      return (el.content as string[]).map((step, sIdx) => (
                        <div key={sIdx} className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5">
                          <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                            Giai đoạn 0{sIdx + 1}
                          </span>
                          <input
                            type="text"
                            value={step}
                            onChange={(e) => {
                              const updated = [...(el.content as string[])];
                              updated[sIdx] = e.target.value;
                              updateCurrentSlide({
                                elements: currentSlide.elements.map(item =>
                                  item.id === el.id ? { ...item, content: updated } : item
                                )
                              });
                            }}
                            className="w-full text-xs font-semibold bg-transparent focus:outline-none"
                          />
                        </div>
                      ));
                    }
                    return null;
                  })}
                </div>
              </div>
            ) : (
              /* Layout 6: Standard Content & Bullets */
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    value={currentSlide.title}
                    onChange={(e) => updateCurrentSlide({ title: e.target.value })}
                    placeholder="Tiêu đề slide..."
                    className="w-full text-xl sm:text-2xl font-extrabold bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-500 focus:outline-none transition-all"
                    style={{ color: isCurrentSlideDark ? '#ffffff' : theme.primaryColor }}
                  />
                  <input
                    type="text"
                    value={currentSlide.subtitle || ''}
                    onChange={(e) => updateCurrentSlide({ subtitle: e.target.value })}
                    placeholder="Phụ đề tóm tắt..."
                    className="w-full text-xs sm:text-sm text-slate-500 bg-transparent border-b border-transparent hover:border-slate-300 focus:outline-none mt-1"
                  />
                </div>

                {/* Bullets List */}
                <div className="space-y-3 pt-2">
                  {currentSlide.elements.map((el) => {
                    if (el.type === 'bullets' && Array.isArray(el.content)) {
                      return (el.content as string[]).map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-start space-x-2.5 group/bullet">
                          <span 
                            className="w-2.5 h-2.5 rounded-full mt-2 shrink-0 shadow-xs" 
                            style={{ backgroundColor: theme.primaryColor }}
                          />
                          <input
                            type="text"
                            value={bullet}
                            onChange={(e) => {
                              const updatedBullets = [...(el.content as string[])];
                              updatedBullets[bIdx] = e.target.value;
                              updateCurrentSlide({
                                elements: currentSlide.elements.map(item => 
                                  item.id === el.id ? { ...item, content: updatedBullets } : item
                                )
                              });
                            }}
                            className="w-full text-xs sm:text-base text-slate-700 dark:text-slate-200 bg-transparent border-b border-transparent hover:border-slate-200 dark:hover:border-slate-700 focus:border-blue-500 focus:outline-none transition-all"
                          />
                          <button
                            onClick={() => {
                              const updatedBullets = (el.content as string[]).filter((_, i) => i !== bIdx);
                              updateCurrentSlide({
                                elements: currentSlide.elements.map(item =>
                                  item.id === el.id ? { ...item, content: updatedBullets } : item
                                )
                              });
                            }}
                            className="opacity-0 group-hover/bullet:opacity-100 p-1 text-slate-400 hover:text-red-500 transition-opacity"
                            title="Xóa dòng này"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ));
                    }

                    if (el.type === 'paragraph' && typeof el.content === 'string') {
                      return (
                        <div key={el.id} className="relative group/p">
                          <textarea
                            rows={3}
                            value={el.content}
                            onChange={(e) => {
                              updateCurrentSlide({
                                elements: currentSlide.elements.map(item =>
                                  item.id === el.id ? { ...item, content: e.target.value } : item
                                )
                              });
                            }}
                            className="w-full text-xs sm:text-sm bg-transparent border-b border-transparent hover:border-slate-200 dark:hover:border-slate-700 focus:outline-none resize-none leading-relaxed"
                          />
                          <button
                            onClick={() => handleRemoveElement(el.id)}
                            className="absolute right-0 top-0 opacity-0 group-hover/p:opacity-100 p-1 text-slate-400 hover:text-red-500"
                            title="Xóa đoạn này"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      );
                    }

                    return null;
                  })}
                </div>
              </div>
            )}

            {/* Slide Footer Info */}
            <div className="flex items-center justify-between text-[10px] text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-800/80">
              <span>{title}</span>
              <span className="font-mono">Slide {activeSlideIndex + 1} / {slides.length}</span>
            </div>
          </div>

          {/* Collapsible Speaker Notes Drawer */}
          {isSpeakerNotesOpen && (
            <div className="w-full max-w-4xl mt-3 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md animate-in slide-in-from-bottom-2 duration-150">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                  <MessageSquare className="w-4 h-4 text-blue-500" />
                  <span>Ghi Chú Người Thuyết Trình (Speaker Notes)</span>
                </div>
                <button
                  onClick={() => setIsSpeakerNotesOpen(false)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <textarea
                rows={3}
                value={currentSlide.notes || ''}
                onChange={(e) => updateCurrentSlide({ notes: e.target.value })}
                placeholder="Nhập lời nhắc, luận điểm cần nhấn mạnh hoặc số liệu phụ khi thuyết trình trước khán phòng..."
                className="w-full text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-200"
              />
            </div>
          )}

        </main>

        {/* 3. RIGHT DESIGN INSPECTOR PANEL (BẢNG THIẾT KẾ CHUYÊN SÂU) */}
        {isInspectorOpen && (
          <>
            {/* Mobile/iPad Inspector Backdrop */}
            <div 
              onClick={() => setIsInspectorOpen(false)}
              className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs lg:hidden"
            />
            <aside className="fixed lg:static top-0 right-0 z-50 h-screen lg:h-auto w-80 max-w-[85vw] bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 overflow-y-auto flex flex-col shrink-0 animate-in slide-in-from-right-4 duration-200 shadow-2xl lg:shadow-lg">
            
            {/* Inspector Header & Tabs */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  <SlidersHorizontal className="w-4 h-4 text-orange-500" />
                  <span>Tùy Biến Thiết Kế</span>
                </div>
                <button
                  onClick={() => setIsInspectorOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                  title="Đóng bảng thiết kế"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* 3 Inspector Tabs */}
              <div className="grid grid-cols-3 gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
                <button
                  onClick={() => setInspectorTab('layout')}
                  className={`py-1.5 rounded-lg transition-all text-center ${
                    inspectorTab === 'layout'
                      ? 'bg-white dark:bg-slate-900 text-orange-600 dark:text-orange-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  Bố cục
                </button>
                <button
                  onClick={() => setInspectorTab('typography')}
                  className={`py-1.5 rounded-lg transition-all text-center ${
                    inspectorTab === 'typography'
                      ? 'bg-white dark:bg-slate-900 text-orange-600 dark:text-orange-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  Màu & Chữ
                </button>
                <button
                  onClick={() => setInspectorTab('notes')}
                  className={`py-1.5 rounded-lg transition-all text-center ${
                    inspectorTab === 'notes'
                      ? 'bg-white dark:bg-slate-900 text-orange-600 dark:text-orange-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  Ghi chú
                </button>
              </div>
            </div>

            {/* TAB 1: BỐ CỤC & NỀN SLIDE */}
            {inspectorTab === 'layout' && (
              <div className="p-4 space-y-6">
                
                {/* 1.1 Layout Switcher */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    Bố cục trang hiện tại:
                  </label>
                  <select
                    value={currentSlide.layout}
                    onChange={(e) => updateCurrentSlide({ layout: e.target.value as any })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs rounded-xl px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  >
                    <option value="content-bullets">Nội dung & Danh sách (Bullets)</option>
                    <option value="title">Trang Bìa / Tiêu đề (Cover)</option>
                    <option value="two-columns">So sánh 2 Cột (Two Columns)</option>
                    <option value="stats-kpi">Chỉ số & KPI nổi bật (Metrics)</option>
                    <option value="quote">Trích dẫn lớn (Editorial Quote)</option>
                    <option value="timeline">Dòng thời gian / Lộ trình (Timeline)</option>
                  </select>
                </div>

                {/* 1.2 Background Color / Presets */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Màu nền Slide:
                    </label>
                    {currentSlide.background && (
                      <button
                        onClick={() => updateCurrentSlide({ background: '' })}
                        className="text-[11px] text-orange-600 dark:text-orange-400 hover:underline"
                      >
                        Mặc định
                      </button>
                    )}
                  </div>

                  {/* Swatches Grid */}
                  <div className="grid grid-cols-4 gap-2">
                    {BACKGROUND_PRESETS.map((preset) => (
                      <button
                        key={preset.label}
                        onClick={() => updateCurrentSlide({ background: preset.value })}
                        className={`h-9 rounded-xl border relative transition-transform active:scale-95 flex items-center justify-center ${
                          currentSlide.background === preset.value
                            ? 'border-orange-500 ring-2 ring-orange-500/50 scale-105'
                            : 'border-slate-300 dark:border-slate-700 hover:scale-105'
                        }`}
                        style={{ background: preset.value }}
                        title={preset.label}
                      >
                        {currentSlide.background === preset.value && (
                          <CheckCircle className={`w-3.5 h-3.5 ${preset.isDark ? 'text-white' : 'text-slate-900'}`} />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Custom Hex Background Input */}
                  <div className="flex items-center space-x-2 pt-1">
                    <input
                      type="color"
                      value={currentSlide.background && currentSlide.background.startsWith('#') ? currentSlide.background : '#ffffff'}
                      onChange={(e) => updateCurrentSlide({ background: e.target.value })}
                      className="w-8 h-8 rounded-lg cursor-pointer border border-slate-300 dark:border-slate-700 bg-transparent p-0.5"
                    />
                    <input
                      type="text"
                      placeholder="Mã màu Hex (#0f172a)..."
                      value={currentSlide.background || ''}
                      onChange={(e) => updateCurrentSlide({ background: e.target.value })}
                      className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs rounded-xl px-3 py-1.5 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                  </div>

                  {/* Apply to All Slides Button */}
                  <button
                    onClick={handleApplyBackgroundToAll}
                    className="w-full py-1.5 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
                  >
                    Áp dụng nền cho toàn bộ bài
                  </button>
                </div>

                {/* 1.3 Add Elements Section */}
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    Bổ sung khối vào slide này:
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      onClick={() => handleAddElementToSlide('bullets')}
                      className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-left font-medium flex items-center space-x-1.5"
                    >
                      <Plus className="w-3.5 h-3.5 text-orange-500" />
                      <span>Thêm Bullet</span>
                    </button>
                    <button
                      onClick={() => handleAddElementToSlide('paragraph')}
                      className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-left font-medium flex items-center space-x-1.5"
                    >
                      <Plus className="w-3.5 h-3.5 text-blue-500" />
                      <span>Thêm Đoạn văn</span>
                    </button>
                    <button
                      onClick={() => handleAddElementToSlide('quote')}
                      className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-left font-medium flex items-center space-x-1.5"
                    >
                      <Quote className="w-3.5 h-3.5 text-purple-500" />
                      <span>Thêm Trích dẫn</span>
                    </button>
                    <button
                      onClick={() => handleAddElementToSlide('kpis')}
                      className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-left font-medium flex items-center space-x-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Thêm Thẻ KPI</span>
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: MÀU SẮC & CHỦ ĐỀ & KIỂU CHỮ */}
            {inspectorTab === 'typography' && (
              <div className="p-4 space-y-6">
                
                {/* 2.1 Font Heading & Body */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    Phông Chữ (Font Family):
                  </label>
                  <select
                    value={theme.fontHeading || 'Plus Jakarta Sans'}
                    onChange={(e) => setTheme({ ...theme, fontHeading: e.target.value, fontBody: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs rounded-xl px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  >
                    {FONT_PRESETS.map(f => (
                      <option key={f.value} value={f.value}>{f.label}</option>
                    ))}
                  </select>
                </div>

                {/* 2.2 Theme Color Presets */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    Bảng Màu Doanh Nghiệp (Theme Presets):
                  </label>
                  <div className="space-y-1.5">
                    {AVAILABLE_THEMES.map(th => (
                      <button
                        key={th.name}
                        onClick={() => setTheme(th)}
                        className={`w-full px-3 py-2 rounded-xl text-xs flex items-center justify-between border transition-all ${
                          theme.name === th.name
                            ? 'bg-orange-50 dark:bg-orange-950/40 border-orange-500 text-orange-900 dark:text-orange-200 font-bold'
                            : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <div className="flex items-center space-x-2.5">
                          <div className="w-3.5 h-3.5 rounded-full shadow-xs" style={{ backgroundColor: th.primaryColor }} />
                          <span>{th.name}</span>
                        </div>
                        {theme.name === th.name && <CheckCircle className="w-4 h-4 text-orange-500" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2.3 Custom Accent Colors */}
                <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    Tùy chỉnh màu sắc chi tiết:
                  </label>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Màu chủ đạo (Primary):</span>
                      <div className="flex items-center space-x-1.5">
                        <input
                          type="color"
                          value={theme.primaryColor || '#2563eb'}
                          onChange={(e) => setTheme({ ...theme, primaryColor: e.target.value })}
                          className="w-6 h-6 rounded-md cursor-pointer border-0 p-0"
                        />
                        <span className="font-mono text-[11px] text-slate-500">{theme.primaryColor}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Màu phụ (Secondary):</span>
                      <div className="flex items-center space-x-1.5">
                        <input
                          type="color"
                          value={theme.secondaryColor || '#1e40af'}
                          onChange={(e) => setTheme({ ...theme, secondaryColor: e.target.value })}
                          className="w-6 h-6 rounded-md cursor-pointer border-0 p-0"
                        />
                        <span className="font-mono text-[11px] text-slate-500">{theme.secondaryColor}</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 3: GHI CHÚ DIỄN GIẢ & TÙY CHỌN BÀI THUYẾT TRÌNH */}
            {inspectorTab === 'notes' && (
              <div className="p-4 space-y-6">
                
                {/* 3.1 Speaker Notes */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    Ghi chú diễn giả (Speaker Notes):
                  </label>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Nội dung này chỉ hiển thị khi trình chiếu hoặc trong tệp PPTX cho diễn giả đọc.
                  </p>
                  <textarea
                    rows={6}
                    value={currentSlide.notes || ''}
                    onChange={(e) => updateCurrentSlide({ notes: e.target.value })}
                    placeholder="Viết kịch bản thuyết trình, thông điệp cần nhấn mạnh, câu chuyện dẫn nhập..."
                    className="w-full text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-500 text-slate-800 dark:text-slate-200"
                  />
                </div>

                {/* 3.2 Slide Transition Info */}
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                  <div className="font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                    <span>Chế độ Trình Chiếu</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    Nhấn nút <strong>Trình chiếu</strong> trên thanh công cụ để vào chế độ toàn màn hình. Dùng phím mũi tên hoặc Space để lật trang. Nhấn phím <strong>[N]</strong> để bật/tắt ghi chú.
                  </p>
                </div>

              </div>
            )}

          </aside>
        </>
      )}

      </div>

      {/* 4. ENHANCED FULLSCREEN PRESENTER MODE */}
      {isFullscreenPresent && (() => {
        const presentSlide = slides[presentSlideIndex] || slides[0];
        const isDarkSlide = isSlideDark(presentSlide);
        const slideStyle = getSlideStyle(presentSlide);

        return (
          <div className="fixed inset-0 z-50 bg-black flex flex-col justify-between p-4 sm:p-10 animate-in fade-in duration-200 select-none">
            
            {/* Top Bar Controls */}
            <div className="flex justify-between items-center text-white/70 text-xs px-2">
              <div className="flex items-center space-x-3">
                <span className="font-bold text-white tracking-wide">
                  {title}
                </span>
                <span>•</span>
                <span className="font-mono text-emerald-400">
                  ⏱ {formatTime(presentationSeconds)}
                </span>
                <span>•</span>
                <span>Slide {presentSlideIndex + 1} / {slides.length}</span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowPresentNotes(!showPresentNotes)}
                  className={`px-3 py-1.5 rounded-xl flex items-center space-x-1.5 transition-all text-xs font-semibold ${
                    showPresentNotes ? 'bg-orange-500 text-white' : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                  title="Bật/Tắt hiển thị ghi chú diễn giả (Phím N)"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Ghi chú (N)</span>
                </button>

                <button
                  onClick={() => setIsFullscreenPresent(false)}
                  className="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 active:scale-95 text-white rounded-xl flex items-center space-x-1.5 transition-all text-xs font-semibold"
                  title="Thoát chế độ trình chiếu (Phím Esc)"
                >
                  <X className="w-4 h-4" />
                  <span>Thoát (Esc)</span>
                </button>
              </div>
            </div>

            {/* Center Slide Container */}
            <div className="relative my-auto max-w-6xl w-full mx-auto flex flex-col items-center">
              
              {/* Fullscreen 16:9 / 4:3 Slide Display */}
              <div 
                className={`w-full ${aspectRatio === '16:9' ? 'aspect-video' : 'aspect-[4/3]'} rounded-3xl shadow-2xl relative overflow-hidden p-10 sm:p-16 flex flex-col justify-between border border-white/10 bg-white`}
                style={slideStyle}
              >
                {/* Top Accent Strip for Standard Slides */}
                {!isDarkSlide && (
                  <div 
                    className="absolute top-0 left-0 right-0 h-3"
                    style={{ backgroundColor: theme.primaryColor || '#2563eb' }}
                  />
                )}

                {/* Layout: Title / Cover Slide */}
                {presentSlide.layout === 'title' ? (
                  <div className="my-auto text-center space-y-5">
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight drop-shadow-sm leading-tight">
                      {presentSlide.title}
                    </h1>
                    {presentSlide.subtitle && (
                      <p className="text-lg sm:text-2xl lg:text-3xl opacity-90 max-w-3xl mx-auto font-medium leading-relaxed">
                        {presentSlide.subtitle}
                      </p>
                    )}
                    {presentSlide.elements.map(el => (
                      el.type === 'paragraph' && (
                        <p key={el.id} className="text-sm sm:text-lg opacity-75 font-medium pt-3 max-w-2xl mx-auto">
                          {String(el.content)}
                        </p>
                      )
                    ))}
                  </div>
                ) : presentSlide.layout === 'quote' ? (
                  /* Layout: Quote */
                  <div className="my-auto space-y-6 px-6 sm:px-12 text-center">
                    <Quote className="w-16 h-16 mx-auto opacity-30" style={{ color: theme.primaryColor }} />
                    <blockquote className="text-2xl sm:text-4xl lg:text-5xl font-extrabold italic leading-snug">
                      “{presentSlide.title}”
                    </blockquote>
                    {presentSlide.subtitle && (
                      <p className="text-base sm:text-xl font-semibold opacity-75">
                        — {presentSlide.subtitle}
                      </p>
                    )}
                  </div>
                ) : presentSlide.layout === 'two-columns' ? (
                  /* Layout: Two Columns */
                  <div className="space-y-6">
                    <div>
                      <h2 
                        className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-snug"
                        style={{ color: isDarkSlide ? '#ffffff' : (theme.primaryColor || '#2563eb') }}
                      >
                        {presentSlide.title}
                      </h2>
                      {presentSlide.subtitle && (
                        <p className="text-sm sm:text-lg opacity-75 mt-1 font-medium">
                          {presentSlide.subtitle}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2 items-start">
                      {presentSlide.elements.map((el) => {
                        if (el.type === 'paragraph') {
                          return (
                            <div key={el.id} className="p-6 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-base sm:text-lg leading-relaxed font-normal">
                              {String(el.content)}
                            </div>
                          );
                        }
                        if (el.type === 'bullets' && Array.isArray(el.content)) {
                          return (
                            <ul key={el.id} className="space-y-3.5 text-base sm:text-xl">
                              {(el.content as string[]).map((b, bIdx) => (
                                <li key={bIdx} className="flex items-start space-x-3">
                                  <span className="font-bold text-lg" style={{ color: theme.primaryColor || '#2563eb' }}>•</span>
                                  <span className="leading-relaxed">{b}</span>
                                </li>
                              ))}
                            </ul>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                ) : presentSlide.layout === 'timeline' ? (
                  /* Layout: Timeline */
                  <div className="space-y-8">
                    <div>
                      <h2 
                        className="text-2xl sm:text-4xl font-extrabold tracking-tight"
                        style={{ color: isDarkSlide ? '#ffffff' : (theme.primaryColor || '#2563eb') }}
                      >
                        {presentSlide.title}
                      </h2>
                      {presentSlide.subtitle && (
                        <p className="text-sm sm:text-lg opacity-75 mt-1 font-medium">
                          {presentSlide.subtitle}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                      {presentSlide.elements.map(el => {
                        if (el.type === 'bullets' && Array.isArray(el.content)) {
                          return (el.content as string[]).map((step, sIdx) => (
                            <div 
                              key={sIdx} 
                              className="p-5 rounded-2xl border flex flex-col justify-between space-y-3"
                              style={{
                                backgroundColor: isDarkSlide ? 'rgba(255, 255, 255, 0.08)' : '#f8fafc',
                                borderColor: isDarkSlide ? 'rgba(255, 255, 255, 0.15)' : '#e2e8f0'
                              }}
                            >
                              <span 
                                className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-md self-start"
                                style={{ backgroundColor: theme.primaryColor, color: '#ffffff' }}
                              >
                                Giai đoạn 0{sIdx + 1}
                              </span>
                              <span className="text-base sm:text-lg font-bold">
                                {step}
                              </span>
                              <span className="text-xs opacity-60">
                                Tiến độ theo lộ trình cam kết
                              </span>
                            </div>
                          ));
                        }
                        return null;
                      })}
                    </div>
                  </div>
                ) : presentSlide.layout === 'stats-kpi' ? (
                  /* Layout: Stats & KPI */
                  <div className="space-y-6">
                    <div>
                      <h2 
                        className="text-2xl sm:text-4xl font-extrabold tracking-tight"
                        style={{ color: isDarkSlide ? '#ffffff' : (theme.primaryColor || '#2563eb') }}
                      >
                        {presentSlide.title}
                      </h2>
                      {presentSlide.subtitle && (
                        <p className="text-sm sm:text-lg opacity-75 mt-1 font-medium">
                          {presentSlide.subtitle}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                      {presentSlide.elements.map((el) => {
                        if (el.type === 'kpis' && Array.isArray(el.content)) {
                          return (el.content as any[]).map((kpi, kIdx) => (
                            <div 
                              key={kIdx} 
                              className="p-5 rounded-2xl border text-center shadow-xs flex flex-col justify-center"
                              style={{
                                backgroundColor: isDarkSlide ? 'rgba(255, 255, 255, 0.1)' : '#f8fafc',
                                borderColor: isDarkSlide ? 'rgba(255, 255, 255, 0.15)' : '#e2e8f0'
                              }}
                            >
                              <span 
                                className="text-3xl sm:text-4xl font-extrabold tabular-nums tracking-tight"
                                style={{ color: isDarkSlide ? '#ffffff' : (theme.primaryColor || '#2563eb') }}
                              >
                                {kpi.value}
                              </span>
                              <span className="text-sm sm:text-base font-bold mt-2 opacity-90">
                                {kpi.label}
                              </span>
                              {kpi.desc && (
                                <span className="text-xs sm:text-sm opacity-60 mt-1">
                                  {kpi.desc}
                                </span>
                              )}
                            </div>
                          ));
                        }
                        return null;
                      })}
                    </div>
                  </div>
                ) : (
                  /* Layout: Standard Content / Bullets */
                  <div className="space-y-6">
                    <div>
                      <h2 
                        className="text-2xl sm:text-4xl font-extrabold tracking-tight"
                        style={{ color: isDarkSlide ? '#ffffff' : (theme.primaryColor || '#2563eb') }}
                      >
                        {presentSlide.title}
                      </h2>
                      {presentSlide.subtitle && (
                        <p className="text-sm sm:text-lg opacity-75 mt-1 font-medium">
                          {presentSlide.subtitle}
                        </p>
                      )}
                    </div>

                    <div className="space-y-4 pt-2">
                      {presentSlide.elements.map((el) => {
                        if (el.type === 'paragraph') {
                          return (
                            <p key={el.id} className="text-base sm:text-xl opacity-90 leading-relaxed">
                              {String(el.content)}
                            </p>
                          );
                        }
                        if (el.type === 'bullets' && Array.isArray(el.content)) {
                          return (
                            <ul key={el.id} className="space-y-3.5 text-base sm:text-xl">
                              {(el.content as string[]).map((b, bIdx) => (
                                <li key={bIdx} className="flex items-start space-x-3">
                                  <span className="font-bold text-lg" style={{ color: theme.primaryColor || '#2563eb' }}>•</span>
                                  <span className="leading-relaxed">{b}</span>
                                </li>
                              ))}
                            </ul>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                )}

                {/* Slide Footer */}
                <div 
                  className="text-xs flex justify-between border-t pt-4 font-medium"
                  style={{
                    borderColor: isDarkSlide ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
                    opacity: 0.65
                  }}
                >
                  <span>{title}</span>
                  <span className="font-mono tabular-nums">Trang {presentSlideIndex + 1} / {slides.length}</span>
                </div>
              </div>

              {/* Presenter Notes Overlay Drawer */}
              {showPresentNotes && presentSlide.notes && (
                <div className="w-full mt-4 p-4 bg-slate-900/95 border border-white/20 rounded-2xl text-white text-xs sm:text-sm leading-relaxed backdrop-blur-md shadow-2xl animate-in slide-in-from-bottom-2">
                  <div className="flex items-center space-x-2 font-bold text-orange-400 mb-1">
                    <MessageSquare className="w-4 h-4" />
                    <span>Ghi chú diễn giả:</span>
                  </div>
                  <p className="opacity-90">{presentSlide.notes}</p>
                </div>
              )}

            </div>

            {/* Bottom Navigation Hints */}
            <div className="flex justify-between items-center text-white/60 text-xs px-2">
              <span>Dùng phím [←] và [→] hoặc [Space] để chuyển slide • [N] bật/tắt ghi chú • [Esc] thoát</span>
              <div className="space-x-2">
                <button
                  onClick={() => setPresentSlideIndex(prev => Math.max(0, prev - 1))}
                  disabled={presentSlideIndex === 0}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-30 rounded-xl text-white font-medium transition-all cursor-pointer"
                >
                  Trước
                </button>
                <button
                  onClick={() => setPresentSlideIndex(prev => Math.min(slides.length - 1, prev + 1))}
                  disabled={presentSlideIndex === slides.length - 1}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-30 rounded-xl text-white font-medium transition-all cursor-pointer"
                >
                  Tiếp theo
                </button>
              </div>
            </div>

          </div>
        );
      })()}

    </div>
  );
};
