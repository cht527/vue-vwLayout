/**
 * @desc 从数组中随机获取元素
 * @param {Array} arr
 * @return {Number}
 */
function arrayRandom (arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

export default arrayRandom
