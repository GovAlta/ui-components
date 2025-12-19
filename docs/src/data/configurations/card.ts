/**
 * Card Component Configurations
 *
 * Cards group related content and actions.
 */

import type { ComponentConfigurations } from './types';

export const cardConfigurations: ComponentConfigurations = {
  componentSlug: 'card',
  componentName: 'Card',
  defaultConfigurationId: 'basic',

  configurations: [
    {
      id: 'basic',
      name: 'Basic card',
      description: 'Simple card with content',
      code: {
        react: `<GoabCard>
  <h3>Card title</h3>
  <p>Card content goes here. This can include text, links, or other elements.</p>
</GoabCard>`,
        angular: `<goab-card>
  <h3>Card title</h3>
  <p>Card content goes here. This can include text, links, or other elements.</p>
</goab-card>`,
        webComponents: `<goa-card>
  <h3>Card title</h3>
  <p>Card content goes here. This can include text, links, or other elements.</p>
</goa-card>`,
      },
    },
    {
      id: 'with-elevation',
      name: 'Elevation levels',
      description: 'Cards with different shadow depths',
      code: {
        react: `<GoabCard elevation={0}>
  <p>Elevation 0 - No shadow</p>
</GoabCard>
<GoabCard elevation={1}>
  <p>Elevation 1 - Subtle shadow</p>
</GoabCard>
<GoabCard elevation={2}>
  <p>Elevation 2 - Medium shadow</p>
</GoabCard>`,
        angular: `<goab-card [elevation]="0">
  <p>Elevation 0 - No shadow</p>
</goab-card>
<goab-card [elevation]="1">
  <p>Elevation 1 - Subtle shadow</p>
</goab-card>
<goab-card [elevation]="2">
  <p>Elevation 2 - Medium shadow</p>
</goab-card>`,
        webComponents: `<goa-card elevation="0">
  <p>Elevation 0 - No shadow</p>
</goa-card>
<goa-card elevation="1">
  <p>Elevation 1 - Subtle shadow</p>
</goa-card>
<goa-card elevation="2">
  <p>Elevation 2 - Medium shadow</p>
</goa-card>`,
      },
    },
    {
      id: 'with-width',
      name: 'Fixed width',
      description: 'Card with specified width',
      code: {
        react: `<GoabCard width="400px">
  <h3>Fixed width card</h3>
  <p>This card has a fixed width of 400 pixels.</p>
</GoabCard>`,
        angular: `<goab-card width="400px">
  <h3>Fixed width card</h3>
  <p>This card has a fixed width of 400 pixels.</p>
</goab-card>`,
        webComponents: `<goa-card width="400px">
  <h3>Fixed width card</h3>
  <p>This card has a fixed width of 400 pixels.</p>
</goa-card>`,
      },
    },
    {
      id: 'with-structured-content',
      name: 'Structured content',
      description: 'Card using CardContent and CardActions',
      code: {
        react: `<GoabCard>
  <GoabCardContent>
    <h3>Service application</h3>
    <p>Review your application status and next steps.</p>
  </GoabCardContent>
  <GoabCardActions>
    <GoabButton type="tertiary">View details</GoabButton>
    <GoabButton>Continue</GoabButton>
  </GoabCardActions>
</GoabCard>`,
        angular: `<goab-card>
  <goab-card-content>
    <h3>Service application</h3>
    <p>Review your application status and next steps.</p>
  </goab-card-content>
  <goab-card-actions>
    <goab-button type="tertiary">View details</goab-button>
    <goab-button>Continue</goab-button>
  </goab-card-actions>
</goab-card>`,
        webComponents: `<goa-card>
  <goa-card-content>
    <h3>Service application</h3>
    <p>Review your application status and next steps.</p>
  </goa-card-content>
  <goa-card-actions>
    <goa-button type="tertiary">View details</goa-button>
    <goa-button>Continue</goa-button>
  </goa-card-actions>
</goa-card>`,
      },
    },
    {
      id: 'with-image',
      name: 'With image',
      description: 'Card with image at the top',
      code: {
        react: `<GoabCard>
  <GoabCardImage src="/images/service.jpg" alt="Service description" />
  <GoabCardContent>
    <h3>Featured service</h3>
    <p>Learn more about this government service.</p>
  </GoabCardContent>
</GoabCard>`,
        angular: `<goab-card>
  <goab-card-image src="/images/service.jpg" alt="Service description"></goab-card-image>
  <goab-card-content>
    <h3>Featured service</h3>
    <p>Learn more about this government service.</p>
  </goab-card-content>
</goab-card>`,
        webComponents: `<goa-card>
  <goa-card-image src="/images/service.jpg" alt="Service description"></goa-card-image>
  <goa-card-content>
    <h3>Featured service</h3>
    <p>Learn more about this government service.</p>
  </goa-card-content>
</goa-card>`,
      },
    },
  ],
};
