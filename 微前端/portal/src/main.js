import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 挂载主项目的 store 实例
Vue.__share_pool__ = Vue.__share_pool__ || {}
Vue.__share_pool__.store = store

// 子项目注册 store module,这里要注意顺序，因为Vue.__share_pool__.store是要在入口项目中注册的（在子项目入口文件执行完之后）
// 所有这里先把每个子项目的store保存到Vue.__share_pool__.childStore中，最后统一在入口项目中注册（这里是否应该区分一开始就全局加载的公共变量和只有当前项目本身
// 才使用的局部变量【麻烦的是只被两到三个项目使用的store】）
const childStores = Vue.__share_pool__.childStores
if (childStores) {
  for (var key in childStores) {
    Vue.__share_pool__.store.registerModule(key, childStores[key])
  }
}

console.log("childStores===>3333", childStores, Vue.__share_pool__.childRoutes)

Vue.config.productionTip = false
// 挂载主项目的 store 和 router 实例
// Reflect.defineProperty(Vue, '__share_pool__', {
//   value: {
//     store,
//     router,
//   },
// });

console.log("Vue.__share_pool__", Vue.__share_pool__)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
