/** @format */

const webpack = require('webpack')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('config')
const baseConfig = require('./webpack.base')

const devConfig = {
  mode: 'development',
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      inject: true,
      config: JSON.stringify(config)
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    host: 'localhost',
    port: config.PORT,
    historyApiFallback: true,
    overlay: {
      errors: true
    },
    inline: true,
    hot: true,
    proxy: {
      [config.GATEWAY]: {
        target: '<url>',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          [`^${config.GATEWAY}`]: '/'
        }
      }
    }
  }
}

module.exports = merge(baseConfig, devConfig)
