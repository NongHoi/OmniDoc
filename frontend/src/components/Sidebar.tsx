import React, { useState } from 'react';
import { 
  FileText, 
  Presentation, 
  FolderOpen, 
  Plus, 
  Layers, 
  ChevronDown, 
  ShieldCheck, 
  FileCode2,
  LogOut,
  X,
  MorphIcon, 
  rawIcons,
  Users,
  Zap
} from '../icons/index.js';
import { useTheme } from '../context/ThemeContext.js';
import { UserSession, UserRole } from '../types/index.js';

export type AppTab = 'documents' | 'presentations' | 'my-docs';

interface SidebarProps {
  currentUser?: UserSession | null;
  onLogout?: () => void;
  onSwitchRole?: (role: UserRole) => void;
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
  selectedDocCategory?: string;
  onSelectDocCategory?: (cat: string) => void;
  selectedPresCategory?: string;
  onSelectPresCategory?: (cat: string) => void;
  onOpenAddModal: () => void;
  onOpenArchModal: () => void;
  onCreateBlankDoc: () => void;
  onCreateBlankPres: () => void;
  userDocsCount: number;
  docTemplatesCount: number;
  presTemplatesCount: number;
  docCategories: Record<string, number>;
  presCategories: Record<string, number>;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentUser,
  onLogout,
  onSwitchRole,
  activeTab,
  onTabChange,
  selectedDocCategory = 'Tất cả',
  onSelectDocCategory,
  selectedPresCategory = 'Tất cả',
  onSelectPresCategory,
  onOpenAddModal,
  onOpenArchModal,
  onCreateBlankDoc,
  onCreateBlankPres,
  userDocsCount,
  docTemplatesCount,
  presTemplatesCount,
  docCategories,
  presCategories,
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile
}) => {
  const { isDark, toggleTheme } = useTheme();
  const [docMenuExpanded, setDocMenuExpanded] = useState(true);
  const [presMenuExpanded, setPresMenuExpanded] = useState(true);
  const [isQuickCreateOpen, setIsQuickCreateOpen] = useState(false);

  const isAdmin = currentUser?.role === 'admin';

  // Document categories list
  const docCatList = ['Tất cả', 'Hợp đồng', 'Nhân sự', 'Hành chính', 'Kinh doanh', 'Báo cáo', 'Tuyển dụng'];
  // Presentation categories list
  const presCatList = ['Tất cả', 'Khởi nghiệp', 'Marketing', 'Kinh doanh', 'Đào tạo', 'Báo cáo'];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Main Sidebar Aside */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800/90 flex flex-col transition-all duration-300 select-none ${
          isCollapsed ? 'w-[72px]' : 'w-64 sm:w-72'
        } ${
          isMobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Workspace Brand Header */}
        <div className={`h-16 flex items-center border-b border-slate-200 dark:border-slate-800 shrink-0 ${
          isCollapsed ? 'justify-center px-2' : 'justify-between px-4'
        }`}>
          {isCollapsed ? (
            <div className="relative group flex items-center justify-center">
              <button
                onClick={onToggleCollapse}
                className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 active:scale-95 transition-all shadow-xs cursor-pointer relative"
                title="Mở rộng thanh bên (Click để mở)"
              >
                <Layers className="w-5 h-5 text-white" />
                <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-xs">
                  <MorphIcon icon={rawIcons.ChevronRight} className="w-2.5 h-2.5" />
                </span>
              </button>
              {/* Floating tooltip */}
              <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-slate-900 text-white text-xs font-medium rounded-lg shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                Mở rộng thanh bên
              </div>
            </div>
          ) : (
            <>
              <div 
                onClick={() => onTabChange('documents')}
                className="flex items-center space-x-3 cursor-pointer overflow-hidden"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Layers className="w-5 h-5 text-white" />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center space-x-1.5">
                    <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white truncate">
                      Omni<span className="text-blue-600 dark:text-blue-400">Doc</span>
                    </span>
                    <span className="px-1.5 py-0.5 text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded">
                      Studio
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-slate-500 dark:text-slate-400 truncate">
                    <span className="truncate">Enterprise</span>
                    <span>•</span>
                    <span className={`font-semibold ${isAdmin ? 'text-blue-600 dark:text-blue-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                      {isAdmin ? 'Admin' : 'Nhân viên'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Mobile Close Button or Desktop Collapse Toggle */}
              <div className="flex items-center">
                <button
                  onClick={onCloseMobile}
                  className="p-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 rounded-lg lg:hidden cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
                <button
                  onClick={onToggleCollapse}
                  className="hidden lg:flex p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                  title="Thu gọn thanh bên"
                >
                  <MorphIcon icon={rawIcons.ChevronLeft} className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </div>

        {/* Quick Action Button */}
        <div className={`p-3 border-b border-slate-100 dark:border-slate-800/80 shrink-0 relative ${
          isCollapsed ? 'flex justify-center' : ''
        }`}>
          {isCollapsed ? (
            <div className="relative group">
              <button
                onClick={() => setIsQuickCreateOpen(!isQuickCreateOpen)}
                className="w-11 h-11 flex items-center justify-center bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-xl shadow-xs transition-all cursor-pointer"
                title="Soạn thảo mới"
              >
                <Plus className="w-5 h-5" />
              </button>

              {/* Quick Create Dropdown Menu (Flyout to right when collapsed) */}
              {isQuickCreateOpen && (
                <div 
                  className="absolute left-full ml-3 top-0 w-64 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl p-2 z-50 animate-modal-content"
                  onClick={() => setIsQuickCreateOpen(false)}
                >
                  <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Tạo mới nhanh
                  </div>
                  <button
                    onClick={onCreateBlankDoc}
                    className="w-full flex items-center space-x-2.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-700/80 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition-all duration-150 active:scale-95 text-left cursor-pointer"
                  >
                    <FileText className="w-4 h-4 text-blue-500 shrink-0" />
                    <div>
                      <div className="font-semibold">Soạn văn bản mới</div>
                      <span className="text-[11px] text-slate-500">Soạn thảo văn bản trống (DOCX)</span>
                    </div>
                  </button>
                  <button
                    onClick={onCreateBlankPres}
                    className="w-full flex items-center space-x-2.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-slate-700/80 hover:text-orange-600 dark:hover:text-orange-400 rounded-lg transition-all duration-150 active:scale-95 text-left mt-0.5 cursor-pointer"
                  >
                    <Presentation className="w-4 h-4 text-orange-500 shrink-0" />
                    <div>
                      <div className="font-semibold">Tạo bài trình chiếu mới</div>
                      <span className="text-[11px] text-slate-500">Biên soạn bộ slide (PPTX)</span>
                    </div>
                  </button>

                  {/* Master Template Upload - Only for Admin */}
                  {isAdmin ? (
                    <>
                      <div className="my-1 border-t border-slate-100 dark:border-slate-700/80" />
                      <button
                        onClick={onOpenAddModal}
                        className="w-full flex items-center space-x-2.5 px-3 py-2 text-xs font-medium text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-all duration-150 active:scale-95 text-left cursor-pointer"
                      >
                        <Plus className="w-4 h-4 text-blue-500 shrink-0" />
                        <div>
                          <div className="font-semibold">Thêm mẫu mới vào thư viện</div>
                          <span className="text-[11px] text-slate-500 dark:text-slate-400">Quyền Admin: tải lên kho chung</span>
                        </div>
                      </button>
                    </>
                  ) : (
                    <div className="mt-1 pt-1.5 border-t border-slate-100 dark:border-slate-700/80 px-2 py-1 text-[11px] text-slate-400 italic">
                      * Quyền Nhân viên: Sử dụng mẫu & lưu bản sao riêng
                    </div>
                  )}
                </div>
              )}

              {/* Hover Tooltip when flyout is closed */}
              {!isQuickCreateOpen && (
                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1.5 bg-slate-900 text-white text-xs font-medium rounded-lg shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                  Soạn thảo mới (+)
                </div>
              )}
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={() => setIsQuickCreateOpen(!isQuickCreateOpen)}
                className="w-full flex items-center justify-between px-3.5 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-semibold rounded-xl shadow-xs transition-all duration-150 cursor-pointer"
              >
                <div className="flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Soạn thảo tài liệu</span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isQuickCreateOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Quick Create Dropdown Menu */}
              {isQuickCreateOpen && (
                <div 
                  className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl p-1.5 z-30 animate-dropdown"
                  onClick={() => setIsQuickCreateOpen(false)}
                >
                  <button
                    onClick={onCreateBlankDoc}
                    className="w-full flex items-center space-x-2.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-700/80 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition-all duration-150 active:scale-95 text-left cursor-pointer"
                  >
                    <FileText className="w-4 h-4 text-blue-500 shrink-0" />
                    <div>
                      <div className="font-semibold">Soạn văn bản mới</div>
                      <span className="text-xs text-slate-500">Soạn thảo văn bản trống (DOCX)</span>
                    </div>
                  </button>
                  <button
                    onClick={onCreateBlankPres}
                    className="w-full flex items-center space-x-2.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-orange-50 dark:hover:bg-slate-700/80 hover:text-orange-600 dark:hover:text-orange-400 rounded-lg transition-all duration-150 active:scale-95 text-left mt-0.5 cursor-pointer"
                  >
                    <Presentation className="w-4 h-4 text-orange-500 shrink-0" />
                    <div>
                      <div className="font-semibold">Tạo bài trình chiếu mới</div>
                      <span className="text-xs text-slate-500">Biên soạn bộ slide (PPTX)</span>
                    </div>
                  </button>

                  {/* Master Template Upload - Only for Admin */}
                  {isAdmin ? (
                    <>
                      <div className="my-1 border-t border-slate-100 dark:border-slate-700/80" />
                      <button
                        onClick={onOpenAddModal}
                        className="w-full flex items-center space-x-2.5 px-3 py-2 text-xs font-medium text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-all duration-150 active:scale-95 text-left cursor-pointer"
                      >
                        <Plus className="w-4 h-4 text-blue-500 shrink-0" />
                        <div>
                          <div className="font-semibold">Thêm mẫu mới vào thư viện</div>
                          <span className="text-xs text-slate-500 dark:text-slate-400">Quyền Admin: tải lên kho chung</span>
                        </div>
                      </button>
                    </>
                  ) : (
                    <div className="mt-1 pt-1.5 border-t border-slate-100 dark:border-slate-700/80 px-2 py-1 text-[11px] text-slate-400 italic">
                      * Quyền Nhân viên: Sử dụng mẫu & lưu bản sao riêng
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Scrollable Navigation Items */}
        <div className={`flex-1 overflow-y-auto ${isCollapsed ? 'p-2 space-y-3' : 'p-3 space-y-6'} scrollbar-thin`}>
          
          {/* GROUP 1: KHO MẪU CHUẨN DOANH NGHIỆP */}
          <div className="space-y-1">
            {!isCollapsed && (
              <div className="px-3 text-xs font-semibold text-slate-600 dark:text-slate-300 tracking-wide mb-2">
                Kho Mẫu Doanh Nghiệp
              </div>
            )}

            {/* TAB: MẪU VĂN BẢN */}
            {isCollapsed ? (
              <div className="relative group flex justify-center">
                <button
                  onClick={() => {
                    onTabChange('documents');
                    onSelectDocCategory && onSelectDocCategory('Tất cả');
                  }}
                  className={`w-11 h-11 flex items-center justify-center rounded-xl transition-all cursor-pointer ${
                    activeTab === 'documents'
                      ? 'bg-blue-50 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400 font-semibold border border-blue-200/80 dark:border-blue-500/30 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  <FileText className={`w-5 h-5 ${activeTab === 'documents' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500'}`} />
                </button>
                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1.5 bg-slate-900 text-white text-xs font-medium rounded-lg shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 flex items-center space-x-1.5">
                  <span>Mẫu Văn Bản</span>
                  <span className="px-1.5 py-0.2 text-[10px] bg-slate-800 text-slate-300 rounded-full font-bold">
                    {docTemplatesCount}
                  </span>
                </div>
              </div>
            ) : (
              <div>
                <button
                  onClick={() => {
                    onTabChange('documents');
                    onSelectDocCategory && onSelectDocCategory('Tất cả');
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-xl transition-all cursor-pointer ${
                    activeTab === 'documents'
                      ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 font-semibold border border-blue-200/80 dark:border-blue-500/20'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                  title="Kho Mẫu Văn Bản"
                >
                  <div className="flex items-center space-x-2.5">
                    <FileText className={`w-4 h-4 ${activeTab === 'documents' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500'}`} />
                    <span>Mẫu Văn Bản</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="px-2 py-0.5 text-xs font-semibold tabular-nums rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {docTemplatesCount}
                    </span>
                    <div 
                      onClick={(e) => {
                        e.stopPropagation();
                        setDocMenuExpanded(!docMenuExpanded);
                      }}
                      className="p-0.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded"
                    >
                      <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${docMenuExpanded ? '' : '-rotate-90'}`} />
                    </div>
                  </div>
                </button>

                {/* Sub-categories for Documents */}
                {docMenuExpanded && activeTab === 'documents' && (
                  <div className="ml-4 pl-3 border-l border-slate-200 dark:border-slate-800 mt-1 space-y-0.5">
                    {docCatList.map(cat => {
                      const isSelected = selectedDocCategory.toLowerCase() === cat.toLowerCase();
                      const count = cat === 'Tất cả' 
                        ? docTemplatesCount 
                        : (docCategories[cat] || 0);

                      return (
                        <button
                          key={cat}
                          onClick={() => {
                            onTabChange('documents');
                            onSelectDocCategory && onSelectDocCategory(cat);
                          }}
                          className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs rounded-lg transition-colors cursor-pointer ${
                            isSelected
                              ? 'text-blue-600 dark:text-blue-400 bg-blue-50/60 dark:bg-blue-500/10 font-semibold'
                              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                          }`}
                        >
                          <div className="flex items-center space-x-2 truncate">
                            <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-blue-600 dark:bg-blue-400' : 'bg-slate-300 dark:bg-slate-600'}`} />
                            <span className="truncate">{cat}</span>
                          </div>
                          {count > 0 && (
                            <span className="text-xs tabular-nums text-slate-400">
                              {count}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* TAB: MẪU TRÌNH CHIẾU */}
            {isCollapsed ? (
              <div className="relative group flex justify-center">
                <button
                  onClick={() => {
                    onTabChange('presentations');
                    onSelectPresCategory && onSelectPresCategory('Tất cả');
                  }}
                  className={`w-11 h-11 flex items-center justify-center rounded-xl transition-all cursor-pointer ${
                    activeTab === 'presentations'
                      ? 'bg-orange-50 dark:bg-orange-500/15 text-orange-600 dark:text-orange-400 font-semibold border border-orange-200/80 dark:border-orange-500/30 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  <Presentation className={`w-5 h-5 ${activeTab === 'presentations' ? 'text-orange-600 dark:text-orange-400' : 'text-slate-500'}`} />
                </button>
                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1.5 bg-slate-900 text-white text-xs font-medium rounded-lg shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 flex items-center space-x-1.5">
                  <span>Mẫu Trình Chiếu</span>
                  <span className="px-1.5 py-0.2 text-[10px] bg-slate-800 text-slate-300 rounded-full font-bold">
                    {presTemplatesCount}
                  </span>
                </div>
              </div>
            ) : (
              <div>
                <button
                  onClick={() => {
                    onTabChange('presentations');
                    onSelectPresCategory && onSelectPresCategory('Tất cả');
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-xl transition-all cursor-pointer ${
                    activeTab === 'presentations'
                      ? 'bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-300 font-semibold border border-orange-200/80 dark:border-orange-500/20'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                  title="Kho Mẫu Trình Chiếu"
                >
                  <div className="flex items-center space-x-2.5">
                    <Presentation className={`w-4 h-4 ${activeTab === 'presentations' ? 'text-orange-600 dark:text-orange-400' : 'text-slate-500'}`} />
                    <span>Mẫu Trình Chiếu</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="px-2 py-0.5 text-xs font-semibold tabular-nums rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {presTemplatesCount}
                    </span>
                    <div 
                      onClick={(e) => {
                        e.stopPropagation();
                        setPresMenuExpanded(!presMenuExpanded);
                      }}
                      className="p-0.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded"
                    >
                      <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${presMenuExpanded ? '' : '-rotate-90'}`} />
                    </div>
                  </div>
                </button>

                {/* Sub-categories for Presentations */}
                {presMenuExpanded && activeTab === 'presentations' && (
                  <div className="ml-4 pl-3 border-l border-slate-200 dark:border-slate-800 mt-1 space-y-0.5">
                    {presCatList.map(cat => {
                      const isSelected = selectedPresCategory.toLowerCase() === cat.toLowerCase();
                      const count = cat === 'Tất cả' 
                        ? presTemplatesCount 
                        : (presCategories[cat] || 0);

                      return (
                        <button
                          key={cat}
                          onClick={() => {
                            onTabChange('presentations');
                            onSelectPresCategory && onSelectPresCategory(cat);
                          }}
                          className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs rounded-lg transition-colors cursor-pointer ${
                            isSelected
                              ? 'text-orange-600 dark:text-orange-400 bg-orange-50/60 dark:bg-orange-500/10 font-semibold'
                              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                          }`}
                        >
                          <div className="flex items-center space-x-2 truncate">
                            <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-orange-600 dark:bg-orange-400' : 'bg-slate-300 dark:bg-slate-600'}`} />
                            <span className="truncate">{cat}</span>
                          </div>
                          {count > 0 && (
                            <span className="text-xs tabular-nums text-slate-400">
                              {count}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

          </div>

          {/* GROUP 2: KHÔNG GIAN LÀM VIỆC CÁ NHÂN */}
          <div className="space-y-1">
            {!isCollapsed && (
              <div className="px-3 text-xs font-semibold text-slate-600 dark:text-slate-300 tracking-wide mb-2">
                Không Gian Làm Việc
              </div>
            )}

            {isCollapsed ? (
              <div className="relative group flex justify-center">
                <button
                  onClick={() => onTabChange('my-docs')}
                  className={`w-11 h-11 flex items-center justify-center rounded-xl transition-all cursor-pointer ${
                    activeTab === 'my-docs'
                      ? 'bg-emerald-50 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-200/80 dark:border-emerald-500/30 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  <FolderOpen className={`w-5 h-5 ${activeTab === 'my-docs' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500'}`} />
                </button>
                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1.5 bg-slate-900 text-white text-xs font-medium rounded-lg shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 flex items-center space-x-1.5">
                  <span>Tài Liệu Của Tôi</span>
                  <span className="px-1.5 py-0.2 text-[10px] bg-slate-800 text-slate-300 rounded-full font-bold">
                    {userDocsCount}
                  </span>
                </div>
              </div>
            ) : (
              <button
                onClick={() => onTabChange('my-docs')}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-xl transition-all cursor-pointer ${
                  activeTab === 'my-docs'
                    ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-semibold border border-emerald-200/80 dark:border-emerald-500/20'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
                title="Tài liệu của tôi"
              >
                <div className="flex items-center space-x-2.5">
                  <FolderOpen className={`w-4 h-4 ${activeTab === 'my-docs' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500'}`} />
                  <span>Tài Liệu Của Tôi</span>
                </div>
                <span className={`px-2 py-0.5 text-xs font-semibold tabular-nums rounded-full ${
                  activeTab === 'my-docs'
                    ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}>
                  {userDocsCount}
                </span>
              </button>
            )}
          </div>

          {/* GROUP 3: QUẢN TRỊ & TIỆN ÍCH HỆ THỐNG */}
          {isCollapsed ? (
            <div className="space-y-2">
              <div className="w-8 mx-auto h-px bg-slate-200 dark:bg-slate-800 my-2" />
              {isAdmin && (
                <div className="relative group flex justify-center">
                  <button
                    onClick={onOpenAddModal}
                    className="w-11 h-11 flex items-center justify-center text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-xl transition-all cursor-pointer active:scale-95"
                  >
                    <Plus className="w-5 h-5 text-blue-500" />
                  </button>
                  <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1.5 bg-slate-900 text-white text-xs font-medium rounded-lg shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                    Thêm mẫu mới vào thư viện (Admin)
                  </div>
                </div>
              )}
              <div className="relative group flex justify-center">
                <button
                  onClick={onOpenArchModal}
                  className="w-11 h-11 flex items-center justify-center text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30 rounded-xl transition-all cursor-pointer active:scale-95"
                >
                  <FileCode2 className="w-5 h-5 text-purple-500" />
                </button>
                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1.5 bg-slate-900 text-white text-xs font-medium rounded-lg shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                  Kiến trúc hệ thống & Báo cáo kỹ thuật
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-1">
              <div className="px-3 text-xs font-semibold text-slate-600 dark:text-slate-300 tracking-wide mb-2">
                {isAdmin ? 'Quản Trị Hệ Thống' : 'Phân Quyền & Giới Hạn'}
              </div>

              {isAdmin ? (
                <>
                  <button
                    onClick={onOpenAddModal}
                    className="w-full flex items-center space-x-2.5 px-3 py-2 text-xs font-medium text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-colors cursor-pointer"
                    title="Bổ sung mẫu mới vào thư viện dùng chung"
                  >
                    <Plus className="w-4 h-4 text-blue-500 shrink-0" />
                    <span>Thêm mẫu mới vào kho</span>
                  </button>

                  <button
                    onClick={onOpenArchModal}
                    className="w-full flex items-center space-x-2.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 rounded-xl transition-colors cursor-pointer"
                    title="Kiến trúc hệ thống & Tài liệu kỹ thuật"
                  >
                    <FileCode2 className="w-4 h-4 text-purple-500 shrink-0" />
                    <span>Kiến trúc & Báo cáo kỹ thuật</span>
                  </button>

                  <div className="p-3 bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/70 dark:border-blue-900/40 rounded-xl text-slate-600 dark:text-slate-400 space-y-1 mt-2">
                    <div className="flex items-center space-x-1.5 text-xs font-bold text-blue-900 dark:text-blue-300">
                      <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span>Quyền Quản Trị Viên</span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                      Toàn quyền cấu hình kho mẫu chung, xuất bản báo cáo & quản trị tài liệu.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <button
                    onClick={onOpenArchModal}
                    className="w-full flex items-center space-x-2.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 rounded-xl transition-colors cursor-pointer"
                    title="Kiến trúc hệ thống & Tài liệu kỹ thuật"
                  >
                    <FileCode2 className="w-4 h-4 text-purple-500 shrink-0" />
                    <span>Xem báo cáo kiến trúc</span>
                  </button>

                  <div className="p-3 bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/70 dark:border-emerald-900/40 rounded-xl text-slate-600 dark:text-slate-400 space-y-1 mt-2">
                    <div className="flex items-center space-x-1.5 text-xs font-bold text-emerald-900 dark:text-emerald-300">
                      <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span>Quyền: Nhân Viên</span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                      Được xem trước, sao chép và chỉnh sửa tài liệu cá nhân. Không được sửa đổi kho mẫu chung.
                    </p>
                  </div>
                </>
              )}

              <div className="p-3 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 rounded-xl text-slate-600 dark:text-slate-400 space-y-1 mt-2">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-900 dark:text-white">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Bảo toàn 100% mẫu gốc</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Cơ chế Zero-Destructive Clone phân lập bản sao tự động khi tạo tài liệu.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Sidebar Footer: Profile, Role Switcher (Demo), Logout & Theme Switcher */}
        {isCollapsed ? (
          <div className="p-2 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40 shrink-0 flex flex-col items-center space-y-2.5">
            {/* Avatar with Tooltip */}
            <div className="relative group">
              <div className={`w-9 h-9 rounded-full font-bold text-xs flex items-center justify-center border shadow-xs cursor-default ${
                isAdmin 
                  ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800'
                  : 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
              }`}>
                {isAdmin ? 'AD' : 'NV'}
              </div>
              <div className="absolute left-full ml-3 bottom-0 px-2.5 py-1.5 bg-slate-900 text-white text-xs font-medium rounded-lg shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                <div className="font-bold">{currentUser?.name || (isAdmin ? 'Quản trị viên' : 'Nguyễn Văn An')}</div>
                <div className="text-[11px] text-slate-400">{isAdmin ? 'Quyền: Quản trị viên (Admin)' : 'Quyền: Nhân viên (Staff)'}</div>
              </div>
            </div>

            {/* Quick Role Switcher (Demo) */}
            {onSwitchRole && (
              <div className="relative group">
                <button
                  onClick={() => onSwitchRole(isAdmin ? 'staff' : 'admin')}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all cursor-pointer active:scale-90 ${
                    isAdmin 
                      ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800'
                      : 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800'
                  }`}
                  title="Chuyển đổi vai trò"
                >
                  <Zap className="w-4 h-4" />
                </button>
                <div className="absolute left-full ml-3 bottom-0 px-2.5 py-1.5 bg-slate-900 text-white text-xs font-medium rounded-lg shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                  Chuyển sang: {isAdmin ? 'Nhân viên (Staff)' : 'Quản trị viên (Admin)'}
                </div>
              </div>
            )}

            {/* Theme Toggle */}
            <div className="relative group">
              <button
                onClick={toggleTheme}
                className="w-9 h-9 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-amber-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all border border-slate-200 dark:border-slate-800 flex items-center justify-center cursor-pointer active:scale-90"
                title="Đổi chủ đề sáng / tối"
              >
                <MorphIcon 
                  icon={isDark ? rawIcons.Sun : rawIcons.Moon} 
                  className={`w-4 h-4 ${isDark ? 'text-amber-400' : 'text-slate-600'}`} 
                />
              </button>
              <div className="absolute left-full ml-3 bottom-0 px-2.5 py-1.5 bg-slate-900 text-white text-xs font-medium rounded-lg shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                {isDark ? 'Chủ đề: Sáng' : 'Chủ đề: Tối'}
              </div>
            </div>

            {/* Logout Button */}
            {onLogout && (
              <div className="relative group">
                <button
                  onClick={onLogout}
                  className="w-9 h-9 rounded-xl text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-all border border-slate-200 dark:border-slate-800 flex items-center justify-center cursor-pointer active:scale-90"
                  title="Đăng xuất"
                >
                  <LogOut className="w-4 h-4" />
                </button>
                <div className="absolute left-full ml-3 bottom-0 px-2.5 py-1.5 bg-slate-900 text-white text-xs font-medium rounded-lg shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                  Đăng xuất
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40 shrink-0 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5 overflow-hidden">
                <div className={`w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center shrink-0 border ${
                  isAdmin 
                    ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800'
                    : 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                }`}>
                  {isAdmin ? 'AD' : 'NV'}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center space-x-1.5">
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                      {currentUser?.name || (isAdmin ? 'Quản trị viên' : 'Nguyễn Văn An')}
                    </p>
                    <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                      isAdmin 
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300' 
                        : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    }`}>
                      {isAdmin ? 'Admin' : 'Staff'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-slate-500 dark:text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span className="truncate">{currentUser?.email || (isAdmin ? 'admin@omnidoc.enterprise' : 'nhanvien@omnidoc.enterprise')}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-1 shrink-0">
                {onLogout && (
                  <button
                    onClick={onLogout}
                    className="p-2 text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl transition-all border border-slate-200 dark:border-slate-800 cursor-pointer"
                    title="Đăng xuất khỏi hệ thống"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                )}

                <button
                  onClick={toggleTheme}
                  className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-amber-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl transition-all duration-200 active:scale-90 hover:rotate-12 border border-slate-200 dark:border-slate-800 shrink-0 cursor-pointer"
                  title={isDark ? "Chuyển sang Chủ đề Sáng (Light Theme)" : "Chuyển sang Chủ đề Tối (Dark Theme)"}
                >
                  <MorphIcon 
                    icon={isDark ? rawIcons.Sun : rawIcons.Moon} 
                    className={`w-4 h-4 ${isDark ? 'text-amber-400' : 'text-slate-600'}`} 
                  />
                </button>
              </div>
            </div>

            {/* 1-Click Role Switcher for Demo Purposes */}
            {onSwitchRole && (
              <button
                onClick={() => onSwitchRole(isAdmin ? 'staff' : 'admin')}
                className={`w-full py-1.5 px-2.5 rounded-lg text-[11px] font-bold border transition-all flex items-center justify-center space-x-1.5 cursor-pointer active:scale-98 ${
                  isAdmin 
                    ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800'
                    : 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800'
                }`}
                title="Chuyển nhanh vai trò để kiểm thử phân quyền"
              >
                <Zap className="w-3 h-3" />
                <span>Chuyển sang quyền: {isAdmin ? 'Nhân viên (Staff)' : 'Quản trị viên (Admin)'}</span>
              </button>
            )}
          </div>
        )}

      </aside>
    </>
  );
};
