import Base from '../base/base';

class Undo extends Base {
  constructor(editor) {
    super(editor, 'undo', false);
  }
}

export default Undo;
