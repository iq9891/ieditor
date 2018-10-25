import parser from 'shared/parser';
import $ from 'shared/dom';
import { filterLines } from 'shared/helper';
import { isString } from 'shared/util';
import selectTem from './select.html';


const Select = class {
  constructor(editor, options) {
    this.editor = editor;
    this.typeName = filterLines(options.type);
    this.diy = this.editor.cfg.diy.menu;
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
    this.$list.css('display', 'block');
  }

  hideList() {
    this.$list.css('display', 'none');
  }

  // 选择的元素点击
  listClick(ev) {
    const { type, editor } = this;
    const sel = editor.selection;
    const html = (isString(ev) || typeof ev === 'number') ? ev : $(ev.target).html();
    // 隐藏菜单
    this.hideList();
    // 设置
    const $elem = sel.getSelElem(sel.getRange());
    if ($elem) {
      // 操作编辑器内容
      sel.restore();

      editor.undo.push(editor.getHtml());
      $elem.css(type, isString(html) ? html.replace(/"/g, '') : html);
      editor.menu.testActive();
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
