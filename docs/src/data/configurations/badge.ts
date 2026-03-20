/**
 * Badge Component Configurations
 *
 * Badges are used to label, categorize, or show status.
 */

import type { ComponentConfigurations } from "./types";

export const badgeConfigurations: ComponentConfigurations = {
  componentSlug: "badge",
  componentName: "Badge",
  defaultConfigurationId: "basic",

  configurations: [
    {
      id: "basic",
      name: "Basic badge",
      description: "Simple badge with text",
      code: {
        react: `<GoabxBadge type="default" content="New" emphasis="subtle" icon={false} />`,
        angular: `<goabx-badge type="default" content="New" emphasis="subtle" [icon]="false"></goabx-badge>`,
        webComponents: `<goa-badge version="2" type="default" content="New" emphasis="subtle" icon="false"></goa-badge>`,
      },
    },
    {
      id: "semantic-types",
      name: "Semantic types",
      description: "Badges for different statuses",
      code: {
        react: `<GoabxBadge type="information" content="Information" />
<GoabxBadge type="important" content="Important" />
<GoabxBadge type="emergency" content="Emergency" />
<GoabxBadge type="success" content="Success" />
<GoabxBadge type="archived" content="Archived" />`,
        angular: `<goabx-badge type="information" content="Information"></goabx-badge>
<goabx-badge type="important" content="Important"></goabx-badge>
<goabx-badge type="emergency" content="Emergency"></goabx-badge>
<goabx-badge type="success" content="Success"></goabx-badge>
<goabx-badge type="archived" content="Archived"></goabx-badge>`,
        webComponents: `<goa-badge version="2" type="information" content="Information"></goa-badge>
<goa-badge version="2" type="important" content="Important"></goa-badge>
<goa-badge version="2" type="emergency" content="Emergency"></goa-badge>
<goa-badge version="2" type="success" content="Success"></goa-badge>
<goa-badge version="2" type="archived" content="Archived"></goa-badge>`,
      },
    },
    {
      id: "extended-colours",
      name: "Extended colours",
      description: "Additional colour options for categorization",
      code: {
        react: `<GoabxBadge type="sky" content="Sky" icon={false} />
<GoabxBadge type="sky" content="Sky" icon={false} emphasis="subtle" />
<GoabxBadge type="prairie" content="Prairie" icon={false} />
<GoabxBadge type="prairie" content="Prairie" icon={false} emphasis="subtle" />
<GoabxBadge type="lilac" content="Lilac" icon={false} />
<GoabxBadge type="lilac" content="Lilac" icon={false} emphasis="subtle" />
<GoabxBadge type="pasture" content="Pasture" icon={false} />
<GoabxBadge type="pasture" content="Pasture" icon={false} emphasis="subtle" />
<GoabxBadge type="sunset" content="Sunset" icon={false} />
<GoabxBadge type="sunset" content="Sunset" icon={false} emphasis="subtle" />
<GoabxBadge type="dawn" content="Dawn" icon={false} />
<GoabxBadge type="dawn" content="Dawn" icon={false} emphasis="subtle" />`,
        angular: `<goabx-badge type="sky" content="Sky" [icon]="false"></goabx-badge>
<goabx-badge type="sky" content="Sky" [icon]="false" emphasis="subtle"></goabx-badge>
<goabx-badge type="prairie" content="Prairie" [icon]="false"></goabx-badge>
<goabx-badge type="prairie" content="Prairie" [icon]="false" emphasis="subtle"></goabx-badge>
<goabx-badge type="lilac" content="Lilac" [icon]="false"></goabx-badge>
<goabx-badge type="lilac" content="Lilac" [icon]="false" emphasis="subtle"></goabx-badge>
<goabx-badge type="pasture" content="Pasture" [icon]="false"></goabx-badge>
<goabx-badge type="pasture" content="Pasture" [icon]="false" emphasis="subtle"></goabx-badge>
<goabx-badge type="sunset" content="Sunset" [icon]="false"></goabx-badge>
<goabx-badge type="sunset" content="Sunset" [icon]="false" emphasis="subtle"></goabx-badge>
<goabx-badge type="dawn" content="Dawn" [icon]="false"></goabx-badge>
<goabx-badge type="dawn" content="Dawn" [icon]="false" emphasis="subtle"></goabx-badge>`,
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
      id: "high-emphasis",
      name: "High emphasis",
      description: "Strong versions of all badge types",
      code: {
        react: `<GoabxBadge type="default" content="Default" icon={false} />
<GoabxBadge type="information" content="Information" icon={false} />
<GoabxBadge type="important" content="Important" icon={false} />
<GoabxBadge type="emergency" content="Emergency" icon={false} />
<GoabxBadge type="success" content="Success" icon={false} />
<GoabxBadge type="archived" content="Archived" icon={false} />
<GoabxBadge type="sky" content="Sky" icon={false} />
<GoabxBadge type="prairie" content="Prairie" icon={false} />
<GoabxBadge type="lilac" content="Lilac" icon={false} />
<GoabxBadge type="pasture" content="Pasture" icon={false} />
<GoabxBadge type="sunset" content="Sunset" icon={false} />
<GoabxBadge type="dawn" content="Dawn" icon={false} />`,
        angular: `<goabx-badge type="default" content="Default" [icon]="false"></goabx-badge>
<goabx-badge type="information" content="Information" [icon]="false"></goabx-badge>
<goabx-badge type="important" content="Important" [icon]="false"></goabx-badge>
<goabx-badge type="emergency" content="Emergency" [icon]="false"></goabx-badge>
<goabx-badge type="success" content="Success" [icon]="false"></goabx-badge>
<goabx-badge type="archived" content="Archived" [icon]="false"></goabx-badge>
<goabx-badge type="sky" content="Sky" [icon]="false"></goabx-badge>
<goabx-badge type="prairie" content="Prairie" [icon]="false"></goabx-badge>
<goabx-badge type="lilac" content="Lilac" [icon]="false"></goabx-badge>
<goabx-badge type="pasture" content="Pasture" [icon]="false"></goabx-badge>
<goabx-badge type="sunset" content="Sunset" [icon]="false"></goabx-badge>
<goabx-badge type="dawn" content="Dawn" [icon]="false"></goabx-badge>`,
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
      id: "low-emphasis",
      name: "Low emphasis",
      description: "Subtle versions of all badge types",
      code: {
        react: `<GoabxBadge type="default" content="Default" emphasis="subtle" icon={false} />
<GoabxBadge type="information" content="Information" emphasis="subtle" icon={false} />
<GoabxBadge type="important" content="Important" emphasis="subtle" icon={false} />
<GoabxBadge type="emergency" content="Emergency" emphasis="subtle" icon={false} />
<GoabxBadge type="success" content="Success" emphasis="subtle" icon={false} />
<GoabxBadge type="archived" content="Archived" emphasis="subtle" icon={false} />
<GoabxBadge type="sky" content="Sky" emphasis="subtle" icon={false} />
<GoabxBadge type="prairie" content="Prairie" emphasis="subtle" icon={false} />
<GoabxBadge type="lilac" content="Lilac" emphasis="subtle" icon={false} />
<GoabxBadge type="pasture" content="Pasture" emphasis="subtle" icon={false} />
<GoabxBadge type="sunset" content="Sunset" emphasis="subtle" icon={false} />
<GoabxBadge type="dawn" content="Dawn" emphasis="subtle" icon={false} />`,
        angular: `<goabx-badge type="default" content="Default" emphasis="subtle" [icon]="false"></goabx-badge>
<goabx-badge type="information" content="Information" emphasis="subtle" [icon]="false"></goabx-badge>
<goabx-badge type="important" content="Important" emphasis="subtle" [icon]="false"></goabx-badge>
<goabx-badge type="emergency" content="Emergency" emphasis="subtle" [icon]="false"></goabx-badge>
<goabx-badge type="success" content="Success" emphasis="subtle" [icon]="false"></goabx-badge>
<goabx-badge type="archived" content="Archived" emphasis="subtle" [icon]="false"></goabx-badge>
<goabx-badge type="sky" content="Sky" emphasis="subtle" [icon]="false"></goabx-badge>
<goabx-badge type="prairie" content="Prairie" emphasis="subtle" [icon]="false"></goabx-badge>
<goabx-badge type="lilac" content="Lilac" emphasis="subtle" [icon]="false"></goabx-badge>
<goabx-badge type="pasture" content="Pasture" emphasis="subtle" [icon]="false"></goabx-badge>
<goabx-badge type="sunset" content="Sunset" emphasis="subtle" [icon]="false"></goabx-badge>
<goabx-badge type="dawn" content="Dawn" emphasis="subtle" [icon]="false"></goabx-badge>`,
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
      id: "with-icon",
      name: "With custom icon",
      description: "Badge with an icon",
      code: {
        react: `<GoabxBadge type="success" content="Approved" iconType="checkmark" />
<GoabxBadge type="emergency" content="Rejected" iconType="close" />
<GoabxBadge type="information" content="Pending" iconType="time" />`,
        angular: `<goabx-badge type="success" content="Approved" iconType="checkmark"></goabx-badge>
<goabx-badge type="emergency" content="Rejected" iconType="close"></goabx-badge>
<goabx-badge type="information" content="Pending" iconType="time"></goabx-badge>`,
        webComponents: `<goa-badge version="2" type="success" content="Approved" icontype="checkmark"></goa-badge>
<goa-badge version="2" type="emergency" content="Rejected" icontype="close"></goa-badge>
<goa-badge version="2" type="information" content="Pending" icontype="time"></goa-badge>`,
      },
    },
    {
      id: "sizes",
      name: "Sizes",
      description: "Medium and large badge sizes",
      code: {
        react: `<GoabxBadge type="default" content="Medium" size="medium" emphasis="subtle" />
<GoabxBadge type="default" content="Large" size="large" emphasis="subtle" />`,
        angular: `<goabx-badge type="default" content="Medium" size="medium" emphasis="subtle"></goabx-badge>
<goabx-badge type="default" content="Large" size="large" emphasis="subtle"></goabx-badge>`,
        webComponents: `<goa-badge version="2" type="default" content="Medium" size="medium" emphasis="subtle"></goa-badge>
<goa-badge version="2" type="default" content="Large" size="large" emphasis="subtle"></goa-badge>`,
      },
    },
  ],
};
