import Vue from 'vue'
import VueRouter from 'vue-router'
import loadScript from '../../scripts/dynamicLodingSubmodulesMain'
import modules from '../../config/proxy'

Vue.use(VueRouter)

const routes = []

const router = new VueRouter({
  mode: 'hash', // 这里必须是 hash ,不然访问不了
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  console.log(to, from)
  const module = to.path.split('/')[1]
  let moduleKey = '/' + module + '/'
  if (Reflect.has(modules, moduleKey)) {
    let url = '.' + moduleKey + 'main.js'
    loadScript(url).then(() => {
      next()
    })
    
  }
})

// 监听路由

export default router
