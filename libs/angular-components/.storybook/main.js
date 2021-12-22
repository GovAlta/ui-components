const rootMain = require('../../../.storybook/main');
const path = require('path');

module.exports = {
  ...rootMain,
  stories: [
    '../src/lib/**/*.stories.mdx',
    '../../shared/storybook-common/src/lib/**/*.stories.mdx',
  ],
  addons: [
    '@storybook/preset-scss',
    '@storybook/addon-docs/preset',
    '@storybook/addon-backgrounds',
    '@storybook/addon-controls',
    '@storybook/addon-actions',
    '@storybook/addon-a11y',
    '@storybook/addon-viewport',
    'storybook-addon-xd-designs',
  ],
  // webpackFinal: async (config, { configType }) => {
  //   config = await rootMain.webpackFinal(config, { configType });

  //   config.module.rules.push({
  //     test: /\.scss$/,
  //     use: ['style-loader', 'css-loader', {
  //       loader: 'sass-loader',
  //       options: {
  //         prependData: `@import "../src/theme.scss";`
  //       }
  //     }],
  //     include: path.resolve(__dirname, '../../core-css/src/lib'),
  //     resolve: {
  //       alias: {
  //         '@abgov/shared/storybook-common': path.resolve(
  //           __dirname,
  //           '../libs/shared/storybook-common/src/index.ts'
  //         ),
  //         '@abgov/shared/common': path.resolve(
  //           __dirname,
  //           '../libs/shared/common/src/index.ts'
  //         ),
  //       }
  //     },
  //   });

  //   // Return the altered config
  //   return config;
  // },
};
module.exports.core = { ...module.exports.core, builder: 'webpack5' };
