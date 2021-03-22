/**
 * 
 */
const telCountryUtils = {
  /**
   * 
   * @param {*} telCountry 手机国家号，例如86
   * @param {*} tel 手机号码
   */
  telCountryStandard(telCountry,tel) {
    return `+${telCountry}${tel}`
  }
}

export default telCountryUtils