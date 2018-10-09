import compiler from '../compiler';
import $ from '../../shared/dom';
import config from './common/config';
import menuTem from './index.html';

const IMenu = class {
  constructor(editor) {
    this.editor = editor;
    this.$editor = editor.$editor;
    this.cfg = editor.cfg;
    // 当前菜单的状态, 用于图片那里
    this.status = '';
    this.btns = [];
    // 初始化菜单
    this.createMenu();
    //根据配置渲染创建功能按钮
    this.renderBtns();
  }
  createMenu() {
    const {
      $editor,
      editor,
      cfg,
    } = this;
    $editor.html(compiler(menuTem, {
      uid: editor.uid,
      prefix: cfg.prefix,
    }) + $editor.html());
  }
  // 根据配置渲染创建功能按钮
  renderBtns() {
    let tems = '';
    this.cfg.menus.forEach((menu) => {
      const menuBtn = new config[menu](this.editor);
      tems += menuBtn.tem;
      this.btns.push(menuBtn);
    });
    $(`#${this.cfg.prefix}menu${this.editor.uid}`).html(tems);

    this.btns.forEach((btn) => {
      btn.bind();
    });
  }
  // 删除
  remove() {
    const {
      cfg,
      uid,
    } = this.editor;
    $(`#${cfg.prefix}dialog${uid}`).remove();
  }
  // 检测哪个是激活
  testActive() {
    this.btns.forEach((btn) => {
      if (btn.isActive) {
        btn.isActive();
      }
    });
  }
};

export default IMenu;
