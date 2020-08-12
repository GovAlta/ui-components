const path = require('path');

module.exports = {
    stories: ['../src/lib/**/*.stories.mdx', '../../shared/storybook-common/src/lib/**/*.stories.mdx'],
    addons: [
      {
        name: '@storybook/addon-docs',
      },
      '@storybook/preset-scss',
      //'@storybook/addon-knobs', doesn't seem to work
      '@storybook/addon-backgrounds',
      '@storybook/addon-a11y/register',
      '@storybook/addon-viewport',
      'storybook-addon-xd-designs'
    ]
};