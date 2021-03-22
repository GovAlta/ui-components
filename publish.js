const fs = require('fs');

const {
  argv: { path },
} = require('yargs'); //support for single dependency for now
const { execSync } = require('child_process');

if (fs.existsSync(path)) {
  const script = `npm-deploy-git-tag --token ${process.env.NPM_TOKEN} --access public --tag next`;
  console.log(`Executing: ${script}`);
  execSync(script, { cwd: path });

  return;
}

console.log(`${path} not executed`);
