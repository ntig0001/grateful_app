const {createProxyMiddleware} = require('http-proxy-middleware');

const port = process.env.PORT || 5000;
module.exports = (app) => {
  app.use(createProxyMiddleware('/services/**', {target: `http://localhost:${port}`}));
}