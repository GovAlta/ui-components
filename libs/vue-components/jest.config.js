module.exports = {
  name: 'vue-component',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.vue$': '@vue/vue2-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'vue', 'js', 'jsx', 'json'],
  coverageDirectory: '../../coverage/libs/vue-component',

  globals: { 'ts-jest': { tsconfig: '<rootDir>/tsconfig.spec.json' } },
  snapshotSerializers: ['jest-serializer-vue'],
};
