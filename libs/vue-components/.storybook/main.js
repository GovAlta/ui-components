const rootMain = require('../../../.storybook/main');

module.exports = {
  core: { ...rootMain.core },
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
  ]
};
