// https://github.com/storybookjs/storybook/blob/master/addons/docs/docs/recipes.md

const rootMain = require("../../../.storybook/main");

module.exports = {
  ...rootMain,

  core: { ...rootMain.core, builder: "webpack5" },

  stories: ["../src/main.stories.mdx", "../src/**/*.stories.mdx"],
  staticDirs: ["../src", "../src/components/common"],
  addons: [...rootMain.addons, "@nrwl/react/plugins/storybook"],
  webpackFinal: async (config, { configType }) => {
    // apply any global webpack configs that might have been specified in .storybook/main.js
    if (rootMain.webpackFinal) {
      config = await rootMain.webpackFinal(config, { configType });
    }

    // add your own webpack tweaks if needed

    return config;
  },
};
