const setFyDragTableUtils = {
  setFyDragTable(options = {event, tableData, refs, refsKey: 'fyDragTable', bool: true, idKey: "id", idValue: ""}) {
    /**
     * @param event 事件对象
     * @param tableData 表格数据
     * @param refs 表格的 refs
     * @param bool true 表示添加，false 表示删除 默认为 true
     * @param idValue 表示删除那一项数据的 id 值 删除的时候必须传入， 添加时默认不传入
     * @param idKey 表示删除那一项数据的 id 键
     * */ 
    let dataItem = JSON.parse(options.event.dataTransfer.getData('text')) // 此时的 dataItem 是深复制时候的 item
    if(options.bool && options.idKey && !options.idValue) {
      // 表示 拖拽放置
      options.tableData.map(item => {
        if (item[options.idKey] == dataItem[options.idKey]) {
          options.refs[options.refsKey].$refs.dragTable.toggleRowSelection(item, true)
          // 这里只能传入 item, 传入 dataItem 背景色不消失
          options.refs[options.refsKey].setCheckedBgColor(item, true)
        }
      })
    } else {
      // 表示删除数据
      options.tableData.map(item => {
        if (item[options.idKey] == options.idValue) {
          options.refs[options.refsKey].$refs.dragTable.toggleRowSelection(item, false)
          // 这里只能传入 item, 传入 dataItem 背景色不消失
          options.refs[options.refsKey].setCheckedBgColor(item, false)
        }
      })
    }
  }
}

export default setFyDragTableUtils