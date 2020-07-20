// Common main for all storybooks in workspace
module.exports = {
  stories: [
    '../libs/core-css/src/lib/**/*.stories.mdx',
    '../libs/angular-components/src/lib/**/*.stories.mdx',
    '../libs/storybook-common/src/lib/**/*.stories.mdx',
    '../libs/angular-components/src/lib/**/*.stories.ts'
  ],
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
      }
    },
    '@storybook/addon-backgrounds',
    '@storybook/addon-a11y/register',
    '@storybook/addon-viewport',
    'storybook-addon-xd-designs',
    '@storybook/addon-knobs/register',
  ]
};