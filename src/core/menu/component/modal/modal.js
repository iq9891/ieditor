import parser from 'shared/parser';
import { createElement } from 'shared/node';
import { delPx } from 'shared/px';
import $ from 'shared/dom';
import modalTem from './modal.html';

class Modal {
  constructor(editor, type) {
    this.editor = editor;
    this.$editor = editor.$editor;
    this.cfg = editor.cfg;
    this.type = type;
    this.$menu = $(`#${this.cfg.prefix}menu${editor.uid}`);
    // 初始化
    this.render();
    this.bind();
  }

  render() {
    const { cfg, type, editor } = this;
    const { lang, prefix } = cfg;
    const $newElement = $(createElement('div'));
    $newElement.html(parser(modalTem, {
      lang: lang[type],
      type,
      uid: editor.uid,
      prefix,
    }));
    $(`#${prefix}modal${editor.uid}`).append($newElement);
    this.$modal = $(`#${prefix}${type}-modal${editor.uid}`);
    this.$content = $(`#${prefix}${type}-modal-content${editor.uid}`);
  }

  setContent(html) {
    this.$content.html(html);
  }

  bind() {
    const { cfg, type, editor } = this;

    $(`#${cfg.prefix}${type}-modal-close${editor.uid}`).on('click', () => {
      this.hide();
    });
  }

  hide() {
    this.$modal.addClass(`${this.editor.cfg.prefix}modal-hide`);
  }

  show() {
    this.$modal
      .removeClass(`${this.editor.cfg.prefix}modal-hide`)
      .css('top', Number(delPx(this.$menu.css('height'))) + 1);
  }
}

export default Modal;
