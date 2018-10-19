import { isString, toNumber } from './util';
/**
 * 添加 px 单位
 *
 * @param {Object} value 处理的字符串
 * @returns {string} value 新字符串
 */
 export const px = (value) => {
   const newVal = toNumber(value);
   return typeof value === 'number' || (typeof newVal === 'number' && !Number.isNaN(newVal)) ? `${value}px` : value;
 };

/**
 * 删除 px 单位
 *
 * @param {Object} value 处理的字符串
 * @returns {string} value 新字符串
 */
export const delPx = (value) => {
  if (!isString(value)) {
    return value;
  }
  return value.replace(/px/g, '');
};
