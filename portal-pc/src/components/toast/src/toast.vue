<template>
  <transition name="alert-fade">
    <div id="toast"
         v-show="visible"
         class="dialog-tips dialog-center">
      {{message}}
    </div>
  </transition>
</template>
<script>
export default {
  data () {
    return {
      visible: false,
      message: ''
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../scss/toast.scss';
</style>