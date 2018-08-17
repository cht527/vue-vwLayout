/**
 * Created by lunachi on 2018/4/25.
 */

const fs = require('fs')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = function (env) {

  const htmlConf = {
    entry: {},
    plugins: [],
  };

  const rootDirPath = '../src/views';

  const setEntryPlugins = (view) => {
    const viewPathJs = path.resolve(__dirname, `${rootDirPath}/${view}/index.js`);
    const viewPathHtml = path.resolve(__dirname, `${rootDirPath}/${view}/index.html`);

    let outFilename = `views/${view}.html`;
    if (process.env.NODE_ENV == 'development') {
      outFilename = `${view}/index.html`;
    }
    if (fs.existsSync(viewPathJs) && fs.existsSync(viewPathHtml)) {
      htmlConf.entry[view] = viewPathJs;

      htmlConf.plugins.push(new HtmlWebpackPlugin({
        inject: true,
        chunks: ['vendor', `${view}`],
        template: viewPathHtml,
        filename: outFilename,
      }));
    } else {
      throw new Error('Not found', viewPathJs, 'or', viewPathHtml);
    }
  };

  const subDirs = fs.readdirSync(path.resolve(__dirname, rootDirPath));
  subDirs.forEach((view) => {
    if (fs.lstatSync(path.resolve(__dirname, rootDirPath, view)).isDirectory()) {
      setEntryPlugins(view);
    }
  });

  return htmlConf;
}
