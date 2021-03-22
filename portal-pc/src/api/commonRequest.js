// 公共请求方法

import request from '@bApi/plugin/request.js'

const commonRequest = (commonData, data) => {
  return request({
    ...commonData,
    ...data
  })
}


export {
  commonRequest
}