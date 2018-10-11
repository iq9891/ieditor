import parser from 'shared/parser';
import $ from 'shared/dom';
import baseTem from './base.html';

const IBase = class {
  constructor(editor, type, selected = false) {
    this.editor = editor;
    this.$editor = editor.$editor;
    this.cfg = editor.cfg;
    this.type = type;
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
      const { selection, code } = editor;
      // 如果是源代码
      if (code) {
        return;
      }
      // 只有选中了才有效果
      // 'removeformat', 'bold', 'underline', 'italic', 'copy', 'cut', 'redo', 'undo'
      // 'justifycenter', 'justifyfull', 'justifyleft', 'justifyright'
      // 'inserthorizontalrule', 'insertorderedlist', 'insertunorderedlist'
      if (!selection.isSelectionEmpty() || !this.selected) {
        // 操作编辑器内容
        selection.handle(type);
        // 整体检测按钮状态
        editor.menu.testActive();
      }
    });
  }

  // 是否是选中
  // 是否是选中
  isActive() {
    const { cfg, type, editor } = this;
    const className = 'ied-menu-link-active';
    if (type.indexOf('justify') > -1) {
      const justifys = [
        'justifycenter', // 两端对齐
        'justifyfull', // 两端对齐
        'justifyleft', // 左对齐
        'justifyright', // 右对齐
      ];
      justifys.forEach((justify) => {
        const $item = $(`#${cfg.prefix}${justify}${editor.uid}`);
        if (document.queryCommandState(justify)) {
          $item.addClass(className);
        } else {
          $item.removeClass(className);
        }
      });
    } else {
      const $item = $(`#${cfg.prefix}${type}${editor.uid}`);
      if (document.queryCommandState(type)) {
        $item.addClass(className);
      } else {
        $item.removeClass(className);
      }
    }
  }
};

export default IBase;
