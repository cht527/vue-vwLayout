/**
 * Created by lunachi on 2018/4/19.
 * 局过滤器，使用范围：双花括号插值和 v-bind 表达式
 */

import imageFormatUrl from '../utils/imageFormatUrl';

export default {
  install: (Vue) => {
    Vue.filter('imageFormatUrl', imageFormatUrl);
  }
}
