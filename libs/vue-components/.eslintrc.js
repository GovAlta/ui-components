module.exports = {
  extends: [
    '../../.eslintrc.json',
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
  ignorePatterns: ['!**/*'],
  rules: {
    "vue/max-attributes-per-line": ["error", {
        "singleline": 3,
        "multiline": {
          "max": 1,
          "allowFirstLine": false
        }
    }]
  }
};
