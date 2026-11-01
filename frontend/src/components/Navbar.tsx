import React from 'react';
import { 
  FileText, 
  Presentation, 
  FolderOpen, 
  Plus, 
  Info,
  Layers,
  Sun,
  Moon
} from '../icons/index.js';
import { useTheme } from '../context/ThemeContext.js';

export type AppTab = 'documents' | 'presentations' | 'my-docs';

interface NavbarProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
  onOpenAddModal: () => void;
  onOpenArchModal: () => void;
  userDocsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  onOpenAddModal,
  onOpenArchModal,
  userDocsCount
}) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/85 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800/80 shadow-xs dark:shadow-lg dark:shadow-black/20 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group" 
            onClick={() => onTabChange('documents')}
          >
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <Layers className="w-5 h-5 text-white" />
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                  Omni<span className="text-blue-600 dark:text-blue-400">Doc</span>
                </span>
                <span className="px-2 py-0.5 text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-md">
                  Studio 2.0
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">Thư viện Mẫu Tài liệu Doanh nghiệp</p>
            </div>
          </div>

          {/* Navigation Segmented Control */}
          <nav className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => onTabChange('documents')}
              className={`flex items-center space-x-2 px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors ${
                activeTab === 'documents'
                  ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Mẫu Văn bản</span>
            </button>

            <button
              onClick={() => onTabChange('presentations')}
              className={`flex items-center space-x-2 px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors ${
                activeTab === 'presentations'
                  ? 'bg-white dark:bg-slate-800 text-orange-600 dark:text-orange-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              <Presentation className="w-4 h-4" />
              <span>Mẫu Trình chiếu</span>
            </button>

            <button
              onClick={() => onTabChange('my-docs')}
              className={`flex items-center space-x-2 px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors relative ${
                activeTab === 'my-docs'
                  ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              <FolderOpen className="w-4 h-4" />
              <span>Tài liệu của tôi</span>
              {userDocsCount > 0 && (
                <span className={`ml-1 px-1.5 py-0.2 text-xs font-semibold tabular-nums rounded-full ${
                  activeTab === 'my-docs' 
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300' 
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}>
                  {userDocsCount}
                </span>
              )}
            </button>
          </nav>

          {/* Top Actions: Theme Switcher, Add Template, Info */}
          <div className="flex items-center space-x-2">
            
            {/* Theme Toggle Button (Light/Dark Mode) */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-amber-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors"
              title={isDark ? "Chuyển sang Chủ đề Sáng (Light Theme)" : "Chuyển sang Chủ đề Tối (Dark Theme)"}
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
            </button>

            {/* Add Template Button */}
            <button
              onClick={onOpenAddModal}
              className="flex items-center space-x-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-colors"
              title="Bổ sung mẫu mới vào thư viện"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden md:inline">Thêm mẫu mới</span>
            </button>

            {/* Architecture Guide Modal Button */}
            <button
              onClick={onOpenArchModal}
              className="p-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors border border-slate-200 dark:border-slate-800"
              title="Kiến trúc hệ thống & Báo cáo kỹ thuật"
            >
              <Info className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
