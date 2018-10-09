import compiler from '../../compiler';
import $ from '../../../shared/dom';
import svgPath from '../../../shared/svgpath';
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
    this.tem = compiler(baseTem, {
      lang: lang[type],
      type,
      uid: editor.uid,
      prefix,
      path: svgPath[type],
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
      // insertHorizontalRule justifyLeft justifyCenter
      // justifyRight justifyFull insertOrderedList insertUnorderedList
      // undo redo removeFormat
      if (!selection.isSelectionEmpty() || !this.selected) {
        // bold italic underline subscript superscript
        // 加粗操作
        selection.handle(type);
        this.isActive();
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
