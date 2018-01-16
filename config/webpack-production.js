const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    'app': [
      'babel-polyfill',
      './src/client'
    ]
  },
  output: {
    path: path.join(process.cwd(),'dist'),
    publicPath: "/",
    filename: 'scripts.js'
  },
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin()
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
          loader: 'file-loader',
          query: {
            name: '[name].[ext]'
          }
        }]
      }
    ]
  }
}
