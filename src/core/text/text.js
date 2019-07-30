import hotkeys from 'hotkeys';
import parser from 'shared/parser';
import $ from 'shared/dom';
import { hasOwn, keys } from 'shared/util';
import textTem from './text.html';
import keymap from './keymap';

const Text = class {
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
    const {
      editor,
      prefix,
      resetDown,
    } = this;

    const {
      uid,
      cfg,
    } = editor;
    // 实时保存选取
    this.saveRangeRealTime();
    // 处理 tab 键
    this.tab();
    // 清空之后
    this.empty();
    // 快捷键绑定
    this.hotKeyHandle();

    const $reset = $(`#${prefix}reset${uid}`);

    if (cfg.reset) {
      $reset.on('mousedown', resetDown.bind(this));
      $reset.parent().removeClass(`${prefix}reset-hide`);
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

  hotKeyHandle() {
    const { editor } = this;
    const { menu } = editor;
    // 如果不是定制化
    if (menu) {
      const { clicks } = menu;
      hotkeys.filter = (event) => {
        const { tagName } = event.target || event.srcElement;
        return !(tagName.isContentEditable || tagName === 'INPUT' || tagName === 'SELECT' || tagName === 'TEXTAREA');
      };
      // 根据 keymap 配置绑定
      keys(keymap).forEach((key) => {
        if (hasOwn(clicks, keymap[key])) {
          hotkeys(`ctrl+${key},command+${key}`, clicks[keymap[key]].bind(editor));
        }
      });
      // 反撤销
      if (hasOwn(clicks, keymap[keymap.y])) {
        hotkeys('ctrl+shift+z,command+shift+z', clicks[keymap.y].bind(editor));
      }
    }
  }

  // 实时保存选取
  saveRangeRealTime() {
    const $textElem = this.$text;

    // 保存当前的选区
    const saveRange = (e = window.event) => {
      // 处理 tab 键(9) 删除(8)
      if (e.keyCode === 9 || e.keyCode === 8) {
        return;
      }
      const {
        selection, menu, code, readonly,
      } = this.editor;
      if (!code && !readonly) {
        // 随时保存选区
        selection.saveRange();
        // 更新按钮 ative 状态
        menu.testActive();
      }
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
      const $selectionElem = selection.getSelElem();
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
      const sel = this.editor.selection;
      // 如果不是定制化
      if (sel) {
        this.editor.selection.createRangeByElem(this.$text.children());
      }
    }
    this.cursorEnd();
  }

  /**
  * 新建选区，移动光标到最后
  */
  cursorEnd(last) {
    const $last = last || this.$text.children().last();
    const sel = this.editor.selection;
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
    // 如果不是定制化
    if (sel) {
      // 随时保存选区
      sel.saveRange();
      sel.restore();
    }
  }
};

export default Text;
