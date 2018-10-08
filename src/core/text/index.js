import compiler from '../compiler';
import $ from '../../shared/dom';
import textTem from './text.html';

const IText = class {
  constructor(editor) {
    this.editor = editor;
    this.$editor = editor.$editor;
    this.uid = editor.uid;
    this.prefix = editor.cfg.prefix;
    // 初始化内容
    this.init();
    // 绑定事件
    this.bind();
  }

  init() {
    this.render();

    this.$text = $(`#${this.prefix}text${this.uid}`);
    this.$wrap = $(`#${this.prefix}wrap${this.uid}`);
  }

  render() {
    this.$editor.html(compiler(
      textTem,
      {
        uid: this.uid,
        prefix: this.prefix,
      },
    ));
  }
  // 绑定事件
  bind() {
    // 实时保存选取
    this.saveRangeRealTime();
    // 处理 tab 键
    this.tab();
    // 清空之后
    this.empty();
  }
  // 实时保存选取
  saveRangeRealTime() {
    const $textElem = this.$text;

    // 保存当前的选区
    const saveRange = (e = window.event) => {
      if (e.keyCode === 9 || e.keyCode === 8) {
        return;
      }
      const { selection, menu } = this.editor;
      // 随时保存选区
      selection.saveRange();
      // 更新按钮 ative 状态
      // menu.testActive();
    };
    // 按键后保存
    $textElem.on('keyup', saveRange);
    $textElem.on('mousedown', () => {
      // mousedown 状态下，鼠标滑动到编辑区域外面，也需要保存选区
      $textElem.on('mouseleave', saveRange);
    });
    $textElem.on('mouseup', () => {
      saveRange();
      // 在编辑器区域之内完成点击，取消鼠标滑动到编辑区外面的事件
      $textElem.off('mouseleave', saveRange);
    });
  }
  // 处理 tab 键
  tab() {
    this.$text.on('keydown', (e = window.event) => {
      if (e.keyCode !== 9) {
        return;
      }
      const { selection } = this.editor;
      // 获取 选区的 $Elem
      const $selectionElem = selection.getSelectionContainerElem();
      if (!$selectionElem) {
        return;
      }
      const $parentElem = $selectionElem.parent();
      const selectionNodeName = $selectionElem.getNodeName();
      const parentNodeName = $parentElem.getNodeName();

      if (selectionNodeName === 'CODE' && parentNodeName === 'PRE') {
        // <pre><code> 里面
        selection.insertHTML('    ');
      } else {
        // 普通文字
        selection.insertHTML('&nbsp;&nbsp;&nbsp;&nbsp;');
      }

      e.preventDefault();
    });
  }
  // 清空之后
  empty() {
    this.$text.on('keydown', (e = window.event) => {
      if (e.keyCode !== 8) {
        return;
      }
      const txtHtml = this.$text.html().toLowerCase().trim();

      if (txtHtml === '<p><br></p>' || txtHtml === '<div><br></div>') {
        e.preventDefault();
      }
    });
  }
}

export default IText;
