import { addParameters } from "@storybook/html";
import { DocsPage, DocsContainer } from "@storybook/addon-docs";

addParameters({
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
  viewMode: "docs",
});
