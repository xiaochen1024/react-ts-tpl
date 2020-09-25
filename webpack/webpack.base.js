/** @format */

const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const config = require('config')
const path = require('path')
const MomentLocalesPlugin = require('moment-locales-webpack-plugin')
const theme = require('./theme')

const env = process.env.NODE_ENV
const isProd = env === 'production'
function resolve(dir) {
  return path.join(__dirname, dir)
}

const defineEnv = {}
for (const key in config) {
  defineEnv[`process.env.${key}`] = JSON.stringify(config[key])
}

const getStyleLoader = (cssOpt, otherLoader, otherOpt) => {
  const loaders = [
    isProd ? MiniCssExtractPlugin.loader : 'style-loader',
    {
      loader: require.resolve('css-loader'),
      options: { sourceMap: config.SOURCE_MAP, ...cssOpt }
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        sourceMap: config.SOURCE_MAP
      }
    }
    // 'postcss-loader'
  ]
  if (otherLoader) {
    const opt = { sourceMap: config.SOURCE_MAP }
    if (otherLoader === 'less-loader') {
      opt.lessOptions = otherOpt
    }
    loaders.push({
      loader: require.resolve(otherLoader),
      options: { sourceMap: config.SOURCE_MAP, ...opt }
    })
  }
  return loaders
}

module.exports = {
  entry: resolve('../src/index.tsx'),
  output: {
    publicPath: config.PUBLIC_PATH
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        include: [resolve('../src')],
        use: [
          {
            loader: 'babel-loader'
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: getStyleLoader({
          importLoaders: 1
        })
      },
      {
        test: /\.scss$/,
        include: resolve('../src'),
        use: getStyleLoader({}, 'sass-loader', {
          sassOptions: {
            includePaths: [resolve('../src/styles')]
          }
        })
      },
      {
        test: /\.less$/,
        exclude: /\.module\.less$/,
        use: getStyleLoader({}, 'less-loader', {
          javascriptEnabled: true,
          modifyVars: theme
        })
      },
      {
        test: /\.module\.less$/,
        use: getStyleLoader(
          {
            modules: {
              localIdentName: '[local]--[hash:base64:5]'
            }
          },
          'less-loader',
          {
            javascriptEnabled: true,
            modifyVars: theme,
            modules: true
          }
        )
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              name: 'img/[name].[hash:7].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              name: 'font/[name].[hash:7].[ext]'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'jsx'],
    alias: {
      '@': resolve('../src'),
      '@components': resolve('../src/components'),
      '@img': resolve('../src/assets/img')
    }
  },
  plugins: [
    new webpack.DefinePlugin(defineEnv),
    new MomentLocalesPlugin({
      localesToKeep: ['zh-cn']
    })
  ]
}
