/** @format */

const webpack = require('webpack')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const config = require('config')
const path = require('path')
const baseConfig = require('./webpack.base')
const { htmlArray, getHtmlConfig } = require('./utils')

const appMode = process.env.APP_MODE

const devConfig = {
  mode: 'development',
  devtool: 'source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DllReferencePlugin({
      manifest: require('../public/dll/vendor.manifest.json')
    }),
    new AddAssetHtmlPlugin([
      {
        filepath: require.resolve(path.resolve(__dirname, '../public/dll/vendor.dll.js')),
        outputPath: 'vendor',
        publicPath: 'vendor'
      }
    ])
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
if (appMode === 'mpa') {
  htmlArray.forEach(element => {
    devConfig.plugins.push(new HtmlWebpackPlugin(getHtmlConfig(element._html, element.chunks)))
  })
} else {
  devConfig.plugins.push(
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      inject: true,
      config: JSON.stringify(config)
    })
  )
}

module.exports = merge(baseConfig, devConfig)
