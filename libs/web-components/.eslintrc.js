module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['svelte3', '@typescript-eslint'],
  extends: ['../../.eslintrc.json'],
  ignorePatterns: ['!**/*'],
  overrides: [
    {
      files: ['*.ts', '*.js', '*.svelte'],
      parserOptions: {
        project: ['libs/web-components/tsconfig.*?.json'],
      },
      rules: {
        "missing-custom-element-compile-options": "off",
        "a11y-click-events-have-key-events": "off",
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      rules: {},
    },
    {
      files: ['*.js', '*.jsx'],
      rules: {},
    },
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3',
      rules: {
        "missing-custom-element-compile-options": "off",
        "a11y-click-events-have-key-events": "off",
      }
    },
  ],
  settings: {
    'svelte3/typescript': require('typescript'),
  },
};
