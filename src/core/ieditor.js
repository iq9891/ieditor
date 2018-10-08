import compiler from './compiler';
// import menus from '../menu';
import $ from '../shared/dom';
import test from '../test.html';

const IEditor = class {
  constructor() {
    // console.log($(document.getElementById('ie')), 'dom getElementById');
    // console.log($(document.querySelectorAll('div')), 'dom getElementById');
    // console.log($(document.querySelectorAll('#ied')), 'dom getElementById');
    // console.log($(document.querySelector('#ied')), 'dom getElementById');
    console.log($('#ied'), 'dom #ied');
    $('#ied').html(compiler(test, {
      list: ['北京','上海'],
      id: 1213,
      name: '李梦龙',
    }));
    // console.time('sss')
    // compiler(test, {
    //   list: ['北京','上海'],
    //   id: 1213,
    //   name: '李梦龙',
    // })
    // compiler(test, {
    //   list: ['北京','上海'],
    //   id: 1213,
    //   name: '李梦龙',
    // })
    // compiler(test, {
    //   list: ['北京','上海'],
    //   id: 1213,
    //   name: '李梦龙',
    // })
    // console.timeEnd('sss')
  }

  // init() {
  //   menu(this);
  // }
}

export default IEditor;
