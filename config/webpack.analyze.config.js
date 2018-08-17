/**
 * Created by lunachi on 2018/4/25.
 */

const Merge = require('webpack-merge')
const WebpackProdConfig = require('./webpack.prod.config')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = function (env) {
  return Merge(WebpackProdConfig(env), {
    plugins: [
      new BundleAnalyzerPlugin()
    ]
  })
}
