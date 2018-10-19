import { isString, toNumber } from './util';
/**
 * 添加 px 单位
 *
 * @param {Object} value 处理的字符串
 * @returns {string} value 新字符串
 */
export const px = value => `${toNumber(value)}px`;

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
