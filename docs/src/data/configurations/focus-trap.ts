/**
 * FocusTrap Component Configurations
 *
 * FocusTrap keeps focus within a container.
 */

import type { ComponentConfigurations } from "./types";

export const focusTrapConfigurations: ComponentConfigurations = {
  componentSlug: "focus-trap",
  componentName: "Focus trap",
  defaultConfigurationId: "basic",

  configurations: [
    {
      id: "basic",
      name: "Basic focus trap",
      description: "Container that traps keyboard focus",
      code: {
        react: `<GoabFocusTrap active={isActive}>
  <GoabxFormItem label="Username" mb="l">
    <GoabxInput name="username" width="100%" />
  </GoabxFormItem>
  <GoabxFormItem label="Password" mb="l">
    <GoabxInput name="password" type="password" width="100%" />
  </GoabxFormItem>
  <GoabxButton>Submit</GoabxButton>
</GoabFocusTrap>`,
        angular: `<goab-focus-trap [active]="isActive">
  <goabx-form-item label="Username" mb="l">
    <goabx-input name="username" width="100%"></goabx-input>
  </goabx-form-item>
  <goabx-form-item label="Password" mb="l">
    <goabx-input name="password" type="password" width="100%"></goabx-input>
  </goabx-form-item>
  <goabx-button>Submit</goabx-button>
</goab-focus-trap>`,
        webComponents: `<goa-focus-trap active>
  <goa-form-item version="2" label="Username" mb="l">
    <goa-input version="2" name="username" width="100%"></goa-input>
  </goa-form-item>
  <goa-form-item version="2" label="Password" mb="l">
    <goa-input version="2" name="password" type="password" width="100%"></goa-input>
  </goa-form-item>
  <goa-button version="2">Submit</goa-button>
</goa-focus-trap>`,
      },
    },
  ],
};
