var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var extractCSS = new ExtractTextPlugin('font.css');
var extractSASS = new ExtractTextPlugin('bundle.css');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    extractCSS,
    extractSASS
  ],
  module: {
    loaders: [
    {
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, 'src')
    },
    {
      test: /\.css$/,
      loader: extractCSS.extract('style', 'css')
    },
    {
      test: /\.scss$/,
      loader: extractSASS.extract('style', 'css!sass')
    },
    {
      test: /\.(eot|svg|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/,
      loader: 'url'
    }
    ]
  },
  sassLoader: {
    includePaths: [path.resolve(__dirname, 'src/stylesheets')]
  }
};
