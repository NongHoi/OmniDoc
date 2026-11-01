import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import { app } from '../src/app.js';
import { StorageManager } from '../src/db/storage.js';

describe('OmniDoc Office Template Suite API Tests', () => {
  beforeAll(() => {
    // Ensure storage is initialized and seeded
    StorageManager.getInstance();
  });

  describe('Product 1: Document Template Library API', () => {
    it('GET /api/templates/documents should return at least 5 sample templates', async () => {
      const res = await request(app).get('/api/templates/documents');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.length).toBeGreaterThanOrEqual(5);
      
      const first = res.body.data[0];
      expect(first).toHaveProperty('id');
      expect(first).toHaveProperty('title');
      expect(first).toHaveProperty('category');
      expect(first).toHaveProperty('description');
      expect(first).toHaveProperty('filePath');
      expect(first).toHaveProperty('contentHtml');
    });

    it('should filter document templates by category', async () => {
      const res = await request(app).get('/api/templates/documents?category=Hợp đồng');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      res.body.data.forEach((tpl: any) => {
        expect(tpl.category).toBe('Hợp đồng');
      });
    });

    it('should search document templates by keyword', async () => {
      const res = await request(app).get('/api/templates/documents?search=nghỉ phép');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.length).toBeGreaterThanOrEqual(1);
      expect(res.body.data[0].title.toLowerCase()).toContain('nghỉ phép');
    });

    it('should retrieve a single document template by ID', async () => {
      const res = await request(app).get('/api/templates/documents/doc-01-hop-dong-lao-dong');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.title).toContain('Hợp đồng lao động');
    });

    it('should return 404 for non-existent document template', async () => {
      const res = await request(app).get('/api/templates/documents/non-existent-id');
      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
    });

    it('CRITICAL TEST: Instantiating a document must NOT mutate the original template (Zero-destruction)', async () => {
      const templateId = 'doc-02-don-xin-nghi-phep';
      
      // 1. Fetch original template content
      const origRes = await request(app).get(`/api/templates/documents/${templateId}`);
      const originalTemplateHtml = origRes.body.data.contentHtml;

      // 2. Create a new document instance from template
      const createRes = await request(app)
        .post('/api/documents')
        .send({ templateId, customTitle: 'Đơn nghỉ phép kiểm thử độc lập' });
      expect(createRes.status).toBe(201);
      const newDocId = createRes.body.data.id;

      // 3. Edit the user document with drastically altered content
      const modifiedContent = '<p>NỘI DUNG ĐÃ BỊ THAY ĐỔI HOÀN TOÀN BỞI NGƯỜI DÙNG</p>';
      const updateRes = await request(app)
        .put(`/api/documents/${newDocId}`)
        .send({ contentHtml: modifiedContent, title: 'Tiêu đề mới đã chỉnh sửa' });
      expect(updateRes.status).toBe(200);
      expect(updateRes.body.data.contentHtml).toBe(modifiedContent);

      // 4. Verify that the original template in storage remains 100% UNCHANGED
      const verifyRes = await request(app).get(`/api/templates/documents/${templateId}`);
      expect(verifyRes.body.data.contentHtml).toBe(originalTemplateHtml);
      expect(verifyRes.body.data.contentHtml).not.toBe(modifiedContent);
    });

    it('should export user document to valid DOCX stream', async () => {
      // Create a doc
      const createRes = await request(app)
        .post('/api/documents')
        .send({ templateId: 'doc-01-hop-dong-lao-dong' });
      const docId = createRes.body.data.id;

      // Export with binary response
      const exportRes = await request(app)
        .get(`/api/documents/${docId}/export/docx`)
        .responseType('blob');
      expect(exportRes.status).toBe(200);
      expect(exportRes.headers['content-type']).toContain('application/vnd.openxmlformats-officedocument.wordprocessingml.document');
      expect(Number(exportRes.headers['content-length'])).toBeGreaterThan(100);
      expect(exportRes.body).toBeDefined();
    });

    it('should allow dynamically adding a new template (extensibility test)', async () => {
      const newTemplateData = {
        title: 'Mẫu Biên bản Thanh lý Hợp đồng',
        category: 'Hợp đồng',
        description: 'Biên bản thanh lý các nghĩa vụ hợp đồng kinh tế theo quy định.',
        contentHtml: '<h3>BIÊN BẢN THANH LÝ</h3><p>Các bên đồng ý chấm dứt hợp đồng.</p>',
        tags: ['Hợp đồng', 'Thanh lý'],
        fields: []
      };

      const res = await request(app)
        .post('/api/templates/documents')
        .send(newTemplateData);
      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.id).toBeDefined();

      // Verify it appears in search
      const listRes = await request(app).get('/api/templates/documents?search=thanh lý');
      expect(listRes.body.data.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('Product 2: Presentation Template Library API', () => {
    it('GET /api/templates/presentations should return at least 3 presentation templates with multi-slide structure', async () => {
      const res = await request(app).get('/api/templates/presentations');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.length).toBeGreaterThanOrEqual(3);

      const first = res.body.data[0];
      expect(first).toHaveProperty('id');
      expect(first).toHaveProperty('title');
      expect(first).toHaveProperty('slidesCount');
      expect(first).toHaveProperty('slides');
      expect(first.slides.length).toBeGreaterThanOrEqual(3);
      expect(first.slides[0]).toHaveProperty('layout');
      expect(first.slides[0]).toHaveProperty('elements');
    });

    it('should search presentation templates by keyword', async () => {
      const res = await request(app).get('/api/templates/presentations?search=pitch');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.length).toBeGreaterThanOrEqual(1);
      expect(res.body.data[0].title.toLowerCase()).toContain('pitch');
    });

    it('should instantiate a new presentation from template without mutating template slides', async () => {
      const templateId = 'pres-01-startup-pitch-deck';
      const origRes = await request(app).get(`/api/templates/presentations/${templateId}`);
      const origSlidesCount = origRes.body.data.slides.length;
      const origSlideTitle = origRes.body.data.slides[0].title;

      // Create new user presentation
      const createRes = await request(app)
        .post('/api/presentations')
        .send({ templateId, customTitle: 'Pitch Deck Bản thử nghiệm 2026' });
      expect(createRes.status).toBe(201);
      const userPresId = createRes.body.data.id;

      // Modify the user presentation (e.g. change title of slide 1)
      const userSlides = createRes.body.data.slides;
      userSlides[0].title = 'TIÊU ĐỀ SLIDE ĐÃ THAY ĐỔI';
      const updateRes = await request(app)
        .put(`/api/presentations/${userPresId}`)
        .send({ slides: userSlides });
      expect(updateRes.status).toBe(200);
      expect(updateRes.body.data.slides[0].title).toBe('TIÊU ĐỀ SLIDE ĐÃ THAY ĐỔI');

      // Verify original template is untouched
      const verifyRes = await request(app).get(`/api/templates/presentations/${templateId}`);
      expect(verifyRes.body.data.slides.length).toBe(origSlidesCount);
      expect(verifyRes.body.data.slides[0].title).toBe(origSlideTitle);
    });

    it('should export user presentation to valid PPTX stream', async () => {
      // Create user presentation
      const createRes = await request(app)
        .post('/api/presentations')
        .send({ templateId: 'pres-01-startup-pitch-deck' });
      const presId = createRes.body.data.id;

      // Export with binary response
      const exportRes = await request(app)
        .get(`/api/presentations/${presId}/export/pptx`)
        .responseType('blob');
      expect(exportRes.status).toBe(200);
      expect(exportRes.headers['content-type']).toContain('application/vnd.openxmlformats-officedocument.presentationml.presentation');
      expect(Number(exportRes.headers['content-length'])).toBeGreaterThan(100);
      expect(exportRes.body).toBeDefined();
    });
  });

  describe('Role-Based Access Control (Admin CRUD vs Staff Read-only)', () => {
    it('STAFF: should reject creating, updating or deleting document templates with 403 Forbidden', async () => {
      // Create test
      const createRes = await request(app)
        .post('/api/templates/documents')
        .set('x-user-role', 'staff')
        .send({ title: 'Mẫu lậu', category: 'Hợp đồng' });
      expect(createRes.status).toBe(403);
      expect(createRes.body.success).toBe(false);

      // Update test
      const updateRes = await request(app)
        .put('/api/templates/documents/doc-01-hop-dong-lao-dong')
        .set('x-user-role', 'staff')
        .send({ title: 'Tiêu đề sửa đổi bởi staff' });
      expect(updateRes.status).toBe(403);
      expect(updateRes.body.success).toBe(false);

      // Delete test
      const deleteRes = await request(app)
        .delete('/api/templates/documents/doc-01-hop-dong-lao-dong')
        .set('x-user-role', 'staff');
      expect(deleteRes.status).toBe(403);
      expect(deleteRes.body.success).toBe(false);
    });

    it('ADMIN: should allow updating and deleting document templates', async () => {
      // 1. Create a temporary template
      const createRes = await request(app)
        .post('/api/templates/documents')
        .set('x-user-role', 'admin')
        .send({
          title: 'Mẫu Tạm Thời Cho Phép Xóa',
          category: 'Hành chính',
          description: 'Mẫu dùng để kiểm tra tính năng Sửa & Xóa của Admin'
        });
      expect(createRes.status).toBe(201);
      const tempId = createRes.body.data.id;

      // 2. Admin updates template
      const updateRes = await request(app)
        .put(`/api/templates/documents/${tempId}`)
        .set('x-user-role', 'admin')
        .send({
          title: 'Mẫu Tạm Thời ĐÃ ĐƯỢC CẬP NHẬT',
          description: 'Mô tả mới sau khi cập nhật'
        });
      expect(updateRes.status).toBe(200);
      expect(updateRes.body.data.title).toBe('Mẫu Tạm Thời ĐÃ ĐƯỢC CẬP NHẬT');

      // 3. Admin deletes template
      const deleteRes = await request(app)
        .delete(`/api/templates/documents/${tempId}`)
        .set('x-user-role', 'admin');
      expect(deleteRes.status).toBe(200);
      expect(deleteRes.body.success).toBe(true);

      // 4. Verify 404
      const verifyRes = await request(app).get(`/api/templates/documents/${tempId}`);
      expect(verifyRes.status).toBe(404);
    });
  });
});
