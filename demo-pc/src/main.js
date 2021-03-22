import Vue from 'vue'
import routes from './router'
import store from './store'
Vue.__share_pool__.router.addRoutes(routes)
Vue.__share_pool__.store.registerModule(MODEL_NAME, store)


