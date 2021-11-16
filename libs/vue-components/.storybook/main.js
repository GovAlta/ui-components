const rootMain = require('../../../.storybook/main');

module.exports = {
  ...rootMain,
  core: { ...rootMain.core, builder: 'webpack4' },
  stories: [
    '../src/lib/**/*.stories.mdx',
    '../src/lib/**/*.stories.js',
    '../src/experimental/**/*.stories.mdx',
    '../../shared/storybook-common/src/lib/**/*.stories.mdx'
  ],
  addons: [
    {
      name: '@storybook/addon-docs',
    },
    '@storybook/preset-scss',
    '@storybook/addon-controls',
    '@storybook/addon-backgrounds',
    '@storybook/addon-a11y',
    '@storybook/addon-viewport',
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    'storybook-addon-xd-designs'
  ],
  webpackFinal: async (config, { configType }) => {
    config = await rootMain.webpackFinal(config, { configType });

    config.resolve.alias = {
      ...config.resolve.alias,
      vue: 'vue/dist/vue.js'
    }

    // Return the altered config
    return config;
  },
};
