const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const postcss = require('gulp-postcss');
const gulp = require('gulp');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const pkg = require('./package.json');
const pkgName = pkg.name.split('/');
const name = pkgName.length > 1 ? pkgName[1] : pkgName;

const paths = {
  src: 'site/style/'+ name +'.scss',
  dest: 'dist/'
};

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

exports.styles = styles;

gulp.task('default', styles);
