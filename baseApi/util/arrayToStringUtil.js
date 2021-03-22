// 将数组转换成 逗号相隔的字符串
/**
 * @function handleTags
 * @params arrStr 传入数组字符串 "[q,s,c]"
 * @return str 返回字符串 "q,s,c"
 * @author Ken
 * */ 
/**
 * @function handleObjs
 * @params arrStr 传入数组字符串 "[{name:'Ken'},{sex: 'boy'}]"
 * @return str 返回字符串 "Ken, boy"
 * @author Ken
 * */ 
const arrayToStringUtil = {
  handleTags(arrStr) {
    let arr = JSON.parse(arrStr)
    let str = ''
    for(let i=0, len=arr.length; i<len; ++i) {
      str += arr[i] + ','
    }
    // 原来是返回另外一个字符串,不会影响原来的字符串 str
    return str.substr(0, str.length-1) 
  },
  handleObjs(arrStr) {
    let arr = arrStr
    let str = ''
    arr.map(item => {
      str += item["labelKey"] + ','
    })
    return str.substr(0, str.length-1)
  }
}

export default arrayToStringUtil