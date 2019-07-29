const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
const path = require('path');

const langs = [];
fs.readdirSync('./node_modules/node-blockly/lib/i18n').forEach(file => {
  langs.push(path.parse(file).name)
});

module.exports = {
  entry: {
    index: "./index.js",
  },
  output: {
    path: __dirname,
    filename: "[name].build.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${__dirname}/index.tpl.html`,
      templateParameters: {
        langs: langs,
      },
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true,
    }),
  ],
  devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'eval',
};