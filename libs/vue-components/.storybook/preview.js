import { addParameters } from '@storybook/vue';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';
import { withA11y } from '@storybook/addon-a11y';

/* Register vue components */
/*import Vue from 'vue';
import GoAMicrositeLogo from '../src/lib/microsite-logo/microsite-logo.vue';

Vue.component(GoAMicrositeLogo.name, GoAMicrositeLogo);*/

addParameters({
  docs: {
    container: DocsContainer,
    page: DocsPage
  },
  decorators: [withA11y]
});