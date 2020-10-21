const path = require('path');

module.exports = {
    stories: ['../src/lib/**/*.stories.mdx', '../../shared/storybook-common/src/lib/**/*.stories.mdx','../src/lib/**/*.stories.tsx'],
    addons: [
      {
        name: '@storybook/addon-docs',
      },
      '@storybook/preset-scss',
      '@storybook/addon-controls',
      '@storybook/addon-backgrounds',
      '@storybook/addon-actions',
      '@storybook/addon-a11y',
      '@storybook/addon-viewport',
      'storybook-addon-xd-designs'
    ]
};
