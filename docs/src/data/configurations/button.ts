/**
 * Button Component Configurations
 *
 * Shows various Button use cases across all three frameworks.
 */

import type { ComponentConfigurations } from "./types";

export const buttonConfigurations: ComponentConfigurations = {
  componentSlug: "button",
  componentName: "Button",
  defaultConfigurationId: "basic",

  configurations: [
    {
      id: "basic",
      name: "Primary button",
      description: "Simple button with default styling",
      code: {
        react: `<GoabButton>Submit</GoabButton>`,
        angular: `<goab-button>Submit</goab-button>`,
        webComponents: `<goa-button>Submit</goa-button>`,
      },
    },
    {
      id: "variants",
      name: "Types",
      description: "Primary, secondary, and tertiary button types",
      code: {
        react: `<GoabButton type="primary">Primary</GoabButton>
<GoabButton type="secondary">Secondary</GoabButton>
<GoabButton type="tertiary">Tertiary</GoabButton>`,
        angular: `<goab-button type="primary">Primary</goab-button>
<goab-button type="secondary">Secondary</goab-button>
<goab-button type="tertiary">Tertiary</goab-button>`,
        webComponents: `<goa-button type="primary">Primary</goa-button>
<goa-button type="secondary">Secondary</goa-button>
<goa-button type="tertiary">Tertiary</goa-button>`,
      },
    },
    {
      id: "sizes",
      name: "Sizes",
      description: "Normal and compact button sizes",
      code: {
        react: `<GoabButton size="normal">Normal</GoabButton>
<GoabButton size="compact">Compact</GoabButton>`,
        angular: `<goab-button size="normal">Normal</goab-button>
<goab-button size="compact">Compact</goab-button>`,
        webComponents: `<goa-button size="normal">Normal</goa-button>
<goa-button size="compact">Compact</goa-button>`,
      },
    },
    {
      id: "with-icons",
      name: "With icons",
      description: "Buttons with leading or trailing icons",
      code: {
        react: `<div><GoabButton leadingIcon="add" mb="m">Add item</GoabButton></div>
<div><GoabButton trailingIcon="arrow-forward" mb="m">Next</GoabButton></div>
<div><GoabButton leadingIcon="pencil">Edit</GoabButton></div>`,
        angular: `<div><goab-button leadingIcon="add" mb="m">Add item</goab-button></div>
<div><goab-button trailingIcon="arrow-forward" mb="m">Next</goab-button></div>
<div><goab-button leadingIcon="pencil">Edit</goab-button></div>`,
        webComponents: `<div><goa-button leadingicon="add" mb="m">Add item</goa-button></div>
<div><goa-button trailingicon="arrow-forward" mb="m">Next</goa-button></div>
<div><goa-button leadingicon="pencil">Edit</goa-button></div>`,
      },
    },
    {
      id: "destructive",
      name: "Destructive",
      description: "Buttons for destructive actions like delete",
      code: {
        react: `<GoabButton variant="destructive">Primary destructive</GoabButton>
<GoabButton variant="destructive" type="secondary">Secondary destructive</GoabButton>
<GoabButton variant="destructive" type="tertiary">Tertiary destructive</GoabButton>`,
        angular: `<goab-button variant="destructive">Primary destructive</goab-button>
<goab-button variant="destructive" type="secondary">Secondary destructive</goab-button>
<goab-button variant="destructive" type="tertiary">Tertiary destructive</goab-button>`,
        webComponents: `<goa-button variant="destructive">Primary destructive</goa-button>
<goa-button variant="destructive" type="secondary">Secondary destructive</goa-button>
<goa-button variant="destructive" type="tertiary">Tertiary destructive</goa-button>`,
      },
    },
    {
      id: "inverse",
      name: "Inverse",
      description: "Buttons for use on dark backgrounds",
      code: {
        react: `<div style={{ backgroundColor: "var(--goa-color-greyscale-700)", padding: "var(--goa-space-l)" }}>
  <GoabButton variant="inverse">Primary inverse</GoabButton>
  <GoabButton variant="inverse" type="secondary">Secondary inverse</GoabButton>
  <GoabButton variant="inverse" type="tertiary">Tertiary inverse</GoabButton>
</div>`,
        angular: `<div style="background-color: var(--goa-color-greyscale-700); padding: var(--goa-space-l);">
  <goab-button variant="inverse">Primary inverse</goab-button>
  <goab-button variant="inverse" type="secondary">Secondary inverse</goab-button>
  <goab-button variant="inverse" type="tertiary">Tertiary inverse</goab-button>
</div>`,
        webComponents: `<div style="background-color: var(--goa-color-greyscale-700); padding: var(--goa-space-l);">
  <goa-button variant="inverse">Primary inverse</goa-button>
  <goa-button variant="inverse" type="secondary">Secondary inverse</goa-button>
  <goa-button variant="inverse" type="tertiary">Tertiary inverse</goa-button>
</div>`,
      },
    },
    {
      id: "disabled",
      name: "Disabled",
      description: "Buttons in disabled state",
      code: {
        react: `<GoabButton disabled>Disabled primary</GoabButton>
<GoabButton type="secondary" disabled>Disabled secondary</GoabButton>
<GoabButton type="tertiary" disabled>Disabled tertiary</GoabButton>`,
        angular: `<goab-button disabled="true">Disabled primary</goab-button>
<goab-button type="secondary" disabled="true">Disabled secondary</goab-button>
<goab-button type="tertiary" disabled="true">Disabled tertiary</goab-button>`,
        webComponents: `<goa-button disabled>Disabled primary</goa-button>
<goa-button type="secondary" disabled>Disabled secondary</goa-button>
<goa-button type="tertiary" disabled>Disabled tertiary</goa-button>`,
      },
    },
  ],
};
