const merge2 = require('merge2');
const getBabelCommonConfig = require('../bulidConfig/getBabelCommonConfig');
const babel = require('gulp-babel');
const path = require('path');
const cwd = process.cwd();
const libDir = path.join(cwd, 'lib');
const esDir = path.join(cwd, 'es');
function compileMoudle(gulp, modules) {
  const dir = modules !== false ? libDir : esDir;
  const scssSource = ['components/**/*.@(scss|css)'];
  const assetsSource = ['components/**/*.@(png|svg)'];
  const jsFilesSource = ['components/**/*.js', 'components/**/*.jsx', '!components/*/__tests__/*'];
  const scssStream = gulp.src(scssSource).pipe(gulp.dest(dir));
  const assetsStream = gulp.src(assetsSource).pipe(gulp.dest(dir));
  const jsFilesStream = babelify(gulp, gulp.src(jsFilesSource), modules);
  return merge2([scssStream, jsFilesStream, assetsStream]);
}
function babelify(gulp, js, modules) {
  const babelConfig = getBabelCommonConfig(modules);
  let stream = js.pipe(babel(babelConfig));
  return stream.pipe(gulp.dest(modules === false ? esDir : libDir));
}

module.exports = compileMoudle;
