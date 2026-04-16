/**
 * FormStep Component Configurations
 *
 * FormStep is a child component of FormStepper.
 */

import type { ComponentConfigurations } from "./types";

export const formStepConfigurations: ComponentConfigurations = {
  componentSlug: "form-step",
  componentName: "Form step",
  defaultConfigurationId: "basic",

  configurations: [
    {
      id: "basic",
      name: "Basic form step",
      description: "Single step within FormStepper",
      code: {
        react: `<GoabFormStepper step={2}>
  <GoabFormStep text="Step 1" status="complete" />
  <GoabFormStep text="Step 2" />
  <GoabFormStep text="Step 3" />
</GoabFormStepper>`,
        angular: `<goab-form-stepper [step]="2">
  <goab-form-step text="Step 1" status="complete"></goab-form-step>
  <goab-form-step text="Step 2"></goab-form-step>
  <goab-form-step text="Step 3"></goab-form-step>
</goab-form-stepper>`,
        webComponents: `<goa-form-stepper step="2">
  <goa-form-step text="Step 1" status="complete"></goa-form-step>
  <goa-form-step text="Step 2"></goa-form-step>
  <goa-form-step text="Step 3"></goa-form-step>
</goa-form-stepper>`,
      },
    },
  ],
};
