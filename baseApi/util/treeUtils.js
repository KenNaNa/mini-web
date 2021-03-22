/**
 * xsw
 * tree、部门loc相关方法
 * 下面的tree、loc都是字符串类型
 */

 //平台边界路径层数
const PLATFORM_LOC_LEVEL = 1
//集团边界路径层数
const GROUP_LOC_LEVEL = 2
//公司边界路径层数
const COMPANY_LOC_LEVEL = 3
//tree分隔符
const TREE_SEPARATOR = '.'

const treeUtils = {
  /**
   * 判断tree是否为根节点
   * @param {*} tree
   * return true 是，false 不是
   */
  isRoot(tree) {
    return this.level(tree) == 1
  },

  /**
   * 判断边界是否为平台边界
   * @param {*} loc
   * return true 是，false 不是
   */
  isPlatformLoc(loc) {
    return this.isRoot(loc)
  },

  /**
   * 判断边界是否为集团边界
   * @param {*} loc
   * return true 是，false 不是
   */
  isGroupLoc(loc) {
    return this.level(loc) == GROUP_LOC_LEVEL
  },

  /**
   * 判断边界是否为公司边界
   * @param {*} loc
   * return true 是，false 不是
   */
  isCompanyLoc(loc) {
    return this.level(loc) == COMPANY_LOC_LEVEL
  },

  /**
   * 判断边界是否为部门边界
   * @param {*} loc
   * return true 是，false 不是
   */
  isDepartmentLoc(loc) {
    return this.level(loc) > COMPANY_LOC_LEVEL
  },

  /**
   * 根据传入的边界获取平台边界
   * @param {*} loc
   * return 平台边界
   */
  getPlatformLoc(loc) {
    return this.getIndex(loc, PLATFORM_LOC_LEVEL)
  },

  /**
   * 根据传入的边界获取集团边界
   * @param {*} loc
   * return 平台边界
   */
  getGroupLoc(loc) {
    return this.getIndex(loc, GROUP_LOC_LEVEL)
  },

  /**
   * 根据传入的边界获取公司边界
   * @param {*} loc
   * return 平台边界
   */
  getCompanyLoc(loc) {
    return this.getIndex(loc, COMPANY_LOC_LEVEL)
  },

  /**
   * 获取指定索引的树路径
   * 例如：2.4.5.2  (3)   [2.4.5]
   * @param {*} index 指定索引
   * return 指定索引的树路径
   */
  getIndex(tree, index){
    if(this.level(tree) < index){
      throw '传入tree的层数小于指定索引，无法获取！';
    }
    let levelItems = tree.split(TREE_SEPARATOR)
    let targetTree = ''
    for(let i = 0; i < index; i++){
      if(i != 0){
        targetTree += TREE_SEPARATOR
      }
      targetTree += levelItems[i]
    }
    return targetTree
  },

  /**
   * 获取tree层数
   * @param {*} tree
   * return tree层数
   */
  level(tree){
    return tree.split(TREE_SEPARATOR).length
  }
}
export default treeUtils

//测试代码
    // let loc1 = 'szgl'
    // let loc2 = 'szgl.gl'
    // let loc3 = 'szgl.gl.73'
    // let loc4 = 'szgl.gl.73.75'
    // let loc5 = 'szgl.gl.73.75.666'
    // let isPlatformLoc1 = this.$_treeUtils.isPlatformLoc(loc1)
    // let isPlatformLoc2 = this.$_treeUtils.isPlatformLoc(loc2)
    // let isPlatformLoc3 = this.$_treeUtils.isPlatformLoc(loc3)

    // let isGroupLoc1 = this.$_treeUtils.isGroupLoc(loc1)
    // let isGroupLoc2 = this.$_treeUtils.isGroupLoc(loc2)
    // let isGroupLoc3 = this.$_treeUtils.isGroupLoc(loc3)

    // let isCompanyLoc1 = this.$_treeUtils.isCompanyLoc(loc2)
    // let isCompanyLoc2 = this.$_treeUtils.isCompanyLoc(loc3)
    // let isCompanyLoc3 = this.$_treeUtils.isCompanyLoc(loc4)

    // let isDepartmentLoc1 = this.$_treeUtils.isDepartmentLoc(loc3)
    // let isDepartmentLoc2 = this.$_treeUtils.isDepartmentLoc(loc4)
    // let isDepartmentLoc3 = this.$_treeUtils.isDepartmentLoc(loc5)

    // let getPlatformLoc = this.$_treeUtils.getPlatformLoc(loc5)
    // let getGroupLoc = this.$_treeUtils.getGroupLoc(loc5)
    // let getCompanyLoc = this.$_treeUtils.getCompanyLoc(loc5)
    // let getCompanyLoc2 = this.$_treeUtils.getCompanyLoc(loc3)
    // let getCompanyLoc6 = this.$_treeUtils.getCompanyLoc(loc2)