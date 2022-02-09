
import { DocsPage, DocsContainer } from '@storybook/addon-docs';
export const parameters = {
  viewMode: 'docs',
  previewTabs: {
    canvas: { hidden: true },
  },
  options: {
    storySort: {
      order: ['Overview', 'Setup', 'Components'],
    },
  },
  // docs: {
  //   container: DocsContainer,
  //   page: DocsPage
  // },
  // controls: { expanded: true }
};
