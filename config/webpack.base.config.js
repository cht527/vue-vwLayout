/**
 * Created by lunachi on 2018/4/25.
 */

const path = require('path')
const webpack = require('webpack')
const Merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const WebpackHtmlConfig = require('./webpack.html.config')

module.exports = function (env) {
  return Merge({
    mode: 'development',
    entry: {},
    output: {
      path: path.resolve(__dirname, '../build'),
      filename: '[name].js',
    },
    optimization: {
      occurrenceOrder: true,
      splitChunks: {
        chunks: 'async',
        minSize: 30000,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        name: true,
        cacheGroups: {
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /[\\/]node_modules[\\/]/,
            priority: -10
          }
        }
      }
    },
    resolve: {
      extensions: ['.js', '.vue', '.json', '.css'],
      alias: {
        'vue': path.resolve(__dirname, '../node_modules/vue/dist/vue.esm.js'),
        '@': path.resolve(__dirname, '../src')
      }
    },
    module: {
      noParse: function (content) {
        return /Zepto|zepto|jQuery|WBAPP/.test(content);
      },
      rules: [
        {
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          enforce: 'pre',
          exclude: /(node_modules|build)/,
          options: {
            formatter: require('eslint-friendly-formatter'),
          }
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              'css-loader',
              'postcss-loader',
            ]
          })
        },
        {
          test: /\.less$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              'css-loader',
              'postcss-loader',
              'less-loader',
            ]
          })
        },
        {
          test: /\.vue$/,
          use: {
            loader: 'vue-loader',
            options: {
              // ignore space
              preserveWhitespace: false,
              // extract css
              extractCSS: true,
              transformToRequire: {
                video: ['src', 'poster'],
                source: 'src',
                img: 'src',
                image: 'xlink:href'
              }
            }
          }
        },
        {
          test: /\.js$/,
          exclude: path.resolve(__dirname, '../node_modules'),
          loader: 'babel-loader',
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'imgs/[name].[hash:7].[ext]',
          }
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'medias/[name].[hash:7].[ext]'
          }
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'fonts/[name].[hash:7].[ext]'
          }
        }
      ]
    },
    plugins: [
      // extract css
      new ExtractTextPlugin({
        filename: '[name].css',
        allChunks: true,
      }),
      // Cannot read property 'eslint' of undefined
      new webpack.LoaderOptionsPlugin({options: {}}),
    ],
  }, WebpackHtmlConfig(env));
}
