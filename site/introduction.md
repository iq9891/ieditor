# 快速上手
> Vue.js 2.x 在全家桶中的示例

## 功能

1. 图片支持 base64
2. 视频支持各种格式，编辑器内容支持手机端渲染
3. 定制化编辑器
4. 样式完全独立可修改

## Vue.js 中简单使用

<div id="ied" class="ied" ref="ied"></div>

<script>
import IEditor from '../src/core/ieditor';

export default {
  mounted() {
    const edit = new IEditor({
      el: this.$refs.ied,
      image: {
                            type: 'ajax', // 上传图片显示的类型, base64, ajax
                            ajaxurl: 'http://gateway.inner.evente.cn:8000/public/upload', // ajax 类型的上传地址
                            multiple: true, // 允许多选
                        },
      menus: [
        'forecolor', // 字体颜色
        'fontfamily', // 字体
        'fontsize', // 字号
        'lineheight', // 行高
        'bold', // 加粗
        'justifycenter', // 居中对齐
        'justifyfull', // 两端对齐
        'justifyleft', // 左对齐
        'justifyright', // 右对齐
        'insertorderedlist', // 有序列表
        'insertunorderedlist', // 无序列表
        'image', // 图片
    ],
    });
    edit.init();
  }
};
</script>

## 示例代码

```html
<div id="ied" class="ied" ref="ied"></div>
```

```js
export default {
  // 略去其他代码
  mounted() {
    const edit = new IEditor(this.$refs.ied);
    edit.init();
  }
  // 略去其他代码
};
```

## 普通的 HTML 页面的应用
> 将下面 html 的代码复制到空白 html 的文件中，预览即可。

``` html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>IEditor 的简单应用</title>
  <script src="https://cdn.jsdelivr.net/npm/@iq9891/ieditor@latest/dist/ieditor.min.js"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@iq9891/ieditor@latest/dist/ieditor.min.css">
</head>
<body>
  <div id="demo" class="ied"></div>
  <script>
    const edit = new IEditor(document.getElementById('demo'));
    edit.init();
  </script>
</body>
</html>
```

<style lang="scss">
// IEditor 样式
@import './style/ieditor.scss';
</style>
