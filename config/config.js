/**
 * Created by lunachi on 2018/4/25.
 * 项目配置
 */
module.exports = {
  development: {
    host: 'localhost',
    port: 8081,
    publicPath: '/',
    mock: true,
    autoOpenBrowser: true,
  },
  production: {
    publicPath: '//j1.58cdn.com.cn/frs/fangfe/act-intelligent-adverting/1.0/',
    compressCss: false,
    minimize: true
  }
}
