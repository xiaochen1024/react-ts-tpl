/** @format */

;(function () {
  const node = document.querySelectorAll('script[type="application/json"]')[0]
  const { GATEWAY, PUBLIC_PATH, SOURCE_MAP, PORT } = JSON.parse(node ? node.textContent : '{}')
  window.config = {
    GATEWAY,
    PUBLIC_PATH,
    SOURCE_MAP,
    PORT
  }
})()

export default window.config || {}
