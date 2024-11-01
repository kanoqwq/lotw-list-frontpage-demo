//这里不能使用es语法
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
    app.use(createProxyMiddleware(
        '/lotw-api', {
        // Modify your api server proxy there
        target: 'https://api.kanokano.cn/lotw-api/',
        changeOrigin: true,
        pathRewrite: { '^/lotw-api': '' }
    }
    ))
}