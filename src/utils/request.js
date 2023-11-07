import store from '@/store'
import axios from 'axios'
import { Toast } from 'vant'

// 创建 axios 实例(Instance), 好处在于不会污染原始的axios, 便于用多种请求
const instance = axios.create({
  baseURL: 'http://cba.itlike.com/public/index.php?s=/api/',
  timeout: 5000
})

// Add a request interceptor(拦截器)
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  // 在此添加loading效果, 禁止背景点击
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0 // 不会自动消失
  })

  // 携带token, 方便后续有需要登录权限的操作
  const token = store.getters.token
  if (token) {
    config.headers['Access-Token'] = token // 由于请求头参数是Access-Token带特殊字符会报错, 需要使用[]来写
    config.headers.platform = 'H5'
  }

  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
// 可以把所有的响应错误统一写在响应拦截器这里
instance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  const res = response.data
  if (res.status !== 200) {
    // 错误也要设置一个toast, 顶掉之前的请求loading
    Toast(res.message)
    return Promise.reject(res.message)
  } else {
    // 正常情况, 清除loading
    Toast.clear()
  }
  return res
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})

export default instance
