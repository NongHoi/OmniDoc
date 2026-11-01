import http from 'http';

const server = http.createServer((req, res) => {
  req.on('error', () => {});
  res.on('error', () => {});
  const options = {
    hostname: 'localhost',
    port: 5173,
    path: req.url,
    method: req.method,
    headers: { ...req.headers, host: 'localhost:5173' }
  };
  const proxyReq = http.request(options, (proxyRes) => {
    proxyRes.on('error', () => {});
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });
  proxyReq.on('error', (e) => {
    try {
      res.writeHead(502, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Cổng 5173 đang khởi động: ' + e.message);
    } catch {}
  });
  req.pipe(proxyReq, { end: true });
});

server.on('clientError', (err, socket) => {
  try {
    socket.destroy();
  } catch {}
});

server.on('upgrade', (req, socket, head) => {
  socket.on('error', () => {});
  const proxyReq = http.request({
    hostname: 'localhost',
    port: 5173,
    path: req.url,
    headers: { ...req.headers, host: 'localhost:5173' }
  });
  proxyReq.on('upgrade', (proxyRes, proxySocket, proxyHead) => {
    proxySocket.on('error', () => {});
    socket.write('HTTP/1.1 101 Switching Protocols\r\n' +
      Object.keys(proxyRes.headers).map(h => `${h}: ${proxyRes.headers[h]}`).join('\r\n') +
      '\r\n\r\n');
    proxySocket.pipe(socket);
    socket.pipe(proxySocket);
  });
  proxyReq.on('error', () => {
    try { socket.destroy(); } catch {}
  });
  proxyReq.end();
});

server.listen(5174, () => {
  console.log('✅ OmniDoc Cổng phụ 5174 đã hoạt động ổn định (Bridge sang 5173)!');
});
