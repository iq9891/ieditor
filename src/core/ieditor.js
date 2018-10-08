import $ from '../shared/dom';
import config from './config';
import Text from './text';
import Selection from '../shared/selection';
import { def } from '../shared/util';

let editorId = 1; // 编辑器变化 多个编辑器自动累加

const IEditor = class {
  constructor(selector) {
    this.cfg = config;
    def(this, '$editor', $(selector));
  }

  init() {
    def(this, 'uid', editorId++);
    def(this, 'text', new Text(this));
    def(this, 'selection', new Selection(this));
  }
}

export default IEditor;
