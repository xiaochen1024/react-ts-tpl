/** @format */

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

function mountApp() {
  ReactDOM.render(<App />, document.getElementById('root'))
}
if (process.env.NODE_ENV === 'development') {
  import('./mock/index').then(() => {
    mountApp()
  })
} else {
  mountApp()
}
