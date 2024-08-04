const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/gateway/*',
    createProxyMiddleware({
      target: process.env.PROXY_POINT,
      changeOrigin: true,
      pathRewrite: {
        '^/gateway/api': '/api'
      },
    })
  );
};