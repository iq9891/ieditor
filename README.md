# ieditor

> ieditor is a rich text editor on the web. React and Angular are currently not supported. 。[Online](https://output.jsbin.com/vacacir)

[![ieditor](https://img.shields.io/npm/v/ieditor.svg?style=flat-square)](https://www.npmjs.org/package/ieditor)
[![NPM downloads](http://img.shields.io/npm/dm/ieditor.svg?style=flat-square)](https://npmjs.org/package/ieditor)
[![NPM downloads](https://img.shields.io/npm/dt/ieditor.svg?style=flat-square)](https://npmjs.org/package/ieditor)
[![NPM downloads](http://img.badgesize.io/https://unpkg.com/ieditor?compression=gzip&style=flat-square)](https://unpkg.com/ieditor)

[![Sauce Labs Test Status (for master branch)](https://badges.herokuapp.com/browsers?googlechrome=7&firefox=7&microsoftedge=10&iexplore=9&safari=10.10)](https://saucelabs.com/u/_wmhilton)

![ieditor preview](./ieditor-preview-en.png)

[中文 README](README-zh_CN.md)

## Features

- Drag and drop upload
- ajax image upload
- base64 image display
- extended class name
- Multi-language support
- Menu classification
- Color configurable
- Style customization

## Related Links

- Document： [https://www.kancloud.cn/iq9891/ieditor/500799](https://www.kancloud.cn/iq9891/ieditor/500799)
- CDN
  - [unpkg](https://unpkg.com/ieditor)
  - [jsdelivr](https://cdn.jsdelivr.net/npm/ieditor@latest/dist/)
- [Download https://github.com/iq9891/ieditor/releases](https://github.com/iq9891/ieditor/releases)
- [vue-ieditor](https://github.com/iq9891/vue-ieditor) Vue.js 的封装
- [Update record](https://github.com/iq9891/ieditor/blob/master/changelog.md)

## Usage

``` html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>ieditor</title>
    <script src="https://unpkg.com/ieditor"></script>
  </head>
  <body>
    <div id="ied" class="ied"></div>
    <script>
    var myEditor = new window.IEditor('#ied')
    myEditor.create();
    </script>
  </body>
</html>
```

## Run the demo

- Download source `https://github.com/iq9891/ieitor.git`
- Install or upgrade the latest version NodeJs (minimum v9.x.x)
- Enter the directory, install the dependency package `cd ieditor && yarn install`
- After the installation package is complete, the windows user runs `npm run dev` and the Mac user runs `npm start`
- Open browser [http://localhost:8080/](http://localhost:8080/)
