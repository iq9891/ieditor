import $ from 'shared/dom';
import Base from 'base/base';
import { searchNode } from 'shared/node';

class FormatBlock extends Base {
  constructor(editor) {
    super(editor, 'formatblock', true);
  }

  click() {
    const sel = this.editor.selection;
    const $selectionElem = sel.getSelElem();
    // 如果选区容器存在，并且不是 文本容器 的情况下
    if ($selectionElem && $selectionElem.length > 0 && !$selectionElem.attr('id')) {
      const blocked = searchNode($selectionElem[0], 'BLOCKQUOTE');
      // 如果当前没选中
      if (sel.isEmpty()) {
        if (blocked) {
          this.deleteBlockquote();
        } else {
          this.createBlockquote();
        }
        // 整体检测按钮状态
        this.editor.menu.testActive();
      }
    }
  }

  createBlockquote() {
    const sel = this.editor.selection;
    const $selElem = sel.getSelElem();
    $selElem.wrap('blockquote');
    // 随时保存选区
    sel.saveRange();
    sel.restore();
  }

  deleteBlockquote() {
    const sel = this.editor.selection;
    const $selElem = sel.getSelElem();
    $selElem.unwrap();
    // 随时保存选区
    sel.saveRange();
    sel.restore();
  }

  isActive() {
    const { type, cfg, editor } = this;
    const $item = $(`#${cfg.prefix}${type}${editor.uid}`);
    const className = `${cfg.prefix}menu-link-active`;
    const $selectionElem = editor.selection.getSelElem();
    let status = false;

    if ($selectionElem && $selectionElem.length) {
      status = searchNode($selectionElem[0], 'BLOCKQUOTE');
      if (status) {
        $item.addClass(className);
      } else {
        $item.removeClass(className);
      }
    }

    return status;
  }
}

export default FormatBlock;
