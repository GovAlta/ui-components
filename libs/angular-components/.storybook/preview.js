import { addParameters } from '@storybook/angular';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';
import { withA11y } from '@storybook/addon-a11y';

addParameters({
  docs: {
    container: DocsContainer,
    page: DocsPage
  },
  decorators: [withA11y]
});