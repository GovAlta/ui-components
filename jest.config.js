const { getJestProjects } = require("@nrwl/jest");

module.exports = {
  testMatch: ["**/+(*.)+(spec|test).+(ts|js)?(x)"],
  transform: {
    "^.+\\.(ts|js|html)$": "ts-jest",
  },
  preset: "./jest.preset.js",
  resolver: "@nrwl/jest/plugins/resolver",
  moduleFileExtensions: ["ts", "js", "html"],
  moduleNameMapper: {
    "\\.(scss|sass|css)$": "identity-obj-proxy",
  },
  coverageReporters: ["html"],
  projects: getJestProjects(),
};
