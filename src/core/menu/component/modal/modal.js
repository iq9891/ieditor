import parser from 'shared/parser';
import $ from 'shared/dom';
import modalTem from './modal.html';

class Modal {
  constructor(editor, type) {
    this.editor = editor;
    this.$editor = editor.$editor;
    this.cfg = editor.cfg;
    this.type = type;
    // 初始化
    this.render();
    this.bind();
  }

  render() {
    const { cfg, type, editor } = this;
    const { lang, prefix } = cfg;
    this.$menu = $(`#${prefix}menu${editor.uid}`);
    $(`#${prefix}menu${editor.uid}`).html(this.$menu.html() + parser(modalTem, {
      lang: lang[type],
      type,
      uid: editor.uid,
      prefix,
    }));
    this.$modal = $(`#${prefix}${type}-modal`);
    this.$content = $(`#${prefix}${type}-modal-content`);
  }

  setContent(html) {
    this.$content.html(html);
  }

  bind() {
    const { cfg, type } = this;

    $(`#${cfg.prefix}${type}-modal-close`).on('click', () => {
      this.hide();
    });
  }

  hide() {
    this.$modal.addClass(`${this.editor.cfg.prefix}modal-hide`);
  }

  show() {
    this.$modal
      .removeClass(`${this.editor.cfg.prefix}modal-hide`)
      .css('top', this.$menu.css('height'));
  }
}

export default Modal;
