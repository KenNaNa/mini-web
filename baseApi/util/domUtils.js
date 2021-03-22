const domUtils = {
  /**
   * 查找指定名称的父级组件后，触发自定义事件
   * @param {*} componentName 父级组件名称
   * @param {*} eventName //自定义事件名称
   * @param {*} params //参数
   */
  dispatch(vc, componentName, eventName, params) {
    var parent = vc.$parent || vc.$root
    if (!parent) {
      return
    }
    var name = parent.$options.componentName
    while (parent && (!name || name !== componentName)) {
      parent = parent.$parent
      if (parent) {
        name = parent.$options.componentName
      }
    }
    if (parent) {
      parent.$emit.apply(parent, [eventName].concat(params))
    }
  },
  /**
   * 根据属性，获取元素的样式值
   * @param el  元素
   * @param attr 属性
   * @param pseudoClass 元素伪类
   * @returns {*}
   */
  getStyle(el, attr, pseudoClass = null) {
    return window.getComputedStyle(el, pseudoClass)[attr]
  },

  /**
   * 获取属性，并且属性值是数字，而不是字符串
   * @param el 元素
   * @param attr 属性
   * @param pseudoClass 元素伪类
   * @returns {Number}
   */
  getStyleNumber(el, attr, pseudoClass = null) {
    try {
      const val = this.getStyle(el, attr, pseudoClass)
      return parseFloat(val)
    } catch (e) {
      console.error(e)
    }
  },
}
export default domUtils
