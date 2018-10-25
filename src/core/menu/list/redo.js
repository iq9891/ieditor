import Base from 'base/base';

class Redo extends Base {
  constructor(editor) {
    super(editor, 'redo', false);
  }

  click() {
    const edit = this.editor;
    if (edit.redo.length) {
      edit.undo.push(edit.getHtml());
      edit.setHtml(edit.redo.pop());
    }
  }
}

export default Redo;
