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
  <goabx-button type="secondary">Cancel</goabx-button>
  <goabx-button>Submit</goabx-button>
</goab-button-group>`,
        webComponents: `<goa-button-group>
  <goa-button version="2" type="secondary">Cancel</goa-button>
  <goa-button version="2">Submit</goa-button>
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
  <goabx-button>Start aligned</goabx-button>
</goab-button-group>
<goab-button-group alignment="center">
  <goabx-button>Center aligned</goabx-button>
</goab-button-group>
<goab-button-group alignment="end">
  <goabx-button>End aligned</goabx-button>
</goab-button-group>`,
        webComponents: `<goa-button-group alignment="start">
  <goa-button version="2">Start aligned</goa-button>
</goa-button-group>
<goa-button-group alignment="center">
  <goa-button version="2">Center aligned</goa-button>
</goa-button-group>
<goa-button-group alignment="end">
  <goa-button version="2">End aligned</goa-button>
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
  <goabx-button type="secondary">Back</goabx-button>
  <goabx-button>Continue</goabx-button>
</goab-button-group>
<goab-button-group gap="compact">
  <goabx-button type="secondary" size="compact">Back</goabx-button>
  <goabx-button size="compact">Continue</goabx-button>
</goab-button-group>`,
        webComponents: `<goa-button-group gap="relaxed">
  <goa-button version="2" type="secondary">Back</goa-button>
  <goa-button version="2">Continue</goa-button>
</goa-button-group>
<goa-button-group gap="compact">
  <goa-button version="2" type="secondary" size="compact">Back</goa-button>
  <goa-button version="2" size="compact">Continue</goa-button>
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
  <goabx-button type="primary">Save and continue</goabx-button>
  <goabx-button type="secondary">Save as draft</goabx-button>
  <goabx-button type="tertiary">Cancel</goabx-button>
</goab-button-group>`,
        webComponents: `<goa-button-group alignment="start">
  <goa-button version="2" type="primary">Save and continue</goa-button>
  <goa-button version="2" type="secondary">Save as draft</goa-button>
  <goa-button version="2" type="tertiary">Cancel</goa-button>
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
  <goabx-button>Submit</goabx-button>
  <goabx-button type="secondary">Save draft</goabx-button>
  <goab-menu-button text="More" type="tertiary" (_action)="handleAction($event)">
    <goab-menu-action text="Preview" action="preview"></goab-menu-action>
    <goab-menu-action text="Duplicate" action="duplicate"></goab-menu-action>
    <goab-menu-action text="Print" action="print"></goab-menu-action>
    <goab-menu-action text="Delete" action="delete"></goab-menu-action>
  </goab-menu-button>
</goab-button-group>`,
        webComponents: `<goa-button-group>
  <goa-button version="2">Submit</goa-button>
  <goa-button version="2" type="secondary">Save draft</goa-button>
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
