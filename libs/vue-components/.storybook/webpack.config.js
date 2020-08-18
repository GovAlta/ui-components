const path = require("path");
const rootWebpackConfig = require('../../../.storybook/webpack.config');

const filterRules = filters => rule => {
  return filters.some(filter => String(rule.test) === String(filter));
};

// Export a function. Accept the base config as the only param.
module.exports = async ({ config, mode }) => {
  config = await rootWebpackConfig({ config, mode });

  return config;
};
