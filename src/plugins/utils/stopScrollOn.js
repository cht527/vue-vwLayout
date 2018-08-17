/**
 * @desc 禁止滑动
 */
function stopScrollOn () {
  let _body = window.document.getElementsByTagName('body');
  if (_body && _body.length > 0) {
    _body[0].style.position = 'fixed';
  }
}
export default stopScrollOn
