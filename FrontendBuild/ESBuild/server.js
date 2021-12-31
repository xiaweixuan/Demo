const http = require('http');

require('esbuild')
  .serve({
    // 服务配置
    port: 8000,
    host: '127.0.0.1',
    servedir: __dirname,
  }, {
    // 构建配置
    entryPoints: ['src/index.jsx'],
    outdir: 'js',
    bundle: true,
  })
  .then(result => {
    console.log('watching...')
    const { host, port } = result

    // Then start a proxy server on port 3000
    http.createServer((req, res) => {
      const options = {
        hostname: host,
        port: port,
        path: req.url,
        method: req.method,
        headers: req.headers,
      }

      // Forward each incoming request to esbuild
      const proxyReq = http.request(options, proxyRes => {
        if (proxyRes.statusCode === 404) {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end('<h1>A custom 404 page</h1>');
          return;
        }
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        proxyRes.pipe(res, { end: true });
      });

      // Forward the body of the request to esbuild
      req.pipe(proxyReq, { end: true });
    }).listen(8080);
  })