import modelConfig from '@/systemConfig/modelConfig.js' //子项目namespaced配置
import { get } from '@bApi/ajax/baseAjax.js'
import storage from '@bApi/storage/storageUtil.js'
import consoleUtils from '@bApi/util/consoleUtils.js' //控制台打印工具

// 获取通用数据url
const url = 'api/v1/init/general_data'

// 要获取的多语言文本
const msgIds = [
  'text.add', // 添加
  'text.addition', // 增加
  'text.edit', // 编辑
  'text.update', // 更新
  'text.modify', // 修改
  'text.del', // 删除
  'text.remove', // 移除
  'text.cancel', // 取消
  'text.seek', // 查找
  'text.search', // 搜索
  'text.confirm', // 确定
  'text.close', // 关闭
  'text.all', // 全部
  'text.all.select', // 全选
  'text.all.preview', // 预览
  'text.return', // 退回
  'text.pass', // 通过
  'text.issue', // 发布
  'text.help', // 帮助
  'text.upload', // 上传
  'text.upload.attachment', // 上传附件
  'text.download', // 下载
  'text.save', // 保存
  'text.transfer.copy', // 转抄
  'text.hint', // 提示
  'text.is.confirm.del', // 是否确定永久删除？
  'text.cancel.del', // 已取消删除
  'text.is.confirm.del.file', // 此操作将永久删除该文件，是否继续?
  'text.return2', // 返回
  'text.reset', // 重置
  'text.serial.number', // 序号
  'text.apply.check', // 申请审核
  'text.query', // 查询
  'text.empty', // 清空
  'text.all.remove', // 全部移除
  'text.keywords.filter', // 输入关键字进行过滤
  'text.select.date', // 选择日期
  'text.start.date', // 开始日期
  'text.end.date', // 结束日期
  'text.till', // 至
  'text.select.file', // 选择文件
  'text.please.choose', // 请选择
  'text.load.complete', // 加载完成
  'text.load.more', // 加载更多...
  'text.top', // 置顶
  'text.refresh', // 刷新
  'text.close.current.tag', // 关闭当前标签页
  'text.close.other.tag', // 关闭其他标签页
  'text.close.all.tag', // 关闭全部标签页
  'text.select.time', // 选择时间
  'text.end.time', // 结束时间
  'text.department.select', // 部门选择
  'text.drag.file.here', // 将文件拖到此处，或
  'text.click.select.file', // 点击选择文件
  'text.upload.file.restriction', //'文件不能超过{0}M'
  'text.upload.file.restriction.little', //'文件不能超过{0}kb'
  'text.file.number', //'最多上传{0}个文件'
  'text.file.exceedLimit', //'最多上传{0}个文件，你本次选择了{1}个文件，共选择了{2}个文件，超出上传个数！'
  'text.file.selectFile', //'请选择文件！'
  'text.file.selectNewFile', //'请选择新的文件！'
  'text.file.type.error', //'文件：{0}，类型错误，可上传的文件类型：{1}！'
  'text.file.maxFileSize.exceed', //'文件：{0}，大小超过：{1}MB！'
  'text.file.maxFileSize.exceed.little', //'文件：{0}，大小超过：{1}kb！'
  'text.click.add', // 点击添加
  'text.tag', // 标签
  'text.tag.client.num.exceed', // 对客户端显示的标签最多只能选用5个！
  'text.colon', // 冒号
  'text.view', // 查看
  'text.batch.edit', // 批量修改
  'text.batch.del', // 批量删除
  'text.batch.app', // 批量申请
  'text.plan.add.tag.hint1', // 提示说明：1、对客户端显示的标签最多只能选用5个
  'text.plan.add.tag.hint2', // 2、颜色为橙色的表示仅销售顾问端显示；颜色为蓝色表示销售顾问端和客户端都显示。
  'text.sold_out', // 下架
  'text.lock_group', // 锁团
  'text.booking_situation', // 订位情况
  'text.edit_log', // 修改记录
  'text.batch.edit.issue', // 批量修改发布
  'text.choose.at.least.one', // 请至少选择一条记录！
  'text.search.result', // 搜索结果
  'text.operation.line', // 操作列
  'text.cut.add', // 切换到添加
  'text.reservation_manage', // 扣位管理
  'text.success', //'成功'
  'text.failed', //'失败'
  'text.look.detail', //查看明细
  'text.total', //总计：
  'text.app_id', //'申请ID'
  'text.who_app', //'申请人'
  'text.app_time', //'申请时间'
  'text.app_remark', //'申请备注'
  'text.export', //'导出'
  'text.app_info', //'申请信息'
  'text.order_info', //'订单信息'
  'text.app_loc', //'申请部门'
  'text.order.contract.info', //'订单合同信息'
  'text.yes', //'是'
  'text.no', //'否'
  'text.recover', //'恢复'
  'text.chat.text.history', // 历史
  'text.chat.text.personal', // 个人
  'text.chat.text.team', // 团队
  'text.set_core', // '设定成本'
  'text.chat.text.unread',
  'text.chat.text.read',
  'text.oa.remark.audit',//备注审核
  'text.oa.return.msg',//退回时请输入备注信息
  'text.copy', //复制
  'text.lockTourist', //锁名单
  'text.planChannel.add.error.idNot', //渠道添加失败，渠道id获取失败！
  'text.print',  // 打印
  'text.includeLower', //包含下级
  'text.revoked',     //撤销
  'user.text.please_enter_username_or_name', //请输入用户名/姓名
  'user.text.select_user', //'选择用户',
  'text.add.site', // 添加站点
  'text.copy.site', // 复制站点
]

//对应一些数据库暂时没有的，可以先写到这里面（后面添加到数据库了要记得去掉）
const extraText = {
  'text.aaaa': '123456',
}

//请求参数
const params = {
  msgIds: msgIds + '',
}

const initData = {
  text: {},
  getGeneralData() {
    return initGeneralData()
  },
}

/**
 * 初始化通用数据
 */
const initGeneralData = function() {
  let gData = storage.get('gData')
  //以及获取过的不在重复获取
  let promise = new Promise((resolve, reject) => {
    if (!gData) {
      //同步请求
      //调用后端接口获取通用数据
      get(modelConfig.xframe, url, params)
        .then(res => {
          let data = res.data.data
          Object.assign(initData, data)
          //补充额外消息
          Object.assign(initData.text, extraText)
          //把通用初始化数据存入storage中
          storage.set('gData', initData)
          resolve(res)
        })
        .catch(err => {
          consoleUtils.err('系统页面通用初始化数据获取失败:' + err.msg)
          reject(err)
        })
    } else {
      Object.assign(initData, gData)
      Object.assign(initData.text, extraText)
      resolve()
    }
  })
  return promise
}

export default initData
