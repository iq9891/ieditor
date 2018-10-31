import parser from 'shared/parser';
import { createElement } from 'shared/node';
import { delPx } from 'shared/px';
import { toNumber, keys } from 'shared/util';
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
    const { uid } = editor;
    $newElement.html(parser(modalTem, {
      lang: lang[type],
      type,
      uid,
      prefix,
    }));
    $(`#${prefix}modal${uid}`).append($newElement);
    this.$modal = $(`#${prefix}${type}-modal${uid}`);
    this.$content = $(`#${prefix}${type}-modal-content${uid}`);
  }

  setContent(html) {
    this.$content.html(html);
  }

  bind() {
    const { cfg, type, editor } = this;

    $(`#${cfg.prefix}${type}-modal-close${editor.uid}`).on('click', () => {
      this.hide();
    });

    editor.$editor.on('click', () => {
      this.hide();
    });
  }

  hide() {
    this.$modal.addClass(this.editor.hideName);
  }

  show() {
    const { showAlert, hideName } = this.editor;
    keys(showAlert).forEach((modalKey) => {
      showAlert[modalKey].addClass(hideName);
    });
    showAlert[this.type] = this.$modal;
    this.$modal
      .removeClass(hideName)
      .css('top', toNumber(delPx(this.$menu.css('height'))) + 1);
  }
}

export default Modal;
