const path = require('path')

const resolve = p => path.resolve(__dirname, '../', p)

module.exports = {
  text: resolve('src/core/text'),
  menu: resolve('src/core/menu'),
  shared: resolve('src/shared'),
};
