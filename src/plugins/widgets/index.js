import Toast from './toast'

export default {
  install: (Vue) => {
    Object.defineProperty(Vue.prototype, '$toast', {value: Toast});
  }
}
