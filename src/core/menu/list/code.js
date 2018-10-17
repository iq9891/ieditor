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
    });
  }

  reset() {
    const $textEle = this.editor.text.$text;
    $textEle.html($(`#${this.cfg.prefix}text${this.editor.uid} textarea`).val());
    $textEle.attr('contentEditable', true);
  }

  sourceCode() {
    const { $text } = this.editor.text;
    const {
      prefix,
    } = this.cfg;
    const html = $text.html();
    $text.html('');
    $text.html(`<textarea id="${prefix}code" class="${prefix}code"></textarea>`);
    $text.attr('contentEditable', false);
    $(`#${prefix}text${this.editor.uid} textarea`).html(html);
  }
}

export default Code;
