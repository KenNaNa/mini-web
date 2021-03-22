<template>
  <button
    :align="align"
    :class="[rippleBtn, 'ripple-large-btn-' + size, type ? 'ripple-large-btn-' + type : '', floatnav ? 'ripple-large-btn-floatnav':'', isDisabled ? 'is-not-allowed': '']"
    :disabled="isDisabled"
    :type="nativeType"
    @click="handleClick"
    v-show="value != ''"
  >
    {{ value }}
    <canvas @click="ripple" class="ripple-large-ripple"></canvas>
    <slot></slot>
  </button>
</template>

<script>
import domUtils from '@bApi/util/domUtils.js'

export default {
  name: 'kRippleLargeButton',
  props: {
    // 水波纹的速度
    speed: {
      type: Number,
      default: 3,
    },
    // 透明度
    opacity: {
      type: Number,
      default: 0.4,
    },
    /* 按钮的类型
       默认为普通按钮，button
       可选 submit / reset
    */
    nativeType: {
      type: String,
      default: 'button',
    },
    // 按钮上的文本
    value: {
      type: String,
      default: '',
    },
    /* 
      size 封装按钮的大小
      small 小号
      medium 默认按钮
      large 大号按钮
    */

    size: {
      type: String,
      default: 'medium',
    },
    // 居右显示
    align: {
      type: String,
      default: 'left',
    },
    /*
      按钮的类型
      type
      default 默认按钮
      success 成功按钮
      primary 原始
      info 信息按钮
      danger 危险按钮
      warning 警告按钮
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
      rippleBtn: 'ripple-large-btn-',
    }
  },
  methods: {
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
    // 分发事件
    handleClick(event) {
      this.$emit('click', event)
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
@import '../scss/kRippleLargeButton.scss';
</style>
