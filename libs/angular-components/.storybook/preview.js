import { addParameters } from '@storybook/angular';
import { DocsPage, DocsContainer } from '@storybook/addon-docs';

import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from '../documentation.json';
setCompodocJson(docJson);

import '!style-loader!css-loader!sass-loader!./preview.scss';
import '@angular/localize/init';

addParameters({
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
  controls: { expanded: true },
});
