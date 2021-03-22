// 判断所有图片是否加载完成
function alertComplete () {
  var isImg = false;
  var img = document.getElementsByTagName('img');
  for (var i = 0; i < img.length; i++) {
    if (img[i].complete) {
      isImg = img[i].complete;
    };
  };
  return isImg;
}
window.addEventListener('load', function () {
  console.log(alertComplete())
  // setTimeout(() => {
  // 滚动定位标签
  let oFloatNavs = document.getElementById('ul2').children
  let oBlackFloatNavs = document.getElementById('ul1').children
  let oFloatNavsLength = oFloatNavs.length
  let oXdistributeWrapper = document.getElementById('xdistribute-wrapper')
  let oPages = document.querySelectorAll('.page')
  let topObj = {}
  for (let i = 0; i < oFloatNavsLength; i++) {
    // 60 是指浮动导航的实际高度
    topObj[i] = {
      top: (oPages[i].getBoundingClientRect().top - 60),
      height: oPages[i].offsetHeight
    }
  }
  // TODO:先暂时这样解决吧
  topObj[0] = {top: -60, height: 600}
  topObj[1] = {top: 540, height: 807}
  topObj[2] = {top: 1428, height: 716}
  topObj[3] = {top: 2194, height: 2979}
  topObj[4] = {top: 5123, height: 671}
  // 全局标志
  let isClick = false
  // 初始化类名
  function initClassName () {
    for (let i = 0; i < oFloatNavsLength; i++) {
      oBlackFloatNavs[i].children[1].className = 'xdistribute-home-no-tri-icon'
      oFloatNavs[i].children[1].className = 'xdistribute-home-no-tri-icon'
    }
  }
  // 点击标签滚动
  for (let i = 0; i < oFloatNavsLength; i++) {
    oFloatNavs[i].onclick = function () {
      isClick = true
      initClassName()
      this.children[1].className = 'xdistribute-home-tri-icon'
      oBlackFloatNavs[i].children[1].className = 'xdistribute-home-tri-icon'
      // oXdistributeWrapper.scrollTop = topObj[i]
      console.log("topObj[i] click", topObj[i])
      oXdistributeWrapper.scrollTo({
        top: topObj[i].top,
        behavior: "smooth"
      })
    }
    oBlackFloatNavs[i].onclick = function () {
      console.log("topObj[i] click", topObj[i])
      isClick = true
      initClassName()
      this.children[1].className = 'xdistribute-home-tri-icon'
      oFloatNavs[i].children[1].className = 'xdistribute-home-tri-icon'
      oXdistributeWrapper.scrollTo({
        top: topObj[i].top,
        behavior: "smooth"
      })
    }
  }

  console.log('topObj', topObj)
  // 初始化
  function init () {
    function gunDO () {
      let oTop = oXdistributeWrapper.scrollTop
      // initClassName()
      for (let i = 0; i < oFloatNavsLength; i++) {
        if (oTop >= topObj[i].top && oTop <= topObj[i].height + topObj[i].top) {
          oFloatNavs[i].children[1].className = 'xdistribute-home-tri-icon'
          oBlackFloatNavs[i].children[1].className = 'xdistribute-home-tri-icon'
        } else {
          oFloatNavs[i].children[1].className = 'xdistribute-home-no-tri-icon'
          oBlackFloatNavs[i].children[1].className = 'xdistribute-home-no-tri-icon'
        }
      }
    }
    // 获取滚动元素的宽度
    let width = oXdistributeWrapper.clientWidth

    // 浮动导航元素
    let oBlackFloatNav = document.getElementById('black-float-nav')
    let oFloatNav = document.getElementById('float-nav')

    // 浮动导航占位符，防止抖动情况
    let oFloatNavStickyHolder = document.getElementById('float-nav-sticky-holder')

    // 防止出现白影，出现超出隐藏
    oBlackFloatNav.style.width = width + 'px'

    // 初始化
    function start () {
      var bodyScrollTop = oXdistributeWrapper.scrollTop
      var top = oXdistributeWrapper.getBoundingClientRect().top;
      var isIE6 = /msie 6/i.test(navigator.userAgent);
      if (bodyScrollTop > top) {
        // oBlackFloatNav.style.width = oFloatNavStickyHolder.offsetWidth + 'px'
        console.log("scrollTop", bodyScrollTop)
        oBlackFloatNav.style.position = (isIE6) ? "absolute" : "fixed";
        oBlackFloatNav.style.top = (isIE6) ? bodyScrollTop + "px" : "0px";
        oBlackFloatNav.style.zIndex = 10
        oBlackFloatNav.style.display = 'block'
        oFloatNavStickyHolder.style.display = 'block'
        oFloatNav.style.display = "none"
      } else {
        oBlackFloatNav.style.position = "static";
        oBlackFloatNav.style.display = "none";
        oFloatNavStickyHolder.style.display = 'none'
        oBlackFloatNav.style.zIndex = 0
        oFloatNav.style.display = "block"
      }
    }
    start()

    // 监听元素滚动
    oXdistributeWrapper.addEventListener('scroll', (e) => {
      start()
      if (isClick) return
      gunDO()
    }, true)
  }



  // 监听鼠标滚动，设置标志
  function mousescroll () {
    isClick = false
  }
  oXdistributeWrapper.addEventListener('DOMMouseScroll', mousescroll, false)

  oXdistributeWrapper.onmousewheel = mousescroll
  // https://blog.csdn.net/github_38057462/article/details/89216955
  // 根据屏幕大小适配字体
  let resetPc = () => {
    var wH = window.innerHeight; // 当前窗口的高度
    var wW = window.innerWidth; // 当前窗口的宽度
    var whdef = 100 / 1920; // 表示1920的设计图,使用100PX的默认值
    if (wW > 1400) {
      var rem = wW * whdef; // 以默认比例值乘以当前窗口宽度,得到该宽度下的相应FONT-SIZE值
      var html = document.documentElement;
      html.style.fontSize = rem + "px"; //适用于PC网站
    } else {
      var rem = 1400 * whdef;
      var html = document.documentElement;
      html.style.fontSize = rem + "px";
    }
  }
  // resize 屏幕宽度
  let resizeWin = () => {
    var Width = window.innerWidth//浏览器窗口的内部宽度（包括滚动条）

      || document.documentElement.clientWidth

      || document.body.clientWidth;

    var Height = window.innerHeight//浏览器窗口的内部高度（包括滚动条）

      || document.documentElement.clientWidth

      || document.body.clientHeight;

    console.log(Width, Height);
  }
  init()
  resizeWin()
  resetPc()
  window.onresize = function () {
    init()
    resizeWin()
    resetPc()
  }
  // }, 1000)

}, false)

