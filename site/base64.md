# 图片
在平日使用开源作品的时候，往往遇到没有后端的接口支持上传图片的情况。那么 IEditor 提供无需接口即可轻松使用上传图片功能。

## 演示效果

<div id="ied" class="ied" ref="ied"></div>

<script>
import IEditor from '../src/core/ieditor';

export default {
  mounted() {
    this.edit = new IEditor({
      el: this.$refs.ied,
      image: {
        type: 'base64',
      },
    });
    this.edit.init();
  },
};
</script>

<style lang="scss">
// IEditor 样式
@import './style/ieditor.scss';
</style>
