module.exports = {
    stories: ['../src/lib/**/*.stories.mdx', '../../shared/storybook-common/src/lib/**/*.stories.mdx'],
    addons: [
      '@storybook/addon-docs/preset',
      '@storybook/addon-knobs',
      '@storybook/addon-backgrounds',
      '@storybook/addon-a11y/register',
      '@storybook/addon-viewport',
      'storybook-addon-xd-designs',
      '@storybook/addon-knobs/register',
      '@storybook/addon-actions'
    ]
};