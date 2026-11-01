import React, { useState, useEffect } from 'react';
import { Sidebar, AppTab } from './components/Sidebar.js';
import { AppHeader } from './components/AppHeader.js';
import { DocumentLibraryView } from './components/DocumentLibraryView.js';
import { PresentationLibraryView } from './components/PresentationLibraryView.js';
import { DocumentPreviewModal } from './components/DocumentPreviewModal.js';
import { PresentationPreviewModal } from './components/PresentationPreviewModal.js';
import { DocumentEditor } from './components/DocumentEditor.js';
import { PresentationEditor } from './components/PresentationEditor.js';
import { MyDocumentsView } from './components/MyDocumentsView.js';
import { AddTemplateModal } from './components/AddTemplateModal.js';
import { ArchitectureGuideModal } from './components/ArchitectureGuideModal.js';
import { LoginPage, UserSession } from './components/LoginPage.js';
import { EditTemplateModal } from './components/EditTemplateModal.js';
import { DeleteConfirmModal } from './components/DeleteConfirmModal.js';

import {
  DocumentTemplate,
  PresentationTemplate,
  UserDocument,
  UserPresentation,
  UserRole
} from './types/index.js';

import {
  fetchDocumentTemplates,
  fetchPresentationTemplates,
  fetchCategories,
  fetchUserDocuments,
  fetchUserPresentations,
  createDocumentFromTemplate,
  createPresentationFromTemplate,
  deleteUserDocument,
  deleteUserPresentation,
  updateDocumentTemplate,
  deleteDocumentTemplate,
  updatePresentationTemplate,
  deletePresentationTemplate
} from './services/api.js';

export const App: React.FC = () => {
  // Enterprise User Session State
  const [currentUser, setCurrentUser] = useState<UserSession | null>(() => {
    try {
      const saved = localStorage.getItem('omnidoc_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Top-level Navigation View: 'login' | 'workspace'
  const [pageView, setPageView] = useState<'login' | 'workspace'>(() => {
    try {
      const saved = localStorage.getItem('omnidoc_user');
      return saved ? 'workspace' : 'login';
    } catch {
      return 'login';
    }
  });

  const [activeTab, setActiveTab] = useState<AppTab>('documents');

  // Templates State
  const [docTemplates, setDocTemplates] = useState<DocumentTemplate[]>([]);
  const [presTemplates, setPresTemplates] = useState<PresentationTemplate[]>([]);
  const [categories, setCategories] = useState<{
    documents: Record<string, number>;
    presentations: Record<string, number>;
  }>({ documents: {}, presentations: {} });

  const [loadingDocs, setLoadingDocs] = useState(true);
  const [loadingPres, setLoadingPres] = useState(true);
  const [errorDocs, setErrorDocs] = useState<string | null>(null);
  const [errorPres, setErrorPres] = useState<string | null>(null);

  // User documents & presentations
  const [userDocs, setUserDocs] = useState<UserDocument[]>([]);
  const [userPres, setUserPres] = useState<UserPresentation[]>([]);

  // Preview Modals State
  const [previewDocTemplate, setPreviewDocTemplate] = useState<DocumentTemplate | null>(null);
  const [previewPresTemplate, setPreviewPresTemplate] = useState<PresentationTemplate | null>(null);

  // Integrated Editor State
  const [activeEditingDoc, setActiveEditingDoc] = useState<UserDocument | null>(null);
  const [activeEditingPres, setActiveEditingPres] = useState<UserPresentation | null>(null);

  // Management & Guide Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isArchModalOpen, setIsArchModalOpen] = useState(false);

  // Admin Template Edit / Delete Modals State
  const [editingTemplate, setEditingTemplate] = useState<{
    template: DocumentTemplate | PresentationTemplate;
    type: 'document' | 'presentation';
  } | null>(null);

  const [deletingTemplate, setDeletingTemplate] = useState<{
    template: DocumentTemplate | PresentationTemplate;
    type: 'document' | 'presentation';
  } | null>(null);

  const isAdmin = currentUser?.role === 'admin';

  // Enterprise Navigation & Filter State
  const [selectedDocCategory, setSelectedDocCategory] = useState<string>('Tất cả');
  const [selectedPresCategory, setSelectedPresCategory] = useState<string>('Tất cả');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleLogout = () => {
    localStorage.removeItem('omnidoc_user');
    setCurrentUser(null);
    setPageView('login');
    showToast('Đã đăng xuất thành công khỏi hệ thống');
  };

  const handleSwitchRole = (newRole: UserRole) => {
    const updatedUser: UserSession = newRole === 'admin' 
      ? {
          name: 'Quản trị viên Hệ thống',
          email: 'admin@omnidoc.enterprise',
          role: 'admin',
          department: 'Ban Quản trị & IT',
          token: `omnidoc_admin_bearer_token_${Date.now()}`
        }
      : {
          name: 'Nguyễn Văn An',
          email: 'nhanvien@omnidoc.enterprise',
          role: 'staff',
          department: 'Phòng Kinh Doanh & Hành Chính',
          token: `omnidoc_staff_bearer_token_${Date.now()}`
        };
    localStorage.setItem('omnidoc_user', JSON.stringify(updatedUser));
    setCurrentUser(updatedUser);
    showToast(`Đã chuyển sang vai trò: ${newRole === 'admin' ? 'Quản trị viên (Admin)' : 'Nhân viên (Staff)'}`);
  };

  // Initial Data Fetch
  const loadInitialData = async () => {
    setLoadingDocs(true);
    setLoadingPres(true);
    try {
      const [docs, pres, cats, myDocs, myPres] = await Promise.all([
        fetchDocumentTemplates(),
        fetchPresentationTemplates(),
        fetchCategories(),
        fetchUserDocuments(),
        fetchUserPresentations()
      ]);
      setDocTemplates(docs);
      setPresTemplates(pres);
      setCategories(cats);
      setUserDocs(myDocs);
      setUserPres(myPres);
      setErrorDocs(null);
      setErrorPres(null);
    } catch (err: any) {
      setErrorDocs(err.message);
      setErrorPres(err.message);
    } finally {
      setLoadingDocs(false);
      setLoadingPres(false);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  // --- Handlers for Document Template Actions ---
  const handleUseDocTemplate = async (template: DocumentTemplate) => {
    try {
      const newDoc = await createDocumentFromTemplate(template.id);
      setUserDocs(prev => [newDoc, ...prev]);
      setActiveEditingDoc(newDoc);
      showToast(`Đã tạo tài liệu mới từ mẫu "${template.title}"`);
    } catch (err: any) {
      alert(`Lỗi: ${err.message}`);
    }
  };

  const handleCreateBlankDoc = async () => {
    try {
      const newDoc = await createDocumentFromTemplate('blank', 'Văn bản mới');
      setUserDocs(prev => [newDoc, ...prev]);
      setActiveEditingDoc(newDoc);
      showToast('Đã khởi tạo văn bản mới thành công');
    } catch (err: any) {
      alert(`Lỗi tạo văn bản: ${err.message}`);
    }
  };

  // --- Handlers for Presentation Template Actions ---
  const handleUsePresTemplate = async (template: PresentationTemplate) => {
    try {
      const newPres = await createPresentationFromTemplate(template.id);
      setUserPres(prev => [newPres, ...prev]);
      setActiveEditingPres(newPres);
      showToast(`Đã tạo bản trình chiếu mới từ mẫu "${template.title}"`);
    } catch (err: any) {
      alert(`Lỗi: ${err.message}`);
    }
  };

  const handleCreateBlankPres = async () => {
    try {
      const newPres = await createPresentationFromTemplate('blank', 'Bài trình chiếu mới');
      setUserPres(prev => [newPres, ...prev]);
      setActiveEditingPres(newPres);
      showToast('Đã khởi tạo bản trình chiếu mới thành công');
    } catch (err: any) {
      alert(`Lỗi tạo bài trình chiếu: ${err.message}`);
    }
  };

  // --- Delete Document ---
  const handleDeleteDoc = async (id: string) => {
    try {
      await deleteUserDocument(id);
      setUserDocs(prev => prev.filter(d => d.id !== id));
      showToast('Đã xóa tài liệu thành công');
    } catch (err: any) {
      alert(`Lỗi khi xóa tài liệu: ${err.message}`);
    }
  };

  // --- Delete Presentation ---
  const handleDeletePres = async (id: string) => {
    try {
      await deleteUserPresentation(id);
      setUserPres(prev => prev.filter(p => p.id !== id));
      showToast('Đã xóa bài trình chiếu thành công');
    } catch (err: any) {
      alert(`Lỗi khi xóa bài trình chiếu: ${err.message}`);
    }
  };

  // --- Dynamic Template Creation Callbacks ---
  const handleNewDocTemplateCreated = (newTpl: DocumentTemplate) => {
    setDocTemplates(prev => [newTpl, ...prev]);
    showToast(`Đã bổ sung mẫu văn bản mới: "${newTpl.title}"`);
  };

  const handleNewPresTemplateCreated = (newTpl: PresentationTemplate) => {
    setPresTemplates(prev => [newTpl, ...prev]);
    showToast(`Đã bổ sung mẫu trình chiếu mới: "${newTpl.title}"`);
  };

  // --- Admin Master Template Edit & Delete Handlers ---
  const handleSaveTemplateEdit = async (id: string, updates: any) => {
    if (!editingTemplate) return;
    if (editingTemplate.type === 'document') {
      const updated = await updateDocumentTemplate(id, updates);
      setDocTemplates(prev => prev.map(t => t.id === id ? updated : t));
      showToast(`Đã cập nhật mẫu văn bản: "${updated.title}"`);
    } else {
      const updated = await updatePresentationTemplate(id, updates);
      setPresTemplates(prev => prev.map(p => p.id === id ? updated : p));
      showToast(`Đã cập nhật mẫu trình chiếu: "${updated.title}"`);
    }
  };

  const handleConfirmDeleteTemplate = async () => {
    if (!deletingTemplate) return;
    const { template, type } = deletingTemplate;
    if (type === 'document') {
      await deleteDocumentTemplate(template.id);
      setDocTemplates(prev => prev.filter(t => t.id !== template.id));
      showToast(`Đã xóa mẫu văn bản: "${template.title}" khỏi kho dùng chung`);
    } else {
      await deletePresentationTemplate(template.id);
      setPresTemplates(prev => prev.filter(p => p.id !== template.id));
      showToast(`Đã xóa mẫu trình chiếu: "${template.title}" khỏi kho dùng chung`);
    }
  };

  // RENDER: If currently in integrated Document Editor
  if (activeEditingDoc) {
    return (
      <DocumentEditor
        document={activeEditingDoc}
        onBack={() => setActiveEditingDoc(null)}
        onSaveSuccess={(updated) => {
          setActiveEditingDoc(updated);
          setUserDocs(prev => prev.map(d => (d.id === updated.id ? updated : d)));
          showToast('Đã lưu thay đổi vào tài liệu');
        }}
      />
    );
  }

  // RENDER: If currently in integrated Presentation Editor
  if (activeEditingPres) {
    return (
      <PresentationEditor
        presentation={activeEditingPres}
        onBack={() => setActiveEditingPres(null)}
        onSaveSuccess={(updated) => {
          setActiveEditingPres(updated);
          setUserPres(prev => prev.map(p => (p.id === updated.id ? updated : p)));
          showToast('Đã lưu thay đổi vào bài trình chiếu');
        }}
      />
    );
  }

  // RENDER: Login Page (Direct entry when not authenticated)
  if (pageView === 'login') {
    return (
      <>
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-white dark:bg-slate-900/95 text-slate-800 dark:text-white px-5 py-3 rounded-2xl shadow-2xl text-xs font-semibold flex items-center space-x-3 animate-toast border border-slate-200 dark:border-slate-700/80 backdrop-blur-xl">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-xs shadow-emerald-500/50"></span>
            <span>{toastMessage}</span>
          </div>
        )}
        <LoginPage
          onLoginSuccess={(user) => {
            setCurrentUser(user);
            setPageView('workspace');
            showToast(`Đăng nhập thành công với vai trò: ${user.role === 'admin' ? 'Quản trị viên' : 'Nhân viên'}!`);
          }}
        />
      </>
    );
  }

  // RENDER: Main Office Studio Portal (Enterprise Workspace Layout)
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-row selection:bg-blue-500 selection:text-white transition-colors duration-200">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-white dark:bg-slate-900/95 text-slate-800 dark:text-white px-5 py-3 rounded-2xl shadow-2xl text-xs font-semibold flex items-center space-x-3 animate-toast border border-slate-200 dark:border-slate-700/80 backdrop-blur-xl">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-xs shadow-emerald-500/50"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Enterprise Left Sidebar */}
      <Sidebar
        currentUser={currentUser}
        onLogout={handleLogout}
        onSwitchRole={handleSwitchRole}
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setSearchQuery('');
        }}
        selectedDocCategory={selectedDocCategory}
        onSelectDocCategory={(cat) => {
          setSelectedDocCategory(cat);
          setSearchQuery('');
        }}
        selectedPresCategory={selectedPresCategory}
        onSelectPresCategory={(cat) => {
          setSelectedPresCategory(cat);
          setSearchQuery('');
        }}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onOpenArchModal={() => setIsArchModalOpen(true)}
        onCreateBlankDoc={handleCreateBlankDoc}
        onCreateBlankPres={handleCreateBlankPres}
        userDocsCount={userDocs.length + userPres.length}
        docTemplatesCount={docTemplates.length}
        presTemplatesCount={presTemplates.length}
        docCategories={categories.documents}
        presCategories={categories.presentations}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Workspace Frame (Top Header + Scrollable Content) */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        
        {/* Sticky Enterprise Header */}
        <AppHeader
          currentUser={currentUser}
          onSwitchRole={handleSwitchRole}
          activeTab={activeTab}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          selectedCategory={activeTab === 'documents' ? selectedDocCategory : (activeTab === 'presentations' ? selectedPresCategory : undefined)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onCreateBlankDoc={handleCreateBlankDoc}
          onCreateBlankPres={handleCreateBlankPres}
          onOpenArchModal={() => setIsArchModalOpen(true)}
        />

        {/* Main Content Area */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          
          {/* Tab 1: Document Library (Product 1) */}
          {activeTab === 'documents' && (
            <DocumentLibraryView
              templates={docTemplates}
              loading={loadingDocs}
              error={errorDocs}
              onRefresh={loadInitialData}
              onPreview={(tpl) => setPreviewDocTemplate(tpl)}
              onUseTemplate={handleUseDocTemplate}
              onCreateBlankDoc={handleCreateBlankDoc}
              selectedCategory={selectedDocCategory}
              onSelectCategory={setSelectedDocCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              categories={categories.documents}
              isAdmin={isAdmin}
              onOpenAddModal={() => setIsAddModalOpen(true)}
              onEditTemplate={(tpl) => setEditingTemplate({ template: tpl, type: 'document' })}
              onDeleteTemplate={(tpl) => setDeletingTemplate({ template: tpl, type: 'document' })}
            />
          )}

          {/* Tab 2: Presentation Library (Product 2) */}
          {activeTab === 'presentations' && (
            <PresentationLibraryView
              templates={presTemplates}
              loading={loadingPres}
              error={errorPres}
              onRefresh={loadInitialData}
              onPreview={(tpl) => setPreviewPresTemplate(tpl)}
              onUseTemplate={handleUsePresTemplate}
              onCreateBlankPres={handleCreateBlankPres}
              selectedCategory={selectedPresCategory}
              onSelectCategory={setSelectedPresCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              categories={categories.presentations}
              isAdmin={isAdmin}
              onOpenAddModal={() => setIsAddModalOpen(true)}
              onEditTemplate={(tpl) => setEditingTemplate({ template: tpl, type: 'presentation' })}
              onDeleteTemplate={(tpl) => setDeletingTemplate({ template: tpl, type: 'presentation' })}
            />
          )}

          {/* Tab 3: My Documents Hub */}
          {activeTab === 'my-docs' && (
            <MyDocumentsView
              documents={userDocs}
              presentations={userPres}
              onOpenDocument={(doc) => setActiveEditingDoc(doc)}
              onOpenPresentation={(pres) => setActiveEditingPres(pres)}
              onDeleteDocument={handleDeleteDoc}
              onDeletePresentation={handleDeletePres}
              onNavigateToTemplates={(tab) => {
                setActiveTab(tab);
                setSearchQuery('');
              }}
              onCreateBlankDoc={handleCreateBlankDoc}
              onCreateBlankPres={handleCreateBlankPres}
            />
          )}

        </main>

        {/* Footer */}
        <footer className="bg-white/80 dark:bg-slate-900/60 backdrop-blur border-t border-slate-200 dark:border-slate-800/80 py-4 mt-auto text-xs text-slate-500 dark:text-slate-400 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-center md:text-left">
              <span className="font-extrabold text-slate-900 dark:text-white">OmniDoc Office Studio</span>
              <span>•</span>
              <span>Hệ thống Thư viện Mẫu Tài liệu Doanh nghiệp</span>
              <span>•</span>
              <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold border border-blue-200/80 dark:border-blue-800">
                <span>Bản quyền sáng tác:</span>
                <strong className="text-slate-900 dark:text-white font-bold">Nông Vay Hội</strong>
                <a href="mailto:nonghoi2004@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                  (nonghoi2004@gmail.com)
                </a>
              </span>
            </div>

            <div className="flex items-center space-x-4 text-slate-600 dark:text-slate-400 shrink-0">
              <span>Bảo toàn 100% mẫu gốc</span>
              <span>•</span>
              <span>Xuất file DOCX & PPTX</span>
              <span>•</span>
              <button 
                onClick={() => setIsArchModalOpen(true)}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline font-semibold transition-colors cursor-pointer"
              >
                Báo cáo Kỹ thuật
              </button>
            </div>
          </div>
        </footer>

      </div>

      {/* Modals */}
      <DocumentPreviewModal
        template={previewDocTemplate}
        isOpen={Boolean(previewDocTemplate)}
        onClose={() => setPreviewDocTemplate(null)}
        onUseTemplate={handleUseDocTemplate}
        isAdmin={isAdmin}
        onEditTemplate={(tpl) => setEditingTemplate({ template: tpl, type: 'document' })}
        onDeleteTemplate={(tpl) => setDeletingTemplate({ template: tpl, type: 'document' })}
      />

      <PresentationPreviewModal
        template={previewPresTemplate}
        isOpen={Boolean(previewPresTemplate)}
        onClose={() => setPreviewPresTemplate(null)}
        onUseTemplate={handleUsePresTemplate}
        isAdmin={isAdmin}
        onEditTemplate={(tpl) => setEditingTemplate({ template: tpl, type: 'presentation' })}
        onDeleteTemplate={(tpl) => setDeletingTemplate({ template: tpl, type: 'presentation' })}
      />

      <AddTemplateModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccessDoc={handleNewDocTemplateCreated}
        onSuccessPres={handleNewPresTemplateCreated}
      />

      <EditTemplateModal
        isOpen={Boolean(editingTemplate)}
        onClose={() => setEditingTemplate(null)}
        template={editingTemplate?.template || null}
        type={editingTemplate?.type || 'document'}
        onSave={handleSaveTemplateEdit}
      />

      <DeleteConfirmModal
        isOpen={Boolean(deletingTemplate)}
        onClose={() => setDeletingTemplate(null)}
        onConfirm={handleConfirmDeleteTemplate}
        templateName={deletingTemplate?.template.title || ''}
        itemType={deletingTemplate?.type === 'document' ? 'văn bản' : 'trình chiếu'}
      />

      <ArchitectureGuideModal
        isOpen={isArchModalOpen}
        onClose={() => setIsArchModalOpen(false)}
      />

    </div>
  );
};

