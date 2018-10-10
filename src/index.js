// IEditor 主类
import IEditor from './core/ieditor';

if (typeof window !== 'undefined' && !window.IEditor) {
  window.IEditor = IEditor;
}
