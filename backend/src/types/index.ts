export type DocumentCategory = 
  | 'Tất cả'
  | 'Hợp đồng'
  | 'Nhân sự'
  | 'Hành chính'
  | 'Kinh doanh'
  | 'Báo cáo'
  | 'Tuyển dụng';

export type PresentationCategory = 
  | 'Tất cả'
  | 'Kinh doanh'
  | 'Báo cáo'
  | 'Đào tạo'
  | 'Marketing'
  | 'Khởi nghiệp'
  | 'Doanh nghiệp';

export interface TemplateField {
  key: string;
  label: string;
  defaultValue: string;
  type?: 'text' | 'date' | 'number' | 'textarea';
}

export interface DocumentTemplate {
  id: string;
  title: string;
  category: string;
  description: string;
  thumbnailUrl: string;
  filePath: string;
  fileFormat: 'docx' | 'html';
  tags: string[];
  version: string;
  author: string;
  downloadsCount: number;
  contentHtml: string;
  fields: TemplateField[];
  createdAt: string;
  updatedAt: string;
}

export type SlideLayout = 
  | 'title' 
  | 'content-bullets' 
  | 'two-columns' 
  | 'stats-kpi' 
  | 'quote' 
  | 'timeline';

export interface SlideElement {
  id: string;
  type: 'heading' | 'subtitle' | 'paragraph' | 'bullets' | 'kpis' | 'quote';
  content: string | string[] | { label: string; value: string; desc?: string }[];
}

export interface Slide {
  id: string;
  slideNumber: number;
  title: string;
  subtitle?: string;
  layout: SlideLayout;
  elements: SlideElement[];
  notes?: string;
  background?: string;
}

export interface PresentationTheme {
  name: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  fontHeading: string;
  fontBody: string;
}

export interface PresentationTemplate {
  id: string;
  title: string;
  category: string;
  description: string;
  thumbnailUrl: string;
  filePath: string;
  fileFormat: 'pptx';
  tags: string[];
  slidesCount: number;
  theme: PresentationTheme;
  slides: Slide[];
  createdAt: string;
  updatedAt: string;
}

export interface UserDocument {
  id: string;
  templateId: string;
  title: string;
  category: string;
  contentHtml: string;
  fieldValues: Record<string, string>;
  status: 'draft' | 'final';
  createdAt: string;
  updatedAt: string;
}

export interface UserPresentation {
  id: string;
  templateId: string;
  title: string;
  category: string;
  theme: PresentationTheme;
  slides: Slide[];
  status: 'draft' | 'final';
  createdAt: string;
  updatedAt: string;
}

