# Free

## 1、简介

Free是一款轻量级的JS工具库，内置了上百个常用函数，用来提高开发效率。

## 2、下载

``` shell
npm install free-min
```

## 3、使用方法

### 3.1、直接引用

通过 ``script`` 标签引入 ``Free.js``  后，会在全局对象 ``window`` 上挂载一个 ``Free`` 对象，可以直接通过 ``Free`` 对象来调用 Free 中的方法

``` shell
<script src="xxx/Free.js"></script>
```

### 3.2、在 Vue 中使用 Free

1. 在 ``main.js`` 中引入 ``Free``

``` javascript
import '../node_modules/free-min/dist/Free'
```

2. 将 Free 对象 挂载到 Vue 的原型对象上，便于全局调用

``` javascript
Vue.prototype.Free = windoiw.Free;
```

## 4、简单的使用案例

1. 直接使用

``` javascript

```

