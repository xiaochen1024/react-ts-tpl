/** @format */

const { merge } = require('webpack-merge')
const config = require('config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const path = require('path')
const baseConfig = require('./webpack.base')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const prodConfig = {
  mode: 'production',
  devtool: config.SOURCE_MAP ? 'source-map' : false,
  output: {
    path: resolve('../dist'),
    filename: 'static/js/[name].[chunkhash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
    publicPath: config.PUBLIC_PATH
  },
  optimization: {
    runtimeChunk: true,
    moduleIds: 'hashed',
    splitChunks: {
      chunks: 'async',
      cacheGroups: {
        vendor: {
          name: 'vendor',
          chunks: 'initial',
          priority: 10,
          reuseExistingChunk: false,
          test: /node_modules\/(.*)\.js/
        },
        common: {
          name: 'common',
          chunks: 'initial',
          minChunks: 2,
          priority: 5,
          reuseExistingChunk: true
        }
      }
    },
    minimizer: [
      new TerserPlugin({
        cache: true,
        terserOptions: {
          compress: {
            warnings: true,
            drop_console: true,
            drop_debugger: true,
            pure_funcs: ['console.log']
          }
        },
        sourceMap: config.SOURCE_MAP
      }),
      new OptimizeCssAssetsPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {
          reduceIdents: false,
          autoprefixer: false,
          safe: true,
          discardComments: {
            removeAll: true
          },
          map: config.sourceMap
            ? {
                inline: false,
                annotation: true
              }
            : false
        }
      })
    ]
  },
  performance: {
    hints: 'warning',
    maxAssetSize: 100000,
    maxEntrypointSize: 100000,
    assetFilter: function (assetFilename) {
      return /\.(png|jpe?g|gif|svg)(\?.*)?$/.test(assetFilename)
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html', //node启动改成ejs
      template: 'public/index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'auto',
      config: JSON.stringify(config)
    }),
    new ScriptExtHtmlWebpackPlugin({
      inline: /runtime\..*\.js$/
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
      publicPath: config.PUBLIC_PATH
    })
  ]
}
if (process.env.BUNDLE_VISUALIZE) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  prodConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = merge(baseConfig, prodConfig)
