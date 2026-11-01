import { app } from './app.js';

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`OmniDoc Office Template Suite API Server running!`);
  console.log(`URL: http://localhost:${PORT}`);
  console.log(`Health Check: http://localhost:${PORT}/health`);
  console.log(`Document Templates API: http://localhost:${PORT}/api/templates/documents`);
  console.log(`Presentation Templates API: http://localhost:${PORT}/api/templates/presentations`);
  console.log(`====================================================`);
});

server.on('error', (err: any) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\nLỖI: Cổng ${PORT} hiện đang được sử dụng bởi một tiến trình khác (EADDRINUSE).`);
    console.error(`Gợi ý: Hãy tắt tiến trình chạy trước hoặc chạy lệnh giải phóng cổng rồi thử lại.\n`);
    process.exit(1);
  } else {
    console.error('Lỗi khởi động máy chủ:', err);
    process.exit(1);
  }
});

