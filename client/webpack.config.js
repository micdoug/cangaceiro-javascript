const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CSSMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const outputDir = path.resolve(__dirname, 'dist');
module.exports = {

  entry: {
    app: './app-src/app.js',
    vendor: ['jquery', 'bootstrap', 'reflect-metadata']
  },
  output: {
    filename: '[name].bundle.js',
    path: outputDir,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: "application/font-woff",
        }
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: "application/octet-stream",
        },
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: "image/svg+xml"
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        removeComments: true,
      },
      filename: 'index.html',
      template: __dirname + '/main.html',
      chunksSortMode: 'manual',
      chunks: ['vendor', 'app']
    }),
    new MiniCssExtractPlugin({ filename: 'styles.css' }),
    new webpack.ProvidePlugin({
      $: 'jquery/dist/jquery.js',
      jQuery: 'jquery/dist/jquery.js'
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),

  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CSSMinimizerPlugin(),
    ]
  }
};