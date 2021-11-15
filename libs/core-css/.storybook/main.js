const rootMain = require('../../../.storybook/main');

module.exports = {
  managerWebpack: async (config, options) => {
    // NOTE: This is massive kludge to get Storybook Composition working on core-css
    //
    // Storybook Composition performs build time check of the 'sites' being composed and assigns
    // the ref a type of 'unknown' or 'server-checked'. 'unknown' is for inaccessible (private) sites
    // and at runtime storybook assumes stories.json is available (i.e. it assumes Chromatic hosting).
    // https://github.com/storybookjs/storybook/blob/4f5ab9fe9e590da7b841ec37cb1bed8d6327ea4b/lib/api/src/modules/refs.ts#L137
    //
    // In our case, all variants are built and served at the same time, and ref is a relative url
    // resolved by nginx.... so change type to 'server-checked'.
    const vModule = config.plugins[0]._staticModules;
    const moduleName = Object.keys(vModule)[0];
    vModule[moduleName] = vModule[moduleName].replace(
      /"unknown"/g,
      '"server-checked"'
    );

    return config;
  },
  core: { ...rootMain.core, builder: 'webpack5' },
  stories: [
    '../src/lib/**/*.stories.mdx',
    '../../shared/storybook-common/src/lib/**/*.stories.mdx',
  ],
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {},
    },
    {
      name: '@storybook/preset-scss',
    },
    '@storybook/addon-backgrounds',
    '@storybook/addon-a11y',
    '@storybook/addon-viewport',
    'storybook-addon-xd-designs',
  ],
  refs: {
    angular: {
      title: 'Angular',
      url: '/angular/',
    },
    angularMat: {
      title: 'Angular Material',
      url: '/angular-material/',
    },
    react: {
      title: 'React',
      url: '/react/',
    },
    vue: {
      title: 'Vue',
      url: '/vue/',
    },
  },
  // Dependency locking issue with webpack (https://github.com/storybookjs/storybook/issues/15336)
  typescript: { "reactDocgen": false }
};
