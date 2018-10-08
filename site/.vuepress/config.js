const base = process.env.GH ? '/ieditor/' : '/'

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
  },
  themeConfig: {
    repo: 'iq9891/ieditor',
    searchMaxSuggestions: 5,
    docsDir: 'site',
  }
}
