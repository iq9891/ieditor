import { isArray, keys, isPlainObject } from './util';
/**
 * 生成特定的正则表达式
 * @param {string} key 解析模板的某一个 键值对
 * @param {string} flags 正则标识，如 'g'
 * @return {object} 正则表达式
 */
export const genReg = (key, flags = '') => new RegExp(`{{\\s?(${key})\\s?}}`, flags);
/**
 * 筛选键值对非对象的值
 */
export const filterNoObjectKey = (obj) => {
  const objIsArray = isArray(obj);
  const newObj = objIsArray ? obj : keys(obj);
  return newObj.filter(key => !isPlainObject(objIsArray ? key : obj[key]));
};
/**
 * 样式筛选不加单位
 */
const styleList = [
  'line-height',
  'text-indent',
  'z-index',
];
export const noUnit = str => styleList.filter(styleKey => styleKey === str).length > 0;
/**
 * 过滤中横线
 */
export const filterLines = str => str.replace('-', '');
