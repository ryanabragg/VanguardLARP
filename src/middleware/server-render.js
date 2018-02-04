import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router';
import { ServerStyleSheet } from 'styled-components';
import { Helmet } from 'react-helmet';

import App from '../components/App';
import routes from '../routes';

import html from '../templates/app';

module.exports = function () {
  const app = this;

  app.get('*', async (req, res, next) => {
    const whitelist = [
      /.js$/i,
      /.json$/i
    ]; // mostly for webpack HMR
    if(whitelist.reduce((acc, filetype) => filetype.test(req.url) || acc, null)) {
      next();
      return;
    }
    const match = routes.reduce((acc, route) => matchPath(req.url, route, { exact: true }) || acc, null); // react routes
    if(!match.isExact) {
      next();
      return;
    }
    let events = req.url != '/' ? [] : await app.service('events').find({
      paginate: false,
      query:{
        $skip: 0,
        $limit: 12,
        $sort: {
          date: 1
        },
        date: {
          $gte: (new Date()).toJSON().slice(0, 10)
        }
      }
    });
    const context = {};
    const sheet = new ServerStyleSheet();
    const content = renderToString(sheet.collectStyles(
      <StaticRouter location={req.url} context={context}>
        <App events={events} />
      </StaticRouter>)
    );
    const css = sheet.getStyleTags();
    const helmet = Helmet.renderStatic();

    // context updates if redirected
    if(context.url) {
      res.redirect(301, context.url);
    }
    else {
      res.send(html({
        title: helmet.title.toString(),
        css: css,
        content: content
      }));
    }
  });
};
