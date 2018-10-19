import parser from 'shared/parser';
import $ from 'shared/dom';
import baseTem from './base.html';

const IBase = class {
  constructor(editor, type, selected = false) {
    this.editor = editor;
    this.$editor = editor.$editor;
    this.cfg = editor.cfg;
    this.type = type;
    this.typeName = type;
    this.selected = selected;
    // 初始化
    this.create();
  }

  create() {
    const { cfg, type, editor } = this;
    const { lang, prefix } = cfg;
    this.tem = parser(baseTem, {
      lang: lang[type],
      type,
      uid: editor.uid,
      prefix,
    });
  }

  bind() {
    const { cfg, type, editor } = this;
    $(`#${cfg.prefix}${type}${editor.uid}`).on('click', () => {
      this.click(type);
    });
  }

  // 点击菜单按钮事件
  click(type) {
    const { editor } = this;
    const { selection, code } = editor;
    // 如果是源代码
    if (code) {
      return;
    }
    // 只有选中了才有效果
    if (!selection.isSelectionEmpty() || !this.selected) {
      // 操作编辑器内容
      selection.handle(type);
      // 整体检测按钮状态
      editor.menu.testActive();
    }
  }

  // 是否是选中
  isActive() {
    const { cfg, type, editor } = this;
    const className = `${cfg.prefix}menu-link-active`;
    const $item = $(`#${cfg.prefix}${type}${editor.uid}`);
    const status = document.queryCommandState(type);
    if (status) {
      $item.addClass(className);
    } else {
      $item.removeClass(className);
    }
    return status;
  }
};

export default IBase;
