/**
 * @params num Number 在 数字小于 10 的前面填充 0
 * @return string
 * @author Ken
 * */ 
const frontPadZero = {
  padZero(num) {
    if(num < 10) {
      return `0${num}`
    } else {
      return `${num}`
    }
  }
}

export default frontPadZero