import Vue from 'vue'
import routes from './router'
import store from './store'
const APP_NAME = require('../package.json').name
const sharePool = (Vue.__share_pool__ = Vue.__share_pool__ || {})
const childRoutes = (sharePool.childRoutes = sharePool.childRoutes || {})
const childStores = (sharePool.childStores = sharePool.childStores || {})

childStores[APP_NAME] = store
childRoutes[APP_NAME] = routes

console.log("routes====>", routes)


