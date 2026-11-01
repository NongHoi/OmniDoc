import { Request, Response } from 'express';
import { PresentationService } from '../services/presentationService.js';
import { z } from 'zod';

const presentationService = new PresentationService();

const createFromTemplateSchema = z.object({
  templateId: z.string().optional(),
  title: z.string().optional(),
  customTitle: z.string().optional()
});

const updatePresentationSchema = z.object({
  title: z.string().min(1).optional(),
  slides: z.array(z.any()).optional(),
  theme: z.any().optional(),
  status: z.enum(['draft', 'final']).optional()
});

export class PresentationController {
  public static createFromTemplate(req: Request, res: Response): void {
    try {
      const parseResult = createFromTemplateSchema.safeParse(req.body);
      if (!parseResult.success) {
        const errorList = Object.values(parseResult.error.flatten().fieldErrors).flat();
        res.status(400).json({ success: false, message: errorList[0] || 'Dữ liệu không hợp lệ', errors: parseResult.error.format() });
        return;
      }

      const { templateId, customTitle, title } = parseResult.data;
      const presentation = presentationService.createFromTemplate(templateId, customTitle || title);

      res.status(201).json({
        success: true,
        message: 'Khởi tạo bài trình chiếu mới thành công (Bảo toàn 100% mẫu gốc)',
        data: presentation
      });
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: err.message,
        error: err.message
      });
    }
  }

  public static getAllPresentations(req: Request, res: Response): void {
    try {
      const presentations = presentationService.getAllUserPresentations();
      res.json({ success: true, count: presentations.length, data: presentations });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  public static getPresentationById(req: Request, res: Response): void {
    try {
      const id = String(req.params.id);
      const presentation = presentationService.getUserPresentationById(id);
      if (!presentation) {
        res.status(404).json({ success: false, message: `Bài trình chiếu với ID '${id}' không tồn tại` });
        return;
      }
      res.json({ success: true, data: presentation });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  public static updatePresentation(req: Request, res: Response): void {
    try {
      const id = String(req.params.id);
      const parseResult = updatePresentationSchema.safeParse(req.body);
      if (!parseResult.success) {
        res.status(400).json({ success: false, errors: parseResult.error.format() });
        return;
      }

      const updated = presentationService.updateUserPresentation(id, parseResult.data);
      res.json({
        success: true,
        message: 'Cập nhật bài trình chiếu thành công',
        data: updated
      });
    } catch (err: any) {
      res.status(err.message.includes('not found') ? 404 : 500).json({
        success: false,
        error: err.message
      });
    }
  }

  public static deletePresentation(req: Request, res: Response): void {
    try {
      const id = String(req.params.id);
      const deleted = presentationService.deleteUserPresentation(id);
      if (!deleted) {
        res.status(404).json({ success: false, message: `Bài trình chiếu với ID '${id}' không tìm thấy để xóa` });
        return;
      }
      res.json({ success: true, message: 'Đã xóa bài trình chiếu thành công' });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  public static async exportPptx(req: Request, res: Response): Promise<void> {
    try {
      const id = String(req.params.id);
      const { buffer, filename } = await presentationService.exportToPptx(id);

      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.presentationml.presentation');
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
