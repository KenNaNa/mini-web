import App from './App'
import routes from './router'
import store from './store'
const app = window.app
app.__share_pool__.router.addRoutes(routes)
app.__share_pool__.store.registerModule(MODEL_NAME, store)

console.log("app.__share_pool__", app.__share_pool__)
