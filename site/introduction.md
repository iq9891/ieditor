# 简单使用
> Vue.js 2.x 示例

<div id="ied" class="ied" ref="ied"></div>

<script>
import IEditor from '../src/core/ieditor';

export default {
  mounted() {
    new IEditor();
  }
};
</script>

<style lang="scss">
@import '../src/style/editor.scss';
</style>
