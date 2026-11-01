import { Router } from 'express';
import { TemplateController } from '../controllers/templateController.js';
import { DocumentController } from '../controllers/documentController.js';
import { PresentationController } from '../controllers/presentationController.js';

const router = Router();

// --- Templates API ---
router.get('/templates/documents', TemplateController.getDocTemplates);
router.get('/templates/documents/:id', TemplateController.getDocTemplateById);
router.post('/templates/documents', TemplateController.createDocTemplate);
router.put('/templates/documents/:id', TemplateController.updateDocTemplate);
router.delete('/templates/documents/:id', TemplateController.deleteDocTemplate);

router.get('/templates/presentations', TemplateController.getPresTemplates);
router.get('/templates/presentations/:id', TemplateController.getPresTemplateById);
router.post('/templates/presentations', TemplateController.createPresTemplate);
router.put('/templates/presentations/:id', TemplateController.updatePresTemplate);
router.delete('/templates/presentations/:id', TemplateController.deletePresTemplate);

router.get('/categories', TemplateController.getCategories);

// --- User Documents API ---
router.post('/documents', DocumentController.createFromTemplate);
router.get('/documents', DocumentController.getAllDocuments);
router.get('/documents/:id', DocumentController.getDocumentById);
router.put('/documents/:id', DocumentController.updateDocument);
router.delete('/documents/:id', DocumentController.deleteDocument);
router.get('/documents/:id/export/docx', DocumentController.exportDocx);

// --- User Presentations API ---
router.post('/presentations', PresentationController.createFromTemplate);
router.get('/presentations', PresentationController.getAllPresentations);
router.get('/presentations/:id', PresentationController.getPresentationById);
router.put('/presentations/:id', PresentationController.updatePresentation);
router.delete('/presentations/:id', PresentationController.deletePresentation);
router.get('/presentations/:id/export/pptx', PresentationController.exportPptx);

export default router;

