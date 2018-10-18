const path = require('path')

const resolve = p => path.resolve(__dirname, '../', p)

module.exports = {
  text: resolve('src/core/text'),
  menu: resolve('src/core/menu'),
  shared: resolve('src/shared'),
  base: resolve('src/core/menu/component/base'),
  select: resolve('src/core/menu/component/select'),
  modal: resolve('src/core/menu/component/modal'),
  color: resolve('src/core/menu/component/color'),
};
