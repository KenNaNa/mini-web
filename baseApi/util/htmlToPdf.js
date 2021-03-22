// 导出页面为PDF格式
import html2Canvas from 'html2canvas'
import './jspdf.min.js'

export default {
  install (Vue, options) {
    Vue.prototype.$_getPdf = function (selector, title='') {
      if (!selector) {
          throw new Error('缺少selector')
      }
      let el = document.querySelector(selector)
      if (!el) {
        throw new Error('未找到' + selector + '对应的dom节点')
      }

      html2Canvas(el, {
        // allowTaint: true,
        // useCORS:true
        dpi: 120, // 图片清晰度问题
      }).then(function (canvas) {
        let contentWidth = canvas.width
        let contentHeight = canvas.height
        let pageHeight = contentWidth / 592.28 * 841.89
        let leftHeight = contentHeight
        let position = 0
        let imgWidth = 595.28
        let imgHeight = 592.28 / contentWidth * contentHeight
        let pageData = canvas.toDataURL('image/jpeg', 1.0)
        let PDF = new jsPDF('', 'pt', 'a4')
        PDF.text(100, 100, '设置的表头的参数')
        let pageArr = []
        if (leftHeight < pageHeight) {
          PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
        } else {
          while (leftHeight > 0) {
            PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
            leftHeight -= pageHeight
            position -= 841.89
            pageArr.push(position)
            console.log('打印的页码数是多少', position)
            if (leftHeight > 0) {
              PDF.addPage()
            }
          }
        }
        console.log('打印页码数', pageArr)
        pageArr.forEach((val,index) => {
          
          console.log('循环的数组', index)
        })
        PDF.save(title + '.pdf')
      }
      )
    }
  }
}