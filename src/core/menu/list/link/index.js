import Base from 'base/base';
import Modal from 'modal/modal';
import $ from 'shared/dom';
import parser from 'shared/parser';
import { hasOwn } from 'shared/util';
import linkTem from './link.html';

class Link extends Base {
  constructor(editor) {
    super(editor, 'link', true);
    const { cfg, type } = this;
    const pfix = cfg.prefix;
    this.prefix = `#${pfix}${type}-modal-`;
  }

  bind() {
    const { cfg, type, editor } = this;
    const { uid } = editor;
    const pfix = this.prefix;
    const defaultText = cfg.placeholder;
    const cfgDiy = cfg.diy;
    this.modal = new Modal(editor, 'link');
    this.modal.setContent(parser(linkTem, {
      prefix: cfg.prefix,
      type,
      button: defaultText.linkbutton,
    }));

    if (
      !hasOwn(cfgDiy, 'menu')
     || (hasOwn(cfgDiy, 'menu') && !cfgDiy.menu)) {
      this.$title = $(`${pfix}title`).attr('placeholder', defaultText.linktitle);
      this.$url = $(`${pfix}url`).attr('placeholder', defaultText.linkurl);
      // 点击菜单
      $(`#${cfg.prefix}${type}${uid}`).on('click', () => {
        const linkTitle = this.getTitle();
        // 如果当前已经是在链接上 || 已选内容
        if (linkTitle) {
          this.$title.val(linkTitle);
        }
        // 如果当前已经是在链接上
        if (this.$elem && this.$elem.length) {
          this.$url.val(this.$elem.attr('href'));
        }

        this.modal.show();
      });

      $(`${pfix}btn`).on('click', () => {
        this.click(type, this.$title.val(), this.$url.val());
        this.$title.val('');
        this.$url.val('');
      });
    }
  }

  click(type, titleVal, urlVal) {
    const edit = this.editor;
    // 恢复选区，不然添加不上
    edit.selection.restore();
    edit.undo.push(edit.getHtml());
    if (!this.$elem) {
      this.insetLink(titleVal, urlVal);
    } else {
      this.modifyLink(titleVal, urlVal);
    }
    edit.menu.testActive();
    this.modal.hide();
    this.$elem = null;
  }

  insetLink(titleVal, urlVal) {
    const { cfg, selection } = this.editor;
    selection.handle('insertHTML', `<a class="${cfg.prefix}text-link" href="${urlVal}">${titleVal}</a>`);
  }

  modifyLink(titleVal, urlVal) {
    if (this.$elem && this.$elem.length) {
      this.$elem.attr('href', urlVal).html(titleVal);
    }
  }

  // 获取当前光标所在地的内容。如果是选中，那么就获取选中内容，如果是 a 标签
  getTitle() {
    const sel = this.editor.selection;

    let title = sel.getSelectionText();

    if (!title) {
      const $elem = sel.getSelElem();
      if ($elem && $elem.length && $elem[0].tagName === 'A') {
        this.$elem = $elem;
        title = this.$elem.html();
      }
    }

    return title;
  }

  isActive() {
    const pfix = this.cfg.prefix;
    const className = `${pfix}menu-link-active`;
    const $item = $(`#${pfix}${this.type}${this.editor.uid}`);
    const $linkElem = this.editor.selection.getSelElem();
    const status = $linkElem && $linkElem.length && $linkElem[0].nodeName === 'A';
    if (status) {
      $item.addClass(className);
    } else {
      $item.removeClass(className);
    }
    return status;
  }
}

export default Link;
