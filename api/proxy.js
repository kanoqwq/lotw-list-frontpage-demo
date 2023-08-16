// 该服务为 vercel serve跨域处理
const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (req, res) => {
    let target = ''

    if (req.url.startsWith('/lotw-api')) {
        // 这里填目标地址
        target = 'https://api.kanokano.cn/lotw-api'
    }
    // 创建代理对象并转发请求
    createProxyMiddleware({
        target,
        changeOrigin: true,
        pathRewrite: {
            '^/lotw-api/': '/'
        }
    })(req, res)
}