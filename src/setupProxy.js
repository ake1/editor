const proxy = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/auth*',
    proxy({
      target: 'http://localhost:1234',
      changeOrigin: true,
    }),
  )
  app.use(
    '/graphql',
    proxy({
      target: 'http://localhost:1234',
      changeOrigin: true,
    }),
  )
  app.use(
    '/document-updates',
    proxy({
      target: 'ws://localhost:1234',
      changeOrigin: true,
      ws: true,
    }),
  )
  app.use(
    '/api/pdf',
    proxy({
      pathRewrite: {
        '^/api/pdf': '',
      },
      target: 'http://localhost:3456',
      changeOrigin: true,
    }),
  )
  app.use(
    '/api/execjs',
    proxy({
      pathRewrite: {
        '^/api/execjs': '',
      },
      target: 'http://localhost:2345',
      changeOrigin: true,
    }),
  )
}
