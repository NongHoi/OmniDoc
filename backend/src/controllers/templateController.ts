import { Request, Response } from 'express';
import { TemplateService } from '../services/templateService.js';
import { z } from 'zod';

const templateService = new TemplateService();

const createDocTemplateSchema = z.object({
  title: z.string().min(1, 'Tiêu đề mẫu không được để trống'),
  category: z.string().min(1, 'Danh mục không được để trống'),
  description: z.string().default('Mẫu văn bản tiêu chuẩn'),
  thumbnailUrl: z.string().optional(),
  fileFormat: z.enum(['docx', 'html']).default('docx'),
  tags: z.array(z.string()).default([]),
  version: z.string().default('1.0.0'),
  author: z.string().default('Người dùng Quản trị'),
  contentHtml: z.string().default('<p>Nội dung mẫu văn bản...</p>'),
  fields: z.array(z.object({
    key: z.string(),
    label: z.string(),
    defaultValue: z.string(),
    type: z.enum(['text', 'date', 'number', 'textarea']).optional()
  })).default([])
});

const createPresTemplateSchema = z.object({
  title: z.string().min(1, 'Tiêu đề bài thuyết trình không được để trống'),
  category: z.string().min(1, 'Danh mục không được để trống'),
  description: z.string().default('Mẫu bài thuyết trình tiêu chuẩn'),
  thumbnailUrl: z.string().optional(),
  tags: z.array(z.string()).default([]),
  theme: z.object({
    name: z.string(),
    primaryColor: z.string(),
    secondaryColor: z.string(),
    accentColor: z.string(),
    backgroundColor: z.string(),
    textColor: z.string(),
    fontHeading: z.string(),
    fontBody: z.string()
  }).default({
    name: 'Mặc định',
    primaryColor: '#2563eb',
    secondaryColor: '#1e40af',
    accentColor: '#3b82f6',
    backgroundColor: '#ffffff',
    textColor: '#0f172a',
    fontHeading: 'Arial',
    fontBody: 'Calibri'
  }),
  slides: z.array(z.any()).min(1, 'Cần có ít nhất 1 slide')
});

export class TemplateController {
  // Document Templates
  public static getDocTemplates(req: Request, res: Response): void {
    try {
      const { search, category, tag, sortBy } = req.query;
      const templates = templateService.listDocumentTemplates({
        search: typeof search === 'string' ? search : undefined,
        category: typeof category === 'string' ? category : undefined,
        tag: typeof tag === 'string' ? tag : undefined,
        sortBy: sortBy as any
      });
      res.json({ success: true, count: templates.length, data: templates });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  public static getDocTemplateById(req: Request, res: Response): void {
    try {
      const id = String(req.params.id);
      const template = templateService.getDocumentTemplateById(id);
      if (!template) {
        res.status(404).json({ success: false, message: `Mẫu văn bản với ID '${id}' không tồn tại` });
        return;
      }
      res.json({ success: true, data: template });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  public static createDocTemplate(req: Request, res: Response): void {
    try {
      if (req.headers['x-user-role'] === 'staff') {
        res.status(403).json({
          success: false,
          message: 'Truy cập bị từ chối: Quyền Nhân viên (Staff) không được phép tạo hoặc bổ sung mẫu vào kho doanh nghiệp dùng chung.'
        });
        return;
      }

      const parseResult = createDocTemplateSchema.safeParse(req.body);
      if (!parseResult.success) {
        const errorList = Object.values(parseResult.error.flatten().fieldErrors).flat();
        res.status(400).json({ success: false, message: errorList[0] || 'Dữ liệu không hợp lệ', errors: parseResult.error.format() });
        return;
      }

      const created = templateService.createDocumentTemplate({
        ...parseResult.data,
        thumbnailUrl: parseResult.data.thumbnailUrl || '/thumbnails/doc-custom.svg',
        filePath: `templates/documents/custom-${Date.now()}.docx`
      });

      res.status(201).json({ success: true, message: 'Tạo mẫu văn bản mới thành công', data: created });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  public static updateDocTemplate(req: Request, res: Response): void {
    try {
      if (req.headers['x-user-role'] === 'staff') {
        res.status(403).json({
          success: false,
          message: 'Truy cập bị từ chối: Quyền Nhân viên (Staff) không được phép chỉnh sửa mẫu trong kho doanh nghiệp dùng chung.'
        });
        return;
      }

      const id = String(req.params.id);
      const existing = templateService.getDocumentTemplateById(id);
      if (!existing) {
        res.status(404).json({ success: false, message: `Mẫu văn bản '${id}' không tồn tại` });
        return;
      }

      const updated = templateService.updateDocumentTemplate(id, req.body);
      res.json({ success: true, message: 'Cập nhật mẫu văn bản thành công', data: updated });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  public static deleteDocTemplate(req: Request, res: Response): void {
    try {
      if (req.headers['x-user-role'] === 'staff') {
        res.status(403).json({
          success: false,
          message: 'Truy cập bị từ chối: Quyền Nhân viên (Staff) không được phép xóa mẫu khỏi kho doanh nghiệp dùng chung.'
        });
        return;
      }

      const id = String(req.params.id);
      const deleted = templateService.deleteDocumentTemplate(id);
      if (!deleted) {
        res.status(404).json({ success: false, message: `Mẫu văn bản '${id}' không tồn tại` });
        return;
      }

      res.json({ success: true, message: 'Đã xóa mẫu văn bản khỏi thư viện dùng chung' });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  // Presentation Templates
  public static getPresTemplates(req: Request, res: Response): void {
    try {
      const { search, category, tag, sortBy } = req.query;
      const templates = templateService.listPresentationTemplates({
        search: typeof search === 'string' ? search : undefined,
        category: typeof category === 'string' ? category : undefined,
        tag: typeof tag === 'string' ? tag : undefined,
        sortBy: sortBy as any
      });
      res.json({ success: true, count: templates.length, data: templates });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  public static getPresTemplateById(req: Request, res: Response): void {
    try {
      const id = String(req.params.id);
      const template = templateService.getPresentationTemplateById(id);
      if (!template) {
        res.status(404).json({ success: false, message: `Mẫu trình chiếu với ID '${id}' không tồn tại` });
        return;
      }
      res.json({ success: true, data: template });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  public static createPresTemplate(req: Request, res: Response): void {
    try {
      if (req.headers['x-user-role'] === 'staff') {
        res.status(403).json({
          success: false,
          message: 'Truy cập bị từ chối: Quyền Nhân viên (Staff) không được phép tạo hoặc bổ sung mẫu vào kho doanh nghiệp dùng chung.'
        });
        return;
      }

      const parseResult = createPresTemplateSchema.safeParse(req.body);
      if (!parseResult.success) {
        const errorList = Object.values(parseResult.error.flatten().fieldErrors).flat();
        res.status(400).json({ success: false, message: errorList[0] || 'Dữ liệu không hợp lệ', errors: parseResult.error.format() });
        return;
      }

      const created = templateService.createPresentationTemplate({
        ...parseResult.data,
        thumbnailUrl: parseResult.data.thumbnailUrl || '/thumbnails/pres-custom.svg',
        filePath: `templates/presentations/custom-${Date.now()}.pptx`,
        fileFormat: 'pptx',
        slidesCount: parseResult.data.slides.length
      });

      res.status(201).json({ success: true, message: 'Tạo mẫu trình chiếu mới thành công', data: created });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  public static updatePresTemplate(req: Request, res: Response): void {
    try {
      if (req.headers['x-user-role'] === 'staff') {
        res.status(403).json({
          success: false,
          message: 'Truy cập bị từ chối: Quyền Nhân viên (Staff) không được phép chỉnh sửa mẫu trong kho doanh nghiệp dùng chung.'
        });
        return;
      }

      const id = String(req.params.id);
      const existing = templateService.getPresentationTemplateById(id);
      if (!existing) {
        res.status(404).json({ success: false, message: `Mẫu trình chiếu '${id}' không tồn tại` });
        return;
      }

      const updated = templateService.updatePresentationTemplate(id, req.body);
      res.json({ success: true, message: 'Cập nhật mẫu trình chiếu thành công', data: updated });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  public static deletePresTemplate(req: Request, res: Response): void {
    try {
      if (req.headers['x-user-role'] === 'staff') {
        res.status(403).json({
          success: false,
          message: 'Truy cập bị từ chối: Quyền Nhân viên (Staff) không được phép xóa mẫu khỏi kho doanh nghiệp dùng chung.'
        });
        return;
      }

      const id = String(req.params.id);
      const deleted = templateService.deletePresentationTemplate(id);
      if (!deleted) {
        res.status(404).json({ success: false, message: `Mẫu trình chiếu '${id}' không tồn tại` });
        return;
      }

      res.json({ success: true, message: 'Đã xóa mẫu trình chiếu khỏi thư viện dùng chung' });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  // Categories Metadata
  public static getCategories(req: Request, res: Response): void {
    try {
      const metadata = templateService.getCategoriesMetadata();
      res.json({ success: true, data: metadata });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}
