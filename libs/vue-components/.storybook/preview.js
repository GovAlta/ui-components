import { addParameters } from '@storybook/vue';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';

addParameters({
  docs: {
    container: DocsContainer,
    page: DocsPage
  },
  controls: { expanded: true }
});