import Vue from 'vue'
import utils from '@bApi/util/utils.js'

var numeral = require('numeral')
const DEFAULT_CURRENCY = 'CNY'

const moneyUtil = {

  /**
   * 小数转化为百分数
   */
  toPercent(value, digits = 2) {
    if (value == -Infinity || value == +Infinity) {
      return value == -Infinity ? '-∞' : '+∞'
    }
    let percent = (value * 100).toFixed(digits)
    percent+="%"
    return percent
  },

  /**
   * 金额加货币符号并四舍五入
   * @param {*} value
   * @param {*} Digits
   */
  currencyAndToFixed(value, currency = DEFAULT_CURRENCY, Digits = 2) {
    if (typeof value == 'undefined' || value == null) {
      return value
    }
    let number = value
    if (utils.assertType(value, 'String')) {
      number = numeral(value).value()
      if (number == null || typeof number == 'undefined' || isNaN(number)) {
        return value
      }
    }
    return Vue.prototype.$_currencySymbol[currency] + number.toFixed(Digits)
  },
  /**
   * 字符串类型数字四舍五入
   * @param {*} value
   * @param {*} Digits
   * @param {*} isTranZero
   */
  strToFixed(value, Digits = 2, isTranZero = false) {
    if (typeof value == 'undefined' || value == null) {
      if(isTranZero) {
        return numeral(0).value().toFixed(Digits)
      } else {
        return value
      }
    }
    let number = numeral(value).value()
    if (number == null || typeof number == 'undefined' || isNaN(number)) {
      if(isTranZero) {
        return numeral(0).value().toFixed(Digits)
      } else {
        return value
      }
    }
    return number.toFixed(Digits)
  },
  /**
   * 数组类型四舍五入
   * @param {*} value 数值类型
   * @param {*} Digits 小数点后几位
   */
  toFixed(value, Digits = 2) {
    return value.toFixed(Digits)
  },
  /**
   * 币种表示符号转货币符号
   * @param {*} currency 币种表示符号
   */
  currencySymbol(currency) {
    return Vue.prototype.$_currencySymbol[currency]
  },
  /**
   * 金额加货币符号
   * @param {*} value 金额
   * @param {*} currency 币种表示符号 默认CNY
   */
  currency(value, currency = DEFAULT_CURRENCY) {
    return Vue.prototype.$_currencySymbol[currency] + value
  },
  /**
   * 金额格式化
   * @param {} value  当前值
   * @param {*} format 默认格式  '0,0.00'
   */
  money(value, format = '0,0.00') {
    return numeral(value).format(format)
  },
  /**
   * 带币种符号   金额格式化
   * @param {} value 金额
   * @param {*} currency 币种表示符号 默认CNY
   * @param {*} format 默认格式  '0,0.00'
   */
  currMoney(value, currency = DEFAULT_CURRENCY, format = '0,0.00') {
    return Vue.prototype.$_currencySymbol[currency] + numeral(value).format(format)
  },
  /**
   *  +
   * @param {*} val1
   * @param {*} val2
   */
  add(val1, val2) {
    var number1 = numeral(val1)
    var number2 = numeral(val2)
    return number1.add(number2.value()).value()
  },
  /**
   * -
   * @param {} val1
   * @param {*} val2
   */
  subtract(val1, val2) {
    // 减 -
    var number1 = numeral(val1)
    var number2 = numeral(val2)
    return number1.subtract(number2.value()).value()
  },
  multiply(val1, val2) {
    // 乘 *
    var number1 = numeral(val1)
    var number2 = numeral(val2)
    return number1.multiply(number2.value()).value()
  },
  divide(val1, val2) {
    // 除 /
    var number1 = numeral(val1)
    var number2 = numeral(val2)
    return number1.divide(number2.value()).value()
  },
  omitShow(str, n = 15) {
    if (str == null) {
      return str
    }
    if (str.length > n) {
      str = str.substring(0, n) + '...'
    }
    return str
  },

  /**
   * 两数相处再取百分数
   * 
   * 0/0 --> 0.00
   * 0/1 --> 0.00
   * 1/0 --> ∞
   * -1/0 --> -∞
   * 1/1 --> 100.00
   */
  dividePercent(divisor, dividend) {
    if (divisor == '' || divisor == null || divisor == undefined
        || dividend == '' || dividend == null || dividend == undefined) {
      return 0.00
    }
    if (dividend == 0) {
      return divisor > 0 ? '∞' : (divisor < 0 ? "-∞": 0.00)
    }
    return this.multiply(this.divide(divisor, dividend).toFixed(4), 100).toFixed(2)
  }
}

export default moneyUtil
