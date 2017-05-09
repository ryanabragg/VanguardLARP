import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router';
import {SheetsRegistryProvider, SheetsRegistry} from 'react-jss';

import App from '../components/App';
import routes from '../routes';

module.exports = function () {
  const app = this;

  app.get('*', (req, res, next) => {
    const match = routes.reduce((acc, route) => matchPath(req.url, route, { exact: true }) || acc, null);
    if (!match.isExact) {
      next();
      return;
    }
    const context = {};
    const sheets = new SheetsRegistry();

    const markup = renderToString(
      <StaticRouter location={req.url} context={context}>
        <SheetsRegistryProvider registry={sheets}>
          <App/>
        </SheetsRegistryProvider>
      </StaticRouter>
    );

    // context updates if redirected
    if (context.url) {
      res.redirect(301, context.url);
    } else {
      res.send(`
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Vanguard LARP</title>
    <style type="text/css" id="server-side-styles">
      ${sheets.toString()}
    </style>
  </head>
  <body>
    <div id="react-app">${markup}</div>
    <script type="application/javascript" src="/scripts.js"></script>
  </body>
</html>
      `);
    }
  });
};
