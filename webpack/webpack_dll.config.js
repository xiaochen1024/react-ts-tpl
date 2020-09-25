/** @format */

const webpack = require('webpack')
const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    vendor: ['react', 'react-dom', 'antd']
  },
  output: {
    filename: '[name].dll.js',
    path: path.join(__dirname, '../public/dll'),
    libraryTarget: 'var',
    library: '_dll_[name]_[hash]'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '../public/dll', '[name].manifest.json'),
      name: '_dll_[name]_[hash]'
    })
  ]
}
