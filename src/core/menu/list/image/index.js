import parser from 'shared/parser';
import $ from 'shared/dom';
import Upload from 'shared/upload';
import imageTem from './image.html';

class Image {
  constructor(editor) {
    this.editor = editor;
    this.$editor = editor.$editor;
    this.cfg = editor.cfg;
    this.type = 'image';
    this.typeName = this.type;
    // 初始化
    this.create();
  }

  create() {
    const { cfg, type, editor } = this;
    const { lang, prefix, image } = cfg;
    this.tem = parser(imageTem, {
      lang: lang[type],
      type,
      uid: editor.uid,
      prefix,
      multiple: image.multiple,
      accept: image.accept,
    });
  }

  bind() {
    const { cfg, type, editor } = this;
    $(`#${cfg.prefix}${type}${editor.uid}`).on('change', (ev = window.event) => {
      this.click(type, ev);
    });
  }

  click(type, ev) {
    this.handleFiles(ev.target.files, this);
  }

  // 处理拖拽文件
  handleFiles(files, self) {
    const reader = new FileReader();
    const key = 0;
    const isImage = files[key].type.indexOf('image') > -1;
    const isText = files[key].type.indexOf('text') > -1;
    // 如果读取的是图片
    if (isImage) {
      reader.readAsDataURL(files[key]);
    } else if (isText) {
      // 读取的是文件
      reader.readAsText(files[key]);
    }
    reader.addEventListener('load', () => {
      const { type } = self.editor.cfg.image;
      // 如果是 图片
      if (isImage) {
        if (type === 'base64') {
          Upload.base64(files, self);
        } else if (type === 'ajax') {
          Upload.ajax(files, self);
        }
      } else if (isText) {
        Upload.base64(files, self, 'text');
      }
    }, false);
  }

  isActive() {
    return false;
  }
}

export default Image;
