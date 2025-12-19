/**
 * Container Component Configurations
 *
 * Containers provide consistent horizontal padding and max-width.
 */

import type { ComponentConfigurations } from './types';

export const containerConfigurations: ComponentConfigurations = {
  componentSlug: 'container',
  componentName: 'Container',
  defaultConfigurationId: 'basic',

  configurations: [
    {
      id: 'basic',
      name: 'Basic container',
      description: 'Standard page container',
      code: {
        react: `<GoabContainer>
  <h1>Page content</h1>
  <p>Content within the container has consistent padding and max-width.</p>
</GoabContainer>`,
        angular: `<goab-container>
  <h1>Page content</h1>
  <p>Content within the container has consistent padding and max-width.</p>
</goab-container>`,
        webComponents: `<goa-container>
  <h1>Page content</h1>
  <p>Content within the container has consistent padding and max-width.</p>
</goa-container>`,
      },
    },
    {
      id: 'types',
      name: 'Container types',
      description: 'Different container purposes',
      code: {
        react: `<GoabContainer type="non-interactive">
  <p>Non-interactive content container</p>
</GoabContainer>
<GoabContainer type="interactive">
  <p>Interactive container with click handlers</p>
</GoabContainer>
<GoabContainer type="info">
  <p>Informational container with distinct styling</p>
</GoabContainer>`,
        angular: `<goab-container type="non-interactive">
  <p>Non-interactive content container</p>
</goab-container>
<goab-container type="interactive">
  <p>Interactive container with click handlers</p>
</goab-container>
<goab-container type="info">
  <p>Informational container with distinct styling</p>
</goab-container>`,
        webComponents: `<goa-container type="non-interactive">
  <p>Non-interactive content container</p>
</goa-container>
<goa-container type="interactive">
  <p>Interactive container with click handlers</p>
</goa-container>
<goa-container type="info">
  <p>Informational container with distinct styling</p>
</goa-container>`,
      },
    },
    {
      id: 'accent-colors',
      name: 'Accent colors',
      description: 'Container with accent bar',
      code: {
        react: `<GoabContainer accent="thick">
  <p>Container with thick accent bar</p>
</GoabContainer>
<GoabContainer accent="thin">
  <p>Container with thin accent bar</p>
</GoabContainer>`,
        angular: `<goab-container accent="thick">
  <p>Container with thick accent bar</p>
</goab-container>
<goab-container accent="thin">
  <p>Container with thin accent bar</p>
</goab-container>`,
        webComponents: `<goa-container accent="thick">
  <p>Container with thick accent bar</p>
</goa-container>
<goa-container accent="thin">
  <p>Container with thin accent bar</p>
</goa-container>`,
      },
    },
    {
      id: 'with-heading',
      name: 'With heading',
      description: 'Container with heading and actions',
      code: {
        react: `<GoabContainer heading="Section title">
  <p>Container content with a heading.</p>
</GoabContainer>`,
        angular: `<goab-container heading="Section title">
  <p>Container content with a heading.</p>
</goab-container>`,
        webComponents: `<goa-container heading="Section title">
  <p>Container content with a heading.</p>
</goa-container>`,
      },
    },
  ],
};
