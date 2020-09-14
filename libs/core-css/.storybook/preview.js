import { addParameters } from '@storybook/react';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';

addParameters({
  docs: {
    inlineStories: false,
    container: DocsContainer,
    page: DocsPage
  }
});