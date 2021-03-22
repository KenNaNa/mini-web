export const inBrowser = typeof window !== 'undefined'
export const inWeex =
  typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform
export const weexPlatform = inWeex && WXEnvironment.platform.toLowerCase()
export const UA = inBrowser && window.navigator.userAgent.toLowerCase()
export const isIE = UA && /msie|trident/.test(UA)
export const isIE9 = UA && UA.indexOf('msie 9.0') > 0
export const isEdge = UA && UA.indexOf('edge/') > 0
export const isAndroid =
  (UA && UA.indexOf('android') > 0) || weexPlatform === 'android'
export const isIOS =
  (UA && /iphone|ipad|ipod|ios/.test(UA)) || weexPlatform === 'ios'
export const isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge

export const isMicroMessenger = UA && UA.indexOf('micromessenger') > 0
export const isMobile =
  UA &&
  (isAndroid ||
    /iphone|ipad|ipod/.test(UA) ||
    /blackberry|bb10/.test(UA) ||
    /playbook/.test(UA) ||
    /symbian/.test(UA) ||
    /windows (ce|phone|mobile)/.test(UA) ||
    /meego/.test(UA))
