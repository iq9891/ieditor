// IEditor 主类
import IEditor from './core/ieditor';
// IEditor 样式
import './style/ieditor.scss';

if (typeof window !== 'undefined' && !window.IEditor) {
  window.IEditor = IEditor;
}
