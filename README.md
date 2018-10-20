# IEditor

>高度客制化的富文本编辑器

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/@iq9891/ieditor/blob/master/LICENSE)
[![@iq9891/ieditor](https://img.shields.io/npm/v/@iq9891/ieditor.svg?colorB=blue)](https://www.npmjs.org/package/@iq9891/ieditor)
[![NPM downloads](https://img.shields.io/npm/dt/@iq9891/ieditor.svg)](https://npmjs.org/package/@iq9891/ieditor)
![GitHub language count](https://img.shields.io/github/languages/count/iq9891/ieditor.svg)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/iq9891/ieditor.svg)
[![gzip](http://img.badgesize.io/https://unpkg.com/@iq9891/ieditor?compression=gzip)](https://unpkg.com/@iq9891/ieditor)

[![Sauce Labs Test Status (for master branch)](https://badges.herokuapp.com/browsers?googlechrome=7&firefox=7&microsoftedge=10&iexplore=9&safari=10.10)](https://saucelabs.com/u/_wmhilton)

![ieditor preview](./ieditor-preview.png)

## 功能

- 菜单自定义
- ajax 图片上传
- base64 图片显示
- 扩展 class 名
- 多语言支持
- 颜色可配置
- 样式自定义

## 相关链接

- CDN
  - [unpkg](https://unpkg.com/@iq9891/ieditor)
  - [jsdelivr](https://cdn.jsdelivr.net/npm/@iq9891/ieditor)
- [各版本下载 https://github.com/@iq9891/ieditor/releases](https://github.com/@iq9891/ieditor/releases)
- [更新记录](https://github.com/@iq9891/ieditor/blob/master/changelog.md)

## 使用

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>ieditor</title>
  <script src="https://unpkg.com/@iq9891/ieditor"></script>
  <link rel="stylesheet" href="https://unpkg.com/@iq9891/ieditor@0.1.0/dist/ieditor.min.css">
</head>
<body>
  <div id="ied" class="ied"></div>
  <script>
  var myEditor = new IEditor()
  myEditor.init();
  </script>
</body>
</html>
```

## 运行 demo
- 下载源码 `https://github.com/@iq9891/ieditor.git`
- 安装或者升级最新版本 nodeJS（最低v9.x.x）
- 进入目录，安装依赖包 cd ieditor && yarn install
- 安装包完成之后，windows 用户运行 `npm run dev`，Mac 用户运行 `npm start` 。
- 打开浏览器 [http://localhost:8080/](http://localhost:8080/)
