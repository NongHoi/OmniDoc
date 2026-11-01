import { StorageManager } from '../db/storage.js';
import { UserPresentation, Slide } from '../types/index.js';
import { ExportService } from './exportService.js';
import { v4 as uuidv4 } from 'uuid';

export class PresentationService {
  private storage = StorageManager.getInstance();

  /**
   * Instantiates a new user presentation from a presentation template.
   * GUARANTEE: Deep-copies slides & theme into an isolated UserPresentation record.
   * The original template remains strictly immutable.
   */
  public createFromTemplate(templateId?: string, customTitle?: string): UserPresentation {
    let template = templateId ? this.storage.getPresTemplateById(templateId) : null;
    if (!template && templateId && templateId !== 'blank') {
      const allTemplates = this.storage.getPresTemplates();
      template = allTemplates.find(t => 
        t.id === templateId || 
        t.id.includes(templateId) || 
        templateId.includes(t.id) ||
        t.title.toLowerCase().includes(templateId.toLowerCase())
      ) || null;
    }

    if (!template) {
      const allTemplates = this.storage.getPresTemplates();
      template = allTemplates[0] || null;
    }

    const defaultTheme = template ? template.theme : {
      name: 'Venture Indigo',
      primaryColor: '#2563eb',
      secondaryColor: '#1e40af',
      accentColor: '#3b82f6',
      backgroundColor: '#ffffff',
      textColor: '#0f172a',
      fontHeading: 'Plus Jakarta Sans',
      fontBody: 'Plus Jakarta Sans'
    };

    // Deep clone slides with new IDs so changes never cascade to template
    const rawSlides = template ? template.slides : [
      {
        id: 'usr-slide-1',
        slideNumber: 1,
        title: customTitle || 'Bài Trình Chiếu Mới',
        subtitle: 'Bắt đầu thiết kế bài thuyết trình của bạn',
        layout: 'title',
        elements: []
      }
    ];

    const clonedSlides: Slide[] = JSON.parse(JSON.stringify(rawSlides)).map((slide: Slide, index: number) => ({
      ...slide,
      id: `usr-slide-${uuidv4()}`,
      slideNumber: index + 1
    }));

    const newPresentation: UserPresentation = {
      id: uuidv4(),
      templateId: template ? template.id : 'custom-blank',
      title: customTitle || (template ? `Bản sao - ${template.title}` : 'Bài trình chiếu mới'),
      category: template ? template.category : 'Kinh doanh',
      theme: JSON.parse(JSON.stringify(defaultTheme)),
      slides: clonedSlides,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.storage.saveUserPresentation(newPresentation);
    return newPresentation;
  }

  public getAllUserPresentations(): UserPresentation[] {
    return this.storage.getUserPresentations();
  }

  public getUserPresentationById(id: string): UserPresentation | null {
    return this.storage.getUserPresentationById(id) || null;
  }

  public updateUserPresentation(
    id: string,
    updates: Partial<Pick<UserPresentation, 'title' | 'slides' | 'theme' | 'status'>>
  ): UserPresentation {
    const existing = this.storage.getUserPresentationById(id);
    if (!existing) {
      throw new Error(`User presentation with id '${id}' not found`);
    }

    const updated: UserPresentation = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    this.storage.saveUserPresentation(updated);
    return updated;
  }

  public deleteUserPresentation(id: string): boolean {
    return this.storage.deleteUserPresentation(id);
  }

  public async exportToPptx(id: string): Promise<{ buffer: Buffer; filename: string }> {
    const pres = this.storage.getUserPresentationById(id);
    if (!pres) {
      throw new Error(`User presentation with id '${id}' not found`);
    }

    const buffer = await ExportService.generatePptx(pres);
    const sanitizedTitle = pres.title.replace(/[^a-zA-Z0-9\u00C0-\u1EF9]/gi, '_');
    return {
      buffer,
      filename: `${sanitizedTitle}.pptx`
    };
  }
}

