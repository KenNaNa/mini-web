# pc 端

## 如何实现字体的自适应

```js
// 根据屏幕大小适配字体
let resetPc = () => {
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
```

## 如何 resize window

```js
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
```

## 如何判断所有 img 加载完成

```js
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
```

## 获取终端类型

```js
var ENV = {}
userAgent = navigator.userAgent;
ENV.inMobile = !!userAgent.match(/applewebkit.*mobile.*/i);// 移动终端
ENV.inAndroid = (userAgent.match(/(Android);?[\s\/]+([\d.]+)?/)) ? true : false; // android终端
ENV.iniPad = (userAgent.match(/(iPad).*OS\s([\d_]+)/)) ? true : false; // iPad终端
ENV.inMac = (userAgent.match(/(Mac\sOS)\sX\s([\d_]+)/)) ? true : false; // iMac终端
ENV.iniPhone = (!ENV.iniPad && userAgent.match(/(iPhone\sOS)\s([\d_]+)/)) ? true : false; // iPhone终端
ENV.inIOS = ENV.iniPad || ENV.inMac || ENV.iniPhone; // ios终端
ENV.inSamsung = userAgent.toUpperCase().indexOf("SAMSUNG-SM-N7508V") != -1;

ENV.inWeichat = userAgent.match(/MicroMessenger/i) != null;// 微信内部浏览器
ENV.inSafari = userAgent.indexOf('Safari') != -1; // Safari
ENV.inChrome = userAgent.match(/Chrome/i) != null && userAgent.match(/Version\/\d+\.\d+(\.\d+)?\sChrome\//i) == null ? true : false;
ENV.inQQBrowser = userAgent.match(/MQQBrowser\/([\d\.]+)/) ? true : false; // QQ浏览器
ENV.inUCBrowser = userAgent.match(/UCBrowser\/([\d\.]+)/) ? true : false;
ENV.inIE = userAgent.match(/Trident/i) != null;// IE内核
ENV.inOpera = userAgent.match(/Presto/i) != null;// opera内核
ENV.inWebKit = userAgent.match(/Applewebkit/i) != null;// 苹果、谷歌内核
ENV.inFireFox = userAgent.match(/Gecko/i) != null && userAgent.match(/khtml/i) != null;// 火狐内核
```

## reset.css

```css
@charset 'UTF-8';
html,body,div,span,applet,object,,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video {
	margin:0;
	padding:0;
	border:0;
	font-size:100%;
	font:inherit;
	font-weight:normal;
	vertical-align:baseline;
}
/* HTML5 display-role reset for older browsers */
article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section {
	display:block;
}
ol,ul,li {
	list-style:none;
}
blockquote,q {
	quotes:none;
}
blockquote:before,blockquote:after,q:before,q:after {
	content:'';
	content:none;
}
table {
	border-collapse:collapse;
	border-spacing:0;
}
th,td {
	vertical-align:middle;
}
/* custom */
a {
	outline:none;
	color:#16418a;
	text-decoration:none;
	-webkit-backface-visibility:hidden;
}
a:focus {
	outline:none;
}
input:focus,select:focus,textarea:focus {
	outline:-webkit-focus-ring-color auto 0;
}
p {
  margin-block-start: 0 !important;
  margin-block-end: 0 !important;
}
```

## 浮动导航实现思路

```text
1. 有一个浮动导航占位符，跟实际浮动导航一样的高度，浮动导航占位符的宽度 width 可以无限大，一般设置为 99999px,足够大，他的父级元素超出隐藏就好了，当实际浮动导航的浮动时，浮动占位符占住原先的位置，防止抖动。
```

代码如下：

```html
<div id="black-float-nav">
    // 导航内容
</div>
<!-- 浮动导航占位符 -->
<div id="float-nav-sticky-holder"></div>

// css
#float-nav-sticky-holder {
  width: 999999.99rem;
  /* height: 0.6rem; */
  line-height: 0.6rem;
  display: none;
}

#black-float-nav {
  position: fixed;
  top: 0;
  z-index: 10;
  display: none;
  width: 100%;
  height: 0.6rem;
  background-color: black;
  overflow: hidden;
}
```

## 如何修改 radio 的样式

[总结：如何修改美化radio、checkbox的默认样式](https://segmentfault.com/a/1190000017209163)

```html
<label class="group-btn-same customer">
    <input class="radio_type" type="radio" name="radio" id="customer"> 
    <label for="customer"></label>&nbsp;  <span>单位客户</span>
</label>

/* css 改变 radio 选中样式 */
.radio_type {
  display: none;
}

.radio_type+label {
  position: relative;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  border: 1px solid #999999;
  background-color: transparent;
  display: inline-block;
  top: 0px;
}

.radio_type:checked+label {
  position: relative;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  border: 1px solid #3F50A9;
  background-color: transparent;
  display: inline-block;
  top: 0px;
}

.radio_type:checked+label:after {
  position: absolute;
  content: '';
  font-size: 0;
  border: 6px solid #3F50A9;
  border-radius: 50%;
  top: 2px;
  left: 2px;
}

.radio_type:checked:disabled+label {
  border-color: #999999;
}

.radio_type:checked:disabled+label:after {
  border-color: #999999;
}

input[type="radio"] {
  margin: 0;
}
```

# 

## 使用 rem 进行适配



方法一：设置fontsize 按照iphone 5的适配  1em=10px   适配320

```js
// “()()”表示自执行函数
(function (doc, win) {
  var docEl = doc.documentElement,
    // 手机旋转事件,大部分手机浏览器都支持 onorientationchange 如果不支持，可以使用原始的 resize
      resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
      recalc = function () {
        //clientWidth: 获取对象可见内容的宽度，不包括滚动条，不包括边框
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        docEl.style.fontSize = 10*(clientWidth / 320) + 'px';
      };
 
  recalc();
  //判断是否支持监听事件 ，不支持则停止
  if (!doc.addEventListener) return;
  //注册翻转事件
  win.addEventListener(resizeEvt, recalc, false);
 
})(document, window);
```

方法二：按照iPhone6的尺寸设计   是375/25=15px

```js
(function (docs, win) {
  var docEls = docs.documentElement,
  resizeEvts = 'orientationchange' in window ? 'orientationchange' : 'resize',
  recalcs = function () {

  //getBoundingClientRect()这个方法返回一个矩形对象

  window.rem = docEls.getBoundingClientRect().width/25;
  docEls.style.fontSize = window.rem + 'px';

};
  recalcs();
  if (!docs.addEventListener) return;
  win.addEventListener(resizeEvts, recalcs, false);
})(document, window);
```

方式三：采用medi

```css
html {
     font - size: 20 px;
}
@media only screen and(min - width: 401 px) {
     html {
         font - size: 25 px!important;
     }
}
@media only screen and(min - width: 428 px) {
     html {
         font - size: 26.75 px!important;
     }
 }
@media only screen and(min - width: 481 px) {
     html {
         font - size: 30 px!important;
     }
 }
 @media only screen and(min - width: 569 px) {
     html {
         font - size: 35 px!important;
     }
}
@media only screen and(min - width: 641 px) {
     html {
         font - size: 40 px!important;
     }
}
```



## h5 适配

https://zhuanlan.zhihu.com/p/268519512



## 在网页代码的头部，加入一行viewport元标签

```html
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no">
```



## 宽度不要用绝对的

```css
width:auto; / width:XX%;
```

## 字体大小是页面默认大小的100%，即16像素，不要使用绝对大小"px"，要使用相对大小“rem”

```css
html{font-size:62.5%;}
body {font:normal 100% Arial,sans-serif;font-size:14px; font-size:1.4rem; } 
```



## [rem与px的转换](http://caibaojian.com/rem-and-px.html)

## 更靠谱的H5横竖屏检测方法（js代码）

https://www.jb51.net/article/92517.htm



## 各大浏览器兼容

| 浏览器  | 内核           | 备注                                                         |
| ------- | -------------- | ------------------------------------------------------------ |
| IE      | Trident        | IE、猎豹安全、360极速浏览器、百度浏览器                      |
| firefox | Gecko          | 可惜这几年已经没落了，打开速度慢、升级频繁、猪一样的队友flash、神一样的对手chrome。 |
| Safari  | webkit         | 从Safari推出之时起，它的渲染引擎就是Webkit，一提到 webkit，首先想到的便是 chrome，可以说，chrome 将 Webkit内核 深入人心，殊不知，Webkit 的鼻祖其实是 Safari。 |
| chrome  | Chromium/Blink | 在 Chromium 项目中研发 Blink 渲染引擎（即浏览器核心），内置于 Chrome 浏览器之中。Blink 其实是 WebKit 的分支。大部分国产浏览器最新版都采用Blink内核。二次开发 |
| Opera   | blink          | 现在跟随chrome用blink内核。                                  |

IEedage11 DOM 元素没有 scrollTo

尝试使用 scrollTop 兼容

https://blog.csdn.net/jingyuandi/article/details/80570298

360 浏览器 没问题 

360极速浏览器 没问题

搜狗浏览器 没问题 chrome 内核

2345 浏览器 IE 内核 没问题

QQ 浏览器 IE 内核

UC 浏览器 webkit 内核，谷歌内核

IE

不兼容 es6 语法

使用 ES5 语法

或者引入垫片



## 兼容 element.children

```js
function returnEle (element) {
  if (element.children) {
    return element.children
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
```

## es6 let for 循环不兼容

```js
for (var i = 0; i < oFloatNavsLength; i++) {
    (function (i) {
      oFloatNavs[i].onclick = function () {
        console.log("oFloatNavs[i]===>", oFloatNavs[i])
        isClick = true
        initClassName()
        // this.children[1].className = 'xdistribute-home-tri-icon'
        returnEle(oFloatNavs[i])[1].className = 'xdistribute-home-tri-icon'
        // oBlackFloatNavs[i].children[1].className = 'xdistribute-home-tri-icon'
        returnEle(oBlackFloatNavs[i])[1].className = 'xdistribute-home-tri-icon'
        if (oXdistributeWrapper.scrollTo) {
          oXdistributeWrapper.scrollTo({
            top: topObj[i].top,
            behavior: "smooth"
          })
        } else {
          // 兼容 ie11
          oXdistributeWrapper.scrollTop = topObj[i].top
        }
      }

      oBlackFloatNavs[i].onclick = function () {
        console.log("topObj[i] click", topObj[i])
        isClick = true
        initClassName()
        returnEle(oBlackFloatNavs[i])[1].className = 'xdistribute-home-tri-icon'
        returnEle(oFloatNavs[i])[1].className = 'xdistribute-home-tri-icon'
        if (oXdistributeWrapper.scrollTo) {
          oXdistributeWrapper.scrollTo({
            top: topObj[i].top,
            behavior: "smooth"
          })
        } else {
          // 兼容 ie11
          oXdistributeWrapper.scrollTop = topObj[i].top
        }
      }
    })(i)
  }
```





# [IE浏览器常见CSS兼容性问题及解决办法](https://www.cnblogs.com/kiscall/p/4679616.html)



## ie10, ie9 无法兼容 `display:flex`

[flex布局浏览器兼容处理 ie8, ie9](https://blog.csdn.net/weixin_30284355/article/details/95999007)

[flex布局浏览器兼容处理 ie8 ie9](https://www.jianshu.com/p/654cd19da3e7)

[IE9 IE10 IE11兼容性更改](https://blog.csdn.net/rootes/article/details/17170405)

[ie9中使用flex布局](https://blog.csdn.net/robertpanvip/article/details/105611288?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-2.compare&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-2.compare)

## [针对IE浏览器的CSS样式（兼容性）](https://www.cnblogs.com/liaolei1/p/7306142.html)

[IE浏览器样式兼容解决办法](https://www.jianshu.com/p/3fa058d2d670)

[http://www.webdevout.net/css-hacks](http://www.webdevout.net/css-hacks)



```js
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
```















