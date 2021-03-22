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
// 兼容 children 
function returnEle (element) {
  if (element.children) {
    return element.children;
  } else {
    var childNodes,
      EleNodes = [],
      i = 0,
      // 等号右边获取的所有节点类型全部赋值给EleNodes这个变量
      childNodes = element.childNodes;
    //现在要为childNodes里面的节点做循环判断了，我们只要元素节点
    for (var i; i < childNodes.length; i++) {
      // 判断节点是不是元素节点想到了两种方法
      // childNodes[i].nodeType === 1
      if (Object.prototype.toString.call(childNodes[i]) === "[object Element]") {
        EleNodes.push(childNodes[i]);
      }
    }
    return EleNodes;
  }
}
window.addEventListener('load', function () {
  var ms_ie = false;
  var ua = window.navigator.userAgent;
  var old_ie = ua.indexOf('MSIE ');
  var new_ie = ua.indexOf('Trident/');
  var edge = ua.indexOf('Edge/');
  console.log("ua===>", ua)

  if ((old_ie > -1) || (new_ie > -1) || edge > -1) {
    ms_ie = true;
  }

  if (ms_ie) {
    document.documentElement.className += " ie";
  }
  // https://blog.csdn.net/github_38057462/article/details/89216955
  // 根据屏幕大小适配字体
  function resetPc () {
    var wH = window.innerHeight; // 当前窗口的高度
    var wW = window.innerWidth; // 当前窗口的宽度
    var whdef = 100 / 1920; // 表示1920的设计图,使用100PX的默认值
    if (wW > 1366) {
      var rem = wW * whdef; // 以默认比例值乘以当前窗口宽度,得到该宽度下的相应FONT-SIZE值
      var html = document.documentElement;
      html.style.fontSize = rem + "px"; //适用于PC网站
    }
    else {
      var rem = 1400 * whdef;
      var html = document.documentElement;
      html.style.fontSize = rem + "px";
    }
  }
  // resize 屏幕宽度
  function resizeWin () {
    var Width = window.innerWidth//浏览器窗口的内部宽度（包括滚动条）

      || document.documentElement.clientWidth

      || document.body.clientWidth;

    var Height = window.innerHeight//浏览器窗口的内部高度（包括滚动条）

      || document.documentElement.clientWidth

      || document.body.clientHeight;

    console.log(Width, Height);
  }

  resizeWin();
  resetPc();
  // setTimeout(() => {
  // 滚动定位标签
  var oFloatNavs = returnEle(document.getElementById('ul2'))
  var oBlackFloatNavs = returnEle(document.getElementById('ul1'))
  var oFloatNavsLength = oFloatNavs.length;
  var oXdistributeWrapper = document.getElementById('xdistribute-wrapper');
  var oPages = document.querySelectorAll('.page');
  var topObj = {};
  for (var i = 0; i < oFloatNavsLength; i++) {
    // 60 是指浮动导航的实际高度
    (function (i) {
      topObj[i] = {
        top: (oPages[i].getBoundingClientRect().top - 60),
        height: oPages[i].offsetHeight
      };
    })(i)
  }
  // 全局标志
  var isClick = false;
  // 初始化类名
  function initClassName () {
    for (var i = 0; i < oFloatNavsLength; i++) {
      (function (i) {
        // oBlackFloatNavs[i].children[1].className = 'xdistribute-home-no-tri-icon'
        returnEle(oBlackFloatNavs[i])[1].className = 'xdistribute-home-no-tri-icon'
        // oFloatNavs[i].children[1].className = 'xdistribute-home-no-tri-icon'
        returnEle(oFloatNavs[i])[1].className = 'xdistribute-home-no-tri-icon'
      })(i)
    }
  };
  // 点击标签滚动
  for (var i = 0; i < oFloatNavsLength; i++) {
    (function (i) {
      oFloatNavs[i].onclick = function () {
        isClick = true;
        initClassName();
        // this.children[1].className = 'xdistribute-home-tri-icon'
        returnEle(oFloatNavs[i])[1].className = 'xdistribute-home-tri-icon';
        // oBlackFloatNavs[i].children[1].className = 'xdistribute-home-tri-icon'
        returnEle(oBlackFloatNavs[i])[1].className = 'xdistribute-home-tri-icon';
        if (oXdistributeWrapper.scrollTo) {
          oXdistributeWrapper.scrollTo({
            top: topObj[i].top,
            behavior: "smooth"
          });
        } else {
          // 兼容 ie11
          oXdistributeWrapper.scrollTop = topObj[i].top;
        }
      }

      oBlackFloatNavs[i].onclick = function () {
        isClick = true;
        initClassName();
        returnEle(oBlackFloatNavs[i])[1].className = 'xdistribute-home-tri-icon';
        returnEle(oFloatNavs[i])[1].className = 'xdistribute-home-tri-icon';
        if (oXdistributeWrapper.scrollTo) {
          oXdistributeWrapper.scrollTo({
            top: topObj[i].top,
            behavior: "smooth"
          });
        } else {
          // 兼容 ie11
          oXdistributeWrapper.scrollTop = topObj[i].top;
        }
      }
    })(i);
  }
  // 初始化
  function init () {
    function gunDO () {
      var oTop = oXdistributeWrapper.scrollTop;
      // initClassName()
      for (var i = 0; i < oFloatNavsLength; i++) {
        (function (i) {
          if (oTop >= topObj[i].top && oTop <= topObj[i].height + topObj[i].top) {
            returnEle(oBlackFloatNavs[i])[1].className = 'xdistribute-home-tri-icon';
            returnEle(oFloatNavs[i])[1].className = 'xdistribute-home-tri-icon';
            // oFloatNavs[i].children[1].className = 'xdistribute-home-tri-icon'
            // oBlackFloatNavs[i].children[1].className = 'xdistribute-home-tri-icon'
          } else {
            // oFloatNavs[i].children[1].className = 'xdistribute-home-no-tri-icon'
            // oBlackFloatNavs[i].children[1].className = 'xdistribute-home-no-tri-icon'
            returnEle(oBlackFloatNavs[i])[1].className = 'xdistribute-home-no-tri-icon';
            returnEle(oFloatNavs[i])[1].className = 'xdistribute-home-no-tri-icon';
          }
        })(i)
      }
    }
    // 获取滚动元素的宽度
    var width = oXdistributeWrapper.clientWidth;

    // 浮动导航元素
    var oBlackFloatNav = document.getElementById('black-float-nav');
    var oFloatNav = document.getElementById('float-nav');

    // 浮动导航占位符，防止抖动情况
    var oFloatNavStickyHolder = document.getElementById('float-nav-sticky-holder');

    // 防止出现白影，出现超出隐藏
    oBlackFloatNav.style.width = width + 'px';

    // 初始化
    function start () {
      var bodyScrollTop = oXdistributeWrapper.scrollTop;
      var top = oXdistributeWrapper.getBoundingClientRect().top;
      var isIE6 = /msie 6/i.test(navigator.userAgent);
      if (bodyScrollTop > top) {
        // oBlackFloatNav.style.width = oFloatNavStickyHolder.offsetWidth + 'px'
        // console.log("scrollTop", bodyScrollTop)
        oBlackFloatNav.style.position = (isIE6) ? "absolute" : "fixed";
        oBlackFloatNav.style.top = (isIE6) ? bodyScrollTop + "px" : "0px";
        oBlackFloatNav.style.zIndex = 10;
        oBlackFloatNav.style.display = 'block';
        oFloatNavStickyHolder.style.display = 'block';
        oFloatNav.style.display = "none";
      } else {
        oBlackFloatNav.style.position = "static";
        oBlackFloatNav.style.display = "none";
        oFloatNavStickyHolder.style.display = 'none'
        oBlackFloatNav.style.zIndex = 0;
        oFloatNav.style.display = "block";
      }
    }
    start();

    // 监听元素滚动
    oXdistributeWrapper.addEventListener('scroll', function (e) {
      start();
      if (isClick) return;
      gunDO();
    }, true)
  }



  // 监听鼠标滚动，设置标志
  function mousescroll () {
    isClick = false
  }
  oXdistributeWrapper.addEventListener('DOMMouseScroll', mousescroll, false);

  oXdistributeWrapper.onmousewheel = mousescroll;
  oXdistributeWrapper.addEventListener('touchmove', mousescroll, false);

  init();

  window.onresize = function () {
    init();
    resizeWin();
    resetPc();
  }
  window.addEventListener('orientationchange', function () {
    init();
    resizeWin();
    resetPc();
  }, false)
  // }, 1000)

}, false)

