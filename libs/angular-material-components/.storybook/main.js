module.exports = {
  stories: ['../src/lib/**/*.stories.mdx', '../src/experimental/**/*.stories.mdx', '../../shared/storybook-common/src/lib/**/*.stories.mdx'],
  addons: [
    '@storybook/addon-docs/preset',
    '@storybook/addon-backgrounds',
    '@storybook/addon-controls',
    '@storybook/addon-actions',
    '@storybook/addon-a11y',
    '@storybook/addon-viewport',
    'storybook-addon-xd-designs'
  ]
};