import store from '@/store'
import router from '@/router'
/**
  * 操作成功后刷新页面 
  * @param {*} modelName   //模块名
  *  @param {*} optionName   //组件名
  *  @param {*} path   //路由路径
  *  @param {*} query   //路由参数
  *  //添加成功后返回并关闭标签页，刷新页面
         this.$store
           .dispatch('tag/closeOpendedTag', this.$options.name)  //this.$options.name当前要关闭的标签组件name
           .then(() => {
             XM.rp.byName(
               'eventBranchList',
               {
                 eventBranchId: this.$route.query.eventBranchId,
                 operation: true,
               },
               this.branchName,
             )
              this.$_tagUtil.refresh('xfinance','paymentApp',this.$route.path,this.$route.query)
           })
  **/
const tagUtil = {
  refresh(modelName, optionName, path, query) {
    store.dispatch('tag/delCachedPage', optionName).then(cachedViews => {
      router.replace({
        name: modelName + '.redirect',
        query: {
          path: path,
          query: query,
          optionName: optionName,
        },
      })
    })
  },
}

export default tagUtil