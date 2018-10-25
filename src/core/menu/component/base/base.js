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
    const edit = this.editor;
    const sel = edit.selection;
    // 只有选中了才有效果
    if (!sel.isEmpty() || !this.selected) {
      edit.undo.push(edit.getHtml());
      // 操作编辑器内容
      sel.handle(type);
      // 整体检测按钮状态
      edit.menu.testActive();
    }
  }

  // 是否是选中
  isActive() {
    const dType = this.type;
    const cfix = this.cfg.prefix;
    const className = `${cfix}menu-link-active`;
    const $item = $(`#${cfix}${dType}${this.editor.uid}`);
    const status = document.queryCommandState(dType);
    $item[status ? 'addClass' : 'removeClass'](className);
    return status;
  }
};

export default IBase;
