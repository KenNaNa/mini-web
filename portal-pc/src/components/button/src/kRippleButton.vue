<template>
  <button
    :class="[rippleBtn, 'ripple-btn-' + size, type ? 'ripple-btn-' + type : '', floatnav ? 'ripple-btn-floatnav':'', isDisabled ? 'is-not-allowed': '']"
    :disabled="isDisabled"
    :type="nativeType"
    @click="handleClick"
    v-show="value != ''"
  >
    {{ value }}
    <canvas @click="ripple" class="ripple-ripple"></canvas>
    <slot></slot>
  </button>
</template>

<script>
import domUtils from '@bApi/util/domUtils.js'

export default {
  name: 'kRippleButton',
  props: {
    // 水波纹的速度
    speed: {
      type: Number,
      default: 3,
    },
    /* 透明度 */
    opacity: {
      type: Number,
      default: 0.4,
    },
    /* 按钮的类型
      默认是 button类型
      可选 submit / reset

    */
    nativeType: {
      type: String,
      default: 'button',
    },
    /* 按钮的字体 */
    value: {
      type: String,
      default: '',
    },
    /* 按钮的大小
       默认 'medium'
       mini: 迷你按钮
       small: 小号按钮
       navigation: 头部
       large： 大号按钮
       float: 浮动导航内部按钮
    */
    size: {
      type: String,
      default: 'medium',
    },
    /* 传入的icon 图标 */
    icon: {
      type: Boolean,
      default: false,
    },
    /*
      按钮的类型
      default 默认样式
      danger 危险
      success 成功
      info 信息
      primary 原始
      warning 警告

    */
    type: {
      type: String,
      default: 'default',
    },

    floatnav: {
      type: Boolean,
      default: false,
    },

    // 是否禁用
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      color: '',
      radius: 0,
      oCanvas: null,
      context: null,
      initialized: false,
      speedOpacity: 0,
      timer: null,
      origin: {},
      rippleBtn: 'ripple-btn-',
    }
  },
  methods: {
    // 点击按钮分发事件
    handleClick(evt) {
      this.$emit('click', evt)
    },
    init(el) {
      const oBtn = el.parentElement
      this.color = domUtils.getStyle(el.parentElement, 'color')
      const w = domUtils.getStyleNumber(oBtn, 'width')
      // 透明度的速度
      this.speedOpacity = (this.speed / w) * this.opacity
      // canvas 宽和高
      el.width = w
      el.height = domUtils.getStyleNumber(oBtn, 'height')
      this.context = el.getContext('2d')
    },
    ripple(event) {
      if (this.isDisabled) {
        return false
      }
      // 清除上次没有执行的动画
      if (this.timer) {
        window.cancelAnimationFrame(this.timer)
      }
      this.el = event.target
      // 执行初始化
      if (!this.initialized) {
        this.initialized = true
        this.init(this.el)
      }
      this.radius = 0
      // 点击坐标原点
      this.origin.x = event.offsetX
      this.origin.y = event.offsetY
      this.context.clearRect(0, 0, this.el.width, this.el.height)
      this.el.style.opacity = this.opacity
      this.draw()
    },
    draw() {
      this.context.beginPath()
      // 绘制波纹
      this.context.arc(
        this.origin.x,
        this.origin.y,
        this.radius,
        0,
        2 * Math.PI,
        false,
      )
      this.context.fillStyle = this.color
      this.context.fill()
      // 定义下次的绘制半径和透明度
      this.radius += this.speed
      this.el.style.opacity -= this.speedOpacity
      // 通过判断半径小于元素宽度或者还有透明度，不断绘制圆形
      if (this.radius < this.el.width || this.el.style.opacity > 0) {
        this.timer = window.requestAnimationFrame(this.draw)
      } else {
        // 清除画布
        this.context.clearRect(0, 0, this.el.width, this.el.height)
        this.el.style.opacity = 0
      }
    },
  },
  destroyed() {
    // 清除上次没有执行的动画
    if (this.timer) {
      window.cancelAnimationFrame(this.timer)
      this.timer = null
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../scss/kRippleButton.scss';
</style>
