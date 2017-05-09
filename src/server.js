'use strict';

require('dotenv').config({ silent: true });

import path from 'path';
import favicon from 'serve-favicon';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';

import feathers from 'feathers';
import configuration from 'feathers-configuration';
import hooks from 'feathers-hooks';
import rest from 'feathers-rest';
import socketio from 'feathers-socketio';

import authentication from './authentication';
import middleware from './middleware';
import services from './services';
import appHooks from './server.hooks';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import {SheetsRegistryProvider, SheetsRegistry} from 'react-jss';

import App from './components/App';

const app = feathers();

// Load app configuration
app.configure(configuration(path.join(__dirname, '..')));
// Enable CORS, security, compression, favicon and body parsing
app.use(cors());
app.use(helmet());
app.use(compress());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('static'), 'favicon.ico')));
// Host the public folders
app.use('/', feathers.static(app.get('dist')));
app.use('/', feathers.static(app.get('static')));

// Routing handled in App component
app.get('*', (req, res) => {
  const context = {}
  const sheets = new SheetsRegistry()

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
  };
});

// Set up Plugins and providers
app.configure(hooks());
app.configure(rest());
app.configure(socketio());

app.configure(authentication);

// Set up our services (see `services/index.js`)
app.configure(services);
// Configure middleware (see `middleware/index.js`) - always has to be last
app.configure(middleware);
app.hooks(appHooks);

module.exports = app;
