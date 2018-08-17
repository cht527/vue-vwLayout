/**
 * Created by lunachi on 2018/4/25.
 */

require('./check.versions')()

const webpack = require('webpack')
const Merge = require('webpack-merge')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const config = require('./config')
const WebpackBaseConfig = require('./webpack.base.config')

module.exports = function (env) {
  const WebpackProdConfig = {
    mode: 'production',
    output: {
      publicPath: config.production.publicPath,
    },
    optimization: {
      // replace UglifyJsPlugin
      minimize: config.production.minimize,
    },
    plugins: [
      // keep module.id stable when vendor modules does not change
      new webpack.HashedModuleIdsPlugin(),
      // enable scope hoisting
      new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.optimize.OccurrenceOrderPlugin()
    ],
  };

  if (config.production.compressCss) {
    prodConf.plugins.push(
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {safe: true}
      }),
    );
  }

  return Merge(WebpackBaseConfig(env), WebpackProdConfig);
}
