import { addParameters } from "@storybook/react";
import { DocsPage, DocsContainer } from "@storybook/addon-docs";

addParameters({
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
  controls: { expanded: true },
});
