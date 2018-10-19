import $ from 'shared/dom';
import Base from 'base/base';

class Code extends Base {
  constructor(editor) {
    super(editor, 'code', true);
  }

  bind() {
    const { cfg, type, editor } = this;
    $(`#${cfg.prefix}${type}${editor.uid}`).on('click', () => {
      this.click();
    });
  }

  reset() {
    const { $text } = this.editor.text;
    const cfgUid = this.editor.uid;
    $text.html($(`#${this.editor.cfg.prefix}-source${cfgUid}`).val());
    $text.attr('contentEditable', true);
  }

  click() {
    const { code, menu } = this.editor;
    if (code) {
      this.reset();
    } else {
      this.sourceCode();
    }
    this.editor.code = !this.editor.code;
    menu.testDisable();
    this.isActive();
  }

  sourceCode() {
    const { $text } = this.editor.text;
    const cfgUid = this.editor.uid;
    const {
      prefix,
    } = this.cfg;
    const html = $text.html();
    $text.html('');
    $text.html(`<textarea id="${prefix}-source${cfgUid}" class="${prefix}code"></textarea>`);
    $text.attr('contentEditable', false);
    $(`#${prefix}-source${cfgUid}`).html(html);
  }

  // 是否是源代码
  isActive() {
    const { cfg, type, editor } = this;
    const className = `${cfg.prefix}menu-link-active`;
    const $item = $(`#${cfg.prefix}${type}${editor.uid}`);
    if (editor.code) {
      $item.addClass(className);
    } else {
      $item.removeClass(className);
    }
  }
}

export default Code;
