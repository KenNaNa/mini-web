// 时间戳转换方法
var moment = require('moment')
/**
 * @params timestamp, 传入需要 转换的时间戳，
 * @params format, 默认为 "ymd", 代表 年月日， 'ymdhms' 代表 年月日时分秒, 'ymdhm' 代表 年月日时分, 'hm' 代表 时分  String
 * @content 如果只传递 timestamp 默认返回 年月日，
 * @return dateime
 * @author Ken
 * */
function padZero (num) {
  if (num < 10) {
    return `0${num}`
  } else {
    return num
  }
}

// 日期以及时间格式常量定义

const CONSTVARIABLE = {
  YMDHMS: "yyyy-mm-dd hh:mm:ss", // 年月日时分秒
  YMDHM: "yyyy-mm-dd hh:mm", // 年月日时分
  YMD: "yyyy-mm-dd", // 年月日
  Y: "yyyy", // 年
  M: "mm", // 月
  D: "dd", // 日
  HMS: "hh:mm:ss", // 时分秒
  HM: "hh:mm", // 时分
  H: "hh" // 时
}

const dateModeTransform = {
  dateModeTransform (timestamp, format = CONSTVARIABLE.YMD) {
    let datetime = new Date(timestamp)
    let year = datetime.getFullYear()
    let month = padZero(datetime.getMonth() + 1)
    let date = padZero(datetime.getDate())
    let hours = padZero(datetime.getHours())
    let minutes = padZero(datetime.getMinutes())
    let seconds = padZero(datetime.getSeconds())
    switch (format) {
      case CONSTVARIABLE.YMDHMS:
        // 年月日时分秒
        return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`

      case CONSTVARIABLE.YMDHM:
        // 年月日时分
        return `${year}-${month}-${date} ${hours}:${minutes}`

      case CONSTVARIABLE.YMD:
        // 年月日
        return `${year}-${month}-${date}`

      case CONSTVARIABLE.HMS:
        // 时分秒
        return `${hours}:${minutes}:${seconds}`

      case CONSTVARIABLE.HM:
        // 时分
        return `${hours}:${minutes}`

      case CONSTVARIABLE.H:
        // 时
        return `${hours}`

      case CONSTVARIABLE.Y:
        // 年
        return `${year}`

      case CONSTVARIABLE.M:
        // 月
        return `${month}`

      case CONSTVARIABLE.D:
        // 日
        return `${date}`

      default:
        // 默认返回 年月日
        return `${year}-${month}-${date}`
    }
  },

  /* 获取时间段内属于星期一(*)的日期们
   * begin: 开始时间
   * end：结束时间
   * weekNum：星期几 {number}
   */
  getWeekToDates (begin, end, weeks) {
    var dateArr = new Array();
    var stimeArr = begin.split("-");//=>["2018", "01", "01"]
    var etimeArr = end.split("-");//=>["2018", "01", "30"]

    var stoday = new Date();
    stoday.setUTCFullYear(stimeArr[0], stimeArr[1] - 1, stimeArr[2]);
    var etoday = new Date();
    etoday.setUTCFullYear(etimeArr[0], etimeArr[1] - 1, etimeArr[2]);

    var unixDb = stoday.getTime();//开始时间的毫秒数
    var unixDe = etoday.getTime();//结束时间的毫秒数

    for (var k = unixDb; k <= unixDe;) {
      let needJudgeDate = this.msToDate(parseInt(k)).withoutTime;
      //不加这个if判断直接push的话就是已知时间段内的所有日期
      for (var i = 0; i < weeks.length; i++) {
        if (new Date(needJudgeDate).getDay() === weeks[i]) {
          dateArr.push(needJudgeDate);
        }
      }
      k = k + 24 * 60 * 60 * 1000;
    }
    return dateArr;
  },

  //根据毫秒数获取日期
  msToDate (msec) {
    let datetime = new Date(msec);
    let year = datetime.getFullYear();
    let month = datetime.getMonth();
    let date = datetime.getDate();
    let hour = datetime.getHours();
    let minute = datetime.getMinutes();
    let second = datetime.getSeconds();

    let result1 = year +
      '-' +
      ((month + 1) >= 10 ? (month + 1) : '0' + (month + 1)) +
      '-' +
      ((date + 1) < 10 ? '0' + date : date) +
      ' ' +
      ((hour + 1) < 10 ? '0' + hour : hour) +
      ':' +
      ((minute + 1) < 10 ? '0' + minute : minute) +
      ':' +
      ((second + 1) < 10 ? '0' + second : second)

    let result2 = year +
      '-' +
      ((month + 1) >= 10 ? (month + 1) : '0' + (month + 1)) +
      '-' +
      ((date + 1) < 11 ? '0' + date : date)

    let result = {
      hasTime: result1,
      withoutTime: result2
    };

    return result
  },

  /**
   * @param timestamp 时间戳
   * 截取日期 2019-20-20 15:30 的 时分15:30
   * */
  getHoursMinutes (timestamp) {
    let timeArr = this.dateModeTransform(timestamp, CONSTVARIABLE.YMDHM).split(' ')
    return timeArr[1]
  },

  /**
   * @param timestamp 时间戳 int
   * @param time 时间 '15:30' string 
   * @comment 获取组合 2019-20-20 00:00 与 15:30 成为 2019-20-20 15:30
   * */
  getDateTimestamp (timestamp, time) {
    let arr = this.dateModeTransform(timestamp, CONSTVARIABLE.YMDHM).split(' ')
    arr[1] = time
    return new Date(arr.join(' ')).getTime()
  },

  // 时间戳应该是毫秒级别的先除以 1000
  /**
 * 格式化秒
 * @param int  value 总秒数
 * @return string result 格式化后的字符串
 * @comment 将时间戳转成几天几小时几分钟
 * @comment 时间戳应该是毫秒级别的先除以 1000
 */
  dateCalculation (second, bool=true) { //返回天、时、分
    second = new Date(second).getTime()
    if (second > 0) {
      var day = 0;
      var hour = 0;
      var minute = 0;
      var data = {};
      minute = Math.floor(second / 1000 / (60))
      if (parseInt(minute) > 60) {
        hour = parseInt(minute / 60);
        minute %= 60; //算出有多分钟
      }
      if (parseInt(hour) > 24) {
        day = parseInt(hour / 24);
        hour %= 24; //算出有多分钟
      }
      data.day = day;
      data.hour = hour;
      data.minute = minute;
      if(bool) {
        return data.day + '天' + data.hour + '小时' + data.minute + '分钟';
      } else {
        return data
      }
      
    }
  },
  /**
   * @param second 时间戳
   * @return obj
   * */ 
  dateCalculationRetObj (second) { //返回天、时、分
    second = new Date(second).getTime()
    if (second > 0) {
      var day = 0;
      var hour = 0;
      var minute = 0;
      var data = {};
      minute = Math.floor(second / 1000 / (60))
      if (parseInt(minute) > 60) {
        hour = parseInt(minute / 60);
        minute %= 60; //算出有多分钟
      }
      if (parseInt(hour) > 24) {
        day = parseInt(hour / 24);
        hour %= 24; //算出有多分钟
      }
      data.day = day;
      data.hour = hour;
      data.minute = minute;
      return data
    }
  },
  /**
   * @comment 计算两个时间戳的差值
   * @comment 返回几天，几小时，几分钟
   * */
  calcTimestampDiffer (startDate, endDate) {
    startDate = new Date(startDate).getTime()
    endDate = new Date(endDate).getTime()
    let _val = endDate - startDate
    return this.dateCalculation(_val)
  },
  /**
   * @comment 获取时间戳
   * @param date string '2019-20-20'
   * */
  getTime (date) {
    return new Date(date).getTime()
  },
  /**
   * 获取时间点的差值
   * @param startTime 起始时间点
   * @param endTime 结束时间点
   * @return 时间点
   * */
  calcTimeDiffer (startTime, endTime) {
    const date1 = moment(startTime, 'hh:mm');
    const date2 = moment(endTime, 'hh:mm');
    const date3 = date2.diff(date1, 'minute');//计算相差的分钟数
    const h = Math.floor(date3 / 60);//相差的小时数
    const mm = date3 % 60;//计算相差小时后余下的分钟数

    return {
      h,
      mm
    }
  },
  /**
   * 计算两个日期的时间点差值
   * @param startDateTime 起始日期时间戳
   * @param endDateTime 结束日期时间戳
   * */
  calcDateTimeDiffer (startDateTime, endDateTime) {
    startDateTime = this.dateModeTransform(startDateTime, 'yyyy-mm-dd hh:mm:ss')
    endDateTime = this.dateModeTransform(endDateTime, 'yyyy-mm-dd hh:mm:ss')
    const date1 = moment(startDateTime);
    const date2 = moment(endDateTime);
    const date3 = date2.diff(date1, 'minute');//计算相差的分钟数
    const h = Math.floor(date3 / 60);//相差的小时数
    const mm = date3 % 60;//计算相差小时后余下的分钟数

    return {
      h,
      mm
    }
  },
  /**
   * 实现时间点与数字相加得出时间点
   * @param time 时间点 09:00 字符串
   * @param num 数字
   * @return 时间点
   * */ 
  getNumToTime(time, hournum, minutenum) {
    var arr = time.split(':')
    var d = 0 // 天
    var num0 = parseInt(arr[0]) // 小时
    var num1 = parseInt(arr[1]) // 分钟
    num0 += parseInt(hournum)
    if(num0 >= 24) {
      num0 = num0 % 24
      d += Math.floor(num0 / 24)
    }
    num1 += parseInt(minutenum)
    if(num1 >= 60) {
      num1 = (num1 % 60)
      num0 += (num1 / 60)
    }
    num0 = padZero(num0)
    num1 = padZero(num1)
    return {
      h: num0,
      m: num1,
      d: d
    }
  },
  countDown(time) {
    // 计算成分钟的时间戳
    // 计算时间点时间戳 12:45
    var s = 0
    var hour = time.split(':')[0]
    var min = time.split(':')[1]
    s = parseInt(hour) * 60 + Number(min)
    return s
  },
  padZero(num) {
    if (num < 10) {
      return '0' + num
    } else {
      return num
    }
  },
  countDaysTime(days, hours, minutes) {
    // 计算小时，天，分钟，换算成 秒时间戳
    var s = parseInt(days) * 24 * 60 + parseInt(hours) * 60 + parseInt(minutes)
    return s
  },
  countTo(timestamp) {
    // 根据时间戳反推几天几小时几分钟
    var day = parseInt(timestamp / 60 / 24)
    var hour = parseInt(timestamp / 60 % 24)
    var min = parseInt(timestamp % 60)
    hour = this.padZero(hour)
    min = this.padZero(min)
    console.log(day, hour, min)
    return {
      day,
      hour,
      min
    }
  },
  // 批量选择的周几
  getMyDay(date) {
    var week
    if (date.getDay() == 0) week = 0
    if (date.getDay() == 1) week = 1
    if (date.getDay() == 2) week = 2
    if (date.getDay() == 3) week = 3
    if (date.getDay() == 4) week = 4
    if (date.getDay() == 5) week = 5
    if (date.getDay() == 6) week = 6
    return week
  },
  //转换时间戳
  formatDate(now) {
    let mydate = new Date(now)
    let year = mydate.getFullYear() //取得4位数的年份
    let month = mydate.getMonth() + 1 //取得日期中的月份，其中0表示1月，11表示12月
    let date = mydate.getDate() //返回日期月份中的天数（1到31）
    return year + '-' + month + '-' + date
  },
  formatDateZero(now) {
    let mydate = new Date(now)
    let year = mydate.getFullYear() //取得4位数的年份
    let month = mydate.getMonth() + 1 //取得日期中的月份，其中0表示1月，11表示12月
    if(month < 10) {
      month = '0'+month
    }
    let date = mydate.getDate() //返回日期月份中的天数（1到31）
    if(date < 10) {
      date = '0' + date
    }
    return year + '-' + month + '-' + date
  },

  //获取范围日期内所有日期
  getDiffDate(startDate, endDate) {
    let start = ''
    let end = ''
    start = this.formatDate(startDate)
    end = this.formatDate(endDate)
    var startTime = this.getDate(start)
    var endTime = this.getDate(end)
    var dateArr = []
    while (endTime.getTime() - startTime.getTime() > 0) {
      var year = startTime.getFullYear()
      var month =
        (startTime.getMonth() + 1).toString().length === 1
          ? '0' + (startTime.getMonth() + 1)
          : startTime.getMonth() + 1
      var day =
        startTime.getDate().toString().length === 1
          ? '0' + startTime.getDate()
          : startTime.getDate()
      dateArr.push(year + '-' + month + '-' + day)
      startTime.setDate(startTime.getDate() + 1)
    }
    dateArr.push(this.formatDateZero(endDate))
    return dateArr
  },
  getCurrentMonthLast(nowMonth) {
    var date = new Date(nowMonth)
    var currentMonth = date.getMonth()
    var nextMonth = ++currentMonth
    var nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1)
    var oneDay = 1000 * 60 * 60 * 24
    var lastTime = new Date(nextMonthFirstDay - oneDay)
    var month = parseInt(lastTime.getMonth() + 1)
    var day = lastTime.getDate()
    if (month < 10) {
      month = '0' + month
    }
    if (day < 10) {
      day = '0' + day
    }
    return date.getFullYear() + '-' + month + '-' + day
  },

  getDate(datestr) {
    var temp = datestr.split('-')
    if (temp[1] === '01') {
      temp[0] = parseInt(temp[0], 10) - 1
      temp[1] = '12'
    } else {
      temp[1] = parseInt(temp[1], 10) - 1
    }
    //new Date()的月份入参实际都是当前值-1
    var date = new Date(temp[0], temp[1], temp[2])
    return date
  },
}

export default dateModeTransform