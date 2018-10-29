/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.2/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "b4e5caa98e458938fecefa1d12077a0f"
  },
  {
    "url": "assets/css/10.styles.a689aba3.css",
    "revision": "6bf600ffff96c4ccf16e3bb070724d4c"
  },
  {
    "url": "assets/css/11.styles.f4682cbe.css",
    "revision": "6bf600ffff96c4ccf16e3bb070724d4c"
  },
  {
    "url": "assets/css/12.styles.6664a763.css",
    "revision": "6bf600ffff96c4ccf16e3bb070724d4c"
  },
  {
    "url": "assets/css/13.styles.1a42b9a1.css",
    "revision": "6bf600ffff96c4ccf16e3bb070724d4c"
  },
  {
    "url": "assets/css/2.styles.85218b52.css",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "assets/css/3.styles.95fa49ae.css",
    "revision": "df7c35ec8029dbbde0735a45f875eaf7"
  },
  {
    "url": "assets/css/5.styles.9575fc10.css",
    "revision": "6bf600ffff96c4ccf16e3bb070724d4c"
  },
  {
    "url": "assets/css/6.styles.2c268ab5.css",
    "revision": "6bf600ffff96c4ccf16e3bb070724d4c"
  },
  {
    "url": "assets/css/8.styles.cd638482.css",
    "revision": "819edcfbbce314374dd8efc77882b801"
  },
  {
    "url": "assets/css/9.styles.5c886248.css",
    "revision": "6bf600ffff96c4ccf16e3bb070724d4c"
  },
  {
    "url": "assets/css/styles.ac124114.css",
    "revision": "a58e691e067c4d640393cbfa7947da3c"
  },
  {
    "url": "assets/img/backcolor-disable.bb837db2.svg",
    "revision": "bb837db277e9fc20b6b856ce9ce9dfcb"
  },
  {
    "url": "assets/img/backcolor-on.0fe88818.svg",
    "revision": "0fe88818a7055be3b97451abe6a64e9e"
  },
  {
    "url": "assets/img/backcolor.28620341.svg",
    "revision": "28620341546c07fa3845bd28bef4c348"
  },
  {
    "url": "assets/img/bold-disable.788ccfde.svg",
    "revision": "788ccfded45fcfe28d0fec684755528b"
  },
  {
    "url": "assets/img/bold-on.85e30767.svg",
    "revision": "85e3076776a574a49a166e0e3c87bf73"
  },
  {
    "url": "assets/img/bold.cf341cf3.svg",
    "revision": "cf341cf329a784926a09851f9324a4d6"
  },
  {
    "url": "assets/img/code-disable.6916fcbf.svg",
    "revision": "6916fcbf109363b3f6bfa22a997bb287"
  },
  {
    "url": "assets/img/code-on.1fa3cd6a.svg",
    "revision": "1fa3cd6a363ca92238aac8ea6b49f880"
  },
  {
    "url": "assets/img/code.daf48c4e.svg",
    "revision": "daf48c4eba56fa24007459399bfefa40"
  },
  {
    "url": "assets/img/copy-disable.1c678d85.svg",
    "revision": "1c678d8539777231343d1d8974e69f4e"
  },
  {
    "url": "assets/img/copy-on.eda36939.svg",
    "revision": "eda369396e35988718cf7857a9173b08"
  },
  {
    "url": "assets/img/copy.bcc013ac.svg",
    "revision": "bcc013ac60dc02336e720329f1d82466"
  },
  {
    "url": "assets/img/cut-disable.5cf922c5.svg",
    "revision": "5cf922c5020797ec41d132016f74f32d"
  },
  {
    "url": "assets/img/cut-on.d71c2140.svg",
    "revision": "d71c21403b2164528670529b1f866b18"
  },
  {
    "url": "assets/img/cut.8526ee92.svg",
    "revision": "8526ee9268849fec542c856c3e152c65"
  },
  {
    "url": "assets/img/forecolor-disable.151d5ef6.svg",
    "revision": "151d5ef65fac672b8feba2ec7936821b"
  },
  {
    "url": "assets/img/forecolor-on.f52d7095.svg",
    "revision": "f52d7095c671b95ce0ea6b311696a2e5"
  },
  {
    "url": "assets/img/forecolor.6b3e1a1a.svg",
    "revision": "6b3e1a1ad2b6e83e0df1e485e7b0e756"
  },
  {
    "url": "assets/img/formatblock-disable.24645352.svg",
    "revision": "246453527c6a883f26b562f904e1988c"
  },
  {
    "url": "assets/img/formatblock-on.4a890972.svg",
    "revision": "4a89097290acb6109756c14118bd385d"
  },
  {
    "url": "assets/img/formatblock.09b1089a.svg",
    "revision": "09b1089af54ba4564d79eecb792c353c"
  },
  {
    "url": "assets/img/full-disable.a7c605b7.svg",
    "revision": "a7c605b7d3d931532ab0cd83c70282f3"
  },
  {
    "url": "assets/img/full-on.e3abbaf6.svg",
    "revision": "e3abbaf66f8e8d2dfec9acabf3fd0678"
  },
  {
    "url": "assets/img/full.7a77b60a.svg",
    "revision": "7a77b60a854ede25d887a65888601c19"
  },
  {
    "url": "assets/img/image-disable.8b2daf6f.svg",
    "revision": "8b2daf6f65541072c8d8e56d4146fcc4"
  },
  {
    "url": "assets/img/image-on.af27641d.svg",
    "revision": "af27641d768e66e96e33e5696e3c92d2"
  },
  {
    "url": "assets/img/image.074651fc.svg",
    "revision": "074651fcec62448fd9d6e5ea687287a4"
  },
  {
    "url": "assets/img/indent-disable.25980e7c.svg",
    "revision": "25980e7c5d8d34a1e63750c44795fb17"
  },
  {
    "url": "assets/img/indent-on.96d3a42e.svg",
    "revision": "96d3a42ef66c44413fc862c81478b54f"
  },
  {
    "url": "assets/img/indent.864db168.svg",
    "revision": "864db1681c017b7a14b1daff8b0ea108"
  },
  {
    "url": "assets/img/inserthorizontalrule-disable.4c439acd.svg",
    "revision": "4c439acd488ebeb5ed0c80e36bc9dfe5"
  },
  {
    "url": "assets/img/inserthorizontalrule-on.13536c51.svg",
    "revision": "13536c5142e4bb7da18182583738a08f"
  },
  {
    "url": "assets/img/inserthorizontalrule.f87fecfb.svg",
    "revision": "f87fecfbaa353ed4b2981c8091fbb51d"
  },
  {
    "url": "assets/img/insertorderedlist-disable.292cad67.svg",
    "revision": "292cad67089cfc562067ccaf62330310"
  },
  {
    "url": "assets/img/insertorderedlist-on.76496daa.svg",
    "revision": "76496daa23a0e20416c941af1f0a8bbb"
  },
  {
    "url": "assets/img/insertorderedlist.17c18fc0.svg",
    "revision": "17c18fc0df1919048d4f7ce3f0cbd798"
  },
  {
    "url": "assets/img/insertunorderedlist-disable.ba6aaf71.svg",
    "revision": "ba6aaf71913383c850463b61a187b4d8"
  },
  {
    "url": "assets/img/insertunorderedlist-on.179eddfb.svg",
    "revision": "179eddfb393d2ec5808de920e0af5318"
  },
  {
    "url": "assets/img/insertunorderedlist.482a1837.svg",
    "revision": "482a1837cb36b77528d3aa685018a068"
  },
  {
    "url": "assets/img/italic-disable.ee29070a.svg",
    "revision": "ee29070acb8a398f3ded2cde9760f78f"
  },
  {
    "url": "assets/img/italic-on.9aba819b.svg",
    "revision": "9aba819bfe44b9cb4cc169971e9ee55b"
  },
  {
    "url": "assets/img/italic.954500db.svg",
    "revision": "954500db3a77f0250c06446e9fc9d656"
  },
  {
    "url": "assets/img/justifycenter-disable.51ea235c.svg",
    "revision": "51ea235c2b6c7f170f2b736ed5acb93b"
  },
  {
    "url": "assets/img/justifycenter-on.4f6b40cf.svg",
    "revision": "4f6b40cf0ab8f4b58df9385239a84f30"
  },
  {
    "url": "assets/img/justifycenter.c887d737.svg",
    "revision": "c887d7373680750fb300fb3a14ed1750"
  },
  {
    "url": "assets/img/justifyfull-disable.114d724b.svg",
    "revision": "114d724b3b24281005496e89306b015e"
  },
  {
    "url": "assets/img/justifyfull-on.25d6cd6c.svg",
    "revision": "25d6cd6c8d5f795c890f4335cee12dfb"
  },
  {
    "url": "assets/img/justifyfull.880f7622.svg",
    "revision": "880f7622f9461c6253b4d3d9e34f6b60"
  },
  {
    "url": "assets/img/justifyleft-disable.617b4c51.svg",
    "revision": "617b4c51869edc696cd76c2b5a924896"
  },
  {
    "url": "assets/img/justifyleft-on.db0d903d.svg",
    "revision": "db0d903d4647e82791d1e19cfea07160"
  },
  {
    "url": "assets/img/justifyleft.48e08568.svg",
    "revision": "48e085687bfd940100e95b87eb049cdd"
  },
  {
    "url": "assets/img/justifyright-disable.3c08599b.svg",
    "revision": "3c08599b0572e2809be7db479d115cf1"
  },
  {
    "url": "assets/img/justifyright-on.0ffede7b.svg",
    "revision": "0ffede7bb9454849133e4314036f1214"
  },
  {
    "url": "assets/img/justifyright.663563d0.svg",
    "revision": "663563d0f3ccac4a2545c6fd5c9325a8"
  },
  {
    "url": "assets/img/link-disable.6409795d.svg",
    "revision": "6409795da3442484b085ea9f9e86fc08"
  },
  {
    "url": "assets/img/link-on.f793764f.svg",
    "revision": "f793764f621345a1deaeee8e5072a39b"
  },
  {
    "url": "assets/img/link.a2d9a730.svg",
    "revision": "a2d9a730224c1b1c4d9dcd032fec56a7"
  },
  {
    "url": "assets/img/redo-disable.94449da0.svg",
    "revision": "94449da06fd5edbd38b050dc58ccc79a"
  },
  {
    "url": "assets/img/redo-on.cc241d9a.svg",
    "revision": "cc241d9af976bd417e2abef87a9b36f1"
  },
  {
    "url": "assets/img/redo.936a5168.svg",
    "revision": "936a5168647322e0cd9db32f239dec90"
  },
  {
    "url": "assets/img/removeformat-disable.357ef42e.svg",
    "revision": "357ef42e6026c6d1531996c303332986"
  },
  {
    "url": "assets/img/removeformat-on.b32dc9e4.svg",
    "revision": "b32dc9e4ab016de4bfb7033a712cf511"
  },
  {
    "url": "assets/img/removeformat.115508d5.svg",
    "revision": "115508d5ef8dbe89c718ecc91e0cee8d"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/img/underline-disable.b7311632.svg",
    "revision": "b7311632ae3c55f13d83f67eea6a7a5e"
  },
  {
    "url": "assets/img/underline-on.e93d2500.svg",
    "revision": "e93d250068a206b7e1237cd4549b0f35"
  },
  {
    "url": "assets/img/underline.14dc5e12.svg",
    "revision": "14dc5e1293d6fa025e46c284696b014d"
  },
  {
    "url": "assets/img/undo-disable.bd6e0659.svg",
    "revision": "bd6e0659691ba4dd12e2d6be3c44c524"
  },
  {
    "url": "assets/img/undo-on.4db1bf64.svg",
    "revision": "4db1bf64cdc4f9daaa31184a0c196e2f"
  },
  {
    "url": "assets/img/undo.df9e34be.svg",
    "revision": "df9e34be8e42385a8c66ba2eb1f8b80e"
  },
  {
    "url": "assets/img/video-disable.88385ad0.svg",
    "revision": "88385ad08872d3b3782ff2866f97f213"
  },
  {
    "url": "assets/img/video-on.b39ff064.svg",
    "revision": "b39ff0642d52d280468b7e39c32141cb"
  },
  {
    "url": "assets/img/video.a33136d4.svg",
    "revision": "a33136d413f6407496d931f0954004a9"
  },
  {
    "url": "assets/js/0.58e957ae.js",
    "revision": "b693470c90f413968fa9534d4ecef040"
  },
  {
    "url": "assets/js/10.a689aba3.js",
    "revision": "01f4f5e003a7cedb5b062e8ab6efa580"
  },
  {
    "url": "assets/js/11.f4682cbe.js",
    "revision": "9726366bafea06ac58f21bb445c03f16"
  },
  {
    "url": "assets/js/12.6664a763.js",
    "revision": "7b609cb6761b9bc12b2449e1af8a1a64"
  },
  {
    "url": "assets/js/13.1a42b9a1.js",
    "revision": "bcd8bd21ffd6245bdc3f7d3ac28eb562"
  },
  {
    "url": "assets/js/2.85218b52.js",
    "revision": "cf1a558fd5ba34fc1b2b581f3488bf6c"
  },
  {
    "url": "assets/js/3.95fa49ae.js",
    "revision": "47ec8a3c98250a4c22732bef35aa7866"
  },
  {
    "url": "assets/js/4.7ce3ac0d.js",
    "revision": "c986d8cd1f4e90d7f430467a1aad615c"
  },
  {
    "url": "assets/js/5.9575fc10.js",
    "revision": "ca91f39a2bafd9f378dd18e7680db5be"
  },
  {
    "url": "assets/js/6.2c268ab5.js",
    "revision": "0bad25c4b5fb5aed13913d235d475e92"
  },
  {
    "url": "assets/js/7.8fb80a97.js",
    "revision": "77837ab359e0db1dd6238f614d76dae0"
  },
  {
    "url": "assets/js/8.cd638482.js",
    "revision": "c6da347db725a8a07e702078c12fa209"
  },
  {
    "url": "assets/js/9.5c886248.js",
    "revision": "560dcb7973eb849551d1894931ef56ec"
  },
  {
    "url": "assets/js/app.ac124114.js",
    "revision": "e2361d2c8c85af395403342466dbd6ea"
  },
  {
    "url": "base64.html",
    "revision": "0393db3195f519f46f3addf408736b23"
  },
  {
    "url": "color.html",
    "revision": "ab872111cb6424ad54ee71263efd611e"
  },
  {
    "url": "config.html",
    "revision": "cb735647c2ff713f2b72282f922a86a4"
  },
  {
    "url": "diy.html",
    "revision": "59aa7ef932f56b7a911db9d238abef31"
  },
  {
    "url": "i18n.html",
    "revision": "537792bde3cba4268d728c6eead10165"
  },
  {
    "url": "index.html",
    "revision": "766cce3e6071117438a2bef370c474ce"
  },
  {
    "url": "introduction.html",
    "revision": "23c58e1be32537e55dbf3f616eede0c3"
  },
  {
    "url": "logo.png",
    "revision": "a53179ca13039218c56cb6bce42e3aa6"
  },
  {
    "url": "readonly.html",
    "revision": "0e3ff3d5cb3f08a31b5a9fa310b5bd9e"
  },
  {
    "url": "reset.html",
    "revision": "1cf5207adf4a92daa5c9e0be587ca9bd"
  },
  {
    "url": "video.html",
    "revision": "9fb5a0301fc86e963352323cfda5cfcc"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
