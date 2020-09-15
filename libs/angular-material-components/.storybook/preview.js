import { addParameters } from '@storybook/angular';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';

import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from '../documentation.json';
setCompodocJson(docJson);

require('!style-loader!css-loader!sass-loader!../src/lib/styles.scss');

require('!style-loader!css-loader!@angular/cdk/overlay-prebuilt.css');

addParameters({
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
  controls: { expanded: true },
});
