import env from '@/systemConfig/env.js' //环境配置
const stringUtil = {
  /**
   * 根据模块获取url(即拼接对应模块的BASE_URL)
   * @param {*} modelName
   * @param {*} url
   */
  getUrlByModel(modelName, url) {
    if (url.indexOf('https://') == -1 && url.indexOf('http://') == -1) {
      let s = this.startWith(url, '/') ? url.substring(1) : url
      let base_url = env.getEnv(modelName).BASE_URL
      url = base_url + s
    }
    return url
  },

  /**
   * 截取字符串
   * @param val 原字符串
   * @param prefix 前缀
   */
  subStr(val, prefix) {
    return val.substring(prefix.length, val.length)
  },
  /**
   * 将字符串转换成h5内容
   * @param {*} OriginalStr
   */
  strToH5Str(OriginalStr) {
    if (!OriginalStr) {
      return ''
    }
    OriginalStr = this.replaceAll(OriginalStr, '<', '&lt;')
    OriginalStr = this.replaceAll(OriginalStr, '>', '&gt;')
    OriginalStr = this.replaceAll(OriginalStr, '\r\n', '<br>')
    OriginalStr = this.replaceAll(OriginalStr, '\r', '<br>')
    OriginalStr = this.replaceAll(OriginalStr, '\n', '<br>')
    OriginalStr = this.replaceAll(OriginalStr, '\t', '&nbsp;&nbsp;&nbsp;&nbsp;')
    OriginalStr = this.replaceAll(OriginalStr, ' ', '&nbsp;&nbsp;')
    return OriginalStr
  },

  /**
   * 将OriginalStr中的所有reallyDo替换成replaceWith
   * @param {*} OriginalStr
   * @param {*} reallyDo
   * @param {*} replaceWith
   * @param {*} isGlobal 是否全局替换，默认为true，全局替换
   */
  replaceAll(OriginalStr, reallyDo, replaceWith, isGlobal = true) {
    if (isGlobal) {
      return OriginalStr.replace(new RegExp(reallyDo, 'g'), replaceWith)
    } else {
      return OriginalStr.replace(new RegExp(reallyDo), replaceWith)
    }
  },

  /**
   * 把url的参数部分转化成json对象
   * @param {*} url
   */
  parseQueryString(url) {
    var reg_url = /^[^\?]+\?([\w\W]+)$/,
      reg_para = /([^&=]+)=([\w\W]*?)(&|$|#)/g,
      arr_url = reg_url.exec(url),
      ret = {}
    if (arr_url && arr_url[1]) {
      var str_para = arr_url[1],
        result
      while ((result = reg_para.exec(str_para)) != null) {
        ret[result[1]] = result[2]
      }
    }
    return ret
  },

  /**
   * 判断是否以指定字符串开始
   * @param {*} startStr
   */
  startWith(str, startStr) {
    return str.indexOf(startStr) == 0
  },

  /**
   * 判断是否以指定字符串结尾
   * @param {*} endStr
   */
  endWith(str, endStr) {
    var d = str.length - endStr.length
    return d >= 0 && str.lastIndexOf(endStr) == d
  },

  /**
   * 根据文件名判断是否是图片
   * @param {*} fileName 文件名称
   */
  isImage(fileName) {
    fileName = fileName.toLocaleLowerCase()
    if (
      this.endWith(fileName, '.jpg') ||
      this.endWith(fileName, '.jpeg') ||
      this.endWith(fileName, '.gif') ||
      this.endWith(fileName, '.png') ||
      this.endWith(fileName, '.bmp')
    ) {
      return true
    } else {
      return false
    }
  },

  /* 
    split 分割字符串
    str 传递需要分割的字符串
    symbol 分割字符串的标识，默认是-
  */
 stringSplit(str,symbol='-') {
   return str.split(symbol)
 },
 //获取字符串长度（汉字算两个字符，字母数字算一个）
 getByteLen(val) {
    var len = 0;
    for (var i = 0; i < val.length; i++) {
      var a = val.charAt(i);
      if (a.match(/[^\x00-\xff]/ig) != null) {
        len += 2;
      }
      else {
        len += 1;
      }
    }
    return len;
  }
}
export default stringUtil
