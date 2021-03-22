/**
 * @function _columnDrop({el, tableData, dropCol, col, num, filterClass, postUrl})
 * @param el 表头外层元素
 * @param dropCol 表头数据
 * @param col 表头数据
 * @param num=0 默认为零，如果表格第一列是多选框，记得传递为 1
 * @param filterClass默认为空字符串，表示禁止哪些带有某一个样式的数据列拖拽
 * @param postUrl 存入数据库的请求连接
 * 
 * @function _rowDrop({el, tableData, postUrl})
 * @param el 表格 body 元素
 * @param tableData 传入表格的数据
 * @param postUrl 传入数据库的链接
 * */
import Sortable from "sortablejs"
let dragSort = {
  data () {
    return {
    }
  },
  methods: {
    // 行拖拽
    _rowDrop ({ el, tableData, postUrl }) {
      const _this = this
      Sortable.create(el, {
        animation: 500,
        delay: 0,
        onEnd ({ newIndex, oldIndex }) {
          const currRow = tableData.splice(oldIndex, 1)[0]
          tableData.splice(newIndex, 0, currRow)
          _this.$_storage.set('dataList', tableData)
          // 可能需要传入数据库
        },
        onUpdate (evt) { },
      })
    },
    //列拖拽
    _columnDrop ({ el, tableData, dropCol, col, num, filterClass, postUrl }) {
      const _this = this
      let clientX = 0
      let firstElementLeft = el.firstChild.getBoundingClientRect().left
      let firstElementWidth = el.firstChild.getBoundingClientRect().width
      let tableHeaderWidth = el.offsetWidth - el.firstChild.offsetWidth
      this.sortable = Sortable.create(el, {
        filter: filterClass,
        animation: 500,
        delay: 0,
        onChoose (evt) {
          clientX = evt.originalEvent.clientX
          console.log(el.offsetWidth - el.firstChild.offsetWidth, el.firstChild.getBoundingClientRect())
        },
        onMove: function (/**Event*/evt, /**Event*/originalEvent) {
          if ((evt.originalEvent.clientX > clientX) || ((evt.originalEvent.clientX - firstElementLeft - firstElementWidth) > tableHeaderWidth)) {
            return true
          } else {
            return false
          }
        },
        onEnd (evt) {
          _this._splice(evt, dropCol, num)
          // 最后可能需要入数据库操作
        },
        onUpdate: evt => { },
      })
    },
    _splice (evt, cols, num) {
      const oldItem = cols[evt.oldIndex - num]
      cols.splice(evt.oldIndex - num, 1)
      cols.splice(evt.newIndex - num, 0, oldItem)
    },
    _dropUl (el, col, dropCol) {
      let _this = this
      Sortable.create(el, {
        animation: 500,
        delay: 0,
        onEnd (evt) {
          _this._splice(evt, col)
          _this._splice(evt, dropCol)
          _this.$_storage.set('dropCols', dropCol)
          _this.$_storage.set('cols', dropCol)
          _this.$_storage.set('titleCol', dropCol)
        }
      })
    },
    _forEachDom (dom, display) {
      for (let i = 0, len = dom.length; i < len; i++) {
        dom[i].style.display = display
      }
    }
  },
}

export default dragSort