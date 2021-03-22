import axios from 'axios'
import storage from '@bApi/storage/storageUtil.js'
import { headersHandle, addFixedUrlParam } from '@bApi/ajax/baseAjax.js'
import modelConfig from '@/systemConfig/modelConfig.js' //子项目namespaced配置
import rp from '@bApi/route/routePush.js'
import config from '@/config.js' //全局配置常量
import consoleUtils from '@bApi/util/consoleUtils.js' //控制台打印工具
import dateUtil from '@bApi/date/dateUtil.js' //日期工具
import store from '@/store'
import tagUtil from '@bApi/util/tagUtils.js' // 刷新方法
const loginHeaders = {
  'Content-type': 'application/x-www-form-urlencoded',
  Authorization: 'Basic Y2xpZW50XzI6MTIzNDU2',
}

const login = {
  /**
   * 保存/添加 请求
   * @param {*} url
   * @param {*} data 请求体参数
   * @param {*} params url参数
   * @param {*} ignoreError
   */
  login(url, data, params = {}, ignoreError) {
    const Qs = require('qs')
    let promise = new Promise((resolve, reject) => {
      axios({
        method: 'post',
        params: params,
        data: Qs.stringify(data),
        headers: headersHandle(loginHeaders),
        url: addFixedUrlParam(modelConfig.xauth, url),
      })
        .then(res => {
          if (res.status === 200) {
            //设置token项目数据到storage,开启访问令牌刷新定时任务在setLoginData方法中执行
            this.setLoginData(res.data)
            //设置完登陆相关数据后，开启访问令牌刷新定时任务
            this.timingRefreshToken()
            resolve(res)
          } else {
            reject(res)
          }
        })
        .catch(err => {
          reject(err)
        })
    })
    return promise
  },

  /**
   * 登陆后设置登陆数据到Storage中
   * @param {*} data
   */
  setLoginData(data) {
    //设置令牌信息到Storage
    this.setTokenToStorage(data)
    //设置登录用户信息到Storage
    this.setUserInfoToStorage(data)
    return true
  },

  /**
   * 设置登录用户信息到Storage
   * @param {*} data
   */
  setUserInfoToStorage(data) {
    storage.set('dataLoc', data.data_loc)
    storage.set('dataLocName', data.data_loc_name)
    storage.set('loc', data.loc)
    storage.set('locName', data.loc_name)
    storage.set('username', data.username)
    storage.set('userType', data.user_type)
    storage.set('dataRight', data.data_right)
    storage.set('roleId', data.user_role_id)
    // storage.set('loginType', data.loginType)
    if (data.open_id) {
      storage.set('open_id', data.open_id)
    }
    if (data.union_id) {
      storage.set('union_id', data.union_id)
    }
  },

  /**
   * 设置令牌信息到Storage
   * @param {*} data
   */
  setTokenToStorage(data) {
    storage.set('token', data.access_token) //访问令牌
    storage.set('tokenType', data.token_type)
    storage.set('refreshToken', data.refresh_token) //刷新令牌
    storage.set('refreshTokenPeriod', this.getRefreshTokenPeriod()) //设置令牌刷新周期
  },

  /**
   * 刷新令牌Ajax请求
   */
  refreshTokenAjax() {
    let Qs = require('qs')
    let url = 'oauth/token'
    let data = {
      grant_type: 'refresh_token',
      refresh_token: storage.get('refreshToken'),
    }
    let promise = new Promise((resolve, reject) => {
      axios({
        method: 'post',
        data: Qs.stringify(data),
        headers: headersHandle(loginHeaders),
        url: addFixedUrlParam(modelConfig.xauth, url),
      })
      .then(res => {
        if (res.status === 200) {
          let data = res.data
          storage.set('token', data.access_token) //访问令牌
          storage.set('tokenType', data.token_type)
          storage.set('refreshToken', data.refresh_token) //刷新令牌(虽然有效期等主要数据没有变，但是有个ati字段不一样了，所以还是重新设置)
          console.log('令牌已自动刷新')
          resolve(res)
        } else {
          consoleUtils.err('令牌刷新失败:' + res.msg)
          reject(res)
        }
      })
      .catch(err => {
        consoleUtils.err('令牌刷新失败:' + err)
        reject(err)
      })
    })
    return promise
  },

  /**
   * 设置刷新访问令牌的定时器
   */
  timingRefreshToken() {
    let token = storage.get('token') //获取令牌
    let rToken = storage.get('refreshToken') //获取刷新令牌
    if (token && rToken) {
      let tRemainingTime = this.getTokenExp(token)
      if (tRemainingTime < 0) {
        //令牌失效、过期处理
        this.tokenInvalidHandle()
        return false
      } else {
        //访问令牌未过期，设置刷新令牌定时器
        //第一次刷新取当前令牌失效前一定时间刷新（这个时间取自config.js中的配置）
        let timeAfterStartTiming =
          tRemainingTime - config.TOKEN_INVALID_BEFORE_REFRESH_TIME
        timeAfterStartTiming =
          timeAfterStartTiming > 0 ? timeAfterStartTiming : 0
        //获取令牌刷新周期
        let refreshTokenPeriod = storage.get('refreshTokenPeriod')
        setTimeout(() => {
          //注销旧的刷新令牌定时器
          this.clearTiming()
          //刷新令牌方法,因为setInterval设置定时器后，需要等一个周期后才会第一次执行其中的方法，所以这里在setTimeout中先执行一次
          this.refreshToken()
          let refreshTokenTimer = setInterval(() => {
            this.refreshToken()
          }, refreshTokenPeriod)
          //将刷新令牌定时器保存到storage中，以便之后的清除操作
          storage.set('rtTimer', refreshTokenTimer)
        }, timeAfterStartTiming)
      }
    } else {
      return false
    }
  },

  /**
   * 刷新令牌
   */
  refreshToken() {
    let rToken = storage.get('refreshToken') //获取刷新令牌
    let rtRemainingTime = this.getTokenExp(rToken) //获取刷新令牌剩余有效时间
    //TODO??? [xsw] 刷新令牌失效后是否需要更新刷新令牌???
    if (rtRemainingTime <= 0) {
      console.log('刷新令牌已经失效,不在自动刷新令牌')
      return
    }
    let lastUseTime = storage.get('lastUseTime')
    if (lastUseTime) {
      let timeLag = dateUtil.timeLag(lastUseTime)
      if (timeLag >= config.UNUSED_LIFE) {
        //TODO??? [xsw] 这种情况是否要直接做令牌失效出来
        console.log('长时间未进行使用不刷新令牌')
        return
      }
    }
    this.refreshTokenAjax()
  },

  /**
   * TODO??? [xsw] 什么时候需要注销刷新令牌的定时器？ 退出登陆、令牌失效
   * 注销刷新令牌的定时器
   */
  clearTiming() {
    //注销刷新令牌的定时器
    let rtTimer = storage.get('rtTimer')
    if (rtTimer) {
      clearInterval(rtTimer)
      storage.remove('rtTimer')
    }
  },

  /**
   * 访问令牌失效相关处理
   */
  tokenInvalidHandle() {
    //注销令牌刷新定时器
    this.clearTiming()
    //清除storage中的令牌相关数据
    //TODO??? [xsw] 有一些用户相关信息也可以清除?
    storage.remove('token')
    storage.remove('tokenType')
    storage.remove('refreshToken')
    storage.remove('refreshTokenPeriod')
    rp.byName(modelConfig.xauth, 'login')
    // this.$confirm('登陆信息已经过期，是否重新登陆?')
    //   .then(() => {
    //     rp.byName(modelConfig.xauth + '.login')
    //   })
    //   .catch(() => {})
  },

  /**
   * 获取令牌刷新周期，每一次更新访问令牌都要设置一次
   */
  getRefreshTokenPeriod() {
    const token = storage.get('token') //获取令牌
    return this.getTokenExp(token) - config.TOKEN_INVALID_BEFORE_REFRESH_TIME
  },
  /**
   * 获取token的剩余有效时间，为负数表示已经过期（时间戳以13位计算）
   * @param {*} token 令牌
   */
  getTokenExp(token) {
    var jwt = require('jsonwebtoken')
    const tokenObj = jwt.decode(token)
    if (!tokenObj) {
      return -1
    }
    const exp = tokenObj.exp * 1000
    const now_date = Date.parse(new Date())
    const tRemainingTime = exp - now_date
    return tRemainingTime
  },
  //退出登录
  logOut() {
    this.clearTiming()
    storage.clear() // 清除所有缓存
    storage.remove('dataLoc')
    storage.remove('dataLocName')
    storage.remove('loc')
    storage.remove('locName')
    storage.remove('username')
    storage.remove('dataRight')
    storage.remove('token')
    storage.remove('tokenType')
    storage.remove('refreshToken')
    storage.remove('refreshTokenPeriod')
    storage.remove('tagMsg')
    storage.remove('roleId')

    store.dispatch('tag/delAllOpenedTags')
    store.dispatch('tag/delAllCachedViews')
    rp.byName(modelConfig.xauth, 'login')
    // let promise = new Promise( (resolve, reject) => {
    //   this.$_get(this.modelName,'oauth/revoke_token')
    //     .then(res => {
    //       if (res.status === 200) {
    //         //删除
    //         this.clearTiming()
    //         storage.remove('dataLoc')
    //         storage.remove('loc')
    //         storage.remove('username')
    //         storage.remove('dataRight')
    //         storage.remove('token')
    //         storage.remove('tokenType')
    //         storage.remove('refreshToken')
    //         storage.remove('refreshTokenPeriod')
    //         rp.byName(modelConfig.xauth, 'login')
    //         resolve(res)
    //       } else {
    //         reject(res)
    //       }
    //     }).catch( err => {
    //       this.$_consoleUtils.err(err)
    //       this.$message.error('[' + err.status + ']' + err.msg)
    //       reject(err)
    //     })
    // })
    // return promise
  },
  deleteTags() {
    storage.remove('tagMsg')
    store.dispatch('tag/delAllOpenedTags')
    store.dispatch('tag/delAllCachedViews')
  },
  /**
   * 切换用户，根据用户名+角色 ID 存储用户信息
   * @param {*} val 当前选中标签页面
   * @author yjn
   * @time 2020.7.29
   * @example this.$_login.saveUserRoleInfo(val)
   */
  saveUserRoleInfo(val) {
    // 根据用户名角色存储用户信息
    let userRole = storage.get('username') + storage.get('roleId')
    let pageInfo = storage.get(userRole)
    if (pageInfo) {
      if (pageInfo.userRole == userRole) {
        rp.byName(pageInfo.model, pageInfo.router, pageInfo.query)
        tagUtil.refresh(
          pageInfo.model,
          pageInfo.router,
          pageInfo.path,
          pageInfo.query,
        )
      } else {
        this.toWelcomePage()
      }
    } else {
      this.toWelcomePage()
    }
    store.commit('globalRefresh/refreshUrl', true)
  },
  /**
   * 封装跳转到欢迎页的方法
   */
  toWelcomePage() {
    rp.byName(modelConfig.xframe, 'index')
  },
  saveUserInfo(val) {
    let userRole = storage.get('username') + storage.get('roleId')
    Object.assign(val, {
      userRole: userRole,
    })
    storage.set(userRole, val)
  },
  /**
   * 驼峰转成下划线
   * @param {*} name 参数的名称
   */
  toLowerCaseLine(name) {
    return name.replace(/([A-Z])/g, '_$1').toLowerCase()
  },
}

export default login
