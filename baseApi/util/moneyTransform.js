// 金额转换为千字符
/**
 * @params val  Number 只能传递实际的数字，不传数字信不信我给你报错
 * @return str String 返回字符串
 * @author Ken
 * */ 
const moneyTransform = {
  amountChange(num) {
    // "1234.1234" => "1,234.1,234"
    // 从后往前查，看到3个数字就在前面加上逗号
    // (?:\d{3})+  + 号指多次匹配 (?:\d{3}) 会从匹配的下一个位置开始
    // $1 指向第一个分组 (\d)
    // ?= 正向查找不保留数据，只是预查
    let arr = (num || 0).toString().split('.')
    let s1 = arr[0].replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
    let s2 = arr[1] ? arr[1].replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') : ''
    return arr[1] ? `${s1}.${s2}` : `${s1}`
  }
}

export default moneyTransform