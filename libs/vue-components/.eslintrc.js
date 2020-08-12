module.exports = {
  extends: [
    '../../.eslintrc',
    'plugin:vue/recommended',
    '@vue/typescript/recommended'
  ],
  env: {
    node: true,
  },
  overrides: [
    {
      files: ['**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
  ],
  ignorePatterns: ['!**/*']
};
