
import modelConfig from '@/systemConfig/modelConfig.js' //子项目namespaced配置
import { get } from '@bApi/ajax/baseAjax.js'
import storage from '@bApi/storage/storageUtil.js'

const url = 'api/v1/currency/get_all_of_symbol'

const initCurrencySymbol = {
  // 币种符号
  currencySymbol:{},
  // 币种名称
  currencyNameInfo:{},
  getGeneralData() {
    return initGeneralData()
  },

}

/**
 * 初始化通用数据
 */
const initGeneralData = function() {
  let currencySymbol = storage.get('currencySymbol')
  let currencyNameInfo = storage.get('currencyNameInfo')
  //以及获取过的不在重复获取
  let promise = new Promise((resolve, reject) => {
    if (!currencySymbol) {
      //同步请求
      //调用后端接口获取通用数据
      get(modelConfig.xfinance, url)
        .then(res => {
          currencySymbol = res.data.data
          currencyNameInfo = res.data.currencyNameInfo
          Object.assign(initCurrencySymbol)
          Object.assign(initCurrencySymbol.currencySymbol, currencySymbol)
          Object.assign(initCurrencySymbol.currencyNameInfo, currencyNameInfo)
          //把币种符号初始化数据存入storage中
          storage.set('currencySymbol', currencySymbol)
          storage.set('currencyNameInfo', currencyNameInfo)
          resolve(res)
        })
        .catch(err => {
          consoleUtils.err('初始化币种符号失败:' + err.msg)
          reject(err)
        })
    } else {
      Object.assign(initCurrencySymbol)
      Object.assign(initCurrencySymbol.currencySymbol, currencySymbol)
      Object.assign(initCurrencySymbol.currencyNameInfo, currencyNameInfo)
      resolve()
    }
  })
  return promise
}

export default initCurrencySymbol