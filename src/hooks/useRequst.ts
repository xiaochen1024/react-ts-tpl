/** @format */

import { useEffect, useState } from 'react'
import { AxiosInstance } from 'axios'

import request from '@/api/request'

const useRequst = (url: string, method: keyof AxiosInstance = 'get', params?: any) => {
  const [data, setData] = useState({} as any)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    let p
    switch (method) {
      case 'get':
        p = request.get(url)
        break
      case 'post':
        p = request.post(url, params)
        break
      default:
        p = request.get(url)
    }
    p.then(
      (data: any) => {
        setData(data.data)
        setSuccess(true)
        setLoading(false)
      },
      () => {
        setSuccess(false)
        setLoading(false)
      }
    ).catch(() => {
      setSuccess(false)
      setLoading(false)
    })
  }, [])

  return { data, success, loading }
}

export default useRequst
