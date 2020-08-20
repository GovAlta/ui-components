// Common main for all storybooks in workspace
module.exports = {
  stories: [
    '../libs/core-css/src/lib/**/*.stories.mdx',
  ],
  addons: [
    '@storybook/addon-docs/preset',
    {
      name: '@storybook/preset-scss'
    },
    '@storybook/addon-backgrounds',
    '@storybook/addon-a11y/register',
    '@storybook/addon-viewport',
    'storybook-addon-xd-designs',
    '@storybook/addon-knobs/register',
    '@storybook/addon-actions'
  ]
};