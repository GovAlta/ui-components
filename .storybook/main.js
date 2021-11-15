// Common main for all storybooks in workspace
module.exports = {
  addons: ['@storybook/addon-essentials'],
  refs: {
    angular: {
      title: 'Angular',
      url: 'https://localhost/angular/',
    },
    react: {
      title: 'React',
      url: 'https://localhost/react/',
    },
    vue: {
      title: 'Vue',
      url: 'https://localhost/vue/',
    },
    core: {
      title: 'Core',
      url: 'https://localhost/core/',
    },
  },
};
