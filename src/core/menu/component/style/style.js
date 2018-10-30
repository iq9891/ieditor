import parser from 'shared/parser';
import $ from 'shared/dom';
import { insertAfter, searchStyle, createElem8203 } from 'shared/node';
import styleTem from './style.html';
import config from './config';

const Style = class {
  constructor(editor, type) {
    this.editor = editor;
    this.$editor = editor.$editor;
    this.cfg = editor.cfg;
    this.type = type;
    this.prefix = editor.cfg.prefix;
    this.sel = editor.selection;
    // 初始化
    this.create();
  }

  create() {
    const {
      cfg, type, editor, prefix,
    } = this;
    const { lang } = cfg;
    this.tem = parser(styleTem, {
      lang: lang[type],
      type,
      uid: editor.uid,
      prefix,
    });
  }

  bind() {
    const {
      type, editor, prefix,
    } = this;
    $(`#${prefix}${type}${editor.uid}`).on('click', () => {
      this.click(type);
    });
  }

  // 点击菜单按钮事件
  click(type) {
    // 只有选中了才有效果
    if (this.sel.isEmpty()) {
      this.handleCursor(type);
    } else {
      this.handleSelected(type);
    }
  }

  handleSelected(type) {
    const { editor, sel } = this;
    sel.getSelElemAll(sel.getRange(), ($elem) => {
      if ($elem.length) {
        sel.handle(type);
        editor.menu.testActive();
      }
    });
  }

  handleCursor(type) {
    const $selElem = this.sel.getSelElem();
    const styleConfig = config[type];
    const styleKey = styleConfig.key;
    const styleValue = type;

    if ($selElem.length) {
      searchStyle($selElem, styleConfig, ($elem, elemStyle, matchResult) => {
        if (matchResult) {
          // 匹配的
          const node = createElem8203();
          $(node).attr('style', elemStyle.replace(new RegExp(`${styleKey}:${styleValue}(;?)`), ''));
          // this.sel.insertNode(node);
          // 修复两个复选来回切换时候的样式问题
          insertAfter($elem[0], node);
          this.editor.text.cursorEnd($(node));
        } else {
          const node = createElem8203();
          this.sel.insertNode(node);
          $(node).css(styleKey, styleValue);
          this.editor.text.cursorEnd($(node));
        }
      });
    }
  }

  // 是否是选中
  isActive() {
    return false;
  }
};

export default Style;
