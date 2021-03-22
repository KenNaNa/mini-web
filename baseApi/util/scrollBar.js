import Vue from 'vue'
//插件的包
import PerfectScrollbar from 'perfect-scrollbar';
//对应的css
import "perfect-scrollbar/css/perfect-scrollbar.css";

/**
 * @description 自动判断该更新PerfectScrollbar还是创建它
 * @param {HTMLElement} el - 必填。dom元素
 */

const el_scrollBar = (el) => {
  if (el._ps_ instanceof PerfectScrollbar) {
    el._ps_.update()
  } else {
    //加属性
    el._ps_ = new PerfectScrollbar(el);
  }
}

//  添加自定义指令
Vue.directive("scrollBar", {
  // inserted钩子函数，获取自定义指令处的dom
  inserted (el, binding, vnode) {
    // 为了配合element的table组件 在这里需要判断一下并给定类
    const { arg } = binding;
    if (arg === "elTable") {
      el = el.querySelector(".el-table__body-wrapper");
      if (!el) {
        return console.warn("未发现className为el-table__body-wrapper的dom");
      }
    }
    //判断其样式是否存在position 并且position为"fixed", "absolute"或"relative"
    const rules = ["fixed", "absolute", "relative"];
    if (!rules.includes(window.getComputedStyle(el, null).position)) {
      console.error(`perfect-scrollbar所在的容器的position属性必须是以下之一：${rules.join("、")}`)
    }
    //el上挂一份属性
    el_scrollBar(el);
  },
  // 更新dom的时候
  componentUpdated (el, binding, vnode, oldVnode) {
    const { arg } = binding;
    if (arg === "elTable") {
      el = el.querySelector(".el-table__body-wrapper");
      if (!el) {
        return console.warn("未发现className为el-table__body-wrapper的dom");
      }
    }
    vnode.context.$nextTick(
      () => {
        try {
          el_scrollBar(el);
        } catch (error) {
          console.error(error);
        }
      }
    )
  }
})