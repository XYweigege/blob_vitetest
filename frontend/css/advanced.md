# 关于 BFC，块级格式化上下文

## 概念：

他是一个独立的渲染区域，规定在该区域中，常规流块盒的布局
常规流块盒在水平方向上，必须撑满包含块。

常规流块盒在包含块的垂直方向上依次摆放，。

常规流块盒若外边距无缝相邻，则进行外边距合并。

常规流块盒的自动高度和摆放位置，无视浮动元素

BFC 块级格式化上下文，不同的 BFC 区域进行渲染互不干扰

具体规则：
创建 BFC 的元素，它的自动高度需要计算浮动元素。

创建 BFC 的元素，它的边框盒不会与浮动元素重叠

创建 BFC 的元素不会和他的子元素进行外边距合并

## 哪些元素会创建 BFC？

创建 BFC 常见的情况：

1. 根元素
2. 浮动和绝对定位元素
3. overflow 不等于 visible 的元素。

BFC 作用举例 1 : 用于解决浮动导致的高度坍塌。
子元素设置 float 属性后，父元素可以使用副作用最小的创建 BFC 方式。overflow:hidden。然后会计算浮动的高度了。

BFC 作用举例 2: 创建 BFC 的元素不会和他的子元素进行外边距合并。处在不同 BFC 中的元素不会进行外边距合并
只有在同个 BFC 中才会进行外边距合并。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div class="container">
      <div class="son"></div>
    </div>

    <style>
      .container {
        overflow: hidden;
        margin-top: 30px;
        height: 100px;
        width: 100px;
        background-color: palegoldenrod;
      }
      .son {
        height: 20px;
        width: 20px;
        background-color: red;
        margin: 50px;
      }
    </style>
  </body>
</html>
```
