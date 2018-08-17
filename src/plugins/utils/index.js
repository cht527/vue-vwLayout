import arrayRandom from './arrayRandom';
import arrayEqual from './arrayEqual';
import imageFormatUrl from './imageFormatUrl';
import isPhoneX from './isPhoneX';
import getCookie from './getCookie';
import getCookieUserId from './getCookieUserId';
import getUrlParam from './getUrlParam';
import urlParseSearch from './urlParseSearch';
import urlStringfySearch from './urlStringfySearch';
import fixModalScroll from './fixModalScroll';

import stopScrollOn from './stopScrollOn';
import stopScrollOff from './stopScrollOff';

export default {
  install: (Vue) => {
    Object.defineProperty(Vue.prototype, '$utils', {
      value: {
        arrayRandom,
        getCookie,
        getCookieUserId,
        getUrlParam,
        imageFormatUrl,
        isPhoneX,
        stopScrollOn,
        stopScrollOff,
        urlParseSearch,
        urlStringfySearch,
        arrayEqual,
        fixModalScroll
      }
    });
  }
}
