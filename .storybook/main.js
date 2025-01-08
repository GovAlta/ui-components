const path = require("path"); // Common main for all storybooks in workspace

module.exports = {
  addons: ["@storybook/addon-essentials", "@storybook/preset-scss"],
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.(tsx)$/,
      loader: require.resolve("babel-loader"),
      options: {
        presets: [
          "@babel/preset-env",
          "@babel/preset-react",
          "@babel/preset-typescript",
        ],
      },
    });

    config.resolve.alias = {
      "@abgov/shared/storybook-common": path.resolve(
        __dirname,
        "../libs/shared/storybook-common/src/index.ts"
      ),
      "@abgov/shared/common": path.resolve(
        __dirname,
        "../libs/shared/common/src/index.ts"
      ),

      "@abgov/styles": path.resolve(__dirname, "../libs/styles/src/index.ts"),
      "@abgov/web-components": path.resolve(
        __dirname,
        "../dist/libs/web-components/web-components.es.js"
      ),
    };

    return config;
  },
  core: {
    builder: "webpack5",
  },
};
