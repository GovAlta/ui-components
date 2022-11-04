import "../../../.storybook/manager";

import { addons } from "@storybook/addons";
import abTheme from "../../../.storybook/abTheme";

// https://storybook.js.org/docs/react/configure/features-and-behavior
addons.setConfig({
  theme: abTheme,
  enableShortcuts: false,
});
