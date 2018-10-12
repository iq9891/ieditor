import $ from 'shared/dom';
import Text from 'text/text';
import Menu from 'menu/menu';
import Selection from 'shared/selection';
import {
  def,
  isHtmlArray,
  isPlainObject,
  hasOwn,
} from 'shared/util';
import config from './config';

let editorId = 1; // 编辑器变化 多个编辑器自动累加

const IEditor = class {
  constructor(options) {
    this.cfg = config;
    let elem = '';
    if (isHtmlArray(options)) {
      elem = options;
    } else if (
      isPlainObject(options)
      && hasOwn(options, 'el')
    ) {
      elem = options.el;
    }
    def(this, '$editor', $(elem));
  }

  init() {
    def(this, 'uid', editorId++);
    def(this, 'version', '__VERSION__');
    def(this, 'text', new Text(this));
    def(this, 'selection', new Selection(this));
    def(this, 'menu', new Menu(this));
  }
};

export default IEditor;
