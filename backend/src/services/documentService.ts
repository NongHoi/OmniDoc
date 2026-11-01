import { StorageManager } from '../db/storage.js';
import { UserDocument } from '../types/index.js';
import { ExportService } from './exportService.js';
import { v4 as uuidv4 } from 'uuid';

export class DocumentService {
  private storage = StorageManager.getInstance();

  /**
   * Instantiates a new user document from a template or creates a blank document.
   * GUARANTEE: Deep-copies template data into a completely isolated UserDocument instance.
   * The original template in template storage remains strictly immutable.
   */
  public createFromTemplate(templateId?: string, customTitle?: string): UserDocument {
    let template = templateId ? this.storage.getDocTemplateById(templateId) : null;
    
    // Fallback: try finding by partial ID or slug if exact ID was not found
    if (!template && templateId && templateId !== 'blank') {
      const allTemplates = this.storage.getDocTemplates();
      template = allTemplates.find(t => 
        t.id === templateId || 
        t.id.includes(templateId) || 
        templateId.includes(t.id) ||
        t.title.toLowerCase().includes(templateId.toLowerCase())
      ) || null;
    }

    // Populate initial field values from template defaults if available
    const initialFieldValues: Record<string, string> = {};
    let instantiatedHtml = `
      <div style="font-family: 'Times New Roman', serif; line-height: 1.6; max-width: 800px; margin: 0 auto; color: #111;">
        <h2 style="text-align: center; color: #1e3a8a; text-transform: uppercase;">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h2>
        <p style="text-align: center; font-weight: bold; margin-bottom: 24px;">Độc lập - Tự do - Hạnh phúc</p>
        <h3 style="text-align: center; color: #1e3a8a; margin-bottom: 20px;">VĂN BẢN MỚI</h3>
        <p>Bắt đầu soạn thảo nội dung văn bản của bạn tại đây...</p>
      </div>
    `;

    if (template) {
      // Increment template downloadsCount for popularity metrics
      this.storage.updateDocTemplate(template.id, {
        downloadsCount: (template.downloadsCount || 0) + 1
      });

      if (template.fields) {
        template.fields.forEach(f => {
          initialFieldValues[f.key] = f.defaultValue;
        });
      }

      instantiatedHtml = template.contentHtml;
      for (const [key, value] of Object.entries(initialFieldValues)) {
        const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
        instantiatedHtml = instantiatedHtml.replace(regex, value);
      }
    }

    const newDocument: UserDocument = {
      id: uuidv4(),
      templateId: template ? template.id : 'custom-blank',
      title: customTitle || (template ? `Bản sao - ${template.title}` : 'Tài liệu mới'),
      category: template ? template.category : 'Soạn thảo',
      contentHtml: instantiatedHtml,
      fieldValues: initialFieldValues,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.storage.saveUserDocument(newDocument);
    return newDocument;
  }

  public getAllUserDocuments(): UserDocument[] {
    return this.storage.getUserDocuments();
  }

  public getUserDocumentById(id: string): UserDocument | null {
    return this.storage.getUserDocumentById(id) || null;
  }

  public updateUserDocument(
    id: string,
    updates: Partial<Pick<UserDocument, 'title' | 'contentHtml' | 'fieldValues' | 'status'>>
  ): UserDocument {
    const existing = this.storage.getUserDocumentById(id);
    if (!existing) {
      throw new Error(`User document with id '${id}' not found`);
    }

    const updated: UserDocument = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    this.storage.saveUserDocument(updated);
    return updated;
  }

  public deleteUserDocument(id: string): boolean {
    return this.storage.deleteUserDocument(id);
  }

  public async exportToDocx(id: string): Promise<{ buffer: Buffer; filename: string }> {
    const doc = this.storage.getUserDocumentById(id);
    if (!doc) {
      throw new Error(`User document with id '${id}' not found`);
    }

    const buffer = await ExportService.generateDocx(doc);
    const sanitizedTitle = doc.title.replace(/[^a-zA-Z0-9\u00C0-\u1EF9]/gi, '_');
    return {
      buffer,
      filename: `${sanitizedTitle}.docx`
    };
  }
}

