import $ from 'shared/dom';
import Base from 'base/base';

class Code extends Base {
  constructor(editor) {
    super(editor, 'code', true);
  }

  bind() {
    const { cfg, type, editor } = this;
    $(`#${cfg.prefix}${type}${editor.uid}`).on('click', () => {
      if (editor.code) {
        this.reset();
      } else {
        this.sourceCode();
      }
      editor.code = !editor.code;
      editor.menu.testDisable();
      this.isActive();
    });
  }

  reset() {
    const $textEle = this.editor.text.$text;
    $textEle.html($(`#${this.cfg.prefix}text${this.editor.uid} textarea`).val());
    $textEle.attr('contentEditable', true);
  }

  sourceCode() {
    const { $text } = this.editor.text;
    const cfgUid = this.editor.uid;
    const {
      prefix,
    } = this.cfg;
    const html = $text.html();
    $text.html('');
    $text.html(`<textarea id="${prefix}code${cfgUid}" class="${prefix}code"></textarea>`);
    $text.attr('contentEditable', false);
    $(`#${prefix}text${cfgUid} textarea`).html(html);
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
