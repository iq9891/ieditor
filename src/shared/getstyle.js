/**
 * 获取样式
 *
 * @param {Object} ele 获取样式的元素
 * @returns {Object} style 对象
 */
function getStyle(ele) {
  let style = null;
  const getCss = window.getComputedStyle;
  if (getStyle) {
    style = getCss(ele, null);
  } else {
    style = ele.currentStyle;
  }
  return style;
}

export default getStyle;
