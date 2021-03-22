import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 挂载主项目的 store 实例

const app = createApp(App)

Reflect.set(app, '__share__pool_', {
  store,
  router,
})

window.app = app
app.use(store).use(router).mount('#app')
