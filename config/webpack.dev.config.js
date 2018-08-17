/**
 * Created by lunachi on 2018/4/25.
 */

const path = require('path')
const Merge = require('webpack-merge')
const config = require('./config')
const WebpackBaseConfig = require('./webpack.base.config')

module.exports = function (env) {
  const WebpackDevConfig = {
    mode: 'development',
    output: {
      publicPath: config.development.publicPath,
    },
    plugins: [],
    devServer: {
      hot: true,
      contentBase: path.join(__dirname, "../src/views"),
      compress: true,
      host: config.development.host,
      port: config.development.port,
      open: config.development.autoOpenBrowser,
      proxy: {
      '/intelligentapp': {
          // target: 'http://10.8.8.202:8001',
          target: 'http://10.8.8.143:8001',
          changeOrigin: true,
          // pathRewrite: {
          //     '^/graduate': '/'
          // }
        }
      }
    },
  };

  if (config.development.mock) {
    Object.assign(WebpackDevConfig.devServer, require('../mock/mock.api'));
  }

  return Merge(WebpackBaseConfig(env), WebpackDevConfig);
}
