import $ from 'shared/dom';
import Text from 'text/text';
import Menu from 'menu/menu';
import Selection from 'shared/selection';
import {
  def,
  isHtmlArray,
  isPlainObject,
  resolveOptions,
} from 'shared/util';
import defultConfig from './config';

let editorId = 1; // 编辑器变化 多个编辑器自动累加

const IEditor = class {
  constructor(options) {
    this.cfg = defultConfig;
    this.code = false;
    let elem = '';
    if (isHtmlArray(options)) {
      elem = options;
    } else if (isPlainObject(options)) {
      // 处理数据
      this.cfg = resolveOptions(defultConfig, options);
      const { el } = this.cfg;
      elem = isHtmlArray(el) || el.indexOf('#') > -1 ? el : `#${el}`;
    } else {
      elem = defultConfig.el;
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

  /**
  * 新建一行 <p><br/></p>
  * @param {String} html 内容
  */
  setHtml(html = '<p><br/></p>') {
    this.text.$text.html(html);
    this.text.cursorEnd();
  }

  /**
   * 设置层级
   */
  setIndex(zIndex = 1) {
    this.$editor.css('zIndex', zIndex);
  }
};

export default IEditor;
