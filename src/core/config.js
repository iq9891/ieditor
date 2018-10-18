// IEditor 配置文件
export default {
  // 默认选择器
  el: '#ied',
  // 默认样式和逻辑选择器前缀
  prefix: 'ied-',
  // 如果定制化
  // diy: {
  //   menu: true,
  //   text: this.$refs.text,
  //   active: result => {
  //     this.handleActive(result);
  //   },
  // },
  diy: {},
  // 菜单配置
  menus: [
    'undo', // 撤销
    'redo', // 重做
    'backcolor', // 背景颜色
    'forecolor', // 字体颜色
    'fontfamily', // 字体
    'fontsize', // 字号
    'lineheight', // 行高
    'inserthorizontalrule', // 插入水平线
    'removeformat', // 清除样式
    'bold', // 加粗
    'italic', // 倾斜
    'underline', // 下划线
    'copy', // 复制
    'cut', // 剪切
    'justifycenter', // 居中对齐
    'justifyfull', // 两端对齐
    'justifyleft', // 左对齐
    'justifyright', // 右对齐
    'insertorderedlist', // 有序列表
    'insertunorderedlist', // 无序列表
    'full', // 全屏
    'image', // 图片
    'formatblock', // 引用
    'indent', // 左缩进
    'code', // 源代码,
    'video', // 视频,
    'link', // 链接,
  ],
  // 菜单提示文案配置
  lang: {
    bold: '加粗',
    copy: '复制',
    cut: '剪切',
    inserthorizontalrule: '插入水平线',
    insertorderedlist: '有序列表',
    insertunorderedlist: '无序列表',
    italic: '倾斜',
    justifycenter: '居中对齐',
    justifyfull: '两端对齐',
    justifyleft: '左对齐',
    justifyright: '右对齐',
    removeformat: '清除样式',
    redo: '重做',
    underline: '下划线',
    undo: '撤销',
    fontfamily: '字体',
    fontsize: '字号',
    lineheight: '行高',
    full: '全屏',
    image: '图片',
    formatblock: '引用',
    indent: '左缩进',
    code: '源代码',
    video: '视频',
    link: '链接',
    backcolor: '背景颜色',
    forecolor: '字体颜色',
  },
  font: {
    fontfamily: [
      '宋体',
      '微软雅黑',
      '楷体',
      '黑体',
      '隶书',
      'Arial',
      'SimKai',
      'SimHei',
      'SimLi',
      'Comic Sans MS',
      'Courier New',
      'Georgia',
      'Lucida Sans Unicode',
      'Tahoma',
      'Times New Roman',
      'Trebuchet MS',
      'Verdana',
      'PingFang SC',
      'Noto Sans CJK SC',
      'WenQuanYi Micro Hei',
      'sans-serif',
    ],
    fontsize: [
      '12px',
      '14px',
      '16px',
      '18px',
      '20px',
      '24px',
      '30px',
      '36px',
    ],
    lineheight: [
      '1',
      '1.5',
      '1.75',
      '2',
      '3',
      '4',
      '5',
    ],
  },
  video: {
    type: 'iframe', // iframe 是复制视频网站的分享地址，其他格式的都是 video 模式
    controls: false,
  }, // mp4 || iframe
  placeholder: {
    fontfamily: '字体',
    fontsize: '字号',
    lineheight: '行高',
    videotitle: '格式如：<iframe src="..."></iframe>',
    videobutton: '插入',
    linkurl: 'https://',
    linktitle: '链接文字',
    linkbutton: '插入',
    colorok: '确定',
    colorclear: '透明',
    colortitle: '主题色',
    colordiy: '自定义颜色',
  },
  image: {
    type: 'ajax', // 上传图片显示的类型, base64, ajax
    ajaxurl: 'https://www.easy-mock.com/mock/5a2e29ed89d2205cbfe7a459/emfe/upload', // ajax 类型的上传地址
    emptyLinkTip: 'IEditor: 请设置请求链接', // 空连接报错提示信息
    LinkErrorTip: 'IEditor: 请求链接错误', // 错误连接报错提示信息
    success(res) { // 上传成功的处理， 需要返回 url 才能真正的添加内容
      if (res.code === 10000) {
        return res.data.url;
      }
      return console.log('上传错误');
    },
    error() {
      console.log('上传错误');
    },
    alert(info) { // 错误提示
      console.log(info);
    },
    loadimage: 'https://static2.evente.cn/backend/event/static/img/loading.dc496dd.gif', // 加载图片
    multiple: true, // 允许多选
    accept: 'image/jpg,image/jpeg,image/png,image/gif,image/svg', // 选择的类型
  },
  color: {
    color: ['#f2f2f2', '#7f7f7f', '#ddd9c3', '#c6d9f0', '#dbe5f1', '#f2dcdb', '#ebf1dd', '#e5e0ec', '#dbeef3', '#fdeada', '#d8d8d8', '#595959', '#c4bd97', '#8db3e2', '#b8cce4', '#e5b9b7', '#d7e3bc', '#ccc1d9', '#b7dde8', '#fbd5b5', '#bfbfbf', '#3f3f3f', '#938953', '#548dd4', '#95b3d7', '#d99694', '#c3d69b', '#b2a2c7', '#92cddc', '#fac08f', '#a5a5a5', '#262626', '#494429', '#17365d', '#366092', '#953734', '#76923c', '#5f497a', '#31859b', '#e36c09', '#7f7f7f', '#0c0c0c', '#1d1b10', '#0f243e', '#244061', '#632423', '#4f6128', '#3f3151', '#205867', '#974806'],
  },
  reset: true,
};
