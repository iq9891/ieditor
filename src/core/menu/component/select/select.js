import parser from 'shared/parser';
import $ from 'shared/dom';
import { createElem8203 } from 'shared/node';
import { filterLines, hump } from 'shared/helper';
import { isString, keys } from 'shared/util';
import selectTem from './select.html';


const Select = class {
  constructor(editor, options) {
    this.editor = editor;
    this.typeName = filterLines(options.type);
    this.diy = this.editor.cfg.diy.menu;
    this.sel = editor.selection;
    this.render(options);
  }

  render(options) {
    const {
      type,
      data,
      placeholder = this.editor.cfg.placeholder[this.typeName],
    } = options;
    const config = this.editor.cfg;
    const lang = config.lang[this.typeName];
    this.type = type;
    this.uid = this.editor.uid;
    this.prefix = config.prefix;
    this.tem = parser(selectTem, {
      lang,
      type,
      uid: this.uid,
      prefix: this.prefix,
      data,
      placeholder,
    });
  }

  bind() {
    const pfix = this.prefix;
    const dType = this.type;
    const defUid = this.uid;
    this.$select = $(`#${pfix}${dType}${defUid}`);
    this.$list = $(`#${pfix}${dType}${defUid}+ul`);
    this.$font = $(`#${pfix}${dType}${defUid} .${pfix}select-btn-font`);

    this.$select.on('click', (ev = window.event) => {
      this.showList();
      ev.stopPropagation();
    });
    this.$list.on('click', (ev = window.event) => {
      this.listClick(ev);
    });
    this.editor.$editor.on('click', () => {
      this.hideList();
    });
  }

  // 点击菜单按钮事件
  click(...arg) {
    this.listClick(arg.length > 1 ? arg[1] : '');
  }

  showList() {
    const { showAlert, hideName } = this.editor;
    keys(showAlert).forEach((modalKey) => {
      showAlert[modalKey].addClass(hideName);
    });
    showAlert[this.type] = this.$list;
    this.$list.removeClass(hideName);
  }

  hideList() {
    this.$list.addClass(this.editor.hideName);
  }

  // 选择的元素点击
  listClick(ev) {
    const { type } = this;
    let html = (isString(ev) || typeof ev === 'number') ? ev : $(ev.target).html();
    html = html.replace(/"/g, '');
    // 隐藏菜单
    this.hideList();
    // 设置
    if (this.sel.isEmpty()) {
      this.handleCursor(type, html);
    } else {
      this.handleSelected(type, html);
    }
  }

  handleCursor(type, html) {
    const $selElem = this.sel.getSelElem();
    console.log(this.sel.getRange(), 999);

    const range = this.sel.getRange();
    console.log(range, 9);
    this.sel.insertNode(document.createTextNode('text'));

    if ($selElem.length) {
      if (type === 'line-height') {
        $selElem.css(type, html);
      } else {
        const node = createElem8203();
        this.sel.insertNode(node);
        $(node).css((hump(type)), (type === 'font-size' ? parseFloat(html) : html));
        this.editor.text.cursorEnd($(node));
      }
    }
  }

  handleSelected(type, html) {
    const $elem = this.sel.getSelElem();
    const styleValue = isString(html) ? html.replace(/"/g, '') : html;
    if (this.typeName === 'lineheight') {
      $elem.css(type, styleValue);
    } else {
      this.sel.restore();
      let styls = $elem.attr('style') || '';
      styls += `;${type}: ${styleValue}`;
      this.sel.handle('insertHTML', `<span style="${styls}">${this.sel.getSelectionText()}</span>`);
    }
  }

  // 是否是选中
  isActive() {
    const sel = this.editor.selection;
    const $elem = sel.getSelElem(sel.getRange());
    let fontStyle = '';
    const $dFont = this.$font;
    if ($elem) {
      fontStyle = $elem.css(this.type);
      if ($dFont) {
        $dFont.html(fontStyle);
      }
    }
    return fontStyle;
  }
};

export default Select;
