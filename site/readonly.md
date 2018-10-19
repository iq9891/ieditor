# 只读编辑器
在日常开发项目中我们偶尔会遇到只读编辑器中内容的情况，那么 IEditor 是可以支持这样的需求的。

## 只读效果
> 只需配置 readonly 参数即可实现只读功能。默认为 false 。

<div id="ied" class="ied" ref="ied"></div>

## 改变只读状态

<p>当前为 <span style="color: red">{{readonly ? '只读' : '编辑'}}</span> 状态</p>
<button @click="changeStatus">改变只读状态</button>

## 示例代码

```html
<div id="ied" class="ied" ref="ied"></div>
```

```js
export default {
  // 略去其他代码
  data() {
    return {
      readonly: true,
    };
  },
  mounted() {
    this.edit = new IEditor({
      el: this.$refs.ied,
      readonly: this.readonly,
    });
    this.edit.init();
  },
  methods: {
    changeStatus() {
      this.readonly = !this.readonly;
      this.edit.setStatus(this.readonly);
    },
  },
  // 略去其他代码
};
```

<script>
import IEditor from '../src/core/ieditor';

export default {
  data() {
    return {
      readonly: true,
    };
  },
  mounted() {
    this.edit = new IEditor({
      el: this.$refs.ied,
      readonly: this.readonly,
    });
    this.edit.init();
    console.log(this.edit, 'IEditor');
  },
  methods: {
    changeStatus() {
      this.readonly = !this.readonly;
      this.edit.setStatus(this.readonly);
    },
  },
};
</script>

<style lang="scss">
// IEditor 样式
@import './style/ieditor.scss';
</style>
