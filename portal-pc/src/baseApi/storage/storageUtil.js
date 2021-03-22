import Vue from 'vue'
import Vue2Storage from 'vue2-storage'

/**
 * 以下的options指模式参数：包含下列属性：
 * prefix ： a string that will be added to the beginning of the key to avoid collisions. Default is an app_.
 * driver ： the identifier of the storage used. While values are supported local, session and memory (localStorage, sessionStorage and * memoryStorage respectively). Default is an local.
 * ttl ： record lifetime in seconds. Default is an 60 * 60 * 24 * 1000 // 24 hours.
 *
 * 注意:
 *      1.有前缀的概念(prefix),该js中的所有方法都是针对这个前缀下的key操作
 *      2.方法带有 P 后缀的代表permanent模式操作、 S 后缀的代表session模式操作、 不带后缀的代表默认模式操作（即defaultOptions的对应值，如当前默认模式
 *        为local）
 *
 */
//当前options字段
let prefix = 'local_'
  // driver = 'local',
  // ttl = 1000 * 60 * 60 * 24 // 24 hours

//local模式：存在localStorage中的数据，会在每次新开浏览器时删除
const optionsL = {
  prefix: 'local_',
  driver: 'local',
  ttl: 1000 * 60 * 60 * 24, // 24 hours
}
//permanent模式：存在localStorage中的数据，不会在每次新开浏览器时删除
const optionsP = {
  prefix: 'permanent_',
  driver: 'local',
  ttl: 1000 * 60 * 60 * 24 * 10, // 24 hours
}
//session模式：存在sessionStorage中的数据
const optionsS = {
  prefix: 'session_',
  driver: 'session',
  ttl: 1000 * 60 * 60 * 24, // 24 hours
}
//TODO [xsw] 切换项目需修改???
//默认模式，当前设置为local模式,到小程序项目可能要切换session
const defaultOptions = optionsL

Vue.use(Vue2Storage, defaultOptions)
const storage = Vue.$storage
/**
 * 注意
 */
const storageUtil = {
  //默认模式操作，即local模式
  /**
   * 设置值到localStorage
   * @param {*} key
   * @param {*} value
   * @param {*} expires 有效时间（单位秒）,没有时间限制的话不传,默认setOptions中设置的ttl
   */
  set(key, value, expires = '', modelName) {
    let modelKey = modelName ? modelName + '_' + key : key
    if (!modelKey) {
      return
    }
    storage.remove(modelKey)
    if (expires) {
      storage.set(modelKey, value, expires)
    } else {
      storage.set(modelKey, value)
    }
  },
  /**
   * 获取localStorage中的值
   * 返回为null代表过期或是没有值
   * @param {*} key
   */
  get(key, defaultVal = '', modelName) {
    let modelKey = modelName ? modelName + '_' + key : key
    if (!modelKey) {
      return defaultVal
    }
    return storage.get(modelKey, defaultVal)
  },
  /**
   * 获取当前前缀下的所有key值
   * @param {*} isOnlyPrefix 是否只取当前前缀（prefix）的key?
   * return Array<string>
   */
  getKeys(isOnlyPrefix = true, modelName) {
    if (isOnlyPrefix) {
      let keys = storage.keys()
      return keys.filter(item => {
        return item.indexOf(prefix + modelName) == 0
      })
    } else {
      return storage.keys()
    }
  },
  /**
   * 指定key是否存在
   * @param {*} key
   */
  isExistKey(key, modelName) {
    let modelKey = modelName ? modelName + '_' + key : key
    return storage.has(modelKey)
  },
  /**
   * 清除指定key
   * @param {*} key
   */
  remove(key, modelName) {
    let modelKey = modelName ? modelName + '_' + key : key
    storage.remove(modelKey)
  },
  /**
   * 清除所有
   */
  clear() {
    storage.clear()
  },
  /**
   * 返回存储库中的键的数量
   * Return Number
   */
  size() {
    return storage.length()
  },

  //permanent模式操作
  setP(modelName, key, value, expires = '') {
    //storage模式设置为permanent
    this.setOptions(optionsP)
    this.set(modelName, key, value, expires)
    //storage模式设置回默认的local模式
    this.setOptions(defaultOptions)
  },
  getP(modelName, key, defaultVal = '') {
    //storage模式设置为permanent
    this.setOptions(optionsP)
    let val = this.get(modelName, key, defaultVal)
    //storage模式设置回默认的local模式
    this.setOptions(defaultOptions)
    return val
  },
  getKeysP(isOnlyPrefix = true, modelName) {
    this.setOptions(optionsP)
    let ksys = this.getKeys(isOnlyPrefix, modelName)
    this.setOptions(defaultOptions)
    return ksys
  },
  isExistKeyP(modelName, key) {
    this.setOptions(optionsP)
    let bool = storage.has(modelName, key)
    this.setOptions(defaultOptions)
    return bool
  },
  removeP(modelName, key) {
    this.setOptions(optionsP)
    storage.remove(modelName, key)
    this.setOptions(defaultOptions)
  },
  clearP() {
    this.setOptions(optionsP)
    storage.clear()
    this.setOptions(defaultOptions)
  },
  sizeP() {
    this.setOptions(optionsP)
    let length = storage.length()
    this.setOptions(defaultOptions)
    return length
  },

  //session模式操作
  setS(modelName, key, value, expires = '') {
    //storage模式设置为permanent
    this.setOptions(optionsS)
    this.set(modelName, key, value, expires)
    //storage模式设置回默认的local模式
    this.setOptions(defaultOptions)
  },
  getS(modelName, key, defaultVal = '') {
    //storage模式设置为permanent
    this.setOptions(optionsS)
    let val = this.get(modelName, key, defaultVal)
    //storage模式设置回默认的local模式
    this.setOptions(defaultOptions)
    return val
  },
  getKeysS(isOnlyPrefix, modelName) {
    this.setOptions(optionsS)
    let ksys = this.getKeys(isOnlyPrefix, modelName)
    this.setOptions(defaultOptions)
    return ksys
  },
  isExistKeyS(modelName, key) {
    this.setOptions(optionsS)
    let bool = storage.has(modelName, key)
    this.setOptions(defaultOptions)
    return bool
  },
  removeS(modelName, key) {
    this.setOptions(optionsS)
    storage.remove(modelName, key)
    this.setOptions(defaultOptions)
  },
  clearS() {
    this.setOptions(optionsS)
    storage.clear()
    this.setOptions(defaultOptions)
  },
  sizeS() {
    this.setOptions(optionsS)
    let length = storage.length()
    this.setOptions(defaultOptions)
    return length
  },

  /**
   * 设置storage的Options
   * @param {*} options
   */
  setOptions(options) {
    // prefix = options.prefix
    // driver = options.driver
    // ttl = options.ttl
    storage.setOptions(options)
  },
}

export default storageUtil
