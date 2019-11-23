/** @format */

const path = require('path')
const express = require('express')
const app = express()
const config = require('config')
// const proxy = require("http-proxy-middleware");
// target：目标地址
// app.use(
//   "/api",
//   proxy({
//     target: "",
//     changeOrigin: true,
//     pathRewrite: {
//       "^/api": ""
//     }
//   })
// );

app.use(config.PUBLIC_PATH, express.static('dist'))

const dist = path.resolve(__dirname, 'dist')
app.get('*', (req, res) => {
  res.set('X-XSS-Protection', '1; mode=block')
  res.set('X-Content-Type-Options', 'nosniff')
  res.set('X-Frame-Options', 'SAMEORIGIN')

  res.sendFile(path.join(dist, 'index.html'))
})

const port = Number(config.PORT)
app.listen(port, err => {
  if (err) {
    console.log(err)
    return null
  }
})
console.log(`${port} port starting`)
