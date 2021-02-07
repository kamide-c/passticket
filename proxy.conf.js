const PROXY_CONFIG = [
  {
    context: ['/api'],
    target: 'https://passticket-app.herokuapp.com',
    secure: false,
    logLevel: 'debug',
    pathRewrite: { '^/api': '' },
    changeOrigin: true
  }
];

module.exports = PROXY_CONFIG
