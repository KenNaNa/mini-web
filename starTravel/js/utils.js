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
