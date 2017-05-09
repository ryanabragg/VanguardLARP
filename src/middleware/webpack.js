import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

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
