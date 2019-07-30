import ajax from 'shared/ajax';
import $ from 'shared/dom';
import { keys } from './util';

const inset = (result, self, isImage = true) => {
  const sel = self.editor.selection;
  // 恢复选区，不然添加不上
  sel.restore();
  // 网址
  /* eslint-disable */
  const imgPattern = /https?:\/\/.+\.(jpg|gif|png|svg|jpeg)/;
  const { prefix, image } = self.editor.cfg;
  const { uid } = self.editor;

  if (imgPattern.test(result) || isImage) {
    sel.handle('insertHTML', `<img class="${prefix}text-img" src="${image.loadimage}" draggable="true" loading="true" />`);
    return $(`#${prefix}text${uid} img[loading="true"]`);
  }
  return null;
}

class Upload {
  /**
   * image -> base64
   * @param {Object} files 文件对象
   */
  static base64(files, self, type = 'image') {
    keys(files).forEach((file) => {
      const reader = new FileReader();
      const isImage = type === 'image';
      if (isImage) {
        reader.readAsDataURL(files[file]);
      } else {
        reader.readAsText(files[file]);
      }
      const $image = inset(reader.result, self, isImage);
      reader.onload = () => {
        if ($image) {
          $image.attr('src', reader.result).attr('loading', false);
        }
      };
    });
  }
  /**
   * image -> ajax
   * @param {Object} files 文件对象
   */
  static ajax(files, self) {
    const { image, debug, alert } = self.editor.cfg;
    const {
      ajaxurl,
      emptyLinkTip,
      LinkErrorTip,
      success,
      error,
    } = image;

    if (ajaxurl) {
      // 验证接口
      const webPattern = /^https?/;
      if (webPattern.test(ajaxurl)) {
        // 递归请求
        const recursionAjax = (index) => {
          let now = index;
          if (now > -1) {
            const $image = inset(true, self);
            ajax({
              action: ajaxurl,
              file: files[now],
              onSuccess: (res) => {
                const url = success(res);
                if ($image) {
                  $image.attr('src', url).attr('loading', false);
                }
                recursionAjax(--now);
              },
              onError: (err, response) => {
                error(err, response, files[now]);
              },
            });
          }
        };
        recursionAjax(files.length - 1);
      } else {
        alert(LinkErrorTip);
      }
    } else {
      alert(emptyLinkTip);
    }
  }
}

export default Upload;
