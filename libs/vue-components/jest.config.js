module.exports = {
  name: 'vue-component',
  preset: '../../jest.config.js',
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'vue', 'js', 'jsx', 'json'],
  coverageDirectory: '../../coverage/libs/vue-component',
  snapshotSerializers: ['jest-serializer-vue'],
  globals: { 'ts-jest': { tsConfig: '<rootDir>/tsconfig.spec.json' } },
};
