## 颜色

IEditor 编辑器提供颜色配置，不仅可配置固定颜色，也可以通过一个方法，按某一种算法配置颜色。

## 示例效果
> color 中的 color 类型支持数组( Array )和函数( funciton )。当为函数的时候，返回值的类型必须是数组。

<div id="ied" class="ied" ref="ied"></div>

## 示例代码

```html
<div id="ied" class="ied" ref="ied"></div>
```

```js
export default {
  // 略去其他代码
  mounted() {
    this.edit = new IEditor({
      el: this.$refs.ied,
      color: {
        color() {
          return ['#191919', '#dcdcdc', '#1996f9', '#fd883b', '#4cbd63', '#ff4949'];
        },
      }
    });
    this.edit.init();
  },
  // 略去其他代码
};
```

<script>
import IEditor from '../src/core/ieditor';

export default {
  mounted() {
    this.edit = new IEditor({
      el: this.$refs.ied,
      color: {
        color() {
          return ['#191919', '#dcdcdc', '#1996f9', '#fd883b', '#4cbd63', '#ff4949'];
        },
      }
    });
    this.edit.init();
  },
};
</script>

<style lang="scss">
// IEditor 样式
@import './style/ieditor.scss';
</style>
