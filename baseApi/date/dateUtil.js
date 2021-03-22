var moment = require('moment')
const dateUtil = {
  /**
   * 计算相差天数  end - start
   * 只取年-月-日进行计算
   * @param {*} start 时间戳类型
   * @param {*} end 时间戳类型
   * return 整数
   */
  dateDiff(start, end) {
    start = this.dateToTimestamp(this.df(start))
    end = this.dateToTimestamp(this.df(end))
    let dateDiff = Math.floor(end - start) / (1000 * 60 * 60 * 24)
    return Math.floor(dateDiff)
  },

  /**
   * 计算时差
   * @param {*} start 时间戳格式
   * @param {*} end 默认取当前时间
   * return 时间戳
   */
  timeLag(start, end = new Date().getTime()) {
    return end - start
  },

  /**
   * 如2017-07-04，2017-07-05 这种日期格式比较大小
   * @param {*} date1 require
   * @param {*} date2 不传默认为当前日期
   * return 若date1>=date2则为true
   */
  normDateCompare(date1, date2) {
    date1 = this.dateToTimestamp(date1)
    if (!date2) {
      date2 = new Date().getTime()
    } else {
      date2 = this.dateToTimestamp(date2)
    }
    return date1 >= date2
  },

  /**
   *
   * @param {*} value 传递的时间戳
   * @param {*} format，格式化，注意：分钟+秒钟，都需要小写，大写时间会出现偏差
   * 正确的写法：this.$_dateUtil.df(date,'YYYY-MM-DD HH:mm:ss')
   * 错误的写法：this.$_dateUtil.df(date,'YYYY-MM-DD HH:MM:SS')
   */
  df: function(value, format) {
    if (value == undefined || value == '') {
      return ''
    }
    if (format == undefined || format == '') {
      format = 'YYYY-MM-DD'
    }
    return moment(value).format(format)
  },

  //时间格式化
  tabDf: function(row, column, cellValue, index) {
    var moment = require('moment')
    // var date = row[column.property];
    if (cellValue == undefined) {
      return ''
    }
    return moment(cellValue).format('YYYY-MM-DD')
  },

  /**
   * 获取当前日期时间戳
   */
  getNowTimestamp() {
    return new Date().getTime()
  },

  /**
   * 获取当前时间之前或之后day天后的日期
   * 之前的日期用负数，之后的日期用正数
   * @param {*} time_difference 单位天
   * return 时间戳
   */
  getNowDateAfterOrBeforeDay(day) {
    let time_difference = day * 60 * 60 * 24
    return this.getNowDateAfterOrBefore(time_difference)
  },
  /**
   * 获取当前时间之前或之后time_difference秒后的日期
   * 之前的日期用负数，之后的日期用正数
   * @param {*} time_difference 单位秒
   * return 时间戳
   */
  getNowDateAfterOrBefore(time_difference) {
    time_difference = time_difference * 1000
    let now_date = new Date()
    let now_date_timestamp = now_date.getTime() + time_difference
    return now_date_timestamp
  },

  /**
   * 获取当前时间之前或之后n年的日期
   * @param {获取n年前or n年后的日期} n
   * 之前的日期用负数，之后的日期用正数
   * return 标准日期格式
   */
  getNowDateAfterOrBeforeYear(n) {
    let now = new Date()
    let year = now.getFullYear() + n
    let month = now.getMonth() + 1
    let day = now.getDate()
    return this.timestampToNormDate(
      this.dateToTimestamp(year + '-' + month + '-' + day),
    )
  },

  /**
   * 获取当前时间之前或之后n年的日期
   * @param {获取n年前or n年后的日期} n
   * 之前的日期用负数，之后的日期用正数
   * return 时间戳格式
   */
  getNowDateAfterOrBeforeYearTimestamp(n) {
    let now = new Date()
    let year = now.getFullYear() + n
    let month = now.getMonth() + 1
    let day = now.getDate()
    return this.dateToTimestamp(year + '-' + month + '-' + day)
  },

  /**
   * 时间戳转日期
   * @param {*} value
   */
  timestampToDate: function(value) {
    if (!value) {
      return ''
    }
    if (value == 0 || value.constructor != Number) {
      return ''
    }
    if (value.toString().length <= 10) {
      value = value * 1000
    }
    const date = new Date(value)
    var y = date.getFullYear()
    var m = date.getMonth() + 1
    m = m < 10 ? '0' + m : m
    var d = date.getDate()
    d = d < 10 ? '0' + d : d
    return y + '-' + m + '-' + d
  },

  /**
   * 时间戳转2019-9-10格式
   *
   * @param {*} value
   */
  timestampToSimpleDate: function(value) {
    if (!value) {
      return ''
    }
    if (value == 0 || value.constructor != Number) {
      return ''
    }
    if (value.toString().length <= 10) {
      value = value * 1000
    }
    const date = new Date(value)
    var y = date.getFullYear()
    var m = date.getMonth() + 1
    var d = date.getDate()
    return y + '-' + m + '-' + d
  },

  /**
   * 字符串日期转时间戳
   * @param {*} value
   */
  dateToTimestamp(value) {
    if (value) {
      return new Date(value).getTime()
    } else {
      return 0
    }
  },

  /**
   * 日期格式(Thu Mar 19 2015 12:00:00 GMT+0800 (中国标准时间))转为日期标准字符串：2015-03-19
   * @param {*} value
   */
  formatDate: function(value) {
    if (value) {
      const date = new Date(value)
      var y = date.getFullYear()
      var m = date.getMonth() + 1
      m = m < 10 ? '0' + m : m
      var d = date.getDate()
      d = d < 10 ? '0' + d : d
      return y + '-' + m + '-' + d
    }
    return ''
  },

  /**
   * 转标准时间
   * @param {*} date
   */
  normDate: function(date) {
    var t = Date.parse(date)
    if (!isNaN(t)) {
      return new Date(Date.parse(date.replace(/-/g, '/')))
    } else {
      return ''
    }
  },

  /**
   * 时间戳转标准时间
   * @param {*} value
   */
  timestampToNormDate: function(value) {
    if (!isNaN(value)) {
      return new Date(value)
    } else {
      return ''
    }
  },
  // 时间戳转换成时间
  timestampToTime(value) {
    var date = new Date(value) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-'
    var M =
      (date.getMonth() + 1 < 10
        ? '0' + (date.getMonth() + 1)
        : date.getMonth() + 1) + '-'
    var D = date.getDate() + ' '
    var h =
      (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
    var m =
      (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) +
      ':'
    var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    return Y + M + D + h + m + s
  },
  // 对数字字符串进行补0操作
  pad(num, n = 2, str = '0') {
    let len = num.toString().length
    while (len < n) {
      num = str + num
      len++
    }
    return num
  },
  // 对数字字符串进行去0操作
  nopad(num) {
    if (num.toString().indexOf('0') === 0) {
      var reg = new RegExp('0')
      num = num.replace(reg, '')
    }
    console.log(num)
    return num
  },

  /* 
    获取指定月份的第一天和最后一天
    monthval 指定的月份
  */
  getSpecifiedMonthFirstLastDay(yearMonth) {
    let month = yearMonth.split('/')[1]
    let year = yearMonth.split('/')[0]
    let firstDay = new Date(year, month - 1, 1)
    let lastDay = new Date(year, month, 0)
    return [Date.parse(firstDay), Date.parse(lastDay)]
  },

  /**
   * 获取当前月份往前 n 个月
   * @param {*} monthStr 默认是五个月
   * @author yjn
   * @return Array 
   * @example this.$_dateUtil.getRecentlyMonth()
   *
   */
  getRecentlyMonth(monthStr = 6) {
    let dataArr = []
    let data = new Date()
    let year = data.getFullYear()
    data.setMonth(data.getMonth() + 1, 1) //获取到当前月份,设置月份
    for (let i = 0; i < monthStr; i++) {
      data.setMonth(data.getMonth() - 1) //每次循环一次 月份值减1
      let m = data.getMonth() + 1
      m = m < 10 ? m : m
      dataArr.push({
        keyName: m + '月',
        keyValue: m > 12 ? `${year} + ${1}/${m}` : `${year}/${m}`,
      })
    }
    return dataArr
  },
  /**
   * 获取当前月份往后的五个月
   * @param {*} monthStr 默认当前月份往后六个月
   * @returns 返回的是数组
   * @author yjn
   * @example this.$_dateUtil.getRecentlyFiveMonthAfter()
   */
  getRecentlyFiveMonthAfter(monthStr = 6) {
    let monthArr = []
    let data = new Date()
    let year = data.getFullYear()
    for (let i = 0; i < monthStr; i++) {
      data.setMonth(data.getMonth() + 1) //每次循环一次 月份值加1
      let m = data.getMonth()
      m = m == 0 ? m + 12 : m
      monthArr.push({
        keyName: m + '月',
        keyValue: m > 12 ? `${year} + ${1}/${m}` : `${year}/${m}`,
      })
    }
    return monthArr
  },
  /**
   * 获取给定月份的 N 个月后的日期
   * @param {*} n
   * 返回是时间戳
   */
  getAfterTheCurrentMonth(n = 2) {
    let d = new Date()
    d.setMonth(d.getMonth() + n)
    var yy1 = d.getFullYear()
    var mm1 = d.getMonth() + 1 //因为getMonth（）返回值是 0（一月） 到 11（十二月） 之间的一个整数。所以要给其加1
    var dd1 = d.getDate()
    if (mm1 < 10) {
      mm1 = '0' + mm1
    }
    if (dd1 < 10) {
      dd1 = '0' + dd1
    }
    return [Date.parse(new Date()),this.dateToTimestamp(yy1+ '/' + mm1 + '/' + dd1)]
  },
}
export default dateUtil
