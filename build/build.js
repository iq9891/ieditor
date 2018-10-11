require('./check-versions')();

const fs = require('fs')
const path = require('path')
const zlib = require('zlib')
const rm = require('rimraf')
const rollup = require('rollup')
const uglify = require('uglify-js')
const builds = require('./config').getAllBuilds();

// 删除文件夹
rm(path.join(__dirname, '../dist'), error => {
  if (!error) {
    // 创建文件夹
    fs.mkdirSync('dist');
    // 打包
    build();
  }
});

function build () {
  let built = 0
  const total = builds.length
  const next = () => {
    buildEntry(builds[built]).then(() => {
      built++
      if (built < total) {
        next()
      }
    }).catch(errorFn)
  }
  next()
}

function buildEntry (config) {
  const dist = config.output.file;
  const isProd = /min\.js$/.test(dist);
  return rollup.rollup(config).then(bundle => {
    bundle.generate(config).then((result) => {
      const {
        code,
      } = result;
      if (isProd) {
        var minified = (config.banner ? config.banner + '\n' : '') + uglify.minify(code, {
          ie8: true,
          output: {
            ascii_only: true
          },
          compress: {
            pure_funcs: ['makeMap']
          }
        }).code

        return write(dist, minified, true)
      } else {
        return write(dist, code)
      }
    });
  })
}

function write (dest, code, zip) {
  return new Promise((resolve, reject) => {
    function report (extra) {
      console.log(blue(path.relative(process.cwd(), dest)) + ' ' + getSize(code) + (extra || ''))
      resolve()
    }

    fs.writeFile(dest, code, err => {
      if (err) return reject(err)
      if (zip) {
        zlib.gzip(code, (err, zipped) => {
          if (err) return reject(err)
          report(' (gzipped: ' + getSize(zipped) + ')')
        })
      } else {
        report()
      }
    })
  })
}

function getSize (code) {
  return (code.length / 1024).toFixed(2) + 'kb'
}

function errorFn (e) {
  console.log(e)
}

function blue (str) {
  return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m'
}
