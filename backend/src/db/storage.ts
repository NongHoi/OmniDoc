import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { 
  DocumentTemplate, 
  PresentationTemplate, 
  UserDocument, 
  UserPresentation 
} from '../types/index.js';
import { initialDocumentTemplates, initialPresentationTemplates } from '../seeds/seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base storage directory located at workspace root or backend storage
const STORAGE_DIR = path.resolve(__dirname, '../../storage');
const DATA_DIR = path.join(STORAGE_DIR, 'data');
const TEMPLATES_DOC_DIR = path.join(STORAGE_DIR, 'templates', 'documents');
const TEMPLATES_PRES_DIR = path.join(STORAGE_DIR, 'templates', 'presentations');
const USER_FILES_DIR = path.join(STORAGE_DIR, 'user_files');

const DOC_TEMPLATES_FILE = path.join(DATA_DIR, 'templates_doc.json');
const PRES_TEMPLATES_FILE = path.join(DATA_DIR, 'templates_pres.json');
const USER_DOCS_FILE = path.join(DATA_DIR, 'user_documents.json');
const USER_PRES_FILE = path.join(DATA_DIR, 'user_presentations.json');

export class StorageManager {
  private static instance: StorageManager;
  private docTemplates: DocumentTemplate[] = [];
  private presTemplates: PresentationTemplate[] = [];
  private userDocs: UserDocument[] = [];
  private userPres: UserPresentation[] = [];

  private constructor() {
    this.ensureDirectories();
    this.loadOrSeedData();
  }

  public static getInstance(): StorageManager {
    if (!StorageManager.instance) {
      StorageManager.instance = new StorageManager();
    }
    return StorageManager.instance;
  }

  private ensureDirectories(): void {
    const dirs = [
      STORAGE_DIR,
      DATA_DIR,
      TEMPLATES_DOC_DIR,
      TEMPLATES_PRES_DIR,
      USER_FILES_DIR
    ];
    for (const dir of dirs) {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    }
  }

  private loadOrSeedData(): void {
    // 1. Document templates
    if (fs.existsSync(DOC_TEMPLATES_FILE)) {
      try {
        const raw = fs.readFileSync(DOC_TEMPLATES_FILE, 'utf-8');
        this.docTemplates = JSON.parse(raw);
      } catch (err) {
        console.error('Error reading doc templates, reseeding...', err);
        this.docTemplates = [...initialDocumentTemplates];
        this.saveDocTemplates();
      }
    } else {
      this.docTemplates = [...initialDocumentTemplates];
      this.saveDocTemplates();
    }

    // 2. Presentation templates
    if (fs.existsSync(PRES_TEMPLATES_FILE)) {
      try {
        const raw = fs.readFileSync(PRES_TEMPLATES_FILE, 'utf-8');
        this.presTemplates = JSON.parse(raw);
      } catch (err) {
        console.error('Error reading pres templates, reseeding...', err);
        this.presTemplates = [...initialPresentationTemplates];
        this.savePresTemplates();
      }
    } else {
      this.presTemplates = [...initialPresentationTemplates];
      this.savePresTemplates();
    }

    // 3. User documents
    if (fs.existsSync(USER_DOCS_FILE)) {
      try {
        const raw = fs.readFileSync(USER_DOCS_FILE, 'utf-8');
        this.userDocs = JSON.parse(raw);
      } catch (err) {
        this.userDocs = [];
      }
    } else {
      this.userDocs = [];
      this.saveUserDocs();
    }

    // 4. User presentations
    if (fs.existsSync(USER_PRES_FILE)) {
      try {
        const raw = fs.readFileSync(USER_PRES_FILE, 'utf-8');
        this.userPres = JSON.parse(raw);
      } catch (err) {
        this.userPres = [];
      }
    } else {
      this.userPres = [];
      this.saveUserPres();
    }
  }

  // --- Document Templates ---
  public getDocTemplates(): DocumentTemplate[] {
    return [...this.docTemplates];
  }

  public getDocTemplateById(id: string): DocumentTemplate | undefined {
    return this.docTemplates.find(t => t.id === id);
  }

  public addDocTemplate(template: DocumentTemplate): void {
    this.docTemplates.push(template);
    this.saveDocTemplates();
  }

  public updateDocTemplate(id: string, updates: Partial<DocumentTemplate>): DocumentTemplate | null {
    const idx = this.docTemplates.findIndex(t => t.id === id);
    if (idx === -1) return null;
    this.docTemplates[idx] = {
      ...this.docTemplates[idx],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.saveDocTemplates();
    return this.docTemplates[idx];
  }

  public deleteDocTemplate(id: string): boolean {
    const idx = this.docTemplates.findIndex(t => t.id === id);
    if (idx === -1) return false;
    this.docTemplates.splice(idx, 1);
    this.saveDocTemplates();
    return true;
  }

  private saveDocTemplates(): void {
    fs.writeFileSync(DOC_TEMPLATES_FILE, JSON.stringify(this.docTemplates, null, 2), 'utf-8');
  }

  // --- Presentation Templates ---
  public getPresTemplates(): PresentationTemplate[] {
    return [...this.presTemplates];
  }

  public getPresTemplateById(id: string): PresentationTemplate | undefined {
    return this.presTemplates.find(t => t.id === id);
  }

  public addPresTemplate(template: PresentationTemplate): void {
    this.presTemplates.push(template);
    this.savePresTemplates();
  }

  public updatePresTemplate(id: string, updates: Partial<PresentationTemplate>): PresentationTemplate | null {
    const idx = this.presTemplates.findIndex(t => t.id === id);
    if (idx === -1) return null;
    this.presTemplates[idx] = {
      ...this.presTemplates[idx],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.savePresTemplates();
    return this.presTemplates[idx];
  }

  public deletePresTemplate(id: string): boolean {
    const idx = this.presTemplates.findIndex(t => t.id === id);
    if (idx === -1) return false;
    this.presTemplates.splice(idx, 1);
    this.savePresTemplates();
    return true;
  }

  private savePresTemplates(): void {
    fs.writeFileSync(PRES_TEMPLATES_FILE, JSON.stringify(this.presTemplates, null, 2), 'utf-8');
  }

  // --- User Documents (Copies created from templates) ---
  public getUserDocuments(): UserDocument[] {
    return [...this.userDocs].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }

  public getUserDocumentById(id: string): UserDocument | undefined {
    return this.userDocs.find(d => d.id === id);
  }

  public saveUserDocument(doc: UserDocument): void {
    const idx = this.userDocs.findIndex(d => d.id === doc.id);
    if (idx >= 0) {
      this.userDocs[idx] = { ...doc, updatedAt: new Date().toISOString() };
    } else {
      this.userDocs.push(doc);
    }
    this.saveUserDocs();
  }

  public deleteUserDocument(id: string): boolean {
    const idx = this.userDocs.findIndex(d => d.id === id);
    if (idx === -1) return false;
    this.userDocs.splice(idx, 1);
    this.saveUserDocs();
    return true;
  }

  private saveUserDocs(): void {
    fs.writeFileSync(USER_DOCS_FILE, JSON.stringify(this.userDocs, null, 2), 'utf-8');
  }

  // --- User Presentations (Copies created from templates) ---
  public getUserPresentations(): UserPresentation[] {
    return [...this.userPres].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }

  public getUserPresentationById(id: string): UserPresentation | undefined {
    return this.userPres.find(p => p.id === id);
  }

  public saveUserPresentation(pres: UserPresentation): void {
    const idx = this.userPres.findIndex(p => p.id === pres.id);
    if (idx >= 0) {
      this.userPres[idx] = { ...pres, updatedAt: new Date().toISOString() };
    } else {
      this.userPres.push(pres);
    }
    this.saveUserPres();
  }

  public deleteUserPresentation(id: string): boolean {
    const idx = this.userPres.findIndex(p => p.id === id);
    if (idx === -1) return false;
    this.userPres.splice(idx, 1);
    this.saveUserPres();
    return true;
  }

  private saveUserPres(): void {
    fs.writeFileSync(USER_PRES_FILE, JSON.stringify(this.userPres, null, 2), 'utf-8');
  }

  // --- Storage Path Helpers ---
  public getStorageDir(): string {
    return STORAGE_DIR;
  }

  public getUserFilesDir(): string {
    return USER_FILES_DIR;
  }
}

