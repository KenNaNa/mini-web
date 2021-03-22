/**
 *   使用方法 var ws = new fyWebsocket('ws://localhost:8080')
 *   ws.onMessage(data){}
 *   ws.send(data)
 */
class fyWebsocket {
  constructor() {
    //连接地址
    this.isReconnect = false;
    //token
    this.token = Vue.prototype.$_storage.get('token');
  }

  init() {
    let that = this;
    this.wsuri = Vue.prototype.$_env.getEnv(Vue.prototype.$_modelConfig.xchat).SOCKET_URL +
      'api/v1/web_socket/' + Vue.prototype.$_dataUtils.getLoginUsername();
    if (!Vue.prototype.$_dataUtils.getLoginUsername())
    {
      this.isReconnect = false;
      return  that.reconnectWebSocket();
    }
    that.websocket = new WebSocket(that.wsuri)
    that.websocket.onclose = function (e) {
      console.log('Connection--closed',e)
      // that.reconnectWebSocket()
    }
    that.websocket.onopen = function () {
      console.log('WebSocket连接成功')
      // that.send('WebSocket连接成功')
    }
    // 连接发生错误的回调方法
    that.websocket.onerror = function () {
      that.reconnectWebSocket()
    }
    //监听服务端返回的数据
    that.websocket.onmessage = (event) => {
      if (that._callback) {
        that._callback(event.data)
      }
    }
  }

  //重新连接
  reconnectWebSocket() {
    let that = this;
    if (that.isReconnect) {
      return
    }
    ;
    that.isReconnect = true;
    // 没连接上会一直重连，设置延迟避免请求过多
    setTimeout(function () {
      that.init();
      that.isReconnect = false;
    }, 2000);
  }

//便于外部重新定义方法处理数据，服务端传的消息进行处理
  onmessage(callback) {
    let that = this;
    that._callback = callback;
  }
  onclose(){
    this.websocket.close();
  }

  send(data) {
    if (this.getWebsocketState() == 1) {
      this.websocket.send(data);
    }
  }

  getWebsocketState() {
    return this.websocket.readyState;
  }
}

export default  fyWebsocket;
