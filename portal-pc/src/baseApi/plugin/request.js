import axios from 'axios'

const service = axios.create({
  baseURL: process.env.VUE_APP_API,
  timeout: 5000000,
  withCredentials: true
})


// 这里要做请求拦截
service.interceptors.request.use(
  res => res,
  err => {
    return Promise.reject(err)
  },
)
// 暂时没用
// 可以缓存一些经常使用的一些请求数据
// https://www.ucloud.cn/yun/107280.html
// https://blog.csdn.net/qq_32470361/article/details/106328673




// axios 在拦截器中如何设置请求接口之前先请求另一个接口
// https://www.mk2048.com/answer/answer_h0iab1aibb.html
// https://segmentfault.com/q/1010000010585441/a-1020000016738735

// 切换路由时如何关闭上一个页面的所有请求-axios cancelToken
// https://blog.csdn.net/weixin_45366905/article/details/110134795


// 这里要做响应拦截
service.interceptors.response.use(
  response => {
    const data = response.data

    const code  = data.code
    // 根据返回的code值来做不同的处理（和后端约定）
    switch (code) {
      case '200':
        return data
      case '402':
        break
      default:
        break
    }
  },
  err => {
    // 这里是返回状态码不为200时候的错误处理
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '请求错误'
          break
        case 401:
          err.message = '未授权，请登录'
          break
        case 403:
          err.message = '拒绝访问'
          break
        case 404:
          err.message = `请求地址出错: ${err.response.config.url}`
          break
        case 408:
          err.message = '请求超时'
          break
        case 500:
          err.message = '服务器内部错误'
          break
        case 501:
          err.message = '服务未实现'
          break
        case 502:
          err.message = '网关错误'
          break
        case 503:
          err.message = '服务不可用'
          break
        case 504:
          err.message = '网关超时'
          break
        case 505:
          err.message = 'HTTP版本不受支持'
          break
        default:
      }
    }
    return Promise.reject(err)
  },
)

// 添加一些公共的处理

const request = (config) => {

  return service(config)
}


export default request
