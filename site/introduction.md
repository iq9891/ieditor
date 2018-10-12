# 简单使用
> Vue.js 2.x 示例

<div id="ied" class="ied" ref="ied"></div>

<p>
<button @click="boldFn">加粗</button>
</p>

<div ref="text" contenteditable="true" class="diy-text"></div>

<script>
import IEditor from '../src/core/ieditor';

export default {
  mounted() {
    // const edit = new IEditor(this.$refs.ied);

    this.edit = new IEditor({
      // el: this.$refs.ied,
      diy: {
        menu: true,
      },
    });

    this.edit.init();
  },
  methods: {
    boldFn() {
      this.edit.menu.clicks.bold();
    },
  },
};
</script>

<style lang="scss">
// IEditor 样式
@import './style/ieditor.scss';

.diy-text {
  border: 2px solid #1996f9;
  height: 200px;
}
</style>
