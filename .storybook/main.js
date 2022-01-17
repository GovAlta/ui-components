const path = require('path');

// Common main for all storybooks in workspace
module.exports = {
  addons: ['@storybook/addon-essentials', '@storybook/preset-scss'],
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.(tsx)$/,
      loader: require.resolve('babel-loader'),
      options: {
        presets: [
          '@babel/preset-env',
          '@babel/preset-react',
          '@babel/preset-typescript',
        ],
      },
    });

    //add aliases
    config.resolve.alias = {
      '@abgov/styles': path.resolve(__dirname, '../libs/styles/src/index.ts'),

    // Return the altered config
    return config;
  },
};
