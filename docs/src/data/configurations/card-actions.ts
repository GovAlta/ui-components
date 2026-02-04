/**
 * CardActions Component Configurations
 *
 * CardActions is a child component of Card.
 */

import type { ComponentConfigurations } from './types';

export const cardActionsConfigurations: ComponentConfigurations = {
  componentSlug: 'card-actions',
  componentName: 'Card actions',
  defaultConfigurationId: 'basic',

  configurations: [
    {
      id: 'basic',
      name: 'Basic card actions',
      description: 'Action buttons within Card',
      code: {
        react: `<GoabCard>
  <GoabCardContent>
    <h3>Application</h3>
    <p>Review and submit your application.</p>
  </GoabCardContent>
  <GoabCardActions>
    <GoabxButton type="tertiary">Cancel</GoabxButton>
    <GoabxButton>Submit</GoabxButton>
  </GoabCardActions>
</GoabCard>`,
        angular: `<goab-card>
  <goab-card-content>
    <h3>Application</h3>
    <p>Review and submit your application.</p>
  </goab-card-content>
  <goab-card-actions>
    <goabx-button type="tertiary">Cancel</goabx-button>
    <goabx-button>Submit</goabx-button>
  </goab-card-actions>
</goab-card>`,
        webComponents: `<goa-card>
  <goa-card-content>
    <h3>Application</h3>
    <p>Review and submit your application.</p>
  </goa-card-content>
  <goa-card-actions>
    <goa-button version="2" type="tertiary">Cancel</goa-button>
    <goa-button version="2">Submit</goa-button>
  </goa-card-actions>
</goa-card>`,
      },
    },
  ],
};
