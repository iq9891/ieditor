import { delSpaces } from 'shared/util';

export function getElementLeft(element) {
  let actualLeft = element.offsetLeft;
  let current = element.offsetParent;
  while (current !== null) {
    actualLeft += current.offsetLeft;
    current = current.offsetParent;
  }
  return actualLeft;
}

export function getElementTop(element) {
  let actualTop = element.offsetTop;
  let current = element.offsetParent;
  while (current !== null) {
    actualTop += current.offsetTop;
    current = current.offsetParent;
  }
  return actualTop;
}

/**
  * 向父级查找某一节点
  * @param {Object} element must 查找的基本节点
  * @param {String} node must 大写的匹配节点
  * @param {Function} callback maybe 找到匹配节点的回调函数
  * @returns Boolean 是否有匹配的节点
  */
export function searchNode(element, node, callback = () => {}) {
  const {
    nodeName,
  } = element;
  // 如果这个节点是 node 要查找的节点
  if (nodeName === node) {
    callback(element);
    return true;
  }

  const { parentNode } = element;

  if (parentNode) {
    return searchNode(parentNode, node, callback);
  }

  return false;
}

/**
  * 向父级查找某一节点是否有相同的样式
  * @param {Object} $elem must 查找的基本节点
  * @param {String} style must 查找的样式
  * @param {Function} callback maybe 找到匹配节点的回调函数
  * @param {String} prevStyles must 子节点的样式
  * @param {String} nodeName must 大写的匹配节点，也是顶级节点
  */
export function searchStyle($elem, styleConfig, callback = () => {}, nodeName = 'P', prevStyles = '') {
  // 如果这个节点是 node 要查找的节点
  const elemStyle = delSpaces($elem.attr('style') || '') + prevStyles;
  const matchKeyResult = !!elemStyle && elemStyle.indexOf(styleConfig.key) > -1;
  // 匹配配置的操作标签
  const matchTagResult = $elem.length > 0 && $elem[0].nodeName === styleConfig.tag;
  const endResult = matchKeyResult || matchTagResult;

  if ($elem.length > 0) {
    if (endResult) {
      // 匹配到了 返回
      callback($elem, elemStyle, endResult);
      return endResult;
    }

    // 到 p 标签了 返回
    if ($elem.length > 0 && $elem[0].nodeName === nodeName) {
      callback($elem, elemStyle, endResult);
      return endResult;
    }

    const $parent = $elem.parent();
    if ($parent.length) {
      return searchStyle($parent, styleConfig, callback, nodeName, elemStyle);
    }
  } else {
    callback($elem, elemStyle, endResult);
  }

  return endResult;
}

/**
 * XDom 创建元素
 *
 * @param {String} nodeName 节点名字
 */
export function createElement(nodeName) {
  return document.createElement(nodeName);
}


export function createElem8203() {
  const node = document.createElement('span');
  node.innerHTML = '&#8203;';
  return node;
}

export function insertAfter(insertElement, targetElement) {
  const parent = insertElement.parentNode;
  //最后一个子节点 lastElementChild兼容其他浏览器 lastChild  兼容ie678;
  const lastElement = parent.lastElementChild || parent.lastChild;
  //兄弟节点同样也是有兼容性
  const targetSibling = targetElement.nextElementSibling || targetElement.nextSibling;
  if (!targetSibling || lastElement === targetElement) { //先判断目标节点是不是父级的最后一个节点，如果是的话，直接给父级加子节点就好
    parent.appendChild(targetElement);
  } else { //不是最好后一个节点  那么插入到目标元素的下一个兄弟节点之前（就相当于目标元素的insertafter）
    parent.insertBefore(insertElement, targetSibling);
  }
}
