/** @format */

import axios from 'axios'
import { message } from 'antd'

import { TOKEN } from '@/constants'
import loaderStore from '@/stores/LoaderStore'
import config from '@/utils/config'

let reqCount = 0

axios.defaults.timeout = 5000

const agent = axios.create({
  baseURL: config.GATEWAY,
  withCredentials: true,
  headers: {
    common: {
      Accept: 'application/json',
      post: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  }
})

agent.interceptors.request.use(
  config => {
    if (reqCount === 0) {
      if (config.headers.showLoading !== false) {
        loaderStore.loaderStart()
      }
    }
    const demoToken = JSON.parse(localStorage.getItem(TOKEN) || '""')
    if (demoToken) {
      config.headers.token = `${demoToken}`
    } else {
      delete config.headers.token
    }
    reqCount++
    return config
  },
  error => {
    reqCount--
    if (reqCount === 0) {
      loaderStore.loaderEnd()
    }
    return Promise.reject(error)
  }
)

agent.interceptors.response.use(
  response => {
    // const { code, msg } = response.data
    // const { showErr } = response.config.headers
    // if (code !== 0) {
    //   if (showErr !== false) {
    //     Toast.error({
    //       message: msg,
    //     })
    //   }
    //   if (code === 5002) {
    //     window.location.href = '/login'
    //   }
    //   Promise.reject(response.data)
    // }

    reqCount--
    if (reqCount === 0) {
      loaderStore.loaderEnd()
    }

    return response
  },
  error => {
    reqCount--
    if (reqCount === 0) {
      loaderStore.loaderEnd()
    }
    if (error.response && error.request) {
      if (error.response.status === 504) {
        message.error({
          message: '连接超时'
        })
      }
    }
    return Promise.reject(error)
  }
)

export default agent
