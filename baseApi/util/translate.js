const translate = {
  /**
   * 针对el-table的列表对齐方式的翻译
   * @param {*} code 
   */
  elAlignType(code='0'){
    switch(code){
      case '1':
        return 'left'
      case '2':
        return 'right'
      default:
        return 'center'
    }
  }
}
export default translate