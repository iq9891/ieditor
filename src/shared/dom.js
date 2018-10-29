import getStyle from 'shared/getStyle';
import {
  isString,
  forEach,
  isUndefined,
  keys,
} from './util';
import { px } from './px';
import {
  delEvt,
  addEvt,
} from './event';
import { getDomId } from './parsedom';

// 记录所有事件
// body[0] 为元素路径
// {
//  body[0]: {
//    click: [],
//  }
// }
const events = {};

const Dom = class {
  constructor(selector, endSelector) {
    this.length = 0;
    if (endSelector && selector !== endSelector) {
      const nodes = [selector];
      this.getMiddleNodes(nodes, selector, endSelector);
      nodes.push(endSelector);
      return this.$init(nodes);
    }
    return this.$init(selector);
  }

  /**
   * Dom 初始化
   *
   * @param {String} selector 要选择的元素或者要添加的元素
   * @private
   * @returns {Object} XDOM 对象
   */
  $init(selector) {
    if (!selector) {
      return this;
    }
    // 如果是一个 DOM 元素（是 element , 或者 document ）
    if (selector.nodeType === 1 || selector.nodeType === 9) {
      this[0] = selector;
      this.length = 1;
      return this;
    }
    // 如果是字符串
    const docSelector = isString(selector) ? document.querySelectorAll(selector) : selector;

    this.length = docSelector.length;

    forEach(docSelector, (el, elIndex) => {
      this[elIndex] = el;
    });
    return this;
  }

  /**
   * Dom 获取节点名字
   * @returns {string} 节点名字
   */
  getMiddleNodes(nodes, selector, endSelector) {
    const next = selector.nextSibling;
    if (next && next !== endSelector) {
      nodes.push(next);
      this.getMiddleNodes(nodes, next, endSelector);
    }
  }

  /**
   * Dom 获取节点名字
   * @returns {string} 节点名字
   */
  getNodeName() {
    return this.getValue('nodeName');
  }

  /**
   * Dom 是否包含某个子节点
   * @param {String} $elem 检测的节点
   * @returns {string} 节点名字
   */
  isContain($elem) {
    if (this.length && $elem.length) {
      return this[0].contains($elem[0]);
    }
    return this;
  }

  // 类数组，forEach
  forEach(fn) {
    return forEach(this, (el, elIndex) => {
      fn.call(el, el, elIndex);
    });
  }

  // 循环设置某属性的值
  setValue(attr, value, option) {
    return forEach(this, (elem) => {
      if (isUndefined(option)) {
        elem[attr] = value;
      } else {
        elem[attr](value, option);
      }
    });
  }

  // 获取对象第一个某属性的值
  getValue(attr, option) {
    if (this.length) {
      return isUndefined(option) ? this[0][attr] : this[0][attr](option);
    }
    return this;
  }

  /**
   * Dom 获取|设置 html
   *
   * @param {String} html 要设置的 html
   * @private
   * @example
   $('div').html('<div><p>ieditor</p></div>')
   * @returns {String} 内容
   */
  html(html) {
    return isString(html) ? this.setValue('innerHTML', html) : this.getValue('innerHTML');
  }

  /**
   * Dom 获取|设置 value
   *
   * @param {String} value 要设置的 value
   * @returns {String} 内容
   */
  val(value) {
    return isUndefined(value) ? this.getValue('value') : this.setValue('value', value);
  }

  /**
   * Dom 设置|获取样式
   *
   * @param {String} params 如果是一位，那么就是获取某个属性
   * @param {Object} params 可以设置多个样式
   * @example
   $('div').css('height', 100);
   $('div').css('height'); // 100px
   $('div').css({
   height: 200
 });
   * @returns {Object} XDOM 对象
   */
  css(params, value) {
    if (typeof params === 'string') {
      if (value) {
        return this.forEach((elem) => {
          elem.style[params] = params === 'line-height' || params === 'font-size' || params === 'text-indent' ? value : px(value);
        });
      }
      return getStyle(this[0])[params];
    }
    return this.forEach((elem) => {
      Object.keys(params).forEach((paramsKey) => {
        elem.style[paramsKey] = paramsKey === 'zIndex' || paramsKey === 'text-indent' ? params[paramsKey] : px(params[paramsKey]);
      });
    });
  }

  /**
   * Dom 设置|获取属性
   *
   * @param {String} params 如果是一位，那么就是获取某个属性
   * @returns {Object} XDOM 对象
   */
  attr(params, value) {
    return isUndefined(value) ? this.getValue('getAttribute', params) : this.setValue('setAttribute', params, value);
  }

  /**
   * Dom 删除属性
   *
   * @param {String} params 删除的属性
   * @returns {Object} XDOM 对象
   */
  removeAttr(params) {
    return this.getValue('removeAttribute', params);
  }

  /**
   * Dom 添加 class
   *
   * @param {String} name 添加的 class
   * @returns {String} 内容
   */
  addClass(name) {
    if (!name) {
      return this;
    }
    let className = this.getValue('getAttribute', 'class');
    if (isString(className) && className.indexOf(name) === -1) {
      className += ` ${name}`;
    }
    return this.setValue('setAttribute', 'class', className);
  }

  /**
   * Dom 删除 class
   *
   * @param {String} name 添加的 class
   * @returns {String} 内容
   */
  removeClass(name) {
    if (!name) {
      return this;
    }
    return forEach(this, (elem) => {
      const { className } = elem;
      const rName = new RegExp(`\\s${name}|${name}\\s|${name}`);
      elem.className = className.replace(rName, '');
    });
  }

  /**
   * Dom 包裹某一个元素
   * @param {String} nodeName 要包裹元素的节点名称
   */
  wrap(nodeName) {
    if (this.length) {
      const self = this[0];
      let newElem = null;
      const parent = self.parentNode;
      // 处理 列表情况的时候
      if (self.nodeName === 'LI') {
        newElem = document.createElement(nodeName);
        const parList = document.createElement(parent.nodeName);
        parent.parentNode.insertBefore(newElem, parent);
        parList.appendChild(self);
        newElem.appendChild(parList);
        // 如果不存子节点就删除
        if (!parent.children.length) {
          parent.parentNode.removeChild(parent);
        }
      } else {
        newElem = document.createElement(nodeName);
        parent.insertBefore(newElem, self);
        newElem.appendChild(self);
      }
      return new Dom(newElem);
    }
    return null;
  }

  /**
   * Dom 删除父级元素保留自身
   * 为 blockquote 量身定制
   */
  unwrap() {
    if (this.length) {
      let self = this[0];
      let parent = self.parentNode;
      let childs = parent.childNodes;
      let grandpa = parent.parentNode;
      // 如果是 ol 或 ul
      if (self.nodeName === 'LI') {
        self = this[0].parentNode;
        parent = self.parentNode;
        grandpa = parent.parentNode;
        childs = parent.childNodes;
      }
      if (childs.length === 1) {
        grandpa.insertBefore(self.cloneNode(true), parent);
        parent.removeChild(self);
      } else {
        // 如果引用中不止一个子节点
        const nodeList = this.splitNode();
        // 如果前面有
        if (nodeList.before.length) {
          const newBeforeHtml = document.createElement('blockquote');
          nodeList.before.forEach((beforeItem) => {
            newBeforeHtml.appendChild(beforeItem);
          });
          grandpa.insertBefore(newBeforeHtml, parent);
        }

        grandpa.insertBefore(self.cloneNode(true), parent);
        parent.removeChild(self);

        if (nodeList.after.length) {
          const newAfterHtml = document.createElement('blockquote');
          nodeList.after.forEach((beforeItem) => {
            newAfterHtml.appendChild(beforeItem);
          });
          grandpa.insertBefore(newAfterHtml, parent);
        }
        grandpa.removeChild(parent);
      }
      // 如果没有子节点就删除
      if (!childs.length) {
        grandpa.removeChild(parent);
      }
    }
  }

  /**
   * XDom 追加子元素
   *
   * @param {Object} child 要添加的 XDom 对象
   * @private
   * @example
   $('div').append($('<div><p>xeditor</p></div>'))
   * @returns {Object} XDOM 对象
   */
  append(child) {
    this.forEach((elem) => {
      child.forEach((cd) => {
        elem.appendChild(cd.cloneNode(true));
      });
    });
    return this;
  }

  /**
   * 分割节点 前节点集合， 当前节点， 后节点集合
   */
  splitNode() {
    const nodeList = {
      before: [],
      node: null,
      after: [],
    };
    if (this.length) {
      const self = this[0];
      const parent = self.parentNode;
      const childs = parent.childNodes;
      const $childs = new Dom(childs);
      let isEqual = false;
      $childs.forEach((cItem) => {
        const index = isEqual ? 'after' : 'before';
        if (cItem === self) {
          isEqual = true;
          nodeList.node = cItem.cloneNode(true);
        } else {
          nodeList[index].push(cItem.cloneNode(true));
        }
      });
    }
    return nodeList;
  }

  /**
   * Dom 获取第几个元素
   * @param {Number} index 索引
   * @returns {Object} XDOM 对象
   */
  eq(index) {
    return new Dom(this[index >= this.length ? index % this.length : index]);
  }

  /**
   * Dom 第一个
   * @returns {Object} XDOM 对象
   */
  first() {
    return this.eq(0);
  }

  /**
   * Dom 最后一个
   * @returns {Object} XDOM 对象
   */
  last() {
    const { length } = this;
    const now = length - 1 > -1 ? length - 1 : 0;
    return this.eq(now);
  }

  /**
   * Dom 子节点
   * @returns {Object} XDOM 对象
   */
  children(elem) {
    const childs = [];
    if (elem) {
      forEach(elem, (el) => {
        if (el.firstChild) {
          childs.push(el.firstChild);
        }
      });
    } else {
      forEach(this, (el) => {
        const { children } = el;
        if (children.length) {
          forEach(keys(children), (elChild) => {
            if (elChild !== 'length') {
              const hasNode = childs.some(cds => cds.isEqualNode(children[elChild]));
              if (!hasNode) {
                childs.push(children[elChild]);
              }
            }
          });
        }
      });
    }
    return new Dom(childs);
  }

  /**
   * Dom 获取父节点
   * @returns {Object} XDOM 对象
   */
  parent() {
    const parents = [];
    forEach(this, (el) => {
      const { parentNode } = el;
      const hasParent = parents.some(pts => pts.isEqualNode(parentNode));
      if (!hasParent) {
        parents.push(parentNode);
      }
    });
    return new Dom(parents);
  }

  /**
   * Dom 索引
   * @returns {Number} 当前索引
   */
  index() {
    const nowElParent = this.parent().children();
    let now = 0;
    forEach(nowElParent, (npNode, npNodeIndex) => {
      if (this.length && npNode.isEqualNode(this[0])) {
        now = npNodeIndex;
      }
    });
    return now;
  }

  /**
   * Dom 绑定事件
   * @param {string} type 事件类型
   * @param {string|function} selector 代理的选择器|绑定方法
   * @param {function} fn 绑定函数
   * @example 参照 jQuery
   * @returns {Object} XDOM 对象
   */
  on(type, selector, fn) {
    // 如果是字符串
    if (isString(type)) {
      // 如果是普通的绑定 $('div').on('click mouseover');
      const types = type.split(' ');
      const eventNoAgent = typeof selector === 'function';
      return forEach(this, (el) => {
        forEach(types, (tp) => {
          if (!events[getDomId(el)]) {
            events[getDomId(el)] = {};
          }
          if (!events[getDomId(el)][tp]) {
            events[getDomId(el)][tp] = [];
          }
          if (eventNoAgent) {
            events[getDomId(el)][tp].push(selector);
            // 无代理
            addEvt(el, tp, selector);
          } else {
            const agentFn = (e = window.event) => {
              const { target } = e;
              try {
                if (target.matches(selector)) {
                  fn.call(target, e);
                }
              } catch (err) {
                addEvt(el, tp, () => {});
              }
            };
            events[getDomId(el)][tp].push(agentFn);
            // 有代理
            addEvt(el, tp, agentFn);
          }
        });
      });
    }
    return this;
  }

  /**
   * Dom 取消绑定事件
   * @param {string} type 方法类型
   * @param {function} fn 绑定函数
   * @example
$('body').off('click mouseover'); // 取消 click mouseover 绑定事件
$('div').off('click'); // 取消 click 绑定事件
$('p').off(); // 取消所有绑定事件
   * @returns {Object} XDOM 对象
   */
  off(type, fn) {
    // 如果传参数
    if (isString(type)) {
      // 如果是普通的绑定 $('div').on('click mouseover');
      const types = type.split(' ');
      return forEach(this, (el) => {
        forEach(types, (tp) => {
          if (fn) {
            delEvt(el, tp, fn);
          } else {
            const evs = events[getDomId(el)][tp];
            forEach(evs, (ev) => {
              delEvt(el, tp, ev);
            });
          }
        });
      });
    }
    return this;
  }
};

export default (selector, endSelector) => new Dom(selector, endSelector);
