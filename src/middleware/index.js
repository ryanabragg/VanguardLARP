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
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const compiler = webpack(require('../../config/webpack'));

    app.use(webpackDevMiddleware(compiler, {
      hot: true,
      lazy: false,
      publicPath: '/',
      headers: { 'Access-Control-Allow-Origin': '*' },
      stats: {
        colors: true,
        chunkModules: false,
        chunkOrigins: false
      }
    }));
    app.use(webpackHotMiddleware(compiler));
  };

  app.use(notFound());
  app.use(handler());
};
