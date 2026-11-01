import { Request, Response } from 'express';
import { DocumentService } from '../services/documentService.js';
import { z } from 'zod';

const documentService = new DocumentService();

const createFromTemplateSchema = z.object({
  templateId: z.string().optional(),
  title: z.string().optional(),
  customTitle: z.string().optional()
});

const updateDocumentSchema = z.object({
  title: z.string().min(1).optional(),
  contentHtml: z.string().optional(),
  fieldValues: z.record(z.string()).optional(),
  status: z.enum(['draft', 'final']).optional()
});

export class DocumentController {
  public static createFromTemplate(req: Request, res: Response): void {
    try {
      const parseResult = createFromTemplateSchema.safeParse(req.body);
      if (!parseResult.success) {
        const errorList = Object.values(parseResult.error.flatten().fieldErrors).flat();
        res.status(400).json({ success: false, message: errorList[0] || 'Dữ liệu không hợp lệ', errors: parseResult.error.format() });
        return;
      }

      const { templateId, customTitle, title } = parseResult.data;
      const document = documentService.createFromTemplate(templateId, customTitle || title);

      res.status(201).json({
        success: true,
        message: 'Khởi tạo tài liệu mới thành công (Bảo toàn 100% mẫu gốc)',
        data: document
      });
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: err.message,
        error: err.message
      });
    }
  }

  public static getAllDocuments(req: Request, res: Response): void {
    try {
      const documents = documentService.getAllUserDocuments();
      res.json({ success: true, count: documents.length, data: documents });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  public static getDocumentById(req: Request, res: Response): void {
    try {
      const id = String(req.params.id);
      const document = documentService.getUserDocumentById(id);
      if (!document) {
        res.status(404).json({ success: false, message: `Tài liệu với ID '${id}' không tồn tại` });
        return;
      }
      res.json({ success: true, data: document });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  public static updateDocument(req: Request, res: Response): void {
    try {
      const id = String(req.params.id);
      const parseResult = updateDocumentSchema.safeParse(req.body);
      if (!parseResult.success) {
        res.status(400).json({ success: false, errors: parseResult.error.format() });
        return;
      }

      const updated = documentService.updateUserDocument(id, parseResult.data);
      res.json({
        success: true,
        message: 'Cập nhật tài liệu thành công',
        data: updated
      });
    } catch (err: any) {
      res.status(err.message.includes('not found') ? 404 : 500).json({
        success: false,
        error: err.message
      });
    }
  }

  public static deleteDocument(req: Request, res: Response): void {
    try {
      const id = String(req.params.id);
      const deleted = documentService.deleteUserDocument(id);
      if (!deleted) {
        res.status(404).json({ success: false, message: `Tài liệu với ID '${id}' không tìm thấy để xóa` });
        return;
      }
      res.json({ success: true, message: 'Đã xóa tài liệu thành công' });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  public static async exportDocx(req: Request, res: Response): Promise<void> {
    try {
      const id = String(req.params.id);
      const { buffer, filename } = await documentService.exportToDocx(id);

      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
      res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(filename)}"`);
      res.setHeader('Content-Length', buffer.length);
      res.send(buffer);
    } catch (err: any) {
      res.status(err.message.includes('not found') ? 404 : 500).json({
        success: false,
        error: err.message
      });
    }
  }
}
