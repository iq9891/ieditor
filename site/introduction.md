# 简单使用
> Vue.js 2.x 示例

<div id="ied" class="ied" ref="ied"></div>

<script>
import IEditor from '../src/core/ieditor';

export default {
  mounted() {
    // const edit = new IEditor(this.$refs.ied);

    const edit = new IEditor({
      el: this.$refs.ied,
      diy: 'menu',
    });

    edit.init();
    console.log(edit, 'IEditor');
  }
};
</script>

<style lang="scss">
// IEditor 样式
@import './style/ieditor.scss';
</style>
