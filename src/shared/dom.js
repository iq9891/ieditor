import getStyle from 'shared/getStyle';
import {
  isString,
  forEach,
  isUndefined,
  keys,
} from './util';
import { warn, noUnit } from './helper';
import { px, delPx } from './px';
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

const IDom = class {
  constructor(selector) {
    this.length = 0;
    return this.$init(selector);
  }

  /**
   * IDom 初始化
   *
   * @param {String} selector 要选择的元素或者要添加的元素
   * @private
   * @returns {Object} XDOM 对象
   */
  $init(selector) {
    if (!selector) {
      warn('请传一个选择器');
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
   * IDom 获取节点名字
   * @returns {string} 节点名字
   */
  getNodeName() {
    return this.getValue('nodeName');
  }

  /**
   * IDom 是否包含某个子节点
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
   * IDom 获取|设置 html
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
   * IDom 获取|设置 value
   *
   * @param {String} value 要设置的 value
   * @returns {String} 内容
   */
  val(value) {
    return isUndefined(value) ? this.getValue('value') : this.setValue('value', value);
  }

  /**
   * IDom 设置|获取样式
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
    if (isString(params)) {
      if (value) {
        return forEach(this, (elem) => {
          elem.style[params] = noUnit(params) ? value : px(value);
        });
      }
      if (this.length) {
        if (params === 'line-height') {
          return String(delPx(getStyle(this[0])[params]) / delPx(getStyle(this[0])['font-size']));
        }
        return getStyle(this[0])[params];
      }
      return this;
    }
    return forEach(this, (elem) => {
      forEach(keys(params), (paramsKey) => {
        elem.style[paramsKey] = noUnit(paramsKey) ? params[paramsKey] : px(params[paramsKey]);
      });
    });
  }

  /**
   * IDom 设置|获取属性
   *
   * @param {String} params 如果是一位，那么就是获取某个属性
   * @returns {Object} XDOM 对象
   */
  attr(params, value) {
    return isUndefined(value) ? this.getValue('getAttribute', params) : this.setValue('setAttribute', params, value);
  }

  /**
   * IDom 删除属性
   *
   * @param {String} params 删除的属性
   * @returns {Object} XDOM 对象
   */
  removeAttr(params) {
    return this.getValue('removeAttribute', params);
  }

  /**
   * IDom 添加 class
   *
   * @param {String} name 添加的 class
   * @returns {String} 内容
   */
  addClass(name) {
    if (!name) {
      return this;
    }
    return this.setValue('setAttribute', 'class', `${this.getValue('getAttribute', 'class')} ${name}`);
  }

  /**
   * IDom 删除 class
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

  //
  /**
   * IDom 获取第几个元素
   * @param {Number} index 索引
   * @returns {Object} XDOM 对象
   */
  eq(index) {
    return new IDom(this[index >= this.length ? index % this.length : index]);
  }

  /**
   * IDom 第一个
   * @returns {Object} XDOM 对象
   */
  first() {
    return this.eq(0);
  }

  /**
   * IDom 最后一个
   * @returns {Object} XDOM 对象
   */
  last() {
    const { length } = this;
    const now = length - 1 > -1 ? length - 1 : 0;
    return this.eq(now);
  }

  /**
   * IDom 子节点
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
    return new IDom(childs);
  }

  /**
   * IDom 获取父节点
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
    return new IDom(parents);
  }

  /**
   * IDom 索引
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
   * IDom 绑定事件
   * @param {string} type 事件类型
   * @param {string|function} selector 代理的选择器|绑定方法
   * @param {function} fn 绑定函数
   * @example
$('body').on('click', 'div', () => {
  console.log('事件代理');
});
$('div').on('click', () => {
  console.log('普通事件');
});
$('div').on('click mouserover', () => {
  console.log('普通事件');
});
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
                warn(err);
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
   * IDom 取消绑定事件
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

export default selector => new IDom(selector);
