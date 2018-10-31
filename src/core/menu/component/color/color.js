import Base from 'base/base';
import Modal from 'modal/modal';
import $ from 'shared/dom';
import parser from 'shared/parser';
import { hasOwn, isArray } from 'shared/util';
import { getStyle } from 'shared/node';
import colorTem from './color.html';

class Color extends Base {
  bind() {
    this.renderModal();
    this.bindEvent();
  }

  renderModal() {
    const { cfg, type, editor } = this;
    const pfix = cfg.prefix;
    const {
      colortitle,
      colorok,
      colorclear,
      colordiy,
    } = cfg.placeholder;
    const cfgUid = editor.uid;
    this.modal = new Modal(this.editor, type);


    this.modal.setContent(parser(colorTem, {
      prefix: pfix,
      type,
      title: colortitle,
      uid: cfgUid,
      ok: colorok,
      clear: colorclear,
      diy: colordiy,
    }));
    this.modal.$modal.addClass(`${pfix}modal-color`);

    $(`#${pfix}${type}-standard${cfgUid}`).html(this.renderColor(this.getColorList()));
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
    const { uid } = editor;
    const { prefix } = cfg;

    const $diy = $(`#${prefix}${type}-diy${uid}`);

    $(`#${prefix}${type}${uid}`).on('click', (ev = window.event) => {
      this.show();
      ev.stopPropagation();
    });

    $(`.${prefix}${type}-standard-item${uid}`).on('click', (ev = window.event) => {
      this.click(type, ev.target.innerHTML);
      this.hide();
    });

    $(`#${prefix}${type}-ok${uid}`).on('click', () => {
      this.click(type, `#${$diy.val()}`);
      this.hide();
    });

    $(`#${prefix}${type}-clear${uid}`).on('click', () => {
      this.click(type, '#ffffff');
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
    const { selection, undo } = this.editor;
    if (selection.isEmpty()) {
      const $selElem = selection.getSelElem();
      getStyle($selElem, ($elem, elemStyle) => {
        const attr = type === 'backcolor' ? 'background' : 'color';
        const styles = `${elemStyle}${attr}:${value};`;
        selection.createRangeByElem($selElem);
        selection.handle('insertHTML', `<span style="${styles}">&#8203;</span>`);
      });
    } else {
      // 恢复选区，不然添加不上
      selection.restore();
      undo.push(this.editor.getHtml());
      selection.handle(type, value);
    }
  }
}

export default Color;
