//这里不能使用es语法
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
    app.use(createProxyMiddleware(
        '/lotw-api', {
        // Modify your api server proxy there
        target: 'http://localhost:4545',
        changeOrigin: true,
        pathRewrite: { '^/lotw-api': '' }
    }
    ))
}