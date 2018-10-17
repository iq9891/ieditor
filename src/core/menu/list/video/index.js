import Base from 'base/base';
import Modal from 'modal/modal';
import $ from 'shared/dom';
import parser from 'shared/parser';
import { hasOwn } from 'shared/util';
import videoTem from './video.html';

class Video extends Base {
  constructor(editor) {
    super(editor, 'video', true);
  }

  bind() {
    // <iframe src='http://player.youku.com/embed/XMzg2MDcyNjY4MA==' frameborder=0 'allowfullscreen'></iframe>
    // http://www.w3school.com.cn/i/movie.ogg
    const { cfg, type, editor } = this;
    this.modal = new Modal(this.editor, 'video');
    this.modal.setContent(parser(videoTem, {
      prefix: cfg.prefix,
      type,
      button: cfg.placeholder.videobutton,
    }));

    if (
      !hasOwn(cfg.diy, 'menu')
     || (hasOwn(cfg.diy, 'menu') && !cfg.diy.menu)) {
      this.$title = $(`#${cfg.prefix}${type}-modal-title`).attr('placeholder', cfg.placeholder.videotitle);

      $(`#${cfg.prefix}${type}${editor.uid}`).on('click', () => {
        this.modal.show();
      });

      $(`#${cfg.prefix}${type}-modal-btn`).on('click', () => {
        this.click(type, this.$title.val());
        this.$title.val('');
      });
    }
  }

  click(type, urlVal) {
    let val = urlVal;
    const sel = this.editor.selection;
    const videoCfg = this.cfg.video;
    if (videoCfg.type === 'iframe') {
      // 删除宽高
      val = val.replace(/(width|height)="?(\d+)"?/g, '');
      // 替换 https
      val = val.replace(/http:\/\//g, 'https://');
    } else {
      val = `<video controls="${videoCfg.controls}" src="${val}"></video>`;
    }
    // 恢复选区，不然添加不上
    sel.restoreSelection();
    sel.handle('insertHTML', '<p><br></p>');
    sel.handle('insertHTML', val);
    this.modal.hide();
  }
}

export default Video;
