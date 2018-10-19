import parser from 'shared/parser';
import $ from 'shared/dom';
import { hasOwn } from 'shared/util';
import config from './config';
import menuTem from './index.html';

const Menu = class {
  constructor(editor) {
    this.editor = editor;
    this.$editor = editor.$editor;
    this.cfg = editor.cfg;
    const configDiy = this.cfg.diy;
    // 当前菜单的状态, 用于图片那里
    this.status = '';
    this.btns = [];
    this.clicks = {};
    // 初始化菜单
    if (
      !hasOwn(configDiy, 'menu')
      || (hasOwn(configDiy, 'menu') && !configDiy.menu)
    ) {
      this.createMenu();
    }
    //根据配置渲染创建功能按钮
    this.renderBtns();
  }

  createMenu() {
    const {
      $editor,
      editor,
      cfg,
    } = this;
    $editor.html(parser(menuTem, {
      uid: editor.uid,
      prefix: cfg.prefix,
    }) + $editor.html());
  }

  // 根据配置渲染创建功能按钮
  renderBtns() {
    let tems = '';
    this.cfg.menus.forEach((menuType) => {
      const menuBtn = new config[menuType](this.editor);
      tems += menuBtn.tem;
      this.btns.push(menuBtn);
      this.clicks[menuType] = menuBtn.click.bind(menuBtn, menuBtn.type);
    });
    tems += `<div id="${this.cfg.prefix}modal${this.editor.uid}"></div>`;
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
    this.onResult = {};
    this.btns.forEach((btn) => {
      if (btn.isActive) {
        this.onResult[btn.typeName] = btn.isActive();
      }
    });
    if (hasOwn(this.cfg.diy, 'active')) {
      this.cfg.diy.active(this.onResult);
    }
    return this.onResult;
  }

  // 设置|取消禁用状态
  testDisable() {
    const {
      cfg,
      uid,
      code,
    } = this.editor;
    const pfix = cfg.prefix;
    const $link = $(`.${pfix}menu-link`);
    const $select = $(`.${pfix}select`);
    const disableLinkName = `${pfix}menu-link-disable`;
    const disableSelectName = `${pfix}select-disable`;
    if (code) {
      $link.addClass(disableLinkName);
      $select.addClass(disableSelectName);
      $(`#${pfix}code${uid}`).removeClass(disableLinkName);
    } else {
      $link.removeClass(disableLinkName);
      $select.removeClass(disableSelectName);
    }
  }
};

export default Menu;
