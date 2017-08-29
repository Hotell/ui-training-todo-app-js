const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.resolve('src', 'main.js'),
  output: {
    path: path.resolve('build'),
    filename: 'main.js',
  },
  devtool: 'source-map',
  module: {
    rules: [
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
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve('src', 'index.tpl.html'),
      filename: 'index.html',
    }),
  ],
}
