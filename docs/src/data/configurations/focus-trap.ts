/**
 * FocusTrap Component Configurations
 *
 * FocusTrap keeps focus within a container.
 */

import type { ComponentConfigurations } from './types';

export const focusTrapConfigurations: ComponentConfigurations = {
  componentSlug: 'focus-trap',
  componentName: 'Focus trap',
  defaultConfigurationId: 'basic',

  configurations: [
    {
      id: 'basic',
      name: 'Basic focus trap',
      description: 'Container that traps keyboard focus',
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
  <goab-form-item label="Username" mb="l">
    <goab-input name="username" width="100%"></goab-input>
  </goab-form-item>
  <goab-form-item label="Password" mb="l">
    <goab-input name="password" type="password" width="100%"></goab-input>
  </goab-form-item>
  <goab-button>Submit</goab-button>
</goab-focus-trap>`,
        webComponents: `<goa-focus-trap active>
  <goa-form-item label="Username" mb="l">
    <goa-input name="username" width="100%"></goa-input>
  </goa-form-item>
  <goa-form-item label="Password" mb="l">
    <goa-input name="password" type="password" width="100%"></goa-input>
  </goa-form-item>
  <goa-button>Submit</goa-button>
</goa-focus-trap>`,
      },
    },
  ],
};
