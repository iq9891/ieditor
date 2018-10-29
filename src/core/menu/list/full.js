import $ from 'shared/dom';
import Base from 'base/base';

class Full extends Base {
  constructor(editor) {
    super(editor, 'full', true);
    this.full = false;
    this.style = null;
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

  createCode() {
    const { editor } = this;
    const { $editor } = editor;
    $editor.css({
      position: 'fixed',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width: '100%',
      height: '100%',
      zIndex: 999999999,
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
}

export default Full;
