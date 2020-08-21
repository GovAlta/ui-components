const { argv } = require('yargs');
const package = argv.package;
const { exec } = require('child_process');

const script = `npm dist-tag add ${package} latest`;
console.log(`Executing: ${script}`);
exec(script, (error, stdout, stderr) => {
  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
});
