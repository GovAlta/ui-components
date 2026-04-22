/**
 * ButtonGroup Component Configurations
 *
 * ButtonGroup arranges buttons in a consistent layout.
 */

import type { ComponentConfigurations } from "./types";

export const buttonGroupConfigurations: ComponentConfigurations = {
  componentSlug: "button-group",
  componentName: "Button group",
  defaultConfigurationId: "basic",

  configurations: [
    {
      id: "basic",
      name: "Basic button group",
      description: "Group of buttons with default spacing",
      code: {
        react: `<GoabButtonGroup alignment="start">
  <GoabButton>Submit</GoabButton>
  <GoabButton type="secondary">Cancel</GoabButton>
</GoabButtonGroup>`,
        angular: `<goab-button-group alignment="start">
  <goab-button>Submit</goab-button>
  <goab-button type="secondary">Cancel</goab-button>
</goab-button-group>`,
        webComponents: `<goa-button-group alignment="start">
  <goa-button version="2">Submit</goa-button>
  <goa-button version="2" type="secondary">Cancel</goa-button>
</goa-button-group>`,
      },
    },
    {
      id: "alignment",
      name: "Alignment",
      description: "Different alignment options",
      code: {
        react: `<GoabText mt="none" mb="s">Start</GoabText>
<GoabButtonGroup alignment="start">
  <GoabButton type="primary">Submit</GoabButton>
  <GoabButton type="secondary">Save draft</GoabButton>
  <GoabButton type="tertiary">Cancel</GoabButton>
</GoabButtonGroup>
<GoabDivider mt="l" mb="l" />
<GoabText mt="none" mb="s">Center</GoabText>
<GoabButtonGroup alignment="center">
  <GoabButton type="primary">Submit</GoabButton>
  <GoabButton type="secondary">Save draft</GoabButton>
  <GoabButton type="tertiary">Cancel</GoabButton>
</GoabButtonGroup>
<GoabDivider mt="l" mb="l" />
<GoabText mt="none" mb="s">End</GoabText>
<GoabButtonGroup alignment="end">
  <GoabButton type="tertiary">Cancel</GoabButton>
  <GoabButton type="secondary">Save draft</GoabButton>
  <GoabButton type="primary">Submit</GoabButton>
</GoabButtonGroup>`,
        angular: `<goab-text mt="none" mb="s">Start</goab-text>
<goab-button-group alignment="start">
  <goab-button type="primary">Submit</goab-button>
  <goab-button type="secondary">Save draft</goab-button>
  <goab-button type="tertiary">Cancel</goab-button>
</goab-button-group>
<goab-divider mt="l" mb="l"></goab-divider>
<goab-text mt="none" mb="s">Center</goab-text>
<goab-button-group alignment="center">
  <goab-button type="primary">Submit</goab-button>
  <goab-button type="secondary">Save draft</goab-button>
  <goab-button type="tertiary">Cancel</goab-button>
</goab-button-group>
<goab-divider mt="l" mb="l"></goab-divider>
<goab-text mt="none" mb="s">End</goab-text>
<goab-button-group alignment="end">
  <goab-button type="tertiary">Cancel</goab-button>
  <goab-button type="secondary">Save draft</goab-button>
  <goab-button type="primary">Submit</goab-button>
</goab-button-group>`,
        webComponents: `<goa-text mt="none" mb="s">Start</goa-text>
<goa-button-group alignment="start">
  <goa-button version="2" type="primary">Submit</goa-button>
  <goa-button version="2" type="secondary">Save draft</goa-button>
  <goa-button version="2" type="tertiary">Cancel</goa-button>
</goa-button-group>
<goa-divider mt="l" mb="l"></goa-divider>
<goa-text mt="none" mb="s">Center</goa-text>
<goa-button-group alignment="center">
  <goa-button version="2" type="primary">Submit</goa-button>
  <goa-button version="2" type="secondary">Save draft</goa-button>
  <goa-button version="2" type="tertiary">Cancel</goa-button>
</goa-button-group>
<goa-divider mt="l" mb="l"></goa-divider>
<goa-text mt="none" mb="s">End</goa-text>
<goa-button-group alignment="end">
  <goa-button version="2" type="tertiary">Cancel</goa-button>
  <goa-button version="2" type="secondary">Save draft</goa-button>
  <goa-button version="2" type="primary">Submit</goa-button>
</goa-button-group>`,
      },
    },
    {
      id: "gap",
      name: "Compact",
      description: "Compact button group spacing",
      code: {
        react: `<GoabButtonGroup alignment="start" gap="compact">
  <GoabButton size="compact">Continue</GoabButton>
  <GoabButton type="secondary" size="compact">Back</GoabButton>
</GoabButtonGroup>`,
        angular: `<goab-button-group alignment="start" gap="compact">
  <goab-button size="compact">Continue</goab-button>
  <goab-button type="secondary" size="compact">Back</goab-button>
</goab-button-group>`,
        webComponents: `<goa-button-group alignment="start" gap="compact">
  <goa-button version="2" size="compact">Continue</goa-button>
  <goa-button version="2" type="secondary" size="compact">Back</goa-button>
</goa-button-group>`,
      },
    },
    {
      id: "many-actions",
      name: "Many actions",
      description: "Use a menu button to group additional actions",
      code: {
        react: `const handleAction = (detail: GoabMenuButtonOnActionDetail) => {
  console.log("Action selected:", detail.action);
};

<GoabButtonGroup alignment="start">
  <GoabButton>Submit</GoabButton>
  <GoabButton type="secondary">Save draft</GoabButton>
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

<goab-button-group alignment="start">
  <goab-button>Submit</goab-button>
  <goab-button type="secondary">Save draft</goab-button>
  <goab-menu-button text="More" type="tertiary" (onAction)="handleAction($event)">
    <goab-menu-action text="Preview" action="preview"></goab-menu-action>
    <goab-menu-action text="Duplicate" action="duplicate"></goab-menu-action>
    <goab-menu-action text="Print" action="print"></goab-menu-action>
    <goab-menu-action text="Delete" action="delete"></goab-menu-action>
  </goab-menu-button>
</goab-button-group>`,
        webComponents: `<goa-button-group alignment="start">
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
