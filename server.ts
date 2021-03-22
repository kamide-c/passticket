import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';
import { Request, Response } from 'express';
import { EnumChangefreq, SitemapItem, SitemapStream } from 'sitemap';
import { createGzip } from 'zlib';

import { environment } from './src/environments/environment';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/passtick/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html'))
    ? 'index.original.html'
    : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine(
    'html',
    ngExpressEngine({
      bootstrap: AppServerModule,
    })
  );

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Sitemap
  server.get('/sitemap.xml', sitemap);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get(
    '*.*',
    express.static(distFolder, {
      maxAge: '1y',
    })
  );

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, {
      req,
      providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
    });
  });

  return server;
}

function run(): void {
  const port = process.env.PORT || 8080;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

async function sitemap(req: Request, res: Response) {
  res.header('Content-Type', 'application/xml');
  res.header('Content-Encoding', 'gzip');

  try {
    const sitemapStream = new SitemapStream({
      // This is required because we will be adding sitemap entries using relative URLs
      hostname: environment.hostUrl,
    });
    const pipeline = sitemapStream.pipe(createGzip());

    // Add any other sitemap items for other pages of your site
    sitemapStream.write({
      changefreq: EnumChangefreq.DAILY,
      priority: 1,
      url: '',
    } as SitemapItem);
    sitemapStream.write({
      changefreq: EnumChangefreq.DAILY,
      priority: 1,
      url: '/events',
    } as SitemapItem);
    sitemapStream.write({
      changefreq: EnumChangefreq.DAILY,
      priority: 1,
      url: '/events/view',
    } as SitemapItem);
    sitemapStream.write({
      changefreq: EnumChangefreq.DAILY,
      priority: 1,
      url: '/politics/terms-of-use',
    } as SitemapItem);
    sitemapStream.write({
      changefreq: EnumChangefreq.DAILY,
      priority: 1,
      url: '/politics/privacy-policy',
    } as SitemapItem);

    // Stream write the response
    sitemapStream.end();
    pipeline.pipe(res).on('error', (error: Error) => {
      throw error;
    });
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
