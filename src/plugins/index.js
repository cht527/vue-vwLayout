import Lazyload from 'vue-lazyload'

import Directives from './directives'
import Filters from './filters'
import Services from './services'
import Utils from './utils'
import Widgets from './widgets'

const config = {
    //app自动发送展现埋点开关
    appAutoShowTrack: false,
    //app埋点params参数的默认值
    appParams: [],
    //展现埋点
    _trackURL: {},
    //自动加载开关
    autoLoadSwitch: true,
    //自动加载默认配置
    autoLoad: {},
    // 发送m的点击埋点时将appParams里的参数加在actionType后面
    addAppParamsToTrackUrl: false,
    // appParams参数加在m埋点里的的分隔符
    AppParamsToTrackUrlSeparator: '&',
    //app环境下，对配置过映射关系的a标签地址自动劫持并跳转native。处于试验阶段，问题较多，不建议开启。
    hijack: false,
    // 是否为新载体，默认老载体
    newAppJs: false,
     // 新载体jdk地址
    newAppJsPath:'//a.58cdn.com.cn/app58/rms/app/js/app_30805.js',
};

export default {
  install: (Vue, options) => {
    // 图片懒加载
    Vue.use(Lazyload);

    // 全局过滤器
    Vue.use(Filters);

    // 全局指令
    Vue.use(Directives);

    // 帮助类
    Vue.use(Utils);

    // 后端服务请求
    Vue.use(Services);

    // flib

    // 插件
    //Vue.use(Widgets);
  }
}
