import Select from 'select/select';

class LineHeight extends Select {
  constructor(editor) {
    super(editor, {
      type: 'line-height',
      data: editor.cfg.font.lineheight,
    });
  }
}

export default LineHeight;
