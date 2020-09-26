/** @format */
const glob = require('glob')

const getEntry = () => {
  var entry = {}
  glob.sync('./src/mpa/pages/**/*.js').forEach(function (name) {
    var start = name.indexOf('pages/') + 6,
      end = name.length - 3
    var eArr = []
    var n = name.slice(start, end)
    n = n.slice(0, n.lastIndexOf('/'))
    eArr.push(name)
    entry[n] = eArr
  })
  return entry
}

const getHtmlConfig = (name, chunks) => {
  return {
    template: `./src/mpa/pages/${name}/index.html`,
    filename:
      process.env.NODE_ENV === 'development'
        ? `${name.slice(name.lastIndexOf('/') + 1)}.html`
        : `html/${name.slice(name.lastIndexOf('/') + 1)}.html`,
    inject: true,
    hash: false, //开启hash  ?[hash]
    chunks: chunks,
    minify:
      process.env.NODE_ENV === 'development'
        ? false
        : {
            removeComments: true, //移除HTML中的注释
            collapseWhitespace: true, //折叠空白区域 也就是压缩代码
            removeAttributeQuotes: true //去除属性引用
          }
  }
}

const entryObj = getEntry()
const htmlArray = []
Object.keys(entryObj).forEach(element => {
  htmlArray.push({
    _html: element,
    title: '',
    chunks: ['vendor', 'common', element]
  })
})

module.exports.htmlArray = htmlArray
module.exports.getEntry = getEntry
module.exports.getHtmlConfig = getHtmlConfig
