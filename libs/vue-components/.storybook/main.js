const path = require('path');

module.exports = {
    stories: ['../src/lib/**/*.stories.mdx', '../../storybook-common/src/lib/**/*.stories.mdx'],
    logLevel: 'debug',
    addons: [
      {
        name: '@storybook/addon-docs',
        /*options: {
          vueDocgenOptions: {
            alias: {
              '@': path.resolve(__dirname, '../')
            }
          }
        }*/
      },
      '@storybook/preset-scss',
      //'@storybook/addon-knobs/vue',
      //'@storybook/addon-backgrounds',
      //'@storybook/addon-a11y/register',
      //'@storybook/addon-viewport',
      //'storybook-addon-xd-designs'
    ]
};