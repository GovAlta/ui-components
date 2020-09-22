const fs = require('fs');
const readPkg = require('read-pkg');
const writePkg = require('write-pkg');
const {
  argv: { path, dependency },
} = require('yargs'); //support for single dependency for now
const { execSync } = require('child_process');

if (fs.existsSync(path)) {
  if (dependency) {
    const version = execSync(`npm view ${dependency} version`);
    console.log(
      `Adding dependency: ${dependency}, Version ${version} to ${path}`
    );
    const packageMeta = readPkg.sync({ cwd: path });
    writePkg.sync(path, {
      ...packageMeta,
      dependencies: {
        ...packageMeta.dependencies,
        [dependency]: `${version}`.trim(),
      },
    });
  }
  const script = `npm-deploy-git-tag --token ${process.env.NPM_TOKEN} --access public --tag next`;
  console.log(`Executing: ${script}`);
  execSync(script, { cwd: path });

  return;
}

console.log(`${path} not executed`);
