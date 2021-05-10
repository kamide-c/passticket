//Importa as dependências que acabamos de instalar
const express = require('express');
const path = require('path');

const app = express();

// If an incoming request uses
// a protocol other than HTTPS,
// redirect that request to the
// same url but with HTTPS
const forceSSL = function () {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(
        ['https://', req.get('Host'), req.url].join('')
      );
    }
    next();
  }
}

// Instruct the app
// to use the forceSSL
// middleware
app.use(forceSSL());

// Serve os arquivos estáticos da pasta dist (gerada pelo ng build)
app.use(express.static(__dirname + '/dist/passtick/browser'));

app.get('/*', function (req, res) {

  res.sendFile(path.join(__dirname + '/dist/passtick/browser/index.html'));
});

// Inicia a aplicação pela porta configurada
app.listen(process.env.PORT || 8080);
