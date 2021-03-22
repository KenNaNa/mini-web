// 时间戳转换方法
/**
 * @params timestamp, ymd=false 年月日 传入需要转换的时间戳，
 * @content 如果只传递 timestamp 默认返回时间戳，目前好像只需要 ymd=true 年月日 这种情况，需要其他情况再添加
 * @return dateime
 * @author Ken
 * */ 
function padZero(num) {
  if(num < 10) {
    return `0${num}`
  } else {
    return num
  }
}
const dateModeTransform = {
  dateModeTransform(timestamp, ymd=false) {
    let datetime = new Date(timestamp)
    let year = datetime.getFullYear()
    let month = padZero(datetime.getMonth())
    let date = padZero(datetime.getDate())
    let hours = padZero(datetime.getHours())
    let minutes = padZero(datetime.getMinutes())
    let seconds = padZero(datetime.getSeconds())
    // 判断的顺序必须这样放置，不然可能会出bug
    if(ymd) {
      return `${year}-${month}-${date}`
    }
    return `${year}-${month}-${date}`
  }
}

export default dateModeTransform