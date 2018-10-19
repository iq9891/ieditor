# 改变大小
在编辑器内置样式中，内容过长时，会自动拉伸内容区域。但是自定义编辑器样式的时候往往会遇到内容区域固定高度的情况可视内容区过小的情况。那么 IEditor 编辑器支持改变内容区域大小的功能。

## 效果演示
> 只需配置 reset 参数即可实现只读功能。默认为 true 。

<div id="ied" class="ied" ref="ied"></div>

## 示例代码

```html
<div id="ied" class="ied" ref="ied"></div>
```

```js
export default {
  // 略去其他代码
  mounted() {
    this.edit = new IEditor(this.$refs.ied);
    this.edit.init();
  },
  // 略去其他代码
};
```

<script>
import IEditor from '../src/core/ieditor';

export default {
  mounted() {
    this.edit = new IEditor(this.$refs.ied);
    this.edit.init();
  },
};
</script>

<style lang="scss">
// IEditor 样式
@import './style/ieditor.scss';
</style>
