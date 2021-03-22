import utils from '@bApi/util/utils.js'
import consoleUtils from '@bApi/util/consoleUtils.js' //控制台打印工具
import { get } from '@bApi/ajax/baseAjax.js'
import modelConfig from '@/systemConfig/modelConfig.js' //子项目namespaced配置
import translate from '@bApi/util/translate.js'

//通过后端接口获取的一些初始化数据操作
const backInitData = {
  /**
   * 页面数据初始化统一用法，设置field_map、multiText到vue实例中
   * @param {*} data 响应对象中的data(注意：不是response)
   * @param {*} vue vue实例
   */
  initData(data, vue) {
    if (!data || !vue) {
      consoleUtils.err('初始化数据设置失败：data或vue为null或者undefined')
      return
    }
    //field数据
    if (!utils.isEmptyObject(data.fieldMap)) {
      if (utils.assertType(vue.ufd.initParam.peName, 'Array')) {
        //有多个peName的处理（有额外的field数据）
        vue.ufd.fields = data.fieldMap[vue.ufd.initParam.peName[0]]
        vue.ufd.initParam.peName.forEach((peName, index) => {
          if (index != 0) {
            if (!utils.isEmptyObject(data.fieldMap[peName])) {
              vue.ufd.fieldList[peName] = data.fieldMap[peName]
              for (var key in vue.ufd.fieldList[peName]) {
                var value = vue.ufd.fieldList[peName][key]
                if (value.rules) {
                  var rulelist = value.rules.ruleList
                  for (var n = 0; n < rulelist.length; n++) {
                    // 处理自定义验证方法
                    if (rulelist[n].hasOwnProperty('validator')) {
                      rulelist[n].validator = this[rulelist[n].validator]
                    }
                  }
                  if (!vue.ufd.ruleList[peName]) {
                    vue.ufd.ruleList[peName] = {}
                  }
                  vue.ufd.ruleList[peName][key] = rulelist
                }
                //这个已经没有了
                // if (value.category_group) {
                //   vue.ufd[key] = value.category_group
                // }
              }
            }
          }
        })
      } else {
        vue.ufd.fields = data.fieldMap[vue.ufd.initParam.peName]
      }
      for (var key in vue.ufd.fields) {
        var value = vue.ufd.fields[key]
        if (value.rules) {
          var rulelist = value.rules.ruleList
          for (var n = 0; n < rulelist.length; n++) {
            // 处理自定义验证方法
            if (rulelist[n].hasOwnProperty('validator')) {
              rulelist[n].validator = this[rulelist[n].validator]
            }
          }
          if (!vue.ufd.rules) {
            vue.ufd.rules = {}
          }
          vue.ufd.rules[key] = rulelist
        }
        // if (value.category_group) {
        //   vue.ufd[key] = value.category_group
        // }
      }

      //初始化查询结果组件数据中的fields数据
      if (vue.ufd.fields && vue.searchResultParam) {
        vue.searchResultParam.fields = vue.ufd.fields
      }
    }
    //columns数据
    if (!utils.isEmptyObject(data.tableMap)) {
      for (let key in data.tableMap) {
        data.tableMap[key].map(function(obj) {
          if (obj && obj.alignType) {
            //针对el-table的列表对齐方式的翻译
            obj.alignType = translate.elAlignType(obj.alignType)
          }
        })
      }
      vue.ufd.columns = data.tableMap
    }
    //搜索历史数据
    if (
      !utils.isArrayEmpty(vue.ufd.initParam.tableName) &&
      !utils.isEmptyObject(data.searchRecordsMap)
    ) {
      //搜索历史纪录列表添加到vuex中
      vue.$store.commit(modelConfig.xframe + '/theHeader/addHistoryList', {
        searchRecordTableName: vue.ufd.initParam.tableName[0],
        historyList: data.searchRecordsMap[vue.ufd.initParam.tableName[0]],
      })
      //更新vuex中的当前标签TableName
      vue.$store.commit(
        modelConfig.xframe + '/theHeader/changeSearchRecordTableName',
        vue.ufd.initParam.tableName[0],
      )
    }
    //多语言文本数据
    if (!utils.isEmptyObject(data.text)) {
      //将data.text中的数据添加到vue.ufd.text，重复的key会被覆盖
      Object.assign(vue.ufd.text, data.text)
    }
    //权限数据
    if (!utils.isEmptyObject(data.rights)) {
      //将data.rights中的数据追加到vue.ufd.rights的后面
      vue.ufd.rights = vue.ufd.rights.concat(data.rights)
    }
    if (vue.ufd.isAutoSetInit !== true) {
      //设置初始化完成标记
      vue.ufd.isInit = true
    }
  },

  /*(从后端获取)初始化报表列数据*/
  initColumns(obj, columnsEntity, tableName) {
    let promise = new Promise((resolve, reject) => {
      const url = 'page_column/' + tableName
      var fields = get(modelConfig.xframe, url)
      fields
        .then((res) => {
          obj[columnsEntity] = res.data.columns
          for (let i = 0; i < obj[columnsEntity].length; i++) {
            //TODO 可否优化写法？？
            if (obj[columnsEntity][i].column_type != '') {
              //改为判断类型，返回对应方法？区分前端格式化，还是后端？
              //this[]是什么语法 ？
              obj[columnsEntity][i].formatter = this[
                obj[columnsEntity][i].column_type
              ]
            }
          }

          resolve()
        })
        .catch((err) => {
          consoleUtils.err(err)
          obj.$message.error('[' + err.status + ']' + err.msg)
          reject(err)
        })
    })
    return promise
  },

  //以下定义一些无法直接通过正则表示的验证规则（插入数据表时直接设置rule的validator为下面对应的方法名）
  /**
   * 判断value是否为json字符串
   * @param {*} rule
   * @param {*} value
   * @param {*} callback
   */
  isJson(rule, value, callback) {
    var isJson = false
    if (!value) {
      isJson = true
    }
    if (typeof value == 'string') {
      try {
        var vue = JSON.parse(value)
        if (typeof vue == 'object' && vue) {
          isJson = true
        }
      } catch (e) {
        consoleUtils.err(value + '!!!' + e)
      }
    }
    if (!isJson) {
      callback(new Error(rule.message))
    } else {
      callback()
    }
  },
}

export default backInitData
