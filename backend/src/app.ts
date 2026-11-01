import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRoutes from './routes/api.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Static files (storage and thumbnails)
const storagePath = path.resolve(__dirname, '../../storage');
app.use('/storage', express.static(storagePath));

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'OmniDoc Template Library Backend API',
    version: '1.0.0'
  });
});

// API Routes
app.use('/api', apiRoutes);

// 404 Handler for undefined API routes
app.use('/api/*', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Đường dẫn API '${req.originalUrl}' không tồn tại`
  });
});

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({
    success: false,
    message: 'Đã xảy ra lỗi nội bộ máy chủ',
    error: process.env.NODE_ENV === 'production' ? undefined : err.message
  });
});

