import env from '@/systemConfig/env.js' //环境配置
import modelConfig from '@/systemConfig/modelConfig.js' //子项目namespaced配置

const chatUtils = {
  
  /**
   * 弹出与op的聊天窗口
   * 
   * @param {*} username op账号
   */
  consultOp(username) { //咨询op
    let url = env.getEnv(modelConfig.xframe).BASE_URL +
    'front/portal_pc/index.html#/xchat/index?username=' + username
    this.open(url)
  },
  /**
   * 打开聊天组会话窗口
   * 
   * @param {*} chatSessionId 聊天组id
   */
  openChatSessionById(chatSessionId) { //咨询op
    let url = env.getEnv(modelConfig.xframe).BASE_URL +
    'front/portal_pc/index.html#/xchat/index?chatSessionId=' + chatSessionId
    //url = 'http://localhost:18080/#/xchat/index?chatSessionId=' + chatSessionId
    this.open(url)
  },

  /**
   * 打开创建聊天组会话窗口
   * 
   */
  openCreateChatSession(){
    let url = env.getEnv(modelConfig.xframe).BASE_URL +
    'front/portal_pc/index.html#/xchat/index?routeName=mySelf'
    this.open(url)
  },

  /**
   * 弹窗显示ipad端
   */
  open(url){
    let iWidth = 1024 //弹出窗口的宽度;
    let iHeight = 768 //弹出窗口的高度;
    let iLeft = (window.screen.width - iWidth) / 2 //获得窗口的水平位置;
    let iTop = (window.screen.height - iHeight) / 2 //获得窗口的垂直位置;
    window.open(
      url,
      '_blank',
      'height=' +
        iHeight +
        ',,innerHeight=' +
        iHeight +
        ',width=' +
        iWidth +
        ',innerWidth=' +
        iWidth +
        ',top=' +
        iTop +
        ',left=' +
        iLeft +
        ',toolbar=no,menubar=no,scrollbars=auto,resizeable=no,location=no,status=no',
    )

  }
}
export default chatUtils