const handler = require('feathers-errors/handler');
const notFound = require('feathers-errors/not-found');
const serverRender = require('./server-render')

module.exports = function () {
  // Add your custom middleware here. Remember, that
  // in Express the order matters, `notFound` and
  // the error handler have to go last.
  const app = this;

  app.configure(serverRender)

  if(process.env.NODE_ENV != 'production'){
    const webpack = require('./webpack');
    app.configure(webpack);
  }

  app.use(notFound());
  app.use(handler());
};
