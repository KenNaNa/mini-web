<template>
  <div>
    <span class="common-class">hello 微前端</span>
    <fy-ripple-button value="确定" @click="click"></fy-ripple-button>
    <fy-ripple-large-button value="取消"></fy-ripple-large-button>
  </div>
</template>

<script>
export default {
  name: 'hello',
  methods: {
    click() {
      this.$toast('加载中')
    }
  }
}
</script>