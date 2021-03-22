/*
  YJN
  刷新当前页面方法
  使用方法：
  使用的地方：this.reload() 方法
*/
let reloadMethods = {
  methods: {
    reload() {
      let xname = this.$route.name.substring(0, this.$route.name.indexOf('.'))
      this.$router.replace({
        name: xname + '.redirect',
        query: {
          path: this.$route.path,
          query: this.$route.query,
        },
      })
    },
  }
}

export default reloadMethods