const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

module.exports = function () {
  const app = this;
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
