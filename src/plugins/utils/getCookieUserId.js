import getCookie from './getCookie';
/**
 * 获取58用户id
 * @returns {string}
 */
function getCookieUserid () {
  let ppu = getCookie('PPU');
  let userId = (ppu.match(/UID=(\d*)&/)) ? RegExp.$1 : '';
  return userId;
}

export default getCookieUserid
