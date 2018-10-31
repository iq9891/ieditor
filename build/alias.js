const path = require('path')

const resolve = p => path.resolve(__dirname, '../', p)

module.exports = {
  text: resolve('src/core/text'),
  menu: resolve('src/core/menu'),
  shared: resolve('src/shared'),
  base: resolve('src/core/menu/component/base'),
  style: resolve('src/core/menu/component/style'),
  select: resolve('src/core/menu/component/select'),
  modal: resolve('src/core/menu/component/modal'),
  color: resolve('src/core/menu/component/color'),
  hotkeys: resolve('node_modules/hotkeys-js/dist/hotkeys.esm'),
};
