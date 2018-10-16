import Select from 'select/select';

class FontSize extends Select {
  constructor(editor) {
    super(editor, {
      type: 'font-size',
      data: editor.cfg.font.fontsize,
    });
  }
}

export default FontSize;
