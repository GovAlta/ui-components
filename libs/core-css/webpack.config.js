const nrwlConfig = require("@nrwl/web/plugins/webpack.js");
    process.stdout.write(`sadfd  \n`);
module.exports = (config, context) => {
  nrwlConfig(config);
  context.logger(`Contsdfext ${JSON.stringify(context)} \n`)
    process.stdout.write(`Context ${JSON.stringify(context)} \n`);

  return config;
};