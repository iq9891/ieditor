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
    this.redo = [];
    this.undo = [];
    // 用于关闭所有弹框
    this.showAlert = {};
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
    this.readonly = this.cfg.readonly;
    def(this, '$editor', $(elem));
  }

  init() {
    def(this, 'uid', editorId++);
    def(this, 'version', '__VERSION__');
    def(this, 'text', new Text(this));
    def(this, 'selection', new Selection(this));
    def(this, 'menu', new Menu(this));

    if (this.readonly) {
      this.setStatus(this.readonly);
    }
    this.hideName = `${this.cfg.prefix}hide`;
  }

  /**
  * 设置编辑器内容
  * @param {String} html 内容
  */
  setHtml(html = '<p><br/></p>') {
    this.text.$text.html(html);
    this.text.cursorEnd();
  }

  /**
  * 获取编辑器内容
  * @return {String} 内容
  */
  getHtml() {
    return this.text.$text.html();
  }

  /**
   * 设置层级
   */
  setIndex(zIndex = 1) {
    this.$editor.css('zIndex', zIndex);
  }

  /**
   * 设置是否只读
   */
  setStatus(status = true) {
    setTimeout(() => {
      this.readonly = status;
      this.text.$text.attr('contenteditable', !status);
      this.menu.testDisable();
      if (!status) {
        this.text.cursorEnd();
      }
    }, 0);
  }
};

export default IEditor;
