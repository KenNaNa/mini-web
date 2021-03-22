const CryptoJS = require('crypto-js')
const encryptKey = '91d4afa927973d00269'
const isNewBrowserKye = 'f91002e81283'
const isNewBrowserVal = 'is new browser f91002e81283'
const edCrypt = {
  /**
   * 加密
   * @param {*} message
   * @param {*} key
   */
  encryptByDES(message, key = encryptKey) {
    /**判断传参类型**/
    if (message === '' || message === null || message === undefined) {
      return ''
    }
    if (typeof message != 'string') {
      message = message.toString()
    }
    var keyHex = CryptoJS.enc.Utf8.parse(key || fn.key)
    var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    })
    return encrypted.toString()
  },
  /**
   * 解密
   * @param {*} ciphertext
   * @param {*} key
   */
  decryptByDES(ciphertext, key = encryptKey) {
    if (ciphertext === '' || ciphertext === null || ciphertext === undefined) {
      return ''
    }
    if (typeof ciphertext != 'string') {
      ciphertext = ciphertext.toString()
    }
    var keyHex = CryptoJS.enc.Utf8.parse(key || fn.key)
    var decrypted = CryptoJS.DES.decrypt(
      {
        ciphertext: CryptoJS.enc.Base64.parse(ciphertext),
      },
      keyHex,
      {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      },
    )
    return decrypted.toString(CryptoJS.enc.Utf8)
  },

  isNewBrowser() {
    let isNewBrowserValEn = this.getIsNewBrowserVal()
    if (!isNewBrowserValEn) {
      return true
    }
    let valDe = this.decryptByDES(isNewBrowserValEn)
    if (valDe === isNewBrowserVal) {
      return false
    }
    return true
  },
  getIsNewBrowserVal() {
    let key = isNewBrowserKye
    //先查询cookie是否为空，为空就return ""
    if (document.cookie.length > 0) {
      //通过String对象的indexOf()来检查这个cookie是否存在，不存在就为 -1
      let start = document.cookie.indexOf(key + '=')
      if (start != -1) {
        //最后这个+1其实就是表示"="号，这样就获取到了cookie值的开始位置
        start = start + key.length + 1
        //因为需要考虑是最后一项，所以通过";"号是否存在来判断
        let end = document.cookie.indexOf(';', start)
        if (end == -1) end = document.cookie.length
        //通过substring()得到了值。想了解unescape()得先知道escape()是做什么的，都是很重要的基础，
        //想了解的可以搜索下，在文章结尾处也会进行讲解cookie编码细节
        return unescape(document.cookie.substring(start, end))
      }
    }
    return ''
  },
  setIsNewBrowserValToCookie() {
    let isNewBrowserValEn = this.encryptByDES(isNewBrowserVal)
    let data = isNewBrowserKye + '=' + escape(isNewBrowserValEn) + '; path=/'
    document.cookie = data
  },
}
export default edCrypt
