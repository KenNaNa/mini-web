/**
 * xsw [190517]
 * utils.js  中包括jsonObj、array的操作方法
 */
const util = {
  /**
   * 不双向绑定变量的复制对象
   * @param {*} val
   */
  getCopyObj(val) {
    // let copy = {}
    // return Object.assign(copy, val)
    return JSON.parse(JSON.stringify(val))
  },

  /**
   * 断言obj的数据类型是否和传入的type相同
   * @param {*} obj
   * @param {*} type  包括的值：Array、Object、Number、String、Date、RegExp、Null、Undefined、BigInt、Symbol、 Boolean
   * return 相同则返回true
   */
  assertType(obj, type) {
    let objType = this.getTypeof(obj)
    return type === objType
  },

  /**
   * 获取obj的数据类型
   * @param {*} obj
   * return 返回对应数据类型字符串，未知的数据类型则返回:false
   */
  getTypeof(obj) {
    let type = Object.prototype.toString.call(obj)
    switch (type) {
      case '[object Array]':
        return 'Array'
      case '[object Object]':
        return 'Object'
      case '[object Number]':
        return 'Number'
      case '[object String]':
        return 'String'
      case '[object Date]':
        return 'Date'
      case '[object RegExp]':
        return 'RegExp'
      case '[object Null]':
        return 'Null'
      case '[object Undefined]':
        return 'Undefined'
      case '[object BigInt]':
        return 'BigInt'
      case '[object Symbol]':
        return 'Symbol'
      case '[object Boolean]':
        return 'Boolean'
      default:
        return false
    }
  },

  //array相关 start
  /**
   * 删除数组中的指定元素
   * @param {*} array 数组
   * @param {*} ele 要删除的元素
   */
  delAssignEle(array, ele) {
    let index = array.indexOf(ele)
    if (index > -1) {
      array.splice(index, 1)
      return true
    }
    return false
  },
  /**
   * 判断数组是否为空
   * @param {*} value
   */
  isArrayEmpty(value) {
    return (
      !value ||
      (Array.isArray(value) && value.length === 0) ||
      (Object.prototype.isPrototypeOf(value) && Object.keys(value).length === 0)
    )
  },
  /**
   * 获取对象类型数组中指定的对象属性的对应数组元素的下标
   * 如获取:  下列数组中name='a'的元素的下标, array = [{name:'a'},{name:'b'}]
   *          getObjArrayIndex(array, 'name', 'a')
   * @param {*} array
   * @param {*} keyName
   * @param {*} keyValue
   */
  getObjArrayIndex(array, keyName, keyValue) {
    if (array) {
      let index = array
        .map(item => {
          return item[keyName]
        })
        .indexOf(keyValue)
      return index
    }
    return -1
  },
  //array相关 end

  // json OBJ (map) start
  /**
   * 判断json对象是否为空
   * @param {*} obj
   */
  isEmptyObject(obj) {
    if (!obj) {
      return true
    }
    for (var key in obj) {
      return false
    }
    return true
  },
  // json OBJ (map) end

  // 判断字符是否为空的方法
  isEmpty(obj) {
    if (typeof obj == 'undefined' || obj == null || obj == '') {
      if(obj === 0) {
        return false
      }
      return true
    } else {
      return false
    }
  },

  isPhone() {
    var sUserAgent = navigator.userAgent.toLowerCase(),
      bIsIpad = sUserAgent.match(/ipad/i) == 'ipad',
      bIsIphoneOs = sUserAgent.match(/iphone os/i) == 'iphone os',
      bIsMidp = sUserAgent.match(/midp/i) == 'midp',
      bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == 'rv:1.2.3.4',
      bIsUc = sUserAgent.match(/ucweb/i) == 'ucweb',
      bIsAndroid = sUserAgent.match(/android/i) == 'android',
      bIsCE = sUserAgent.match(/windows ce/i) == 'windows ce',
      bIsWM = sUserAgent.match(/windows mobile/i) == 'windows mobile',
      bIsMS = sUserAgent.match(/mobile safari/i) == 'mobile safari'
    // 当前为电脑网站，如果是手机访问者跳转到手机网站中
    if (
      (bIsIpad ||
        bIsIphoneOs ||
        bIsMidp ||
        bIsUc7 ||
        bIsUc ||
        bIsAndroid ||
        bIsCE ||
        bIsWM ||
        bIsMS) &&
      '<%=redirectDomain %>' != ''
    ) {
      return true
    } else {
      return false
    }
  },

  /**
   * 如果dest中存在src同名属性，则将src中对应值赋值给dest中属性
   */
  copy(src, dest) {
    if (!src || !dest) {
      return
    }
    for (var key in src) {
      if (dest[key] !== undefined) {
        dest[key] = src[key]
      }
    }
  },
  copyObj2Obj(obj1, obj2) {
    for (var key in obj2) {
      obj1[key] = obj2[key]
    }
  },

  href(uri, router) {
    let base = router ? router.options.base : ''
    if (base.length > 0 && base.substr(0, 1) !== '/') {
      base = '/' + base
    }
    console.log(base.substr(base.length - 1, 1))
    console.log(uri.substr(0, 1))
    const uriFlag = uri.substr(0, 1) === '/'
    if (base.substr(base.length - 1, 1) === '/') {
      if (uriFlag) {
        base = base.substr(0, base.length - 1)
      }
    } else if (!uriFlag) {
      base = base + '/'
    }
    location.href = base + uri
  },
}
export default util
