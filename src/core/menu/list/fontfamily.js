import Select from 'component/select/select';

class FontName extends Select {
  constructor(editor) {
    super(editor, {
      type: 'font-family',
      data: editor.cfg.font.fontfamily,
    });
  }
}

export default FontName;
