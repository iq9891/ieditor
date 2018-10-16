const path = require('path');
const buble = require('rollup-plugin-buble');
const replace = require('rollup-plugin-replace');
const commonjs = require('rollup-plugin-commonjs');
const alias = require('rollup-plugin-alias');
const string = require('rollup-plugin-string');
const html = require('rollup-plugin-html');
const {eslint} = require('rollup-plugin-eslint');
const progress = require('rollup-plugin-progress');
const pkg = require('../package.json');

const version = pkg.version;
const pkgName = pkg.name.split('/');
const name = pkgName.length > 1 ? pkgName[1] : pkgName;

// 注入内容
var oTime = new Date();
var goZero = (str) => Number(str) < 10 ? '0' + str : str;
var oAllTime = oTime.getFullYear() + '-' + goZero(oTime.getMonth()+1) + '-' + goZero(oTime.getDate()) + ' ' + goZero(oTime.getHours()) + ':' + goZero(oTime.getMinutes()) + ':' + goZero(oTime.getSeconds());

const banner =
'/*!\n' +
' * '+ name.replace('ie', 'IE') +'.js v' + version + '\n' +
' * (c) 2014-' + new Date().getFullYear() + ' '+ pkg.author + '\n' +
' * @ time ' + oAllTime + '\n' +
' * Released under the MIT License.\n' +
' */';

const aliases = require('./alias')
const resolve = p => {
  const base = p.split('/')[0]
  if (aliases[base]) {
    return path.resolve(aliases[base], p.slice(base.length + 1))
  } else {
    return path.resolve(__dirname, '../', p)
  }
}

const builds = {
  'default': {
    dest: 'dist/'+ name +'.js',
    format: 'umd',
  },
  'default.min': {
    dest: 'dist/'+ name +'.min.js',
    format: 'umd',
  },
  'amd': {
    dest: 'dist/'+ name +'-amd.js',
    format: 'amd',
  },
  'amd.min': {
    dest: 'dist/'+ name +'-amd.min.js',
    format: 'amd',
  },
  'esm': {
    dest: 'dist/'+ name +'-esm.js',
    format: 'esm',
  },
  'esm.min': {
    dest: 'dist/'+ name +'-esm.min.js',
    format: 'esm',
  },
  'cjs': {
    dest: 'dist/'+ name +'-cjs.js',
    format: 'cjs',
  },
  'cjs.min': {
    dest: 'dist/'+ name +'-cjs.min.js',
    format: 'cjs',
  },
  'umd': {
    dest: 'dist/'+ name +'-umd.js',
    format: 'umd',
  },
  'umd.min': {
    dest: 'dist/'+ name +'-umd.min.js',
    format: 'umd',
  },
  'iife': {
    dest: 'dist/'+ name +'-iife.js',
    format: 'iife',
    banner,
  },
  'iife.min': {
    dest: 'dist/'+ name +'-iife.min.js',
    format: 'iife',
    banner,
  },
};

function genConfig (opts) {
  const config = {
    input: 'src/index.js',
    output: {
      file: opts.dest,
      name: name,
      banner: banner,
      format: opts.format,
    },
    // useStrict: false,
    plugins: [
      eslint({
        exclude: 'src/**/*.html',
      }),
      progress(),
      replace({
        __VERSION__: version
      }),
      html({
        include: 'src/**/*.html',
      }),
      buble(),
      alias(aliases),
      string({
        include: 'src/**/*.html',
      }),
    ]
  }

  return config
}

exports.getAllBuilds = () => Object.keys(builds).map(name => genConfig(builds[name]))
