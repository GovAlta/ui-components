const rootMain = require('../../../.storybook/main');

module.exports = {
  ...rootMain,
  core: { ...rootMain.core, builder: 'webpack5' },
  stories: [
    // ...rootMain.stories,
    '../src/**/*.stories.@(mdx|js|jsx|ts|tsx)',
    '../../shared/storybook-common/src/lib/**/*.stories.mdx',
  ],

  addons: [
    ...rootMain.addons,
    // '@storybook/addon-docs',
    // '@storybook/addon-controls',
    // '@storybook/addon-backgrounds',
    // '@storybook/addon-a11y',
    // '@storybook/addon-viewport',
    // 'storybook-addon-xd-designs'
  ]
};
