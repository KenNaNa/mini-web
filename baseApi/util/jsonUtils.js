/**
 * json操作工具js
 */
const jsonUtils = {
  objToJson(obj){
    return JSON.stringify(obj)
  },
  jsonToObj(jsonStr){
    return JSON.parse(jsonStr)
  }
}
export default jsonUtils
