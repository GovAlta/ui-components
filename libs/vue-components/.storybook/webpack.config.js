const path = require("path");
const rootWebpackConfig = require('../../../.storybook/webpack.config');

const filterRules = filters => rule => {
  return filters.some(filter => String(rule.test) === String(filter));
};

// Export a function. Accept the base config as the only param.
module.exports = async ({ config, mode }) => {
  config = await rootWebpackConfig({ config, mode });

  // Modify webpack to remove babel-preset-vue from .mdx loaders
  /*const rules = config.module.rules;
  const mdxRules = rules.filter(
    filterRules([/\.mdx$/, /\.(stories|story).mdx$/])
  );
  let [jsxRule] = rules.filter(filterRules([/\.(mjs|jsx?)$/]));

  mdxRules.forEach(mdxRule => {
    const [babelLoader] = mdxRule.use.filter(
      ({ loader }) => loader === "babel-loader"
    );
    babelLoader.options.presets = babelLoader.options.presets.filter(
      preset => !preset.includes("babel-preset-vue")
    );
  });

  const [babelLoader] = jsxRule.use.filter(({ loader }) => loader === 'babel-loader')
  babelLoader.options = {
    cacheDirectory: path.resolve(__dirname, '..', 'node_modules', '.cache', 'storybook'),
    presets: ['@vue/app'],
    babelrc: false
  }*/

  return config;
};
