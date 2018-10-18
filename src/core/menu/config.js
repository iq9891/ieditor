import bold from './list/bold';
import italic from './list/italic';
import underline from './list/underline';
import justifycenter from './list/justifycenter';
import justifyfull from './list/justifyfull';
import justifyleft from './list/justifyleft';
import justifyright from './list/justifyright';
import inserthorizontalrule from './list/inserthorizontalrule';
import cut from './list/cut';
import copy from './list/copy';
import redo from './list/redo';
import undo from './list/undo';
import removeformat from './list/removeformat';
import insertunorderedlist from './list/insertunorderedlist';
import insertorderedlist from './list/insertorderedlist';

import fontfamily from './list/fontfamily';
import fontsize from './list/fontsize';
import lineheight from './list/lineheight';

import full from './list/full';
import image from './list/image';
import formatblock from './list/formatblock';
import indent from './list/indent';
import code from './list/code';
import video from './list/video';
import link from './list/link';
import backcolor from './list/backcolor';
import forecolor from './list/forecolor';
// import table from './list/table';
// import paste from './list/paste';
// import plainpaste from './list/plainpaste';
// import wordpaste from './list/wordpaste';

const list = Object.create(null);

list.bold = bold;
list.italic = italic;
list.underline = underline;
list.justifycenter = justifycenter;
list.justifyfull = justifyfull;
list.justifyleft = justifyleft;
list.justifyright = justifyright;
list.inserthorizontalrule = inserthorizontalrule;
list.cut = cut;
list.copy = copy;
list.redo = redo;
list.undo = undo;
list.removeformat = removeformat;
list.insertunorderedlist = insertunorderedlist;
list.insertorderedlist = insertorderedlist;

list.fontfamily = fontfamily;
list.fontsize = fontsize;
list.lineheight = lineheight;

list.full = full;
list.image = image;
list.formatblock = formatblock;
list.indent = indent;
list.code = code;
list.video = video;
list.link = link;
list.backcolor = backcolor;
list.forecolor = forecolor;
// list.table = table;
// list.paste = paste;
// list.plainpaste = plainpaste;
// list.wordpaste = wordpaste;

export default list;
