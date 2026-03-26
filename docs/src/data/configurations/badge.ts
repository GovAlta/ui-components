/**
 * Badge Component Configurations
 *
 * Badges are used to label, categorize, or show status.
 */

import type { ComponentConfigurations } from './types';

export const badgeConfigurations: ComponentConfigurations = {
  componentSlug: 'badge',
  componentName: 'Badge',
  defaultConfigurationId: 'basic',

  configurations: [
    {
      id: 'basic',
      name: 'Basic badge',
      description: 'Simple badge with text',
      code: {
        react: `<GoabBadge type="default" content="New" emphasis="subtle" icon={false} />`,
        angular: `<goab-badge type="default" content="New" emphasis="subtle" [icon]="false"></goab-badge>`,
        webComponents: `<goa-badge version="2" type="default" content="New" emphasis="subtle" icon="false"></goa-badge>`,
      },
    },
    {
      id: 'semantic-types',
      name: 'Semantic types',
      description: 'Badges for different statuses',
      code: {
        react: `<GoabBadge type="information" content="Information" />
<GoabBadge type="important" content="Important" />
<GoabBadge type="emergency" content="Emergency" />
<GoabBadge type="success" content="Success" />
<GoabBadge type="archived" content="Archived" />`,
        angular: `<goab-badge type="information" content="Information"></goab-badge>
<goab-badge type="important" content="Important"></goab-badge>
<goab-badge type="emergency" content="Emergency"></goab-badge>
<goab-badge type="success" content="Success"></goab-badge>
<goab-badge type="archived" content="Archived"></goab-badge>`,
        webComponents: `<goa-badge version="2" type="information" content="Information"></goa-badge>
<goa-badge version="2" type="important" content="Important"></goa-badge>
<goa-badge version="2" type="emergency" content="Emergency"></goa-badge>
<goa-badge version="2" type="success" content="Success"></goa-badge>
<goa-badge version="2" type="archived" content="Archived"></goa-badge>`,
      },
    },
    {
      id: 'extended-colours',
      name: 'Extended colours',
      description: 'Additional colour options for categorization',
      code: {
        react: `<GoabBadge type="sky" content="Sky" icon={false} />
<GoabBadge type="sky" content="Sky" icon={false} emphasis="subtle" />
<GoabBadge type="prairie" content="Prairie" icon={false} />
<GoabBadge type="prairie" content="Prairie" icon={false} emphasis="subtle" />
<GoabBadge type="lilac" content="Lilac" icon={false} />
<GoabBadge type="lilac" content="Lilac" icon={false} emphasis="subtle" />
<GoabBadge type="pasture" content="Pasture" icon={false} />
<GoabBadge type="pasture" content="Pasture" icon={false} emphasis="subtle" />
<GoabBadge type="sunset" content="Sunset" icon={false} />
<GoabBadge type="sunset" content="Sunset" icon={false} emphasis="subtle" />
<GoabBadge type="dawn" content="Dawn" icon={false} />
<GoabBadge type="dawn" content="Dawn" icon={false} emphasis="subtle" />`,
        angular: `<goab-badge type="sky" content="Sky" [icon]="false"></goab-badge>
<goab-badge type="sky" content="Sky" [icon]="false" emphasis="subtle"></goab-badge>
<goab-badge type="prairie" content="Prairie" [icon]="false"></goab-badge>
<goab-badge type="prairie" content="Prairie" [icon]="false" emphasis="subtle"></goab-badge>
<goab-badge type="lilac" content="Lilac" [icon]="false"></goab-badge>
<goab-badge type="lilac" content="Lilac" [icon]="false" emphasis="subtle"></goab-badge>
<goab-badge type="pasture" content="Pasture" [icon]="false"></goab-badge>
<goab-badge type="pasture" content="Pasture" [icon]="false" emphasis="subtle"></goab-badge>
<goab-badge type="sunset" content="Sunset" [icon]="false"></goab-badge>
<goab-badge type="sunset" content="Sunset" [icon]="false" emphasis="subtle"></goab-badge>
<goab-badge type="dawn" content="Dawn" [icon]="false"></goab-badge>
<goab-badge type="dawn" content="Dawn" [icon]="false" emphasis="subtle"></goab-badge>`,
        webComponents: `<goa-badge version="2" type="sky" content="Sky" icon="false"></goa-badge>
<goa-badge version="2" type="sky" content="Sky" icon="false" emphasis="subtle"></goa-badge>
<goa-badge version="2" type="prairie" content="Prairie" icon="false"></goa-badge>
<goa-badge version="2" type="prairie" content="Prairie" icon="false" emphasis="subtle"></goa-badge>
<goa-badge version="2" type="lilac" content="Lilac" icon="false"></goa-badge>
<goa-badge version="2" type="lilac" content="Lilac" icon="false" emphasis="subtle"></goa-badge>
<goa-badge version="2" type="pasture" content="Pasture" icon="false"></goa-badge>
<goa-badge version="2" type="pasture" content="Pasture" icon="false" emphasis="subtle"></goa-badge>
<goa-badge version="2" type="sunset" content="Sunset" icon="false"></goa-badge>
<goa-badge version="2" type="sunset" content="Sunset" icon="false" emphasis="subtle"></goa-badge>
<goa-badge version="2" type="dawn" content="Dawn" icon="false"></goa-badge>
<goa-badge version="2" type="dawn" content="Dawn" icon="false" emphasis="subtle"></goa-badge>`,
      },
    },
    {
      id: 'high-emphasis',
      name: 'High emphasis',
      description: 'Strong versions of all badge types',
      code: {
        react: `<GoabBadge type="default" content="Default" icon={false} />
<GoabBadge type="information" content="Information" icon={false} />
<GoabBadge type="important" content="Important" icon={false} />
<GoabBadge type="emergency" content="Emergency" icon={false} />
<GoabBadge type="success" content="Success" icon={false} />
<GoabBadge type="archived" content="Archived" icon={false} />
<GoabBadge type="sky" content="Sky" icon={false} />
<GoabBadge type="prairie" content="Prairie" icon={false} />
<GoabBadge type="lilac" content="Lilac" icon={false} />
<GoabBadge type="pasture" content="Pasture" icon={false} />
<GoabBadge type="sunset" content="Sunset" icon={false} />
<GoabBadge type="dawn" content="Dawn" icon={false} />`,
        angular: `<goab-badge type="default" content="Default" [icon]="false"></goab-badge>
<goab-badge type="information" content="Information" [icon]="false"></goab-badge>
<goab-badge type="important" content="Important" [icon]="false"></goab-badge>
<goab-badge type="emergency" content="Emergency" [icon]="false"></goab-badge>
<goab-badge type="success" content="Success" [icon]="false"></goab-badge>
<goab-badge type="archived" content="Archived" [icon]="false"></goab-badge>
<goab-badge type="sky" content="Sky" [icon]="false"></goab-badge>
<goab-badge type="prairie" content="Prairie" [icon]="false"></goab-badge>
<goab-badge type="lilac" content="Lilac" [icon]="false"></goab-badge>
<goab-badge type="pasture" content="Pasture" [icon]="false"></goab-badge>
<goab-badge type="sunset" content="Sunset" [icon]="false"></goab-badge>
<goab-badge type="dawn" content="Dawn" [icon]="false"></goab-badge>`,
        webComponents: `<goa-badge version="2" type="default" content="Default" icon="false"></goa-badge>
<goa-badge version="2" type="information" content="Information" icon="false"></goa-badge>
<goa-badge version="2" type="important" content="Important" icon="false"></goa-badge>
<goa-badge version="2" type="emergency" content="Emergency" icon="false"></goa-badge>
<goa-badge version="2" type="success" content="Success" icon="false"></goa-badge>
<goa-badge version="2" type="archived" content="Archived" icon="false"></goa-badge>
<goa-badge version="2" type="sky" content="Sky" icon="false"></goa-badge>
<goa-badge version="2" type="prairie" content="Prairie" icon="false"></goa-badge>
<goa-badge version="2" type="lilac" content="Lilac" icon="false"></goa-badge>
<goa-badge version="2" type="pasture" content="Pasture" icon="false"></goa-badge>
<goa-badge version="2" type="sunset" content="Sunset" icon="false"></goa-badge>
<goa-badge version="2" type="dawn" content="Dawn" icon="false"></goa-badge>`,
      },
    },
    {
      id: 'low-emphasis',
      name: 'Low emphasis',
      description: 'Subtle versions of all badge types',
      code: {
        react: `<GoabBadge type="default" content="Default" emphasis="subtle" icon={false} />
<GoabBadge type="information" content="Information" emphasis="subtle" icon={false} />
<GoabBadge type="important" content="Important" emphasis="subtle" icon={false} />
<GoabBadge type="emergency" content="Emergency" emphasis="subtle" icon={false} />
<GoabBadge type="success" content="Success" emphasis="subtle" icon={false} />
<GoabBadge type="archived" content="Archived" emphasis="subtle" icon={false} />
<GoabBadge type="sky" content="Sky" emphasis="subtle" icon={false} />
<GoabBadge type="prairie" content="Prairie" emphasis="subtle" icon={false} />
<GoabBadge type="lilac" content="Lilac" emphasis="subtle" icon={false} />
<GoabBadge type="pasture" content="Pasture" emphasis="subtle" icon={false} />
<GoabBadge type="sunset" content="Sunset" emphasis="subtle" icon={false} />
<GoabBadge type="dawn" content="Dawn" emphasis="subtle" icon={false} />`,
        angular: `<goab-badge type="default" content="Default" emphasis="subtle" [icon]="false"></goab-badge>
<goab-badge type="information" content="Information" emphasis="subtle" [icon]="false"></goab-badge>
<goab-badge type="important" content="Important" emphasis="subtle" [icon]="false"></goab-badge>
<goab-badge type="emergency" content="Emergency" emphasis="subtle" [icon]="false"></goab-badge>
<goab-badge type="success" content="Success" emphasis="subtle" [icon]="false"></goab-badge>
<goab-badge type="archived" content="Archived" emphasis="subtle" [icon]="false"></goab-badge>
<goab-badge type="sky" content="Sky" emphasis="subtle" [icon]="false"></goab-badge>
<goab-badge type="prairie" content="Prairie" emphasis="subtle" [icon]="false"></goab-badge>
<goab-badge type="lilac" content="Lilac" emphasis="subtle" [icon]="false"></goab-badge>
<goab-badge type="pasture" content="Pasture" emphasis="subtle" [icon]="false"></goab-badge>
<goab-badge type="sunset" content="Sunset" emphasis="subtle" [icon]="false"></goab-badge>
<goab-badge type="dawn" content="Dawn" emphasis="subtle" [icon]="false"></goab-badge>`,
        webComponents: `<goa-badge version="2" type="default" content="Default" emphasis="subtle" icon="false"></goa-badge>
<goa-badge version="2" type="information" content="Information" emphasis="subtle" icon="false"></goa-badge>
<goa-badge version="2" type="important" content="Important" emphasis="subtle" icon="false"></goa-badge>
<goa-badge version="2" type="emergency" content="Emergency" emphasis="subtle" icon="false"></goa-badge>
<goa-badge version="2" type="success" content="Success" emphasis="subtle" icon="false"></goa-badge>
<goa-badge version="2" type="archived" content="Archived" emphasis="subtle" icon="false"></goa-badge>
<goa-badge version="2" type="sky" content="Sky" emphasis="subtle" icon="false"></goa-badge>
<goa-badge version="2" type="prairie" content="Prairie" emphasis="subtle" icon="false"></goa-badge>
<goa-badge version="2" type="lilac" content="Lilac" emphasis="subtle" icon="false"></goa-badge>
<goa-badge version="2" type="pasture" content="Pasture" emphasis="subtle" icon="false"></goa-badge>
<goa-badge version="2" type="sunset" content="Sunset" emphasis="subtle" icon="false"></goa-badge>
<goa-badge version="2" type="dawn" content="Dawn" emphasis="subtle" icon="false"></goa-badge>`,
      },
    },
    {
      id: 'with-icon',
      name: 'With custom icon',
      description: 'Badge with an icon',
      code: {
        react: `<GoabBadge type="success" content="Approved" iconType="checkmark" />
<GoabBadge type="emergency" content="Rejected" iconType="close" />
<GoabBadge type="information" content="Pending" iconType="time" />`,
        angular: `<goab-badge type="success" content="Approved" iconType="checkmark"></goab-badge>
<goab-badge type="emergency" content="Rejected" iconType="close"></goab-badge>
<goab-badge type="information" content="Pending" iconType="time"></goab-badge>`,
        webComponents: `<goa-badge version="2" type="success" content="Approved" icontype="checkmark"></goa-badge>
<goa-badge version="2" type="emergency" content="Rejected" icontype="close"></goa-badge>
<goa-badge version="2" type="information" content="Pending" icontype="time"></goa-badge>`,
      },
    },
    {
      id: 'sizes',
      name: 'Sizes',
      description: 'Medium and large badge sizes',
      code: {
        react: `<GoabBadge type="default" content="Medium" size="medium" emphasis="subtle" />
<GoabBadge type="default" content="Large" size="large" emphasis="subtle" />`,
        angular: `<goab-badge type="default" content="Medium" size="medium" emphasis="subtle"></goab-badge>
<goab-badge type="default" content="Large" size="large" emphasis="subtle"></goab-badge>`,
        webComponents: `<goa-badge version="2" type="default" content="Medium" size="medium" emphasis="subtle"></goa-badge>
<goa-badge version="2" type="default" content="Large" size="large" emphasis="subtle"></goa-badge>`,
      },
    },
  ],
};
