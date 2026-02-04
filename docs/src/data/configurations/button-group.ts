/**
 * ButtonGroup Component Configurations
 *
 * ButtonGroup arranges buttons in a consistent layout.
 */

import type { ComponentConfigurations } from './types';

export const buttonGroupConfigurations: ComponentConfigurations = {
  componentSlug: 'button-group',
  componentName: 'Button group',
  defaultConfigurationId: 'basic',

  configurations: [
    {
      id: 'basic',
      name: 'Basic button group',
      description: 'Group of buttons with default spacing',
      code: {
        react: `<GoabButtonGroup>
  <GoabxButton type="secondary">Cancel</GoabxButton>
  <GoabxButton>Submit</GoabxButton>
</GoabButtonGroup>`,
        angular: `<goab-button-group>
  <goab-button type="secondary">Cancel</goab-button>
  <goab-button>Submit</goab-button>
</goab-button-group>`,
        webComponents: `<goa-button-group>
  <goa-button type="secondary">Cancel</goa-button>
  <goa-button>Submit</goa-button>
</goa-button-group>`,
      },
    },
    {
      id: 'alignment',
      name: 'Alignment',
      description: 'Different alignment options',
      code: {
        react: `<GoabButtonGroup alignment="start">
  <GoabxButton>Start aligned</GoabxButton>
</GoabButtonGroup>
<GoabButtonGroup alignment="center">
  <GoabxButton>Center aligned</GoabxButton>
</GoabButtonGroup>
<GoabButtonGroup alignment="end">
  <GoabxButton>End aligned</GoabxButton>
</GoabButtonGroup>`,
        angular: `<goab-button-group alignment="start">
  <goab-button>Start aligned</goab-button>
</goab-button-group>
<goab-button-group alignment="center">
  <goab-button>Center aligned</goab-button>
</goab-button-group>
<goab-button-group alignment="end">
  <goab-button>End aligned</goab-button>
</goab-button-group>`,
        webComponents: `<goa-button-group alignment="start">
  <goa-button>Start aligned</goa-button>
</goa-button-group>
<goa-button-group alignment="center">
  <goa-button>Center aligned</goa-button>
</goa-button-group>
<goa-button-group alignment="end">
  <goa-button>End aligned</goa-button>
</goa-button-group>`,
      },
    },
    {
      id: 'gap',
      name: 'Custom gap',
      description: 'Button group with specific spacing',
      code: {
        react: `<GoabButtonGroup gap="relaxed">
  <GoabxButton type="secondary">Back</GoabxButton>
  <GoabxButton>Continue</GoabxButton>
</GoabButtonGroup>
<GoabButtonGroup gap="compact">
  <GoabxButton type="secondary" size="compact">Back</GoabxButton>
  <GoabxButton size="compact">Continue</GoabxButton>
</GoabButtonGroup>`,
        angular: `<goab-button-group gap="relaxed">
  <goab-button type="secondary">Back</goab-button>
  <goab-button>Continue</goab-button>
</goab-button-group>
<goab-button-group gap="compact">
  <goab-button type="secondary" size="compact">Back</goab-button>
  <goab-button size="compact">Continue</goab-button>
</goab-button-group>`,
        webComponents: `<goa-button-group gap="relaxed">
  <goa-button type="secondary">Back</goa-button>
  <goa-button>Continue</goa-button>
</goa-button-group>
<goa-button-group gap="compact">
  <goa-button type="secondary" size="compact">Back</goa-button>
  <goa-button size="compact">Continue</goa-button>
</goa-button-group>`,
      },
    },
    {
      id: 'form-actions',
      name: 'Form actions',
      description: 'Common pattern for form button placement',
      code: {
        react: `<GoabButtonGroup alignment="start">
  <GoabxButton type="primary">Save and continue</GoabxButton>
  <GoabxButton type="secondary">Save as draft</GoabxButton>
  <GoabxButton type="tertiary">Cancel</GoabxButton>
</GoabButtonGroup>`,
        angular: `<goab-button-group alignment="start">
  <goab-button type="primary">Save and continue</goab-button>
  <goab-button type="secondary">Save as draft</goab-button>
  <goab-button type="tertiary">Cancel</goab-button>
</goab-button-group>`,
        webComponents: `<goa-button-group alignment="start">
  <goa-button type="primary">Save and continue</goa-button>
  <goa-button type="secondary">Save as draft</goa-button>
  <goa-button type="tertiary">Cancel</goa-button>
</goa-button-group>`,
      },
    },
    {
      id: 'many-actions',
      name: 'Many actions',
      description: 'Use a menu button to group additional actions',
      code: {
        react: `const handleAction = (detail: GoabMenuButtonOnActionDetail) => {
  console.log("Action selected:", detail.action);
};

<GoabButtonGroup>
  <GoabxButton>Submit</GoabxButton>
  <GoabxButton type="secondary">Save draft</GoabxButton>
  <GoabMenuButton text="More" type="tertiary" onAction={handleAction}>
    <GoabMenuAction text="Preview" action="preview" />
    <GoabMenuAction text="Duplicate" action="duplicate" />
    <GoabMenuAction text="Print" action="print" />
    <GoabMenuAction text="Delete" action="delete" />
  </GoabMenuButton>
</GoabButtonGroup>`,
        angular: `// In component class
handleAction(event: GoabMenuButtonOnActionDetail) {
  console.log("Action selected:", event.action);
}

<goab-button-group>
  <goab-button>Submit</goab-button>
  <goab-button type="secondary">Save draft</goab-button>
  <goab-menu-button text="More" type="tertiary" (_action)="handleAction($event)">
    <goab-menu-action text="Preview" action="preview"></goab-menu-action>
    <goab-menu-action text="Duplicate" action="duplicate"></goab-menu-action>
    <goab-menu-action text="Print" action="print"></goab-menu-action>
    <goab-menu-action text="Delete" action="delete"></goab-menu-action>
  </goab-menu-button>
</goab-button-group>`,
        webComponents: `<goa-button-group>
  <goa-button>Submit</goa-button>
  <goa-button type="secondary">Save draft</goa-button>
  <goa-menu-button text="More" type="tertiary">
    <goa-menu-action text="Preview" action="preview"></goa-menu-action>
    <goa-menu-action text="Duplicate" action="duplicate"></goa-menu-action>
    <goa-menu-action text="Print" action="print"></goa-menu-action>
    <goa-menu-action text="Delete" action="delete"></goa-menu-action>
  </goa-menu-button>
</goa-button-group>`,
      },
    },
  ],
};
