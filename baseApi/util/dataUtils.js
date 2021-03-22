import storage from '@bApi/storage/storageUtil.js'

/**
 * 获取常用数据的快捷工具js
 */
const dataUtils = {
  /**
   * 获取当前登录用户的用户名
   */
  getLoginUsername() {
    return storage.get('username')
  },
  /**
   * 获取当前登录用户的部门边界
   */
  getLoginUserLoc() {
    return storage.get('loc')
  },
  /**
   * 获取当前登录用户的部门边界名称
   */
  getLoginUserLocName() {
    return storage.get('locName')
  },
  /**
   * 获取当前登录用户的数据边界
   */
  getLoginUserDataLoc() {
    return storage.get('dataLoc')
  },
  /**
   * 获取当前登录用户的数据边界名称
   */
  getLoginUserDataLocName() {
    return storage.get('dataLocName')
  },

  /**
   * 获取微信登录code
   */
  getLoginWXCode() {
    return storage.get('code')
  },
  
  /**
   * 获取微信登录open_id
   */
  getLoginWXOpenId() {
    return storage.get('open_id')
  },

  /**
   * 获取微信登录union_id
   */
  getLoginWXUnionId() {
    return storage.get('union_id')
  },

}
export default dataUtils
