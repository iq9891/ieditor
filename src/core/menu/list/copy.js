import Base from 'base/base';
/**
* Copy 对象
* @example
* new Copy(editor);
*/
class Copy extends Base {
  /**
   * 构造函数
   *
   * @param {Object} editor 编辑器的对象
   */
  constructor(editor) {
    super(editor, 'copy', true);
  }
}
/**
 * Copy 模块.
 * @module Copy
 */
export default Copy;
