import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  LogIn, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  Layers, 
  MorphIcon, 
  rawIcons,
  Zap,
  Users
} from '../icons/index.js';
import { useTheme } from '../context/ThemeContext.js';
import { UserSession, UserRole } from '../types/index.js';

export type { UserSession, UserRole };

interface LoginPageProps {
  onLoginSuccess: (user: UserSession) => void;
  onBack?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const { isDark, toggleTheme } = useTheme();

  // Pre-configured default demo credentials
  const ADMIN_CREDS = {
    email: 'admin@omnidoc.enterprise',
    password: 'admin123',
    name: 'Quản trị viên Hệ thống',
    department: 'Ban Quản trị & IT',
    role: 'admin' as UserRole
  };

  const STAFF_CREDS = {
    email: 'nhanvien@omnidoc.enterprise',
    password: 'nhanvien123',
    name: 'Nguyễn Văn An',
    department: 'Phòng Kinh Doanh & Hành Chính',
    role: 'staff' as UserRole
  };

  const [email, setEmail] = useState(ADMIN_CREDS.email);
  const [password, setPassword] = useState(ADMIN_CREDS.password);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const performLogin = (loginEmail: string, loginPass: string, forcedRole?: UserRole) => {
    setIsLoading(true);
    setErrorMessage(null);

    // Simulate enterprise auth delay for polish
    setTimeout(() => {
      const trimmedEmail = loginEmail.trim().toLowerCase();
      
      // Determine role
      let role: UserRole = 'staff';
      let name = STAFF_CREDS.name;
      let department = STAFF_CREDS.department;

      if (forcedRole) {
        role = forcedRole;
        if (forcedRole === 'admin') {
          name = ADMIN_CREDS.name;
          department = ADMIN_CREDS.department;
        }
      } else if (trimmedEmail.includes('admin') || trimmedEmail === ADMIN_CREDS.email) {
        role = 'admin';
        name = ADMIN_CREDS.name;
        department = ADMIN_CREDS.department;
      }

      const user: UserSession = {
        name,
        email: loginEmail.trim() || (role === 'admin' ? ADMIN_CREDS.email : STAFF_CREDS.email),
        role,
        department,
        token: `omnidoc_${role}_bearer_token_${Date.now()}`
      };

      if (rememberMe) {
        localStorage.setItem('omnidoc_user', JSON.stringify(user));
      }

      setIsLoading(false);
      onLoginSuccess(user);
    }, 280);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performLogin(email, password);
  };

  const handleQuickLogin = (role: UserRole) => {
    if (role === 'admin') {
      setEmail(ADMIN_CREDS.email);
      setPassword(ADMIN_CREDS.password);
      performLogin(ADMIN_CREDS.email, ADMIN_CREDS.password, 'admin');
    } else {
      setEmail(STAFF_CREDS.email);
      setPassword(STAFF_CREDS.password);
      performLogin(STAFF_CREDS.email, STAFF_CREDS.password, 'staff');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col justify-between transition-colors duration-200">
      
      {/* Top Bar with System Status & Theme Toggle */}
      <header className="px-4 sm:px-6 py-4 flex items-center justify-between max-w-5xl w-full mx-auto">
        <div className="flex items-center space-x-2.5 text-xs font-semibold text-slate-600 dark:text-slate-400">
          <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
            <Layers className="w-4 h-4" />
          </div>
          <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">OmniDoc Enterprise Studio</span>
          <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
          <div className="hidden sm:flex items-center space-x-1.5 text-emerald-600 dark:text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-medium">Hệ thống phân quyền trực tuyến</span>
          </div>
        </div>

        <button
          onClick={toggleTheme}
          className="p-2.5 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-amber-300 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all border border-slate-200 dark:border-slate-800 shadow-xs cursor-pointer"
          title={isDark ? "Chuyển sang Chủ đề Sáng" : "Chuyển sang Chủ đề Tối"}
        >
          <MorphIcon 
            icon={isDark ? rawIcons.Sun : rawIcons.Moon} 
            className={`w-4 h-4 ${isDark ? 'text-amber-400' : 'text-slate-600'}`} 
          />
        </button>
      </header>

      {/* Main Login Card Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 my-auto">
        <div className="w-full max-w-xl mx-auto bg-white/95 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800/90 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-black/50 p-6 sm:p-8 space-y-6 transition-all animate-modal-content">
          
          {/* Brand Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-700 to-indigo-600 text-white shadow-lg shadow-blue-500/25 mb-1">
              <Layers className="w-6 h-6" />
            </div>
            <div className="flex items-center justify-center space-x-2">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                Omni<span className="text-blue-600 dark:text-blue-400">Doc</span>
              </h1>
              <span className="px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider rounded-md bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                Enterprise
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              Không gian quản lý thư viện mẫu tài liệu và bài trình chiếu doanh nghiệp
            </p>
          </div>

          {/* Quick Demo Persona Access Cards (2 Roles: Admin & Nhân viên) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs px-1">
              <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center space-x-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>Chọn vai trò Demo để vào nhanh 1-Click:</span>
              </span>
              <span className="text-[11px] text-slate-500">2 Tài khoản mẫu</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              {/* Persona 1: Admin */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-br from-blue-50/90 to-indigo-50/50 dark:from-slate-800/90 dark:to-blue-950/30 border border-blue-200/90 dark:border-blue-900/60 flex flex-col justify-between space-y-3 shadow-xs hover:border-blue-400 transition-all">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-600 text-white shadow-xs">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Admin</span>
                    </span>
                    <span className="text-[10px] font-semibold text-blue-700 dark:text-blue-300">Toàn quyền</span>
                  </div>
                  <div className="font-bold text-slate-900 dark:text-white text-xs">
                    {ADMIN_CREDS.name}
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
                    Toàn quyền thêm/quản lý kho mẫu gốc, xem kiến trúc hệ thống và xuất bản báo cáo kỹ thuật.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleQuickLogin('admin')}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center space-x-1.5 py-2 px-3 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-600/20 transition-all cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Vào quyền Quản trị viên</span>
                </button>
              </div>

              {/* Persona 2: Staff / Nhân viên */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-50/90 to-teal-50/50 dark:from-slate-800/90 dark:to-emerald-950/30 border border-emerald-200/90 dark:border-emerald-900/60 flex flex-col justify-between space-y-3 shadow-xs hover:border-emerald-400 transition-all">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white shadow-xs">
                      <Users className="w-3 h-3" />
                      <span>Nhân viên</span>
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-300">Tiêu chuẩn</span>
                  </div>
                  <div className="font-bold text-slate-900 dark:text-white text-xs">
                    {STAFF_CREDS.name}
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
                    Tra cứu, sao chép mẫu sang tài liệu cá nhân, thay thế biến số và tải file DOCX/PPTX.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleQuickLogin('staff')}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center space-x-1.5 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Vào quyền Nhân viên</span>
                </button>
              </div>

            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 dark:border-slate-800 w-full" />
            <span className="bg-white dark:bg-slate-900 px-3 text-[11px] font-semibold text-slate-400 shrink-0">
              hoặc đăng nhập thủ công
            </span>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-xl text-xs text-red-700 dark:text-red-300 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Manual Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Quick Autofill Chips */}
            <div className="flex items-center space-x-2 text-[11px]">
              <span className="text-slate-500">Điền nhanh:</span>
              <button
                type="button"
                onClick={() => {
                  setEmail(ADMIN_CREDS.email);
                  setPassword(ADMIN_CREDS.password);
                }}
                className="px-2 py-0.5 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 font-medium transition-colors"
              >
                Mẫu Admin
              </button>
              <button
                type="button"
                onClick={() => {
                  setEmail(STAFF_CREDS.email);
                  setPassword(STAFF_CREDS.password);
                }}
                className="px-2 py-0.5 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 font-medium transition-colors"
              >
                Mẫu Nhân viên
              </button>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Email Doanh nghiệp
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@omnidoc.enterprise"
                  className="w-full pl-10 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Mật khẩu
                </label>
                <span 
                  className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline cursor-pointer" 
                  onClick={() => setPassword(ADMIN_CREDS.password)}
                >
                  Khôi phục mặc định
                </span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2 text-xs bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center space-x-2 text-slate-600 dark:text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                />
                <span>Ghi nhớ phiên đăng nhập</span>
              </label>

              <div className="flex items-center space-x-1 text-slate-500 dark:text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-[11px]">Bảo mật SSL/TLS</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white text-white text-xs font-bold rounded-xl shadow-md transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white dark:border-slate-900 border-t-transparent rounded-full animate-spin" />
                  <span>Đang xác thực quyền...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Đăng Nhập Vào Hệ Thống</span>
                </>
              )}
            </button>
          </form>

          {/* Security & Feature Points */}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-center space-x-3 text-xs text-slate-500 dark:text-slate-400">
            <span>Bảo toàn 100% mẫu gốc</span>
            <span>•</span>
            <span>Phân quyền 2 cấp Admin / Nhân viên</span>
            <span>•</span>
            <span>Định dạng DOCX/PPTX</span>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 px-4 sm:px-6 text-center text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200/60 dark:border-slate-800/60 bg-white/40 dark:bg-slate-950/40">
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2">
          <span>© 2026 OmniDoc Office Studio • Giải pháp Thư viện Mẫu Tài liệu Doanh nghiệp</span>
          <span className="hidden sm:inline">•</span>
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold border border-blue-200/80 dark:border-blue-800">
            <span>Bản quyền sáng tác:</span>
            <strong className="text-slate-900 dark:text-white font-bold">Nông Vay Hội</strong>
            <a href="mailto:nonghoi2004@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">
              (nonghoi2004@gmail.com)
            </a>
          </span>
        </div>
      </footer>

    </div>
  );
};
