const runTask = require('../gulpfile');
const program = require('commander');

program.on('--help', () => {
  console.log('  Usage:'.to.bold.blue.color);
  console.log();
});
program.parse(process.argv);
const taskType = program.args[0];
console.log(`FeiUI begin ${taskType}!`);
runTask(taskType);
