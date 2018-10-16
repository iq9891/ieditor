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
};
