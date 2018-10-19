# 快速上手
> Vue.js 2.x 在全家桶中的示例

## 功能

1. 图片支持 base64
2. 视频支持各种格式，编辑器内容支持手机端渲染
3. 定制化编辑器
4. 样式完全独立可修改

## 简单使用

<div id="ied" class="ied" ref="ied"></div>

<script>
import IEditor from '../src/core/ieditor';

export default {
  mounted() {
    const edit = new IEditor(this.$refs.ied);
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

<style lang="scss">
// IEditor 样式
@import './style/ieditor.scss';
</style>
