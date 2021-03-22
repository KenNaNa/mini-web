import { createRouter, createWebHashHistory } from 'vue-router'
import loadScript from '../../scripts/dynamicLodingSubmodulesMain'
import modules from '../../config/proxy'
const routes = []


const router = createRouter({
  history: createWebHashHistory(),
  base: process.env.BASE_URL,
  routes
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

export default router
