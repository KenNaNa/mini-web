import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/kdemo'
  }
]

const childRoutes = Vue.__share_pool__.childRoutes
console.log('childRoutes', childRoutes)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: Object.values(childRoutes).reduce(
    (acc, prev) => acc.concat(prev),
    routes,
  )
})

// console.log("router", router)
// console.log(Object.values(childRoutes).reduce(
//   (acc, prev) => acc.concat(prev),
//   routes,
// ))
export default router
