import { StorageManager } from '../db/storage.js';
import { DocumentTemplate, PresentationTemplate } from '../types/index.js';
import { v4 as uuidv4 } from 'uuid';

export interface DocumentFilterQuery {
  search?: string;
  category?: string;
  tag?: string;
  sortBy?: 'popular' | 'newest' | 'title';
}

export interface PresentationFilterQuery {
  search?: string;
  category?: string;
  tag?: string;
  sortBy?: 'popular' | 'newest' | 'title';
}

export class TemplateService {
  private storage = StorageManager.getInstance();

  // --- Document Templates ---
  public listDocumentTemplates(filters: DocumentFilterQuery = {}): DocumentTemplate[] {
    let list = this.storage.getDocTemplates();

    // 1. Category filter
    if (filters.category && filters.category !== 'Tất cả') {
      list = list.filter(t => t.category.toLowerCase() === filters.category!.toLowerCase());
    }

    // 2. Search filter (title, description, tags, author)
    if (filters.search && filters.search.trim() !== '') {
      const q = filters.search.trim().toLowerCase();
      list = list.filter(t => 
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.author.toLowerCase().includes(q) ||
        t.tags.some(tag => tag.toLowerCase().includes(q))
      );
    }

    // 3. Tag filter
    if (filters.tag) {
      list = list.filter(t => t.tags.includes(filters.tag!));
    }

    // 4. Sorting
    if (filters.sortBy === 'popular') {
      list.sort((a, b) => (b.downloadsCount || 0) - (a.downloadsCount || 0));
    } else if (filters.sortBy === 'newest') {
      list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (filters.sortBy === 'title') {
      list.sort((a, b) => a.title.localeCompare(b.title, 'vi'));
    }

    return list;
  }

  public getDocumentTemplateById(id: string): DocumentTemplate | null {
    const template = this.storage.getDocTemplateById(id);
    return template || null;
  }

  public createDocumentTemplate(data: Omit<DocumentTemplate, 'id' | 'createdAt' | 'updatedAt' | 'downloadsCount'>): DocumentTemplate {
    const newTemplate: DocumentTemplate = {
      ...data,
      id: `doc-${uuidv4()}`,
      downloadsCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.storage.addDocTemplate(newTemplate);
    return newTemplate;
  }

  public updateDocumentTemplate(id: string, updates: Partial<DocumentTemplate>): DocumentTemplate | null {
    return this.storage.updateDocTemplate(id, updates);
  }

  public deleteDocumentTemplate(id: string): boolean {
    return this.storage.deleteDocTemplate(id);
  }

  // --- Presentation Templates ---
  public listPresentationTemplates(filters: PresentationFilterQuery = {}): PresentationTemplate[] {
    let list = this.storage.getPresTemplates();

    if (filters.category && filters.category !== 'Tất cả') {
      list = list.filter(t => t.category.toLowerCase() === filters.category!.toLowerCase());
    }

    if (filters.search && filters.search.trim() !== '') {
      const q = filters.search.trim().toLowerCase();
      list = list.filter(t => 
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.tags.some(tag => tag.toLowerCase().includes(q))
      );
    }

    if (filters.tag) {
      list = list.filter(t => t.tags.includes(filters.tag!));
    }

    if (filters.sortBy === 'newest') {
      list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (filters.sortBy === 'title') {
      list.sort((a, b) => a.title.localeCompare(b.title, 'vi'));
    }

    return list;
  }

  public getPresentationTemplateById(id: string): PresentationTemplate | null {
    const template = this.storage.getPresTemplateById(id);
    return template || null;
  }

  public createPresentationTemplate(data: Omit<PresentationTemplate, 'id' | 'createdAt' | 'updatedAt'>): PresentationTemplate {
    const newTemplate: PresentationTemplate = {
      ...data,
      id: `pres-${uuidv4()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.storage.addPresTemplate(newTemplate);
    return newTemplate;
  }

  public updatePresentationTemplate(id: string, updates: Partial<PresentationTemplate>): PresentationTemplate | null {
    return this.storage.updatePresTemplate(id, updates);
  }

  public deletePresentationTemplate(id: string): boolean {
    return this.storage.deletePresTemplate(id);
  }

  // --- Categories metadata ---
  public getCategoriesMetadata() {
    const docTemplates = this.storage.getDocTemplates();
    const presTemplates = this.storage.getPresTemplates();

    const docCategoriesCount: Record<string, number> = { 'Tất cả': docTemplates.length };
    for (const t of docTemplates) {
      docCategoriesCount[t.category] = (docCategoriesCount[t.category] || 0) + 1;
    }

    const presCategoriesCount: Record<string, number> = { 'Tất cả': presTemplates.length };
    for (const p of presTemplates) {
      presCategoriesCount[p.category] = (presCategoriesCount[p.category] || 0) + 1;
    }

    return {
      documents: docCategoriesCount,
      presentations: presCategoriesCount
    };
  }
}

