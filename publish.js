const fs = require('fs'); // Or `import fs from "fs";` with ESM
const { argv } = require('yargs');
const path = argv.path;
const { exec } = require('child_process');

if (fs.existsSync(path)) {
  const { exec } = require('child_process');
  const script = `npm-deploy-git-tag --token ${process.env.NPM_TOKEN} --access public --tag next`;
  console.log(`Executing: ${script}`);
  exec(script, { cwd: path }, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      throw new Error(error.message);
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      throw new Error(stderr);
    }
    console.log(`stdout: ${stdout}`);
  });

  return;
}

console.log(`${path} not executed`);
