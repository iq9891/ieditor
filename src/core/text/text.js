import parser from 'shared/parser';
import $ from 'shared/dom';
import {
  hasOwn,
} from 'shared/util';
import textTem from './text.html';

const IText = class {
  constructor(editor) {
    this.editor = editor;
    this.$editor = editor.$editor;
    this.uid = editor.uid;
    this.prefix = editor.cfg.prefix;
    this.resetPosY = 0;
    this.resetLastMove = 0;
    this.$doc = $(document);
    // 初始化内容
    this.init();
  }

  init() {
    const configDiy = this.editor.cfg.diy;
    const isDiyText = !hasOwn(configDiy, 'text') || (hasOwn(configDiy, 'text') && !configDiy.text);
    // 渲染
    if (isDiyText) {
      const contents = this.getChilds();
      this.render();
      // 因为在 虚拟 DOM 的框架中会获取不到元素添加不了事件
      setTimeout(() => {
        this.$text = $(`#${this.prefix}text${this.uid}`);
        this.afterInit(contents);
      }, 3);
    } else {
      this.$text = $(configDiy.text);
      this.afterInit();
    }
  }

  render() {
    this.$editor.html(parser(
      textTem,
      {
        uid: this.uid,
        prefix: this.prefix,
      },
    ));
  }

  afterInit(contents = this.getChilds()) {
    // 绑定事件
    this.bind();
    // 修复之前的内容
    this.setHtml(contents.length > 0 ? contents : '<p>这里是内容</p>');
  }

  // 绑定事件
  bind() {
    // 实时保存选取
    this.saveRangeRealTime();
    // 处理 tab 键
    this.tab();
    // 清空之后
    this.empty();

    const $reset = $(`#${this.prefix}reset${this.editor.uid}`);

    if (this.editor.cfg.reset) {
      $reset.on('mousedown', this.resetDown.bind(this));
      $reset.parent().css('display', 'block');
    }
  }

  // 改变大小鼠标按下
  resetDown(ev = window.event) {
    this.resetPosY = ev.pageY;
    this.$doc
      .on('mousemove', this.resetMove.bind(this))
      .on('mouseup', this.resetUp.bind(this));
  }

  resetMove(evMove = window.evente) {
    const move = evMove.pageY - this.resetPosY;
    const height = parseFloat(this.$text.css('height'));
    this.$text.css('height', height + (move - this.resetLastMove));
    this.resetLastMove = move;
  }

  resetUp() {
    this.$doc.off('mousemove mouseup');
    this.resetLastMove = 0;
    this.resetPosY = 0;
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
      menu.testActive();
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

      if (txtHtml === '<p><br></p>') {
        e.preventDefault();
      }
    });
  }

  // 获取之前里面内容
  getChilds() {
    const children = this.$editor.html();
    this.$editor.html('');
    return children;
  }

  /**
  * 设置内容
  * @param {String} html 内容
  */
  setHtml(html = '') {
    if (html) {
      this.$text.html(html);
    }
    this.cursorEnd();
  }

  /**
  * 新建选区，移动光标到最后
  */
  cursorEnd() {
    const $last = this.$text.children().last();
    let range = null;
    if (window.getSelection) {
      $last[0].focus();
      range = window.getSelection();
      range.selectAllChildren($last[0]);
      range.collapseToEnd();
    } else if (document.selection) {
      range = document.selection.createTextRange();
      range.moveToElementText($last);
      range.collapse(false);
      // 避免产生空格
      range.select();
    }
  }
};

export default IText;
