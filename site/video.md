# 视频

IEditor 的视频功能不仅支持视频网站分享的带有 iframe 标签字样的视频，更支持视频格式( MP4 等)的 Video 标签的视频。

## MP4 格式的配置
> 测试连接 http://www.w3school.com.cn/i/movie.ogg

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
      video: {
         // iframe 是复制视频网站的分享地址，其他格式的都是 video 模式
        type: 'mp4',
      },
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
      video: {
         // iframe 是复制视频网站的分享地址，其他格式的都是 video 模式
        type: 'mp4',
        controls: true,
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
