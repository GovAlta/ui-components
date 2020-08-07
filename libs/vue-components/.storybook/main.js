const path = require('path');

module.exports = {
    stories: ['../src/lib/**/*.stories.mdx', '../../storybook-common/src/lib/**/*.stories.mdx'],
    logLevel: 'debug',
    // Modify webpack to remove babel-preset-vue from .mdx loaders
    addons: [
      {
        name: '@storybook/addon-docs/preset',
        options: {
          vueDocgenOptions: {
            alias: {
              '@': path.resolve(__dirname, '../')
            }
          },
          /*babelOptions: {
            presets: [
              [
                "@vue/babel-preset-jsx"
              ]
            ]
          }*/
        }
      },
      '@storybook/preset-scss',
      //'@storybook/addon-knobs/vue',
      //'@storybook/addon-backgrounds',
      //'@storybook/addon-a11y/register',
      //'@storybook/addon-viewport',
      //'storybook-addon-xd-designs'
    ]
};