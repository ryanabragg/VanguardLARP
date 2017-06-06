import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router';
import { ServerStyleSheet } from 'styled-components';

import App from '../components/App';
import routes from '../routes';

module.exports = function () {
  const app = this;

  app.get('*', (req, res, next) => {
    const whitelist = [
      /.js$/i,
      /.json$/i
    ]; // mostly for webpack HMR
    if(whitelist.reduce((acc, filetype) => filetype.test(req.url) || acc, null)) {
      next();
      return;
    }
    const match = routes.reduce((acc, route) => matchPath(req.url, route, { exact: true }) || acc, null); // react routes
    if (!match.isExact) {
      next();
      return;
    }
    const context = {};
    const sheet = new ServerStyleSheet();
    const html = renderToString(sheet.collectStyles(
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>)
    );
    const css = sheet.getStyleTags();

    // context updates if redirected
    if (context.url) {
      res.redirect(301, context.url);
    } else {
      res.send(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width,initial-scale=1">
            <title>Vanguard LARP</title>
            ${css}
          </head>
          <body>
            <div id="react-app">${html}</div>
            <script type="application/javascript" src="/scripts.js"></script>
          </body>
        </html>
      `);
    }
  });
};
