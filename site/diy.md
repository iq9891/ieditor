# 定制化

IEditor 不仅有着强大的可配置方案，更有着完整的定制化方案。我们只需要简单的配置即可二次开发一款不一样的富文本编辑器。

::: warning
定制化不支持快捷键操作。
:::

## 效果演示
> 只需配置 di 参数即可实现只读功能。默认为 空 。

<div ref="water" :style="editStyle">
  <div class="water-menu">
    <button @click="boldFn" :class="{'on': activeDatas.bold}">加粗</button>
    <button @click="underlineFn" :class="{'on': activeDatas.underline}">下划线</button>
    <button @click="italicFn" :class="{'on': activeDatas.italic}">斜体</button>
    <button @click="copyFn">复制</button>
    <button @click="cutFn">剪切</button>
    <button @click="imageFn">图片</button>
    <button @click="redoFn">重做</button>
    <button @click="undoFn">撤销</button>
    <button @click="removeformatFn">清除样式</button>
    <button @click="fontfamilyFn">宋体</button>
    <button @click="lineheightFn">2倍行高</button>
    <button @click="fontsizeFn">20号字</button>
    <button @click="backcolorFn">蓝色背景</button>
    <button @click="forecolorFn">红色字号</button>
    <button @click="justifycenterFn" :class="{'on': activeDatas.justifycenter}">居中</button>
    <button @click="justifyleftFn" :class="{'on': activeDatas.justifyleft}">居左</button>
    <button @click="justifyrightFn" :class="{'on': activeDatas.justifyright}">居右</button>
    <button @click="justifyfullFn" :class="{'on': activeDatas.justifyfull}">全对齐</button>
    <button @click="fullScreenFn" :class="{'on': fullScreenStatus}">全屏</button>
    <button @click="codeFn" :class="{'on': sourceCode}">源代码</button>
    <button @click="formatblockFn" :class="{'on': activeDatas.formatblock}">引用</button>
    <button @click="indentFn" :class="{'on': activeDatas.indent}">缩进</button>
    <button @click="inserthorizontalruleFn" :class="{'on': activeDatas.inserthorizontalrule}">分割线</button>
    <button @click="insertunorderedlistFn" :class="{'on': activeDatas.insertunorderedlist}">无序列表</button>
    <button @click="insertorderedlistFn" :class="{'on': activeDatas.insertorderedlist}">有序列表</button>
    <button @click="videoFn">视频</button>
    <button @click="linkFn">连接</button>
  </div>
  <div ref="text" contenteditable="true" class="water-text"></div>
</div>

## 示例代码

```html
<div ref="water" :style="editStyle">
  <div class="water-menu">
    <button @click="boldFn" :class="{'on': activeDatas.bold}">加粗</button>
    <button @click="underlineFn" :class="{'on': activeDatas.underline}">下划线</button>
    <button @click="italicFn" :class="{'on': activeDatas.italic}">斜体</button>
    <button @click="copyFn">复制</button>
    <button @click="cutFn">剪切</button>
    <button @click="imageFn">图片</button>
    <button @click="redoFn">重做</button>
    <button @click="undoFn">撤销</button>
    <button @click="removeformatFn">清除样式</button>
    <button @click="fontfamilyFn">宋体</button>
    <button @click="lineheightFn">2倍行高</button>
    <button @click="fontsizeFn">20号字</button>
    <button @click="backcolorFn">蓝色背景</button>
    <button @click="forecolorFn">红色字号</button>
    <button @click="justifycenterFn" :class="{'on': activeDatas.justifycenter}">居中</button>
    <button @click="justifyleftFn" :class="{'on': activeDatas.justifyleft}">居左</button>
    <button @click="justifyrightFn" :class="{'on': activeDatas.justifyright}">居右</button>
    <button @click="justifyfullFn" :class="{'on': activeDatas.justifyfull}">全对齐</button>
    <button @click="fullScreenFn" :class="{'on': fullScreenStatus}">全屏</button>
    <button @click="codeFn" :class="{'on': sourceCode}">源代码</button>
    <button @click="formatblockFn" :class="{'on': activeDatas.formatblock}">引用</button>
    <button @click="indentFn" :class="{'on': activeDatas.indent}">缩进</button>
    <button @click="inserthorizontalruleFn" :class="{'on': activeDatas.inserthorizontalrule}">分割线</button>
    <button @click="insertunorderedlistFn" :class="{'on': activeDatas.insertunorderedlist}">无序列表</button>
    <button @click="insertorderedlistFn" :class="{'on': activeDatas.insertorderedlist}">有序列表</button>
    <button @click="videoFn">视频</button>
    <button @click="linkFn">连接</button>
  </div>
  <div ref="text" contenteditable="true" class="water-text"></div>
</div>
```

```js
// 略去其他代码
export default {
  // 略去其他代码
  data() {
    return {
      activeDatas: {
        bold: false,
        underline: false,
        italic: false,
        justifycenter: false,
        justifyleft: false,
        justifyright: false,
        justifyfull: false,
        formatblock: false,
        indent: false,
        inserthorizontalrule: false,
        insertunorderedlist: false,
        insertorderedlist: false,
      },
      editStyle: '',
      fullScreenStatus: false,
      sourceCode: false,
    };
  },
  mounted() {
    this.edit = new IEditor({
      diy: {
        menu: true,
        text: this.$refs.text,
        active: result => {
          this.handleActive(result);
        },
      },
    });

    this.edit.init();
  },
  methods: {
    handleActive(result) {
      Object.keys(result).forEach(resultKey => {
        let oneActive = result[resultKey];
        Object.assign(this.activeDatas, {
          [resultKey]: oneActive
        });
      });
    },
    boldFn() {
      this.edit.menu.clicks.bold();
    },
    copyFn() {
      this.edit.menu.clicks.copy();
    },
    cutFn() {
      this.edit.menu.clicks.cut();
    },
    inserthorizontalruleFn() {
      this.edit.menu.clicks.inserthorizontalrule();
    },
    insertorderedlistFn() {
      this.edit.menu.clicks.insertorderedlist();
    },
    insertunorderedlistFn() {
      this.edit.menu.clicks.insertunorderedlist();
    },
    italicFn() {
      this.edit.menu.clicks.italic();
    },
    justifycenterFn() {
      this.edit.menu.clicks.justifycenter();
    },
    justifyfullFn() {
      this.edit.menu.clicks.justifyfull();
    },
    justifyleftFn() {
      this.edit.menu.clicks.justifyleft();
    },
    justifyrightFn() {
      this.edit.menu.clicks.justifyright();
    },
    removeformatFn() {
      this.edit.menu.clicks.removeformat();
    },
    redoFn() {
      this.edit.menu.clicks.redo();
    },
    underlineFn() {
      this.edit.menu.clicks.underline();
    },
    undoFn() {
      this.edit.menu.clicks.undo();
    },
    fontfamilyFn() {
      this.edit.menu.clicks.fontfamily('宋体');
    },
    fontsizeFn() {
      this.edit.menu.clicks.fontsize(20);
    },
    lineheightFn() {
      this.edit.menu.clicks.lineheight(2);
    },
    fullScreenFn() {
      if (!this.fullScreenStatus) {
        this.editStyle = {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          position: 'fixed',
          zIndex: 2222,
        };
      } else {
        this.editStyle = '';
      }
      this.fullScreenStatus = !this.fullScreenStatus;
    },
    imageFn(ev) {
      this.edit.menu.clicks.image(ev);
    },
    formatblockFn() {
      this.edit.menu.clicks.formatblock();
    },
    indentFn() {
      this.edit.menu.clicks.indent();
    },
    codeFn() {
      this.edit.menu.clicks.code();
      this.sourceCode = this.edit.code;
    },
    videoFn() {
      this.edit.menu.clicks.video('<iframe src="http://player.youku.com/embed/XMzg2MDcyNjY4MA==" frameborder=0 "allowfullscreen"></iframe>');
    },
    linkFn() {
      this.edit.menu.clicks.link('百度的超级链接', 'http://baidu.com');
    },
    backcolorFn() {
      this.edit.menu.clicks.backcolor('#1996f9');
    },
    forecolorFn() {
      this.edit.menu.clicks.forecolor('#fd883b');
    },
  },
  // 略去其他代码
};
```

```scss

.water {
  &-menu {
    margin: 0;
    padding: 0;
    background: #fff;

    & button {
      display: inline-block;
      border: 1px solid #dcdcdc;
      margin: 0 0 10px;
      padding: 4px 10px;

      &.on {
        background: #dcdcdc;
      }

      &:focus {
        outline: none;
      }
    }
  }

  &-text {
    border: 1px solid #dcdcdc;
    min-height: 270px;
    height: calc(100% - 32px);
    width: calc(100% - 32px);
    padding: 16px;
    overflow: auto;
    position: relative;
    background: #fff;
    color: #333;
    font-family: 'Microsoft YaHei', 'PingFangSC', 'Helvetica', sans-serif, 'Arial';

      &:focus {
        outline: none;
      }

      & strong,
      & b {
        font-weight: bold !important;
      }

      & i {
        font-style: italic !important;
      }

      & p {
        margin: 10px 0 !important;
        word-break: break-all !important;
        line-height: 1;
      }

      & blockquote {
        border-left: 5px solid #ccc !important;
        padding: 10px 20px !important;
        margin: 10px 0 !important;
        color: #999;
        font-size: 16px;

        & p {
          margin: 5px 0 !important;
        }
      }

      & .ied-code {
        resize: none;
        width: calc(100% - 32px);
        height: calc(100% - 32px);
        display: block;
        position: absolute;
        left: 16px;
        top: 16px;
        padding: 0;
        border: none;

        &:focus {
          outline: none;
        }
      }
  }
}
```

<script>
import IEditor from '../src/core/ieditor';

export default {
  data() {
    return {
      activeDatas: {
        bold: false,
        underline: false,
        italic: false,
        justifycenter: false,
        justifyleft: false,
        justifyright: false,
        justifyfull: false,
        formatblock: false,
        indent: false,
        inserthorizontalrule: false,
        insertunorderedlist: false,
        insertorderedlist: false,
      },
      editStyle: '',
      fullScreenStatus: false,
      sourceCode: false,
    };
  },
  mounted() {
    this.edit = new IEditor({
      diy: {
        menu: true,
        text: this.$refs.text,
        active: result => {
          this.handleActive(result);
        },
      },
    });

    this.edit.init();
  },
  methods: {
    handleActive(result) {
      Object.keys(result).forEach(resultKey => {
        let oneActive = result[resultKey];
        Object.assign(this.activeDatas, {
          [resultKey]: oneActive
        });
      });
    },
    boldFn() {
      this.edit.menu.clicks.bold();
    },
    copyFn() {
      this.edit.menu.clicks.copy();
    },
    cutFn() {
      this.edit.menu.clicks.cut();
    },
    inserthorizontalruleFn() {
      this.edit.menu.clicks.inserthorizontalrule();
    },
    insertorderedlistFn() {
      this.edit.menu.clicks.insertorderedlist();
    },
    insertunorderedlistFn() {
      this.edit.menu.clicks.insertunorderedlist();
    },
    italicFn() {
      this.edit.menu.clicks.italic();
    },
    justifycenterFn() {
      this.edit.menu.clicks.justifycenter();
    },
    justifyfullFn() {
      this.edit.menu.clicks.justifyfull();
    },
    justifyleftFn() {
      this.edit.menu.clicks.justifyleft();
    },
    justifyrightFn() {
      this.edit.menu.clicks.justifyright();
    },
    removeformatFn() {
      this.edit.menu.clicks.removeformat();
    },
    redoFn() {
      this.edit.menu.clicks.redo();
    },
    underlineFn() {
      this.edit.menu.clicks.underline();
    },
    undoFn() {
      this.edit.menu.clicks.undo();
    },
    fontfamilyFn() {
      this.edit.menu.clicks.fontfamily('宋体');
    },
    fontsizeFn() {
      this.edit.menu.clicks.fontsize(20);
    },
    lineheightFn() {
      this.edit.menu.clicks.lineheight(2);
    },
    fullScreenFn() {
      if (!this.fullScreenStatus) {
        this.editStyle = {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          position: 'fixed',
          zIndex: 2222,
        };
      } else {
        this.editStyle = '';
      }
      this.fullScreenStatus = !this.fullScreenStatus;
    },
    imageFn(ev) {
      this.edit.menu.clicks.image(ev);
    },
    formatblockFn() {
      this.edit.menu.clicks.formatblock();
    },
    indentFn() {
      this.edit.menu.clicks.indent();
    },
    codeFn() {
      this.edit.menu.clicks.code();
      this.sourceCode = this.edit.code;
    },
    videoFn() {
      this.edit.menu.clicks.video('<iframe src="http://player.youku.com/embed/XMzg2MDcyNjY4MA==" frameborder=0 "allowfullscreen"></iframe>');
    },
    linkFn() {
      this.edit.menu.clicks.link('百度的超级链接', 'http://baidu.com');
    },
    backcolorFn() {
      this.edit.menu.clicks.backcolor('#1996f9');
    },
    forecolorFn() {
      this.edit.menu.clicks.forecolor('#fd883b');
    },
  },
};
</script>

<style lang="scss">
.water {
  &-menu {
    margin: 0;
    padding: 0;
    background: #fff;

    & button {
      display: inline-block;
      border: 1px solid #dcdcdc;
      margin: 0 0 10px;
      padding: 4px 10px;

      &.on {
        background: #dcdcdc;
      }

      &:focus {
        outline: none;
      }
    }
  }

  &-text {
    border: 1px solid #dcdcdc;
    min-height: 270px;
    height: calc(100% - 32px);
    width: calc(100% - 32px);
    padding: 16px;
    overflow: auto;
    position: relative;
    background: #fff;
    color: #333;
    font-family: 'Microsoft YaHei', 'PingFangSC', 'Helvetica', sans-serif, 'Arial';

      &:focus {
        outline: none;
      }

      & strong,
      & b {
        font-weight: bold !important;
      }

      & i {
        font-style: italic !important;
      }

      & p {
        margin: 10px 0 !important;
        word-break: break-all !important;
        line-height: 1;
      }

      & blockquote {
        border-left: 5px solid #ccc !important;
        padding: 10px 20px !important;
        margin: 10px 0 !important;
        color: #999;
        font-size: 16px;

        & p {
          margin: 5px 0 !important;
        }
      }

      & .ied-code {
        resize: none;
        width: calc(100% - 32px);
        height: calc(100% - 32px);
        display: block;
        position: absolute;
        left: 16px;
        top: 16px;
        padding: 0;
        border: none;

        &:focus {
          outline: none;
        }
      }
  }
}
</style>
