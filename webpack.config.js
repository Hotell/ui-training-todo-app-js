var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var rules = [
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['babel-preset-es2015'],
        plugins: [],
      },
    },
  },
]

module.exports = {
  devtool: 'source-map',
  entry: path.resolve('src', 'main.js'),
  output: {
    path: path.resolve('build'),
    filename: 'main.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('src', 'index.tpl.html'),
      filename: 'index.html',
      // inject: false,
    }),
  ],
  module: {
    rules,
  },
}
