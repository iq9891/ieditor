import parser from 'shared/parser';
import $ from 'shared/dom';
import baseTem from 'base/base.html';

class Full {
  constructor(editor) {
    this.editor = editor;
    this.$editor = editor.$editor;
    this.cfg = editor.cfg;
    this.type = 'full';
    this.typeName = this.type;
    this.full = false;
    this.style = null;
    // 初始化
    this.create();
  }

  create() {
    const { cfg, type, editor } = this;
    const { lang, prefix } = cfg;
    this.tem = parser(baseTem, {
      lang: lang[type],
      type,
      uid: editor.uid,
      prefix,
    });
  }

  bind() {
    const { cfg, type, editor } = this;
    $(`#${cfg.prefix}${type}${editor.uid}`).on('click', () => {
      this.click(type);
    });
  }

  click() {
    if (this.full) {
      this.reset();
    } else {
      // 备份原始行间样式
      this.bacStyle();
      this.createCode();
    }
    this.full = !this.full;
    // 整体检测按钮状态
    this.editor.menu.testActive();
  }

  isActive() {
    const { cfg, type, editor } = this;
    const $item = $(`#${cfg.prefix}${type}${editor.uid}`);
    if (this.full) {
      $item.addClass(`${cfg.prefix}menu-link-active`);
    } else {
      $item.removeClass(`${cfg.prefix}menu-link-active`);
    }
    return this.full;
  }

  createCode() {
    const { editor } = this;
    const { $editor } = editor;
    $editor.css({
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      'z-index': 999999999,
    });
  }

  reset() {
    const { $editor } = this.editor;
    if (this.style) {
      $editor.attr('style', this.style);
    } else {
      $editor.removeAttr('style');
    }
  }

  // 备份原始行间样式
  bacStyle() {
    const { $editor } = this.editor;
    this.style = $editor.attr('style');
  }
}

export default Full;
