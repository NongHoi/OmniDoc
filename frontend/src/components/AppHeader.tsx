import React from 'react';
import { 
  Menu, 
  Search, 
  FileText, 
  Presentation, 
  Info, 
  ChevronRight, 
  MorphIcon, 
  rawIcons,
  ShieldCheck,
  Users,
  Zap
} from '../icons/index.js';
import { AppTab } from './Sidebar.js';
import { useTheme } from '../context/ThemeContext.js';
import { UserSession, UserRole } from '../types/index.js';

interface AppHeaderProps {
  currentUser?: UserSession | null;
  onSwitchRole?: (role: UserRole) => void;
  activeTab: AppTab;
  onOpenMobileSidebar: () => void;
  selectedCategory?: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onCreateBlankDoc: () => void;
  onCreateBlankPres: () => void;
  onOpenArchModal: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  currentUser,
  onSwitchRole,
  activeTab,
  onOpenMobileSidebar,
  selectedCategory = 'Tất cả',
  searchQuery,
  onSearchChange,
  onCreateBlankDoc,
  onCreateBlankPres,
  onOpenArchModal
}) => {
  const { isDark, toggleTheme } = useTheme();
  const isAdmin = currentUser?.role === 'admin';

  const getBreadcrumbTitle = () => {
    switch (activeTab) {
      case 'documents':
        return {
          root: 'Kho Mẫu Doanh Nghiệp',
          section: 'Mẫu Văn Bản Chuẩn (DOCX)',
          detail: selectedCategory !== 'Tất cả' ? selectedCategory : 'Tất cả mẫu'
        };
      case 'presentations':
        return {
          root: 'Kho Mẫu Doanh Nghiệp',
          section: 'Mẫu Trình Chiếu (PPTX)',
          detail: selectedCategory !== 'Tất cả' ? selectedCategory : 'Tất cả slide'
        };
      case 'my-docs':
        return {
          root: 'Không Gian Cá Nhân',
          section: 'Tài Liệu Của Tôi',
          detail: 'Bản sao độc lập'
        };
    }
  };

  const breadcrumb = getBreadcrumbTitle();

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/90 dark:bg-slate-900/85 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80 px-4 sm:px-6 flex items-center justify-between gap-3 sm:gap-4 transition-colors">
      
      {/* Left: Mobile Menu & Breadcrumbs */}
      <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
        <button
          onClick={onOpenMobileSidebar}
          className="p-2 -ml-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden cursor-pointer"
          title="Mở thanh điều hướng"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-1.5 text-xs text-slate-500 dark:text-slate-400 truncate">
          <span className="hidden md:inline font-medium hover:text-slate-800 dark:hover:text-slate-200 transition-colors">
            {breadcrumb.root}
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0 hidden md:inline" />
          <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">
            {breadcrumb.section}
          </span>
          {breadcrumb.detail && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0 hidden sm:inline" />
              <span className="hidden sm:inline px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium truncate">
                {breadcrumb.detail}
              </span>
            </>
          )}
        </nav>
      </div>

      {/* Center: Quick Search Bar */}
      <div className="hidden lg:flex items-center flex-1 max-w-md mx-2">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={`Tìm kiếm trong ${activeTab === 'documents' ? 'mẫu văn bản...' : activeTab === 'presentations' ? 'mẫu slide...' : 'tài liệu của tôi...'}`}
            className="w-full pl-9 pr-9 py-1.5 text-xs bg-slate-100 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Right: Role Indicator, Quick Actions & System Controls */}
      <div className="flex items-center space-x-2 shrink-0">
        
        {/* Role Indicator & 1-Click Role Switcher Pill */}
        <div className="flex items-center space-x-1.5">
          <div className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-xl text-xs font-semibold border ${
            isAdmin
              ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800'
              : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
          }`}>
            {isAdmin ? (
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            ) : (
              <Users className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            )}
            <span className="hidden sm:inline font-bold">
              {isAdmin ? 'Quản trị viên' : 'Nhân viên'}
            </span>
            <span className="sm:hidden font-bold">
              {isAdmin ? 'Admin' : 'Staff'}
            </span>
          </div>

          {onSwitchRole && (
            <button
              onClick={() => onSwitchRole(isAdmin ? 'staff' : 'admin')}
              className="px-2 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 active:scale-95 text-slate-700 dark:text-slate-300 rounded-lg text-[11px] font-semibold border border-slate-200 dark:border-slate-700 transition-all flex items-center space-x-1 cursor-pointer"
              title={`Đổi sang quyền ${isAdmin ? 'Nhân viên' : 'Admin'} để kiểm thử`}
            >
              <Zap className="w-3 h-3 text-amber-500" />
              <span className="hidden md:inline">Đổi vai trò</span>
            </button>
          )}
        </div>

        {/* Quick Blank Doc */}
        <button
          onClick={onCreateBlankDoc}
          className="group/doc hidden xl:flex items-center space-x-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 dark:bg-blue-500/10 dark:hover:bg-blue-500/20 active:scale-95 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/20 text-xs font-semibold rounded-xl transition-all duration-150 cursor-pointer"
          title="Tạo văn bản mới từ đầu"
        >
          <FileText className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 group-hover/doc:scale-110 transition-transform duration-200" />
          <span>Văn bản mới</span>
        </button>

        {/* Quick Blank Slide */}
        <button
          onClick={onCreateBlankPres}
          className="group/pres hidden xl:flex items-center space-x-1.5 px-3 py-1.5 bg-orange-50 hover:bg-orange-100 dark:bg-orange-500/10 dark:hover:bg-orange-500/20 active:scale-95 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-500/20 text-xs font-semibold rounded-xl transition-all duration-150 cursor-pointer"
          title="Tạo bài trình chiếu mới"
        >
          <Presentation className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400 group-hover/pres:scale-110 transition-transform duration-200" />
          <span>Slide mới</span>
        </button>

        {/* Theme Switcher Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-amber-300 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-90 hover:rotate-12 rounded-xl transition-all duration-200 border border-slate-200 dark:border-slate-800 cursor-pointer"
          title={isDark ? "Chuyển sang Chủ đề Sáng (Light Theme)" : "Chuyển sang Chủ đề Tối (Dark Theme)"}
        >
          <MorphIcon 
            icon={isDark ? rawIcons.Sun : rawIcons.Moon} 
            className={`w-4 h-4 ${isDark ? 'text-amber-400' : 'text-slate-600'}`} 
          />
        </button>

        {/* Technical Architecture Info Modal */}
        <button
          onClick={onOpenArchModal}
          className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-90 hover:scale-105 rounded-xl transition-all duration-150 border border-slate-200 dark:border-slate-800 cursor-pointer"
          title="Kiến trúc hệ thống & Báo cáo kỹ thuật"
        >
          <Info className="w-4 h-4" />
        </button>

      </div>

    </header>
  );
};
