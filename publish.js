const fs = require('fs'); // Or `import fs from "fs";` with ESM
const { argv } = require('yargs');
const path = argv.path;
const { exec } = require('child_process');
process.env.NPM_TOKEN = 'ee2b1f82-66d0-49fb-91ea-7a72aa13e0f6';

if (fs.existsSync(path)) {
  const { exec } = require('child_process');
  const script = `../../../node_modules/.bin/npm-deploy-git-tag --token ${process.env.NPM_TOKEN} --access public`;
  console.log(script);
  exec(script, { cwd: path }, (error, stdout, stderr) => {
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

  return;
}

console.log(`${path} not executed`);
