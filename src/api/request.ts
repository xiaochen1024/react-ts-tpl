/** @format */

import axios from 'axios'
import { message } from 'antd'

import { TOKEN } from '@/constants'
import config from '@/utils/config'

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
    const demoToken = JSON.parse(localStorage.getItem(TOKEN) || '""')
    if (demoToken) {
      config.headers.token = `${demoToken}`
    } else {
      delete config.headers.token
    }
    return config
  },
  error => {
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

    return response
  },
  error => {
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
