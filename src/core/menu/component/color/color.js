import Base from 'base/base';
import Modal from 'modal/modal';
import $ from 'shared/dom';
import parser from 'shared/parser';
import { hasOwn, isArray } from 'shared/util';
import colorTem from './color.html';

class Color extends Base {
  bind() {
    this.renderModal();
    this.bindEvent();
  }

  renderModal() {
    const { cfg, type, editor } = this;
    const pfix = cfg.prefix;
    const defaultText = cfg.placeholder;
    const cfgUid = editor.uid;
    this.modal = new Modal(this.editor, type);


    this.modal.setContent(parser(colorTem, {
      prefix: cfg.prefix,
      type,
      title: defaultText.colortitle,
      uid: cfgUid,
      ok: defaultText.colorok,
      clear: defaultText.colorclear,
      diy: defaultText.colordiy,
    }));
    this.modal.$modal.addClass(`${pfix}modal-color`);

    $(`#${cfg.prefix}${type}-standard${cfgUid}`).html(this.renderColor(this.getColorList()));
  }

  renderColor(colorList) {
    let colorHtml = '';

    const defultFix = this.cfg.prefix;
    const pfix = `${defultFix}${this.type}-standard-item`;
    const editUid = this.editor.uid;

    colorList.forEach((color) => {
      colorHtml += `<li class="${defultFix}modal-standard-item ${pfix}${editUid}" style="background:${color};color: ${color};">${color}</li>`;
    });

    return colorHtml;
  }

  getColorList() {
    let colorList = [];
    const defColor = this.cfg.color;

    if (hasOwn(defColor, 'color')) {
      const cfgColor = defColor.color;
      if (isArray(cfgColor)) {
        colorList = cfgColor;
      } else if (typeof cfgColor === 'function') {
        const colorResult = cfgColor();

        if (isArray(colorResult)) {
          colorList = colorResult;
        }
      }
    }

    return colorList;
  }

  bindEvent() {
    const { cfg, type, editor } = this;

    const $diy = $(`#${cfg.prefix}${type}-diy${editor.uid}`);

    $(`#${cfg.prefix}${type}${editor.uid}`).on('click', () => {
      this.show();
    });

    $(`.${cfg.prefix}${type}-standard-item${editor.uid}`).on('click', (ev = window.event) => {
      this.click(type, ev.target.innerHTML);
      this.hide();
    });

    $(`#${cfg.prefix}${type}-ok${editor.uid}`).on('click', () => {
      this.click(type, `#${$diy.val()}`);
      this.hide();
    });
  }

  show() {
    this.modal.show();
  }

  hide() {
    this.modal.hide();
  }

  click(type, value) {
    const sel = this.editor.selection;
    // 恢复选区，不然添加不上
    sel.restoreSelection();
    sel.handle(type, value);
  }
}

export default Color;
