const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const imagemin = require('gulp-imagemin');

const pkg = require('./package.json');
const pkgName = pkg.name.split('/');
const name = pkgName.length > 1 ? pkgName[1] : pkgName;

const paths = {
  src: 'site/style/'+ name +'.scss',
  dest: 'dist/'
};

function imageMin() {
  return gulp.src('site/icon/*')
    .pipe(imagemin())
    .pipe(gulp.dest(paths.dest + '/icon'));
}

function styles() {
  const plugins = [
      autoprefixer({browsers: pkg.browserslist}),
      cssnano()
    ];

  return gulp.src(paths.src)
    .pipe(sass())
    .pipe(cleanCSS())
    .pipe(postcss(plugins))
    .pipe(rename({
      basename: name,
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.dest));
}

var build = gulp.series(gulp.parallel(styles, imageMin));

gulp.task('default', build);
