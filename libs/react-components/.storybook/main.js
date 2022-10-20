const rootMain = require("../../../.storybook/main");

module.exports = {
  ...rootMain,
  core: { ...rootMain.core, builder: "webpack5" },
  stories: [
    "../src/lib/**/*.stories.mdx",
    "../src/lib/**/*.stories.tsx",
    "../../shared/storybook-common/src/lib/**/*.stories.mdx",
  ],
  addons: [
    "@storybook/addon-docs/preset",
    "@storybook/preset-scss",
    "@storybook/addon-controls",
    "@storybook/addon-backgrounds",
    "@storybook/addon-actions",
    "@storybook/addon-a11y",
    "@storybook/addon-viewport",
    "@storybook/react",
    "storybook-addon-xd-designs",
  ],
  // Dependency locking issue with webpack (https://github.com/storybookjs/storybook/issues/15336)
  typescript: { reactDocgen: false },
};
