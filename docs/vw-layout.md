

## 项目应用

通过Vue-cli构建的项目，在项目的根目录下有一个.postcssrc.js，默认情况下已经具备了一下配置：


```
module.exports = {
    "plugins": {
        "postcss-import": {}, //解决@import引入路径问题
        "postcss-url": {},    //处理文件，比如图片文件、字体文件等引用路径的处理
        "autoprefixer": {}   //自动处理浏览器前缀
    }
}
```

在实际项目开发中，要完成适配方案，我们还要借助几个重要的PostCSS的插件：

####  1、 postcss-px-to-viewport

https://github.com/evrone/postcss-px-to-viewport

 postcss-px-to-viewport可以在自动将px单位转换成vw，这样我们就可以根据设计稿的标注直接在代码中使用px了

在工程的==.postcssrc.js==文件配置该插件：


```
"postcss-px-to-viewport": {
     viewportWidth: 750,     // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
     viewportHeight: 1334,  // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
     unitPrecision: 5,           // 指定`px`转换为视窗单位值的小数位数
     viewportUnit: 'vw',       // 指定需要转换成的视窗单位，建议使用vw
     selectorBlackList: [ 'hairlines','ignore','font' ],     // 指定不转换为视窗单位的类名
     minPixelValue: 1,         // 小于或等于`1px`不转换为视窗单位
     mediaQuery: false       // 允许在媒体查询中转换`px
 }
```

其中在我们不想要把px转换为vw的时候，首先在对应的元素中添加配置中指定的类名，如.hairlines(.hairlines一般用于设置border-width:0.5px的元素中)。在下文进行介绍

#### 2、postcss-aspect-ratio-mini

https://github.com/yisibl/postcss-aspect-ratio-mini

实际的页面开发中，UI设计图会对某些元素要求固定的宽高比,
借助一丝大神开发的postcss-aspect-ratio-mini插件，用来处理img、iframe、video和object这些元素的自适应问题。简单点讲，就是根据容器的宽度，按照宽高比例自动计算出容器的大小

这个插件使用很简单，不需要做任何的配置，你只需要本地安装一下就OK，示例如下：

编写的css代码：

```
.aspect-box {
    position: relative;
}

.aspect-box {
    aspect-ratio: '16:9';
}
```
经过编译后的css代码：

```
.aspect-box {
    position: relative;
}

.aspect-box:before {
    padding-top: 56.25%;
}
```
具体效果查看工程中的aspect-ratio页面

特别注意：

aspect-ratio属性不能和其他属性写在一起，否则编译出来的属性只会留下aspect-ratio的值。主要是因为在插件中做了相应的处理，不在每次调用aspect-ratio时，生成前面指定的默认样式代码，这样代码没那么冗余。

#### 3、postcss-viewport-units

https://github.com/springuper/postcss-viewport-units

到目前为止，移动端机型中Android4.4以下机型是不支持vw的适配方案。那么如果业务需要，有两种方式可以进行降级处理。
如果不需要兼容低版本，以下几步就没必要进行操作

postcss-viewport-units插件主要是给CSS的属性添加content的属性，配合viewport-units-buggyfill库给vw、vh、vmin和vmax做适配的操作。

viewport-units-buggyfill主要有两个JavaScript文件：viewport-units-buggyfill.js和viewport-units-buggyfill.hacks.js。

第一步：在你的HTML文件中引入这两个文件
```
<script src="https://cdn.bootcss.com/viewport-units-buggyfill/0.6.2/viewport-units-buggyfill.min.js"></script>
<script src="https://cdn.bootcss.com/viewport-units-buggyfill/0.6.2/viewport-units-buggyfill.hacks.min.js"></script>

```

第二步：在HTML文件中调用viewport-units-buggyfill  

```
window.onload = function () {
  window.viewportUnitsBuggyfill.init({ hacks:    window.viewportUnitsBuggyfillHacks });
}
```

到此为止，关于所需要的PostCSS已配置完。并且简单的介绍了各个插件的作用，至于详细的文档和使用，可以参阅对应插件的官方文档

智能推广管家项目的.postcss.js文件最终配置如下：


```
"plugins": {
    "postcss-import": {},
    "postcss-url": {},
    "postcss-cssnext": {},
    "postcss-aspect-ratio-mini": {}, 
    "postcss-px-to-viewport": { 
      viewportWidth: 750, // (Number) The width of the viewport. 
      viewportHeight: 1334, // (Number) The height of the viewport. 
      unitPrecision: 3, // (Number) The decimal numbers to allow the REM units to grow to. 
      viewportUnit: 'vw', // (String) Expected units. 
      selectorBlackList: ['.ignore', '.hairlines'], // (Array) The selectors to ignore and leave as px. 
      minPixelValue: 1, // (Number) Set the minimum pixel value to replace. 
      mediaQuery: false // (Boolean) Allow px to be converted in media queries. 
    }, 
    "postcss-viewport-units":{},
    "cssnano": { 
       preset: "advanced", 
       autoprefixer: false, 
       "postcss-zindex": false 
    }

  }
```
其中cssnano主要用来压缩和清理CSS代码,在cssnano的配置中，使用了preset: "advanced"，所以我们需要另外安装

```
npm i cssnano-preset-advanced --save-dev
```
在配置项中把autoprefixer和postcss-zindex禁掉,autoprefixer跟已经安装的postcss-cssnext重复调用。而postcss-zindex只要启用了，z-index的值就会重置为1，所以得将postcss-zindex设置为false。


### 解决Retina屏的1px的问题


智能推广管家的vue工程原本使用lib-flexbile v2 加上媒体查询的方式处理1px显示问题，这里既然已经将方案从rem适配过渡到了vw适配，lib-flexbile就不再需要了，不过我们可以借助其中对0.5px的支持判断逻辑，配合原本项目中的媒体查询。具体使用步骤如下：

step1:在页面引入如下代码判断是否支持0.5px，添加hairline类名,否则添加notHairlines类名


```
(function flexible (window, document) {
  var docEl = document.documentElement;
  var dpr = window.devicePixelRatio || 1;
   if (dpr >= 2) {
    var fakeBody = document.createElement('body')
    var testElement = document.createElement('div')
    testElement.style.border = '.5px solid transparent'
    fakeBody.appendChild(testElement)
    docEl.appendChild(fakeBody)
    if (testElement.offsetHeight === 1) {
      docEl.classList.add('hairlines')
    }else{
      docEl.classList.add('notHairlines')
    }
    docEl.removeChild(fakeBody)
  }
}(window, document))
```
step2: 在vue组件中引入媒体查询相关的css-- 1px.less

step3: 在具体使用时在对应的标签上添加边框对应得类名，如下边框，则添加bbOnepx
```
<div class="analysis-title-text bbOnepx">推广管家帮您分析</div>
```
具体使用请查看assets/css/1px.less 


