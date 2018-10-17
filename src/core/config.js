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
  placeholder: {
    fontfamily: '字体',
    fontsize: '字号',
    lineheight: '行高',
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
};
