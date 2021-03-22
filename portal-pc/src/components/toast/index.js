import Toast from './src/toast.vue'
const toast = {}
toast.install = Vue => {
    // 扩展 vue 插件
    const ToastCon = Vue.extend(Toast)
    const ins = new ToastCon()
    // 挂载 dom
    ins.$mount(document.createElement('div'))
    // 添加到 body 后面
    document.body.appendChild(ins.$el)
    // 给 vue 原型添加 toast 方法
    Vue.prototype.$toast = (msg, options = {duration:800, direction: 'top'}) => {
        // 我们调用的时候 赋值 message
        // 将 visible 设置为 true
        // 默认 3s 之后 设置 为 false 关闭 toast
        return new Promise((resolve)=>{
            if(options.direction === 'bottom') {
                ins.$el.style.top = '95%'
            }
            if(options.direction === 'center') {
                ins.$el.style.top = "50%"
            }
            ins.message = msg
            ins.visible = true
            setTimeout(() => {
                ins.visible = false
            }, options.duration)

            resolve(true)
        })
    }
}
export default toast