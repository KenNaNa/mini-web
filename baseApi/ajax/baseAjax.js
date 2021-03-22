import axios from 'axios'

import storage from '@bApi/storage/storageUtil.js'
import config from '@/config.js' //全局配置常量
import consoleUtils from '@bApi/util/consoleUtils.js' //控制台打印工具
import messages from '@bApi/message/messages.js'
import utils from '@bApi/util/utils.js'
import backInitData from '@bApi/initData/backInitData.js'
import env from '@/systemConfig/env.js' //环境配置
import stringUtil from '@bApi/util/stringUtils.js' //控制台打印工具
import login from '@bApi/login/login.js' // 登录相关

//TODO [xsw] 令牌、登陆信息之类的数据应该通过vuex操作吗？？？

/**
 * axios请求拦截器
 * axios响应拦截器
 * TODO [xsw 20190417] 判断到令牌失效后应该情况令牌，否则一直导致所有接口无法访问
 * TODO [20190329 xsw 待优化]
 * TODO [xsw] 令牌、登陆信息之类的数据应该通过vuex操作吗？？？
 */
// 添加请求拦截器  暂时没用
// axios.interceptors.request.use(
//   config => {
//     debugger
//     return config
//   },
//   err => {
//     debugger
//     // 抛出请求错误信息
//     return Promise.reject(err)
//   }
// )

/**
 * 添加响应拦截器
 */
axios.interceptors.response.use(
  response => {
    if (!response) {
      consoleUtils.err('响应数据异常:response == undefined')
      return
    }
    let status = response.status
    let message = messages.getMainMessage(response, '操作成功')
    let extraMsgs = messages.getExtraMessageAll(response)
    let headers = response.headers
    let rv = {
      status: status,
      msg: message,
      data: response.data,
      headers: headers,
    }
    if (extraMsgs) {
      rv.extraMsgs = extraMsgs
    }
    console.log('响应status:' + rv.status)
    return rv
  },
  error => {
    let rv = {
      msg: '操作失败',
      status: 400,
    }
    if (error.response == undefined) {
      consoleUtils.err(
        '响应拦截器err：' + error.message + ',error.response == undefined',
      )
      rv.msg = error.message
    } else {
      //设置系统错发消息
      rv.status = error.response.status
      let errorMsg = error.response
      let defaultMsg = '操作失败'
      switch (rv.status) {
        //令牌失效，清除令牌
        case 404:
          defaultMsg = '操作失败,地址错误'
          break
        case 504:
          defaultMsg = '操作失败,服务器被吃了'
          break
        case 401:
          //执行访问令牌失效相关处理(清除token及相关数据)，令牌过期
          if(errorMsg.error == 'invalid_token') {
            login.tokenInvalidHandle()
            defaultMsg = '登陆令牌失效,请重新登陆'
          } else if(errorMsg && errorMsg.serverId) {
            login.deleteTags()
            login.toWelcomePage() // 跳转到欢迎页
          } else if(errorMsg && errorMsg.data.message && errorMsg.data.message.code) {
            login.tokenInvalidHandle()
          } else {
            login.tokenInvalidHandle()
            defaultMsg = '登录失败'
            if(errorMsg.data.error_description.indexOf("xx_message_record.checkCode.failure") != -1 || errorMsg.data.error_description == null ){
              defaultMsg = '手机号或验证码输入错误,请重新输入'
            }
          }
          break
        case 403:
          defaultMsg = '权限不足,请联系管理员'
          break
        case 400:
          defaultMsg = '操作失败,很遗憾，错误的请求'
          break
        case 422:
          defaultMsg = '操作失败,请求参数不符合要求'
          break
        case 500:
          defaultMsg = '服务器错误'
          break
        default:
          defaultMsg = '操作失败,未知错误'
          break
      }
      let extraMsgs = messages.getExtraMessageAll(error.response)
      if (extraMsgs) {
        rv.extraMsgs = extraMsgs
      }
      rv.msg = messages.getMainMessage(error.response, defaultMsg)
      //系统自定义的特殊数据
      if (error.response.data) {
        rv.data = error.response.data
        if (error.response.data.rcode) {
          rv.rcode = error.response.data.rcode
        }
        //spring security登陆失败的错误消息
        if (error.response.data.error_description) {
          rv.get_token_error = error.response.data.error_description
        }
        // 生产环境下，open_id由后端返回
        if (error.response.data.openId) {
          //TODO [xsw] 存localStorage~~~
          // storage.set('openId',error.response.data.openId)
        }
      }
      consoleUtils.err(rv.msg)
    }
    return Promise.reject(rv)
  },
)

/**
 *获取Authorization
 */
const getAuthorization = function() {
  return storage.get('tokenType') + ' ' + storage.get('token')
}

const initVueHandle = function(vue, isVue, headers, isInitUfd) {
  if (
    isInitUfd &&
    isVue &&
    vue.ufd &&
    vue.ufd.isFirst &&
    !utils.isEmptyObject(vue.ufd.initParam)
  ) {
    let params = utils.getCopyObj(vue.ufd.initParam)
    //如果传了peName，但不是数组类型的转成数组
    if (params.peName && !utils.assertType(params.peName, 'Array')) {
      params.peName = [params.peName]
    }
    headers.initParam = JSON.stringify(params)
    vue.ufd.isFirst = false
  }
}

/**
 * url条件固定参数
 */
export const addFixedUrlParam = function(modelName, url) {
  if (url.indexOf('https://') == -1 && url.indexOf('http://') == -1) {
    let s = stringUtil.startWith(url, '/') ? url.substring(1) : url
    let base_url = env.getEnv(modelName).BASE_URL
    url = base_url + s
  }
  // if (url.indexOf('?') < 0) {
  //   url += '?'
  // } else {
  //   url += '&'
  // }
  return url
}

export const headersHandle = function(headers) {
  headers['Accept-Language'] = config.LOCALE
  headers['terminal'] = config.TERMINAL_TYPE
  headers['Authorization'] = headers['Authorization']
    ? headers['Authorization']
    : getAuthorization()
  return headers
}

//单独导出是为了可以方便的获取到vue实例
/**
 * get请求
 * @param {*} url
 * @param {*} params
 * 
 * 入口项目数据请求：
 * this.$_get(url,params)
 * 
 * 子项目中数据请求：
 * XM.ajax.get(url,params)
 * 
 * 跨项目调取接口的方法，以销售为例：
 *  let baseUrl = this.$_env.getEnv(this.$_modelConfig.xsale).BASE_URL
    XM.ajax.get(baseUrl + 'api/v1/getOrderList', taskData)
        .then(res => {
          this.$message.success(res.msg)
        })
        .catch(err => {
          this.$message.error('[' + err.status + ']' + err.msg)
    })
 */
export const get = function(modelName, url, params = {}, isInitUfd = true) {
  let vue = this
  let isVue = false
  try {
    //通过Vue.prototype.$_get方式调用的，vue.$route会报错，这种情况捕获掉当成不走初始化处理
    isVue = vue && vue.$route //调用者是否是vue组件
  } catch (e) {}
  let headers = {}
  initVueHandle(vue, isVue, headers, isInitUfd)
  let promise = new Promise((resolve, reject) => {
    axios({
      method: 'get',
      params: params,
      headers: headersHandle(headers),
      url: addFixedUrlParam(modelName, url),
    })
      .then(res => {
        if (res.status === 200) {
          resolve(res)
          if (isVue) {
            //统一设置页面初始化数据
            if (res.data && !utils.isEmptyObject(res.data.initData)) {
              backInitData.initData(res.data.initData, vue)
            } else if (headers.initParam) {
              console.log('页面' + vue.$options.name + '没有初始化数据')
            }
          }
        } else {
          reject(res)
        }
      })
      .catch(err => {
        reject(err)
      })
  })
  return promise
}

/**
 * 保存/添加 请求
 * @param {*} url
 * @param {*} data 请求体参数
 * @param {*} params url参数
 * @param {*} ignoreError
 */
export const post = function(modelName, url, data, params = {}, isInitUfd=true) {
  let vue = this
  let isVue = false
  try {
    //通过Vue.prototype.$_get方式调用的，vue.$route会报错，这种情况捕获掉当成不走初始化处理
    isVue = vue && vue.$route //调用者是否是vue组件
  } catch (e) {}
  let headers = {
    'Content-type': 'application/json;charset=UTF-8',
  }
  initVueHandle(vue, isVue, headers, isInitUfd)
  let promise = new Promise((resolve, reject) => {
    axios({
      method: 'post',
      params: params,
      data: JSON.stringify(data),
      headers: headersHandle(headers),
      url: addFixedUrlParam(modelName, url),
    })
      .then(res => {
        if (res.status === 200) {
          resolve(res)
          if (isVue) {
            //统一设置页面初始化数据
            if (res.data && !utils.isEmptyObject(res.data.initData)) {
              backInitData.initData(res.data.initData, vue)
            } else if (headers.initParam) {
              console.log('页面' + vue.$options.name + '没有初始化数据')
            }
          }
        } else {
          reject(res)
        }
      })
      .catch(err => {
        reject(err)
      })
  })
  return promise
}

/**
 * 删除请求
 * @param {*} url
 * @param {*} params
 */
export const del = function(modelName, url, params = {}) {
  let headers = {}
  let promise = new Promise((resolve, reject) => {
    axios({
      method: 'delete',
      params: params,
      headers: headersHandle(headers),
      url: addFixedUrlParam(modelName, url),
    })
      .then(res => {
        if (res.status === 200) {
          resolve(res)
        } else {
          reject(res)
        }
      })
      .catch(err => {
        reject(err)
      })
  })
  return promise
}

/**
 * 更新/修改 请求
 * @param {*} url
 * @param {*} data 请求体参数
 * @param {*} params url参数
 * @param {*} ignoreError
 */
export const put = function(modelName, url, data, params = {}, ignoreError) {
  let headers = {
    'Content-type': 'application/json;charset=UTF-8',
  }
  let promise = new Promise((resolve, reject) => {
    axios({
      method: 'put',
      params: params,
      data: JSON.stringify(data),
      headers: headersHandle(headers),
      url: addFixedUrlParam(modelName, url),
    })
      .then(res => {
        if (res.status === 200) {
          resolve(res)
        } else {
          reject(res)
        }
      })
      .catch(err => {
        reject(err)
      })
  })
  return promise
}

/**
 * 上传文件
 * @param {*} url
 * @param {*} formData  FormData 请求体参数
 * @param {*} params  url参数
 * @param {*} ignoreError
 */
export const upload = function(
  modelName,
  url,
  formData,
  params = {},
  uploadProgressBack = () => {},
  ignoreError,
) {
  let headers = {
    'Content-Type': 'multipart/form-data',
  }
  let promise = new Promise((resolve, reject) => {
    axios({
      method: 'post',
      params: params,
      data: formData,
      headers: headersHandle(headers),
      onUploadProgress: uploadProgressBack,
      url: addFixedUrlParam(modelName, url),
    })
      .then(res => {
        if (res.status === 200) {
          resolve(res)
        } else {
          reject(res)
        }
      })
      .catch(err => {
        reject(err)
      })
  })
  return promise
}

/**
 * post请求
 * @param {*} url
 * @param {*} params
 */
export const download = function(modelName, url, data, params = {}) {
  let headers = {
    'Content-type': 'application/json;charset=UTF-8',
  }
  let promise = new Promise((resolve, reject) => {
    axios({
      method: 'post',
      params: params,
      data: JSON.stringify(data),
      headers: headersHandle(headers),
      url: addFixedUrlParam(modelName, url),
      responseType: 'blob', // 表明返回服务器返回的数据类型
    })
      .then(res => {
        if (res.status === 200) {
          let content = res.data
          let blob = new Blob([content])
          let contentDisposition = res.headers['content-disposition']
          let fileName = contentDisposition
            ? decodeURI(contentDisposition.split(';')[1].split('filename=')[1])
            : 'file'
          if ('download' in document.createElement('a')) {
            // 非IE下载
            let elink = document.createElement('a')
            elink.download = fileName
            elink.style.display = 'none'
            elink.href = URL.createObjectURL(blob)
            document.body.appendChild(elink)
            elink.click()
            URL.revokeObjectURL(elink.href) // 释放URL 对象
            document.body.removeChild(elink)
          } else {
            // IE10+下载
            navigator.msSaveBlob(blob, fileName)
          }
          resolve(res)
        } else {
          reject(res)
        }
      })
      .catch(err => {
        reject(err)
      })
  })
  return promise
}

export const baseAjax = {
  //TODO [20190329 xsw] 登陆相关：登陆、退出登陆、设置令牌等登陆信息、清除令牌等登陆信息、获取登陆状态、刷新令牌相关操作
}
