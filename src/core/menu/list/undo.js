import Base from 'base/base';

class Undo extends Base {
  constructor(editor) {
    super(editor, 'undo', false);
  }

  click() {
    const edit = this.editor;
    if (edit.undo.length) {
      edit.redo.push(edit.getHtml());
      edit.setHtml(edit.undo.pop());
    }
  }
}

export default Undo;
