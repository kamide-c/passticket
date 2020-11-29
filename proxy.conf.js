const PROXY_CONFIG = [
  {
    context: ['/api'],
    target: 'http://40.74.238.182:8080/',
    secure: false,
    logLevel: 'debug',
    pathRewrite: { '^/api': '' }
  }
];

module.exports = PROXY_CONFIG
