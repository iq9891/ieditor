const path = require('path');

const resolve = p => path.resolve(__dirname, '../../', p);

const base = process.env.GH ? '/ieditor/' : '/';

module.exports = {
  title: 'IEditor',
  base,
  head: [
    ['link', { rel: 'icon', href: `/logo.png` }]
  ],
  dest: './docs',
  serviceWorker: true,
  configureWebpack: {
    module: {
      rules: [{
        test: /\.html$/,
        use: [ {
          loader: 'html-loader',
          options: {
            minimize: true
          }
        }],
      }],
    },
    resolve: {
      alias: {
        text: resolve('src/core/text'),
        menu: resolve('src/core/menu'),
        shared: resolve('src/shared'),
        base: resolve('src/core/menu/component/base'),
        style: resolve('src/core/menu/component/style'),
        select: resolve('src/core/menu/component/select'),
        modal: resolve('src/core/menu/component/modal'),
        color: resolve('src/core/menu/component/color'),
        hotkeys: resolve('node_modules/hotkeys-js/dist/hotkeys.esm'),
      }
    }
  },
  themeConfig: {
    repo: 'iq9891/ieditor',
    searchMaxSuggestions: 5,
    docsDir: 'site',
    sidebar: [
      '/introduction',
      '/config',
      '/readonly',
      '/reset',
      '/color',
      '/base64',
      '/i18n',
      '/video',
      '/diy',
      '/hotkey',
    ],
  },
}
