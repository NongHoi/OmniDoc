import { 
  DocumentTemplate, 
  PresentationTemplate, 
  UserDocument, 
  UserPresentation 
} from '../types/index.js';

const API_BASE = '/api';

function getAuthHeaders(): Record<string, string> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  try {
    const raw = localStorage.getItem('omnidoc_user');
    if (raw) {
      const user = JSON.parse(raw);
      if (user?.role) headers['x-user-role'] = user.role;
      if (user?.email) headers['x-user-email'] = user.email;
    }
  } catch {}
  return headers;
}

export async function fetchDocumentTemplates(params: {
  search?: string;
  category?: string;
  tag?: string;
  sortBy?: string;
} = {}): Promise<DocumentTemplate[]> {
  const query = new URLSearchParams();
  if (params.search) query.set('search', params.search);
  if (params.category && params.category !== 'Tất cả') query.set('category', params.category);
  if (params.tag) query.set('tag', params.tag);
  if (params.sortBy) query.set('sortBy', params.sortBy);

  const res = await fetch(`${API_BASE}/templates/documents?${query.toString()}`);
  if (!res.ok) throw new Error('Không thể tải danh sách mẫu văn bản');
  const json = await res.json();
  return json.data;
}

export async function fetchDocumentTemplateById(id: string): Promise<DocumentTemplate> {
  const res = await fetch(`${API_BASE}/templates/documents/${id}`);
  if (!res.ok) throw new Error(`Không tìm thấy mẫu văn bản: ${id}`);
  const json = await res.json();
  return json.data;
}

export async function createDocumentTemplate(data: Partial<DocumentTemplate>): Promise<DocumentTemplate> {
  const res = await fetch(`${API_BASE}/templates/documents`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Lỗi tạo mẫu văn bản');
  }
  const json = await res.json();
  return json.data;
}

export async function updateDocumentTemplate(id: string, data: Partial<DocumentTemplate>): Promise<DocumentTemplate> {
  const res = await fetch(`${API_BASE}/templates/documents/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Lỗi cập nhật mẫu văn bản');
  }
  const json = await res.json();
  return json.data;
}

export async function deleteDocumentTemplate(id: string): Promise<boolean> {
  const res = await fetch(`${API_BASE}/templates/documents/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Lỗi xóa mẫu văn bản');
  }
  const json = await res.json();
  return json.success;
}

export async function fetchPresentationTemplates(params: {
  search?: string;
  category?: string;
  tag?: string;
  sortBy?: string;
} = {}): Promise<PresentationTemplate[]> {
  const query = new URLSearchParams();
  if (params.search) query.set('search', params.search);
  if (params.category && params.category !== 'Tất cả') query.set('category', params.category);
  if (params.tag) query.set('tag', params.tag);
  if (params.sortBy) query.set('sortBy', params.sortBy);

  const res = await fetch(`${API_BASE}/templates/presentations?${query.toString()}`);
  if (!res.ok) throw new Error('Không thể tải danh sách mẫu trình chiếu');
  const json = await res.json();
  return json.data;
}

export async function fetchPresentationTemplateById(id: string): Promise<PresentationTemplate> {
  const res = await fetch(`${API_BASE}/templates/presentations/${id}`);
  if (!res.ok) throw new Error(`Không tìm thấy mẫu trình chiếu: ${id}`);
  const json = await res.json();
  return json.data;
}

export async function createPresentationTemplate(data: Partial<PresentationTemplate>): Promise<PresentationTemplate> {
  const res = await fetch(`${API_BASE}/templates/presentations`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Lỗi tạo mẫu trình chiếu');
  }
  const json = await res.json();
  return json.data;
}

export async function updatePresentationTemplate(id: string, data: Partial<PresentationTemplate>): Promise<PresentationTemplate> {
  const res = await fetch(`${API_BASE}/templates/presentations/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Lỗi cập nhật mẫu trình chiếu');
  }
  const json = await res.json();
  return json.data;
}

export async function deletePresentationTemplate(id: string): Promise<boolean> {
  const res = await fetch(`${API_BASE}/templates/presentations/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Lỗi xóa mẫu trình chiếu');
  }
  const json = await res.json();
  return json.success;
}

export async function fetchCategories(): Promise<{
  documents: Record<string, number>;
  presentations: Record<string, number>;
}> {
  const res = await fetch(`${API_BASE}/categories`);
  if (!res.ok) throw new Error('Không thể tải danh mục');
  const json = await res.json();
  return json.data;
}

// User Documents
export async function createDocumentFromTemplate(templateId?: string, customTitle?: string): Promise<UserDocument> {
  const res = await fetch(`${API_BASE}/documents`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ templateId, customTitle })
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || err.error || 'Không thể khởi tạo tài liệu từ mẫu');
  }
  const json = await res.json();
  return json.data;
}

export async function fetchUserDocuments(): Promise<UserDocument[]> {
  const res = await fetch(`${API_BASE}/documents`);
  if (!res.ok) throw new Error('Không thể tải tài liệu người dùng');
  const json = await res.json();
  return json.data;
}

export async function fetchUserDocumentById(id: string): Promise<UserDocument> {
  const res = await fetch(`${API_BASE}/documents/${id}`);
  if (!res.ok) throw new Error('Không tìm thấy tài liệu');
  const json = await res.json();
  return json.data;
}

export async function updateUserDocument(id: string, updates: Partial<UserDocument>): Promise<UserDocument> {
  const res = await fetch(`${API_BASE}/documents/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  });
  if (!res.ok) throw new Error('Không thể cập nhật tài liệu');
  const json = await res.json();
  return json.data;
}

export async function deleteUserDocument(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/documents/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Không thể xóa tài liệu');
}

export function getDocxExportUrl(id: string): string {
  return `${API_BASE}/documents/${id}/export/docx`;
}

// User Presentations
export async function createPresentationFromTemplate(templateId?: string, customTitle?: string): Promise<UserPresentation> {
  const res = await fetch(`${API_BASE}/presentations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ templateId, customTitle })
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || err.error || 'Không thể khởi tạo bài trình chiếu từ mẫu');
  }
  const json = await res.json();
  return json.data;
}

export async function fetchUserPresentations(): Promise<UserPresentation[]> {
  const res = await fetch(`${API_BASE}/presentations`);
  if (!res.ok) throw new Error('Không thể tải danh sách bài trình chiếu');
  const json = await res.json();
  return json.data;
}

export async function fetchUserPresentationById(id: string): Promise<UserPresentation> {
  const res = await fetch(`${API_BASE}/presentations/${id}`);
  if (!res.ok) throw new Error('Không tìm thấy bài trình chiếu');
  const json = await res.json();
  return json.data;
}

export async function updateUserPresentation(id: string, updates: Partial<UserPresentation>): Promise<UserPresentation> {
  const res = await fetch(`${API_BASE}/presentations/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  });
  if (!res.ok) throw new Error('Không thể lưu bài trình chiếu');
  const json = await res.json();
  return json.data;
}

export async function deleteUserPresentation(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/presentations/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Không thể xóa bài trình chiếu');
}

export function getPptxExportUrl(id: string): string {
  return `${API_BASE}/presentations/${id}/export/pptx`;
}

