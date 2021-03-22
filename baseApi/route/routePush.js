
import router from '@/router'
import storage from '@bApi/storage/storageUtil.js'
import store from '@/store'
import modelConfig from '@/systemConfig/modelConfig.js' //子项目namespaced配置

const rp = {
  /**
   * TODO [20190329 xsw] 类似产品详情页这样必须要产品id参数的，考虑使用下面这种路由配置、以及传参方式：
   *  // 直接调用 $router.push 实现携带参数的跳转
   *  this.$router.push({
   *    path: `/orderDetail/${id}`,
   *  })
   *  // 对应路由配置如下：
   *  {
   *    path: '/orderDetail/:id',
   *    name: 'orderDetail',
   *    component: orderDetail
   *  }
   *  // 组件中获取参数的方式：
   *  this.$route.params.id
   */

  /**
   * 跳转封装,通过name，传参方式query
   * @param {*} modelName 模块名
   * @param {*} name 跳转的路由名称
   * @param {*} param 要传递的参数，json对象，如：param = {name:'aaa',id=1154}
   * @param {*} tagName 标签名
   */
  byName (modelName, name, param, tagName) {
    if (modelName !== store.state.route.modelName) {
      store.commit('route/setModelName', modelName)
      storage.set("modelName", modelName)
    }
    let routeName = ''
    if (modelName) {
      routeName = modelConfig[modelName] + '.' + name
    }
    if (name === 'login') {
      router.push({
        name: routeName,
      })
    } else {
      // 路由名
      let thisRoute = null
      for (let k of router.options.routes) {
        if (k.name === modelName) {
          thisRoute = k.children.filter(i => {
            return i.name === routeName
          })
        }
      }
      let item = {
        model: modelName,
        router: name,
        routeName: routeName,
        query: param,
      }
      // 标签
      if (thisRoute.length !== 0) {
        item.keepAlive = thisRoute[0].meta.keepAlive
        if (tagName) {
          item.name = tagName
        } else {
          item.name = thisRoute[0].meta.title
        }
      }
      if (param) {
        store.dispatch('tag/addTag', item).then((data) => {
          storage.set("tagMsg", JSON.stringify(data))
        })
        router.push({
          name: routeName,
          query: param,
        })
      } else {
        item.query = {}
        store.dispatch('tag/addTag', item).then((data) => {
          storage.set("tagMsg", JSON.stringify(data))
        })
        router.push({
          name: routeName,
        })
      }
    }
  },
  /**
   * 跳转封装,通过path，传参方式query
   * @param {*} path url
   * @param {*} param 要传递的参数，json对象，如：param = {name:'aaa',id=1154}
   */
  pushByPath (path, param) {
    if (param) {
      router.push({
        path: path,
        query: param,
      })
    } else {
      router.push({
        path: path,
      })
    }
  },
}

export default rp
