import $ from 'shared/dom';
import Base from 'base/base';

class Indent extends Base {
  constructor(editor) {
    super(editor, 'indent', true);
  }

  // 点击菜单按钮事件
  click(type) {
    const { selection, code, menu } = this.editor;
    // 如果是源代码
    if (code) {
      return;
    }
    if (selection.isSelectionEmpty()) {
      const $selectionElem = selection.getSelectionContainerElem();
      const indent = $selectionElem.css('text-indent');
      $selectionElem.css('text-indent', indent === '0px' ? '2em' : '0');
      // 整体检测按钮状态
      menu.testActive();
    }
  }

  // 是否是选中
  isActive() {
    const { cfg, type, editor } = this;
    const $item = $(`#${cfg.prefix}${type}${editor.uid}`);
    const className = `${cfg.prefix}menu-link-active`;
    const $selectionElem = editor.selection.getSelectionContainerElem();
    let status = false;

    if ($selectionElem && $selectionElem.length) {
      status = $selectionElem.css('text-indent') === '0px';
      if (status) {
        $item.removeClass(className);
      } else {
        $item.addClass(className);
      }
    }

    return status;
  }
}

export default Indent;
