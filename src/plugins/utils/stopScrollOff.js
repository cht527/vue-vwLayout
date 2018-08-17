/**
 * @desc 自适应滑动
 */
function stopScrollOff () {
  let _body = window.document.getElementsByTagName('body');
  if (_body && _body.length > 0) {
    _body[0].style.position = 'relative';
  }
}

export default stopScrollOff;
