const gulp = require('gulp');
const path = require('path');
const rimraf = require('rimraf');
const compileMoudle = require('./build/compile/compileMoudle');
const compileDist = require('./build/compile/compileDist');
const cwd = process.cwd();
function compileLibTask(done) {
  compileMoudle(gulp).on('finish', function () {
    done();
  });
}
function compileEsTask(done) {
  compileMoudle(gulp, false).on('finish', function () {
    done();
  });
}
function compileDistTask(done) {
  compileDist(done);
}
function clearDir(dirArr) {
  dirArr.forEach((dir) => {
    rimraf.sync(path.join(cwd, dir));
  });
}
function moduleTask() {
  return gulp.series(compileLibTask, compileEsTask)();
}
function distTask() {
  return gulp.series(compileLibTask, compileEsTask, compileDistTask)();
}
function runTask(taskType) {
  switch (taskType) {
    case 'dist':
      clearDir(['es', 'lib', 'dist']);
      return distTask();
    case 'compile':
      clearDir(['es', 'lib']);
      return moduleTask();
    default:
      // eslint-disable-next-line no-console
      return () => console.log('无此功能');
  }
}

module.exports = runTask;
