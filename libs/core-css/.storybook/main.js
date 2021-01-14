module.exports = {
  stories: ['../src/lib/**/*.stories.mdx', '../../shared/storybook-common/src/lib/**/*.stories.mdx'],
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
      }
    },
    {
      name: '@storybook/preset-scss'
    },
    '@storybook/addon-backgrounds',
    '@storybook/addon-a11y',
    '@storybook/addon-viewport',
    'storybook-addon-xd-designs'
  ],
  refs: {
    angular: { 
      title: "Angular", 
      url: '/angular/'
    },
    angularMat: { 
      title: "Angular Material", 
      url: '/angular-material/'
    },
    react: { 
      title: "React", 
      url: '/react/'
    },
    vue: { 
      title: "Vue", 
      url: '/vue/'
    }
  }
};
