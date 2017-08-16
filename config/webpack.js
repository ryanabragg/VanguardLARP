const path = require ('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    'app': [
      'babel-polyfill',
      'webpack-hot-middleware/client',
      'react-hot-loader/patch',
      './src/client'
    ]
  },
  output: {
    path: path.join(process.cwd(),'dist'),
    publicPath: "/",
    filename: 'scripts.js'
  },
  devtool: 'eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
/*    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'Vanguard LARP',
      template: './src/html.ejs'
    }),*/
  ],
  module: {
    noParse: /node_modules\/localforage\/dist\/localforage.js/,
    rules: [
      { test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader'
        }]
      },
      { test: /\.svg$/,
        exclude: /node_modules/,
        use: [{
          loader: 'file-loader'
        }]
      },
    ]
  }
}