/**
 * Created by lunachi on 2018/4/24.
 */

/**
 * 格式化图片链接 裁剪处理 默认图片大小：140*105
 * @param url
 * @param width
 * @param height
 * @param crop
 * @returns {string}
 */
function imageFormatUrl (url, width = 140, height = 105, crop = 1) {
  let _url = url;
  if (_url) {
    let _query = (_url.match(/(\?.*$)/) || [''])[0];
    if (_query) {
      _url = _url.replace(_query, '');
    }
  }
  return `${_url}?w=${width}&h=${height}&crop=${crop}`;
}

export default imageFormatUrl;
