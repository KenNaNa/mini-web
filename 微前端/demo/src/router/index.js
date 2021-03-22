// 将子项目的路由暴露给 Vue.__share_pool__ 共享池

import App from '../App.vue'
const APP_NAME = require('../../package.json').name
const Hello = () => import('../pages/hello.vue')
console.log("APP", App)
export default [{
  path: `/${APP_NAME}`,
  name: APP_NAME,
  component: App,
  children: [
    {
      path: 'hello',
      name: `${APP_NAME}.hello`,
      component: Hello,
      meta: {
        title: 'hello 微前端'
      }
    }
  ],
}]
