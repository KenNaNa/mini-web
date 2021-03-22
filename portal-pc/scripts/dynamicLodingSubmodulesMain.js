// 动态加载子模块的 main.js
// 需要传递模块依赖链接
function insertAfter(newElement, targetElement) {
  var parent = targetElement.parentNode
  if (parent.lastChild == targetElement) {
    parent.appendChild(newElement)
  } else {
    parent.insertBefore(newElement, targetElement.nextSibling)
  }
}
export default function dynamicLodingSubmodulesMain(url) {
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.type = 'text/javascript' // 设置类型
    script.async = true // 设置异步加载
    script.src = url // 赋值 url
    const target = document.body.querySelector('#app')
    insertAfter(script, target)

    resolve(true)
  })
}
