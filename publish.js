const fs = require('fs'); // Or `import fs from "fs";` with ESM
const { argv } = require('yargs');
const path = argv.path;
const { exec } = require('child_process');
const util = require('util');
const gitSemverTags = util.promisify(require('git-semver-tags'));

if (fs.existsSync(path)) {
  deployGit(path);
}

console.log(`${path} not executed`);

async function deployGit(path) {
  const tags = await gitSemverTags();
  const { exec } = require('child_process');
  const nextVersion = tags[0];
  const nextTagArray = nextVersion.split('.');
  //next angular pattern: https://angular.io/guide/releases
  //can version next releases (x-next) down the road.
  nextTagArray.splice(2, 0, '0-next');
  const script = `npm-deploy-git-tag --token ${
    process.env.NPM_TOKEN
  } --access public --token ${nextTagArray.join('.')}`;
  console.log(`Executing: ${script}`);
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
