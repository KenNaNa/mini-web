/**
 * 深拷贝方法
 * TODO yjn
 * initalObj 初始对象
 * finalObj 深拷贝之后的对象
 * var str = {};
   var obj = { a: {a: "hello", b: "world"} };
   this.$_deepCloneUtil.deepClone(obj, str);
 * 
 */
/**
 * 深拷贝对象数组方法
 * TODO xjg
 * source 需要深拷贝的对象数组
 * var objArr = {};
   objArr = this.$_deepCloneUtil.objDeepCopy(需要深拷贝的对象数组)
 * 
 */
/**
 * 深拷贝对象
 * TODO xjg
 * obj 需要深拷贝的对象
 * var obj = {};
   obj = this.$_deepCloneUtil.deepClone(需要深拷贝的对象)
 * 
 */
const deepCloneUtil = {
  deepClone(initalObj, finalObj) {
    var obj = finalObj || {}
    for (var i in initalObj) {
      var prop = initalObj[i] // 避免相互引用对象导致死循环，如initalObj.a = initalObj的情况
      if (prop === obj) {
        continue
      }
      if (Object.prototype.toString.call(prop) === '[object Object]') {
        obj[i] = prop.constructor === Array ? [] : Object.create(prop)
      } else {
        obj[i] = prop
      }
    }
    return obj
  },
  // 深拷贝对象数组
  objDeepCopy(source) {
    var sourceCopy = source instanceof Array ? [] : {}
    for (var item in source) {
      sourceCopy[item] =
        typeof source[item] === 'object'
          ? this.objDeepCopy(source[item])
          : source[item]
    }
    return sourceCopy
  },
  // 深拷贝对象           
  deepClone(obj) {
    let objClone = Array.isArray(obj) ? [] : {}
    if (obj && typeof obj === 'object') {
      for (let key in obj) {
        if (obj[key] && typeof obj[key] === 'object') {
          objClone[key] = this.deepClone(obj[key])
        } else {
          objClone[key] = obj[key]
        }
      }
    }
    return objClone
  },
}

export default deepCloneUtil
