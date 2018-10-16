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
    'bold', // 加粗
    'fontfamily', // 字体
    'fontsize', // 字号
    'lineheight', // 行高
  ],
  // 菜单提示文案配置
  lang: {
    bold: '加粗',
    fontfamily: '字体',
    fontsize: '字号',
    lineheight: '行高',
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
      '10px',
      '11px',
      '12px',
      '14px',
      '16px',
      '18px',
      '20px',
      '24px',
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
};
