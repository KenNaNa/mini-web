const gatewayUrlDev = 'http://192.168.11.89:8888/'
const frontUri = 'front/pc/main.js'

const envConifg = {
  development: [
    // sub apps
    //这里的顺序决定加载子项目加载顺序(都是异步加载)

    //开发
    './vue3-demo/main.js'
  ],
  production: [
    // sub apps
  ],
}

module.exports = envConifg[process.env.NODE_ENV]
