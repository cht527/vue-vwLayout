/* 判断对象是否为空 */
function isEmptyObj(obj){
    var name;
    for(name in obj){
      return false
    }
    return true
}
export default isEmptyObj