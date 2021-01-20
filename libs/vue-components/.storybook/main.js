const path = require('path');

module.exports = {
    stories: ['../src/lib/**/*.stories.mdx', '../src/lib/**/*.stories.js','../../shared/storybook-common/src/lib/**/*.stories.mdx'],
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
