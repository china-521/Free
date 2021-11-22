# 【Free文档】



## 一、前言

Free是一款轻量级的工具集合。，内置多种js功能函数，用来快速实现常见的js效果，目前属于个人维护
。

当前Free的版本是：1.0.3

由于使用了es 6语法，所以当前Free并不支持在 IE浏览器上运行，如果需要在 IE浏览器上使用，则

需要将Free转换为 es 5 语法后再使用。

[Free-欢迎访问npm](https://www.npmjs.com/package/free-wk)

##  二、下载方式

### npm下载

推荐使用 npm 的方式安装，它能更好地和 webpack 打包工具配合使用。

npm 局部下载

``` npm
npm i free-wk
```

或 npm 全局下载

``` npm
npm i free-wk -g
```

## 三、 API

这里为使用者提供了Free的API

### （1）getStyle 获取元素样式

* 功能说明：获取元素的已有的样式

* 参数说明：
  @param {String} selector 要获取样式的选择器。
  @param {String} name 要获取的样式。

* 使用方法：Free.getStyle(selector,name);

* 使用实例：

  ``` HTML
  <!DOCTYPE html>
  <html lang="en">
      
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Free-获取元素样式测试</title>
      <style type="text/css">
          .box {
              width: 150px;
              height: 150px;
              margin: 0 auto;
              color:rgb(0, 250, 187);
              background-color: rgb(1, 111, 255);
          }
          .main {
              width: 250px;
              height: 250px;
              border: 2px solid #baf;
              text-align: center;
              margin: 0 auto;
          }
          .btn{
              margin-top:10px;
          }
      </style>
  
      <script src="../Free.js"></script>
  </head>
  
  <body>
      <div class="main">
          <button class="btn">点击获取box的样式</button>
          <br /><br />
          <div class="box"></div>
      </div>
      <script type="text/javascript">
          Free.eventAll('.btn', 'click', function () {
              let box = Free.getElement('.box');
              let width = Free.getStyle('.box', 'width');
              let height = Free.getStyle('.box', 'height');
              let background = Free.getStyle('.box', 'background-color');
              box.innerHTML = "width:" + width + '<br/>' + "height:" + height + '<br/>' + "background:" + background;
          });
      </script>
  </body>
  
  </html>
  ```
  

