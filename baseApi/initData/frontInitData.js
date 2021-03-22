//纯前端初始化的一些通用操作
const frontInitData = {
  listInit(v, currentStorage) {
    let initType = v.$route.query.init //初始化类型
    // initType为1时，代表重新初始化，不加载之前的搜索条件
    if (initType != 1) {
      //初始化查询条件，取上一次查询的条件
      let sp = currentStorage.get(`${v.$options.name}.sp`)
      if (sp) {
        Object.assign(v.searchParams, sp)
        Object.assign(v.pageForm, v.searchParams)
      }
    }
    //初始化查询结果组件数据中的查询条件数据
    if(v.ufd && v.searchResultParam){
      v.searchResultParam = {
        dataInfo: v.searchParams,
        // TODO 待解决
      }
    }
  },
}

export default frontInitData
