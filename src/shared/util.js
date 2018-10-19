// 声明化字符串方法
const xToString = Object.prototype.toString;
/**
 * 严格的 对象 类型检查。仅对纯JavaScript对象返回true
 * @param {any} obj 检查的模板
 * @return {boolean} 是否是 对象
*/
export const isPlainObject = obj => xToString.call(obj) === '[object Object]';
/**
 * 严格的 数组 类型检查。仅对纯JavaScript对象返回true
 * @param {any} arr 检查的模板
 * @return {boolean} 是否是 数组
*/
export const isArray = arr => xToString.call(arr) === '[object Array]';
/**
 * 严格的 节点数组 类型检查。仅对纯JavaScript对象返回true
 * @param {any} arr 检查的模板
 * @return {boolean} 是否是 节点数组
*/
export const isNodeArray = arr => xToString.call(arr) === '[object NodeList]';
/**
 * HTML 的 DOM 类型检查。仅对纯JavaScript对象返回true
 * @param {any} arr 检查的模板
 * @return {boolean} 是否是 节点数组
*/
export const isHtmlArray = arr => (xToString.call(arr)).indexOf('HTML') > -1;
/**
 * 判断是否是字符串
 * @param {any} str 检查的字符串
 * @return {boolean} 是否是 字符串
*/
export const isString = str => xToString.call(str) === '[object String]';
/**
 * 判断是否是 undefined
 * @param {any} undef 检查的 undefined
 * @return {boolean} 是否是 undefined
*/
export const isUndefined = undef => xToString.call(undef) === '[object Undefined]';
/**
 * bind 简单的兼容处理
 * @param {function} fn 更改的方法
 * @param {Object} ctx 新的上下文
 */
const nativeBind = (fn, ctx) => fn.bind(ctx);
const polyfillBind = (fn, ctx) => {
  const boundFn = (...args) => {
    const argLength = args.length;
    const argLengthYes = argLength > 1 ? fn.apply(ctx, args) : fn.call(ctx, args[0]);
    return argLength ? argLengthYes : fn.call(ctx);
  };
  boundFn.$length = fn.length;
  return boundFn;
};
export const bind = Function.prototype.bind ? nativeBind : polyfillBind;
/**
 * 循环的封装
 * @param {object} obj 循环的对象
 * @param {Function} fn 循环触发的事件回调
 */
export const forEach = (obj, fn) => {
  const len = obj.length;
  for (let i = 0; i < len; i++) {
    const elem = obj[i];
    const result = fn.call(elem, elem, i);
    if (result === false) {
      break;
    }
  }
  return obj;
};
/**
 * 对象提取键值的封装
 * @param {object} obj 提取的对象
 */
export const keys = obj => Object.keys(obj);
/**
  * 定义一个属性
  * @param {object} obj 定义属性的对象
  * @param {string} key 定义的属性
  * @param {any} val 定义属性的值
  */
export const def = (obj, key, val) => {
  Object.defineProperty(obj, key, {
    value: val,
  });
};
/**
 * 转换成数字
 */
export const toNumber = (val) => {
  const num = parseFloat(val);
  return Number.isNaN(num) ? val : num;
};
/**
  * 查找对象上是否有属性
  * @param {object} obj 定义属性的对象
  * @param {string} key 定义的属性
  * @return {booleam} 是否有属性
  */
const hasOwnProper = Object.prototype.hasOwnProperty;
export const hasOwn = (obj, key) => hasOwnProper.call(obj, key);
/**
 * 复制对象
 * @param {object} obj 定义属性的对象
 * @return {object} 新的对象
 */
const copyObject = (obj) => {
  if (!isPlainObject(obj)) {
    return obj;
  }
  // JSON.parse(JSON.stringify()); 不能克隆函数
  return Object.assign({}, obj);
};
/**
 * 解析选项
 * @param {object} oldOptions 旧对象
 * @param {object} newOptions 新对象
 * @return {object} 新的对象
*/
export const resolveOptions = (oldOptions, newOptions) => {
  const newOpt = copyObject(oldOptions);
  const oldOptionsKeys = keys(oldOptions);
  // 如果不是 JSON 对象
  if (!isPlainObject(newOptions)) {
    return newOpt;
  }

  keys(newOptions).forEach((newKey) => {
    // 如果旧的配置里有
    if (oldOptionsKeys.includes(newKey)) {
      const nOptItem = newOptions[newKey];
      // 如果是 JSON
      if (isPlainObject(nOptItem)) {
        const options = {};
        keys(nOptItem).forEach((nOptItemKey) => {
          const nOptChild = nOptItem[nOptItemKey];
          options[nOptItemKey] = isHtmlArray(nOptChild) ? nOptChild : copyObject(nOptChild);
        });
        newOpt[newKey] = options;
      } else if (isArray(nOptItem)) {
        newOpt[newKey] = nOptItem.slice();
      } else {
        newOpt[newKey] = nOptItem;
      }
    }
  });
  return newOpt;
};
