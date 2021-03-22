const messages = {
  /**
   * 获取默认主消息
   * @param {*} resp 对应响应中的response
   * @param {*} defaultMsg res没有消息时返回的默认消息
   */
  getMainMessage(resp, defaultMsg) {
    if (resp && resp.data && resp.data.message) {
      return resp.data.message.msg
    }
    return defaultMsg
  },
  /**
   * 获取额外消息中指定key的第一条消息，额外消息是一个json对象，从response中
   * @param {*} resp 对应响应中的response
   * @param {*} key 额外消息的key值
   * @param {*} defaultMsg
   * return string
   */
  getExtraMessage(resp, key, defaultMsg = '') {
    if (
      resp &&
      resp.data &&
      resp.data.extraMessages &&
      resp.data.extraMessages[key]
    ) {
      return resp.data.extraMessages[key][0].msg
    }
    return defaultMsg
  },

  /**
   * 获取额外消息中指定key的所有消息，额外消息是一个json对象，从response中
   * @param {*} resp 对应响应中的response
   * @param {*} key 额外消息的key值
   * return array
   */
  getExtraMessages(resp, key) {
    if (
      resp &&
      resp.data &&
      resp.data.extraMessages &&
      resp.data.extraMessages[key]
    ) {
      let msgs = []
      let msg_objs = resp.data.extraMessages[key]
      msg_objs.forEach(item => {
        msgs.push(item.msg)
      })
      return msgs
    } else {
      return ''
    }
  },

  /**
   * 提取出所有额外消息，从response中
   * @param {*} resp
   * return jsonObj
   */
  getExtraMessageAll(resp) {
    if (resp && resp.data && resp.data.extraMessages) {
      let extraMsg = {}
      for (let key in resp.data.extraMessages) {
        let msgs = []
        let msg_objs = resp.data.extraMessages[key]
        msg_objs.forEach(item => {
          msgs.push(item.msg)
        })
        extraMsg[key] = msgs
      }
      return extraMsg
    } else {
      return undefined
    }
  },
  /**
   * 替换消息中的可变参数
   * 如： msgVarReplace('计划价格：{0},剩余数量：{1}', [100.55,10]) = '计划价格：100.55,剩余数量：10'
   * @param {*} msg 消息
   * @param {*} params 参数数组
   */
  msgVarReplace(msg, params) {
    for (let i = 0; i < params.length; i++) {
      msg = msg.replace('{' + i + '}', params[i])
    }
    return msg
  },
}

export default messages
