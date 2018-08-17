
## 技术栈
> vue2 + es6 + less + webpack4 + mintUI

| 技术 | 描述 |
| --- | --- |
| vue2	| https://cn.vuejs.org/ |
| axios	| https://github.com/axios/axios |
| jsonp | https://github.com/webmodules/jsonp |
| es6 | http://www.ecma-international.org/ecma-262/6.0/ |
| mintUI | http://mint-ui.github.io/docs/#/zh-cn2 |
| less | http://lesscss.cn/ |
| eslint | http://eslint.org/ |
| mockjs | http://mockjs.com  [示例](http://mockjs.com/examples.html#Basic)|
| webpack4 | http://webpack.github.io |
| npm scripts | https://docs.npmjs.com/misc/scripts |

**其他**

* [eslint standard 代码书写规范](https://github.com/standard/standard/blob/master/docs/RULES-zhcn.md)
* [postcss-cssnext](https://github.com/MoOx/postcss-cssnext) 自动加浏览器前缀、css4
* [postcss-adaptive](https://github.com/songsiqi/postcss-adaptive) px转换rem


## 目录结构

   	```
    ├── build                           # 打包后代码
    │   ├── views                       # 编译后的模板文件
    │   └── *.js、*.css                 # 编辑后的静态资源文件
    ├── config                          # webpack配置
    │   ├── check.versions.js           # node、npm版本检查
    │   ├── config.js                   # 自定义配置
    │   ├── webpack.analyze.conf.js     # 打包分析
    │   ├── webpack.base.conf.js        # webpack 通用配置
    │   ├── webpack.dev.config.js       # webpack 开发环境
   	│   ├── webpack.html.conf.js        # webpack 动态生成页面配置
   	│   └── webpack.prod.config.js      # webpack 生产环境
   	├── docs                            # 文档
    ├── mock                            # mock数据
   	│   ├── mock.api.js                 # mock api入口
   	│   └── *.json                      # mock json
   	├── src                             # 源码
   	│   ├── assets                      # 静态资源
   	│   ├── components                  # 组件
   	│   ├── mixins                      # vue 混入
   	│   ├── plugins                     # 插件
   	│   │   ├── directives              # 全局指令
   	│   │   ├── filters                 # 全局过滤器
   	│   │   ├── services                # 数据交互
   	│   │   ├── utils                   # 常用工具方法
   	│   │   ├── widgets                 # 插件集合
   	│   │   └── index.js                # 入口
   	│   └── views                       # 页面文件
   	├── .babelrc                        # babel配置
   	├── .editorconfig                   # 编辑器配置
   	├── .eslintrc.js                    # eslint配置
   	├── .gitignore                     
   	├── .postcssrc.js                   # postcss配置
   	├── package.json                    
   	└── README.md                       
   	```

## 规范

### 关于本地开发
> `config/webpack.html.config.js` 会遍历`src/views`目录，自动配置`HtmlWebpackPlugin`

1. 在 views 目录下新建页面目录，例如：demo
2. 在 demo 目录下新建三个文件: index.html、index.js、index.vue (注：后续优化-通过命令自动生成)

### 关于API接口和本地测试
> 所有的数据api接口都要在本地有一一对应的测试数据

* 所有后端的api接口都要在 `src/plugins/services/api.js` 里配置，不允许在业务代码中写死
* `mock/mock.api.js` 数据请求方法是和 `src/plugins/services/api.js` 一一对应的
* 可以通过*.json方式，也可以通过编程方式，命名方式要跟api接口一致，方便查找

示例：
```src/plugins/services/api.js
{
  apiDemoList: `${host}/api_demo_list`
}
```

```mock/mock.api.js
  app.get('/api_demo_list', function (req, res) {
    res.json({});
  });
```

### 关于`(.vue)`单文件

* 保持 `注释`、`<template>`、`<script>`、 `<style>` 标签的顺序一致，且以一个空行分隔
* `<style>` 要放在最后
* `<template>`、`<script>` 至少要有一个

  ```
  <!-- 注释 -->
  
  <template>
   <!--template code-->
  </template>

  <script>
    /* script code */
  </script>

  <style rel="stylesheet/less" lang="less">
    /* less code */
  </style>
  ```

注：顶级元素默认`lang`： `<template>: html`、`<script>: js`、`<style>: css`。

### 关于组件
#### 组件和方法的引用

* 代码里不出现相对路径，通过webpack定义别名到src目录
* webpack配置：

  ```
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  },
  ```
* 引用实例：

  ```
    import BaseMixin from '@/mixins/base';
  ```
  
#### 组件的命名

* 组件命名：每个组件一个文件夹，文件夹名称采用`kebab-case`方式，组件名采用`PascalCase`方式

  ```
  ├── components
  │   ├── demo-comp
  │   │   └── index.vue
  ```

  ```index.vue
  export default {
    name: 'DemoComp',
    // ...
  }
  ```
    
* 紧密耦合的组件命名
和父组件紧密耦合的子组件应该以父组件名作为前缀命名。

  ```
  ├── components
  │   ├── demo-comp
  │   │   └── index.vue
  │   ├── demo-comp-item
  │   │   └── index.vue
  │   ├── demo-comp-button
  │   │   └── index.vue
  ```

* 组件的单词顺序 高级别优先

  ```
  ├── components
  │   ├── search-bar
  │   │   └── index.vue
  │   ├── search-bar-location
  │   │   └── index.vue
  │   ├── search-bar-price
  │   │   └── index.vue
  ```
 
#### 组件的书写
* `props` 定义应该尽量详细,至少需要指定其类型。
在声明 `prop` 的时候，以 `camelCase`。

  ```

  props: {
    status: {
      type: String,
      default:'',
    }
  }

  props: {
    status: {
      type: Object,
      default: function(){
        return {};
      },
    }
  }

  props: {
    status: {
      type: String,
      required: true,
      validator: function (value) {
        //...
      },
    }
  }
  ```

  ```
  <demo-comp :status="hi"/>
  ```
* `data` 按功能汇总

  ```
    data () {
      return {
        houseDate: {
          pageSize: 10,
          pageNum: 1,
          list: []
        }
      }
    },
  ```
  
* `v-for` 必须设置 `key` 值

  ```
  <ul>
    <li v-for="todo in todos" :key="todo.id">
      {{ todo.text }}
    </li>
  </ul>
  ```

### 关于命名

#### 脚本
* 变量、方法命名以小驼峰式，例如: `aaBb`
* 事件类方法以handle开头，例如: `handleAaBb`
* api接口类方法以fetch开头，例如: `fetch[AaBb]Data`
* 页面初始化api接口统一命名为，例如: `fetchData`

#### 全局变量
* 模板中的全局变量统一命名为pageData

### 关于样式

* 通用样式目录

  ```
  ├── src
  │   ├── assets
  │   │   ├── css
  │   │   │   ├── 1px.less          # 1像素
  │   │   │   ├── base.less         # 所有 view 基础引用
  │   │   │   ├── mixin.less        # less 自定义扩展
  │   │   │   └── reset.less        # css reset
  ```
  
  页面less引用 
  
  ```
  @import '../../assets/css/base.less';
  ```
  
  组件less引用
  
  ```
  <style rel="stylesheet/less" lang="less">
    @import (reference) '../../assets/css/base.less';
  </style>
  ```
  
  注：为减少重复代码，组件引用 `base.less` 必须加上 `(reference)`， [import-options-reference](http://lesscss.cn/features/#import-options-reference)。

* 用类选择器替换元素选择器，即每个html元素都增加`class`属性。
* 类名采用 `kebab-case`（短横线命名）

  ```
  <template>
    <div class="btn-close">X</div>
  </template>

  <style rel="stylesheet/less" lang="less">
    .btn-close {
      background: #ccc;
    }
  </style>
  ```
* 注释，使用 `/* */` 进行注释，缩进与代码保持一致，代码行的末尾注释需与代码间隔一个空格。

  ```
  .selector {
      /* 宽、高 */
      width: 90%;
      height: 100px; /* 高度 */
  }
  ```
* 缩进：`2` 个空格

  ```
    .selector {
      background: #ccc;
    }
  ```
* 分号：每个属性声明末尾都要加分号
  ```
    .selector {
      width: 100%;
      height: 100%;
    }
  ```
* 引号：统一使用双引号
  ```
  .selector:after {
      content: "";
  }
  ```
* 属性声明顺序

  * 影响文档流的属性（比如：`display / position / float / clear / visibility` 等）
  * 自身盒模型的属性（比如：`width / height / margin / padding / border` 等）
  * 排版相关属性（比如：`font / line-height / text-align / vertical-align` 等）
  * 装饰性属性（比如：`color / background / opacity / cursor` 等） 
  * CSS3 新特性（比如：`transform / transition / animation` 等）