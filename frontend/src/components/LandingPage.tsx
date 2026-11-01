import React, { useState } from 'react';
import { 
  FileText, 
  Presentation, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  LogIn, 
  Sun, 
  Moon, 
  MonitorPlay, 
  FileCode2, 
  Key,
  MorphIcon, 
  rawIcons 
} from '../icons/index.js';
import { useTheme } from '../context/ThemeContext.js';
import { DocumentTemplate, PresentationTemplate } from '../types/index.js';

interface LandingPageProps {
  onLoginClick: () => void;
  onQuickStart: () => void;
  onOpenArchModal: () => void;
  docTemplates: DocumentTemplate[];
  presTemplates: PresentationTemplate[];
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onLoginClick,
  onQuickStart,
  onOpenArchModal,
  docTemplates,
  presTemplates
}) => {
  const { isDark, toggleTheme } = useTheme();
  const [selectedShowcaseTab, setSelectedShowcaseTab] = useState<'docs' | 'slides'>('docs');

  const sampleDocs = docTemplates.slice(0, 4);
  const sampleSlides = presTemplates.slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      
      {/* 1. TOP NAVIGATION */}
      <header className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-11 h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                  OmniDoc
                </span>
                <span className="px-2 py-0.5 text-xs font-bold rounded-lg bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                  Enterprise 2.0
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                Hệ Thống Mẫu Văn Phòng Doanh Nghiệp
              </p>
            </div>
          </div>

          {/* Center Links (Desktop) */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold text-slate-600 dark:text-slate-300">
            <a href="#features" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Giải pháp tích hợp
            </a>
            <a href="#isolation" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Bảo vệ mẫu gốc
            </a>
            <a href="#showcase" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Thư viện mẫu
            </a>
            <button
              onClick={onOpenArchModal}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Kiến trúc hệ thống
            </button>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleTheme}
              className="p-2.5 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-amber-300 bg-slate-100 dark:bg-slate-800 rounded-xl transition-all"
              title={isDark ? "Chuyển sang Chủ đề Sáng" : "Chuyển sang Chủ đề Tối"}
            >
              <MorphIcon 
                icon={isDark ? rawIcons.Sun : rawIcons.Moon} 
                className={`w-4 h-4 ${isDark ? 'text-amber-400' : 'text-slate-600'}`} 
              />
            </button>

            <button
              onClick={onLoginClick}
              className="px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all flex items-center space-x-1.5"
            >
              <LogIn className="w-4 h-4" />
              <span>Đăng nhập</span>
            </button>

            <button
              onClick={onQuickStart}
              className="px-5 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <Zap className="w-4 h-4 text-blue-200" />
              <span className="hidden sm:inline">Workspace Thử Nghiệm</span>
              <span className="sm:hidden">Dùng thử</span>
            </button>
          </div>

        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="pt-12 pb-16 lg:pt-20 lg:pb-24 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 w-full">
          
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.08] max-w-4xl mx-auto">
              Biểu Mẫu Doanh Nghiệp Tích Hợp
            </h1>
            <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
              Kho mẫu văn bản hành chính và bài thuyết trình kinh doanh tiêu chuẩn. Tự động điền biến, chỉnh sửa trực tiếp và bảo vệ tuyệt đối mẫu gốc.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={onQuickStart}
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-base font-bold rounded-2xl transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Trải nghiệm ngay với tài khoản thử nghiệm</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenArchModal}
              className="w-full sm:w-auto px-6 py-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-base font-semibold rounded-2xl transition-all flex items-center justify-center space-x-2"
            >
              <FileCode2 className="w-4 h-4 text-purple-500" />
              <span>Xem báo cáo kỹ thuật</span>
            </button>
          </div>

          {/* Default Account Callout Notice */}
          <div className="inline-flex items-center space-x-3 px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm text-slate-700 dark:text-slate-300">
            <div className="flex items-center space-x-1.5 text-blue-600 dark:text-blue-400 font-bold">
              <Key className="w-4 h-4" />
              <span>Tài khoản thử nghiệm:</span>
            </div>
            <span className="font-semibold text-slate-900 dark:text-white">
              admin@omnidoc.enterprise
            </span>
            <span>•</span>
            <span className="font-semibold text-slate-900 dark:text-white">
              admin123
            </span>
          </div>

          {/* Narrative Key Metrics: Composed Horizontal Row */}
          <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-around gap-6 max-w-4xl mx-auto text-center">
            <div className="space-y-1">
              <div className="text-3xl font-black text-blue-600 dark:text-blue-400 tabular-nums">11+</div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">Mẫu Văn Bản DOCX</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Hợp đồng và hành chính</div>
            </div>

            <div className="space-y-1">
              <div className="text-3xl font-black text-orange-500 dark:text-orange-400 tabular-nums">6+</div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">Mẫu Trình Chiếu PPTX</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Pitch deck và đào tạo</div>
            </div>

            <div className="space-y-1">
              <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 tabular-nums">100%</div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">Bảo Toàn Mẫu Gốc</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Phân lập an toàn</div>
            </div>

            <div className="space-y-1">
              <div className="text-3xl font-black text-purple-600 dark:text-purple-400 tabular-nums">&lt; 1.2s</div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">Tốc Độ Tải Tức Thì</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Phản hồi mili-giây</div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. CORE PRODUCTS SECTION */}
      <section id="features" className="py-16 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 w-full">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Hai Trọng Tâm Sản Phẩm Tích Hợp
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Kết hợp hoàn hảo giữa biểu mẫu hành chính quy chuẩn và hệ thống trình chiếu kinh doanh hiện đại.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Product 1: DOCX */}
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <div className="text-sm font-bold text-blue-600 dark:text-blue-400">
                  Thư Viện Văn Bản Chuẩn (Microsoft Word)
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Mẫu Hợp Đồng & Văn Bản Hành Chính
                </h3>
                <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                  Bao gồm đầy đủ hợp đồng cung ứng dịch vụ, thỏa thuận bảo mật NDA, biên bản làm việc và đơn từ nhân sự có giá trị pháp lý cao.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-start space-x-3 text-sm text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Tự động điền biến biểu mẫu cho cán bộ phụ trách.</span>
                </div>
                <div className="flex items-start space-x-3 text-sm text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Trình soạn thảo trực quan hỗ trợ định dạng A4 chuẩn.</span>
                </div>
                <div className="flex items-start space-x-3 text-sm text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Xuất file DOCX nguyên vẹn cấu trúc và kiểu chữ.</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-sm text-slate-500 dark:text-slate-400">
                11 mẫu văn bản kiểm định
              </span>
              <button
                onClick={onQuickStart}
                className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 flex items-center space-x-1"
              >
                <span>Khám phá mẫu DOCX</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Product 2: PPTX */}
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-950 text-orange-600 dark:text-orange-400 flex items-center justify-center">
                <Presentation className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <div className="text-sm font-bold text-orange-600 dark:text-orange-400">
                  Thư Viện Trình Chiếu (Microsoft PowerPoint)
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Mẫu Thuyết Trình Đa Slide Chuyên Nghiệp
                </h3>
                <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                  Thiết kế tỉ mỉ cho các buổi gọi vốn khởi nghiệp Pitch Deck, chiến dịch tiếp thị, báo cáo doanh thu tài chính và tài liệu đào tạo.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-start space-x-3 text-sm text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Slide card linh hoạt, chỉnh sửa bố cục từng trang.</span>
                </div>
                <div className="flex items-start space-x-3 text-sm text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Chế độ trình chiếu toàn màn hình mượt mà bằng phím tắt.</span>
                </div>
                <div className="flex items-start space-x-3 text-sm text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Xuất file PPTX tương thích trọn vẹn PowerPoint.</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-sm text-slate-500 dark:text-slate-400">
                6 bộ slide hoàn chỉnh
              </span>
              <button
                onClick={onQuickStart}
                className="text-sm font-bold text-orange-600 dark:text-orange-400 hover:text-orange-700 flex items-center space-x-1"
              >
                <span>Khám phá mẫu PPTX</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 4. ZERO-DESTRUCTIVE ISOLATION (Structured Narrative Step by Step) */}
      <section id="isolation" className="py-16 sm:py-24 bg-slate-100 dark:bg-slate-900/60 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 w-full">
          <div className="max-w-2xl mx-auto text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Cơ Chế Phân Lập Zero-Destructive
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Nguyên tắc thiết kế bảo toàn tuyệt đối biểu mẫu gốc, ngăn ngừa nguy cơ vô tình làm hỏng mẫu dùng chung.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl flex items-start space-x-4">
              <ShieldCheck className="w-6 h-6 text-blue-600 dark:text-blue-400 shrink-0 mt-1" />
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Mẫu Gốc Đóng Băng An Toàn
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Toàn bộ biểu mẫu tiêu chuẩn nằm trong vùng lưu trữ chỉ đọc, không thể bị chỉnh sửa hay ghi đè.
                </p>
              </div>
            </div>

            <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl flex items-start space-x-4">
              <Zap className="w-6 h-6 text-indigo-600 dark:text-indigo-400 shrink-0 mt-1" />
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Nhân Bản Độc Lập Ngay Lập Tức
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Bấm sử dụng mẫu sẽ tự động tạo một phiên bản làm việc riêng biệt với mã định danh độc nhất.
                </p>
              </div>
            </div>

            <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl flex items-start space-x-4">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0 mt-1" />
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Tự Do Chỉnh Sửa & Lưu Bản
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Mọi chỉnh sửa chỉ áp dụng cho tài liệu cá nhân của người dùng, không bao giờ thay đổi mẫu hệ thống.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TEMPLATE SHOWCASE PREVIEW */}
      <section id="showcase" className="py-16 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 w-full">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 w-full">
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Biểu Mẫu Tiêu Biểu Trong Hệ Thống
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-400">
              Chọn loại biểu mẫu để xem trước danh mục sẵn có
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-slate-200 dark:bg-slate-800 p-1.5 rounded-xl self-stretch sm:self-auto justify-center">
            <button
              onClick={() => setSelectedShowcaseTab('docs')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                selectedShowcaseTab === 'docs'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Mẫu Văn Bản ({docTemplates.length})</span>
            </button>

            <button
              onClick={() => setSelectedShowcaseTab('slides')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                selectedShowcaseTab === 'slides'
                  ? 'bg-white dark:bg-slate-900 text-orange-600 dark:text-orange-400'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Presentation className="w-4 h-4" />
              <span>Mẫu Slide ({presTemplates.length})</span>
            </button>
          </div>
        </div>

        {/* Templates Grid */}
        {selectedShowcaseTab === 'docs' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {sampleDocs.map((tpl) => (
              <div
                key={tpl.id}
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 flex flex-col justify-between hover:-translate-y-1 transition-all"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300">
                      {tpl.category}
                    </span>
                    <span className="text-xs text-slate-400">v{tpl.version}</span>
                  </div>

                  <div className="h-28 rounded-xl bg-slate-100 dark:bg-slate-950 p-4 flex flex-col justify-center space-y-2 overflow-hidden">
                    <div className="w-14 h-2 bg-blue-600 rounded-full" />
                    <div className="w-full h-1.5 bg-slate-300 dark:bg-slate-800 rounded" />
                    <div className="w-4/5 h-1.5 bg-slate-300 dark:bg-slate-800 rounded" />
                    <div className="w-3/5 h-1.5 bg-slate-300 dark:bg-slate-800 rounded" />
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-2">
                    {tpl.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                    {tpl.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Bảo vệ mẫu gốc</span>
                  <button
                    onClick={onQuickStart}
                    className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 flex items-center space-x-1"
                  >
                    <span>Sử dụng</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {sampleSlides.map((tpl) => (
              <div
                key={tpl.id}
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 flex flex-col justify-between hover:-translate-y-1 transition-all"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-orange-100 dark:bg-orange-950 text-orange-800 dark:text-orange-300">
                      {tpl.category}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      {tpl.slidesCount || tpl.slides?.length || 0} slides
                    </span>
                  </div>

                  <div className="aspect-video rounded-xl bg-slate-950 text-white p-4 flex flex-col justify-between">
                    <div>
                      <span className="text-xs text-orange-400 font-bold block">
                        OmniDoc Slideshow
                      </span>
                      <span className="text-sm font-bold block truncate mt-1">
                        {tpl.title}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>16:9 Widescreen</span>
                      <MonitorPlay className="w-4 h-4 text-orange-400" />
                    </div>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-2">
                    {tpl.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                    {tpl.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Trình chiếu full</span>
                  <button
                    onClick={onQuickStart}
                    className="text-xs font-bold text-orange-600 dark:text-orange-400 hover:text-orange-700 flex items-center space-x-1"
                  >
                    <span>Sử dụng</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </section>

      {/* 6. CALL TO ACTION BANNER */}
      <section className="my-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="rounded-3xl bg-blue-600 p-8 sm:p-12 text-white text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Sẵn Sàng Chuẩn Hóa Biểu Mẫu?
            </h2>
            <p className="text-base text-white leading-relaxed">
              Trải nghiệm ngay toàn bộ tính năng với tài khoản thử nghiệm được cấp sẵn chỉ bằng một cú nhấp chuột.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onQuickStart}
              className="w-full sm:w-auto px-8 py-4 bg-white text-blue-700 hover:bg-blue-50 text-base font-bold rounded-2xl transition-all cursor-pointer flex items-center justify-center space-x-2"
            >
              <Zap className="w-4 h-4 text-blue-600" />
              <span>Bắt đầu với tài khoản thử nghiệm</span>
            </button>
            <button
              onClick={onLoginClick}
              className="w-full sm:w-auto px-6 py-4 bg-blue-800 hover:bg-blue-900 text-white text-base font-semibold rounded-2xl transition-all"
            >
              Đăng nhập thủ công
            </button>
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="mt-auto bg-white dark:bg-slate-900 py-8 transition-colors border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500 dark:text-slate-400">
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-slate-900 dark:text-white">OmniDoc Office Studio 2.0</span>
            <span>•</span>
            <span>Hệ Thống Quản Lý Biểu Mẫu Doanh Nghiệp Tích Hợp</span>
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={onOpenArchModal}
              className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline font-semibold"
            >
              Báo cáo kỹ thuật
            </button>
            <span>•</span>
            <span>Cổng dịch vụ :5000 hoạt động</span>
            <span>•</span>
            <span>© 2026 OmniDoc</span>
          </div>
        </div>
      </footer>

    </div>
  );
};
