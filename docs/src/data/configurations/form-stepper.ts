/**
 * FormStepper Component Configurations
 *
 * Form stepper shows progress through multi-step forms.
 */

import type { ComponentConfigurations } from "./types";

export const formStepperConfigurations: ComponentConfigurations = {
  componentSlug: "form-stepper",
  componentName: "Form stepper",
  defaultConfigurationId: "basic",

  configurations: [
    {
      id: "basic",
      name: "Basic form stepper",
      description: "Simple step indicator",
      code: {
        react: `<GoabFormStepper step={1}>
  <GoabFormStep text="Personal info" />
  <GoabFormStep text="Contact details" />
  <GoabFormStep text="Review" />
</GoabFormStepper>`,
        angular: `<goab-form-stepper [step]="1">
  <goab-form-step text="Personal info"></goab-form-step>
  <goab-form-step text="Contact details"></goab-form-step>
  <goab-form-step text="Review"></goab-form-step>
</goab-form-stepper>`,
        webComponents: `<goa-form-stepper step="1">
  <goa-form-step text="Personal info"></goa-form-step>
  <goa-form-step text="Contact details"></goa-form-step>
  <goa-form-step text="Review"></goa-form-step>
</goa-form-stepper>`,
      },
    },
    {
      id: "middle-step",
      name: "Middle step",
      description: "Stepper showing progress midway",
      code: {
        react: `<GoabFormStepper step={2}>
  <GoabFormStep text="Account" status="complete" />
  <GoabFormStep text="Details" />
  <GoabFormStep text="Confirmation" />
</GoabFormStepper>`,
        angular: `<goab-form-stepper [step]="2">
  <goab-form-step text="Account" status="complete"></goab-form-step>
  <goab-form-step text="Details"></goab-form-step>
  <goab-form-step text="Confirmation"></goab-form-step>
</goab-form-stepper>`,
        webComponents: `<goa-form-stepper step="2">
  <goa-form-step text="Account" status="complete"></goa-form-step>
  <goa-form-step text="Details"></goa-form-step>
  <goa-form-step text="Confirmation"></goa-form-step>
</goa-form-stepper>`,
      },
    },
    {
      id: "completed",
      name: "All completed",
      description: "Stepper at final step",
      code: {
        react: `<GoabFormStepper step={4}>
  <GoabFormStep text="Start" status="complete" />
  <GoabFormStep text="Details" status="complete" />
  <GoabFormStep text="Review" status="complete" />
  <GoabFormStep text="Done" />
</GoabFormStepper>`,
        angular: `<goab-form-stepper [step]="4">
  <goab-form-step text="Start" status="complete"></goab-form-step>
  <goab-form-step text="Details" status="complete"></goab-form-step>
  <goab-form-step text="Review" status="complete"></goab-form-step>
  <goab-form-step text="Done"></goab-form-step>
</goab-form-stepper>`,
        webComponents: `<goa-form-stepper step="4">
  <goa-form-step text="Start" status="complete"></goa-form-step>
  <goa-form-step text="Details" status="complete"></goa-form-step>
  <goa-form-step text="Review" status="complete"></goa-form-step>
  <goa-form-step text="Done"></goa-form-step>
</goa-form-stepper>`,
      },
    },
  ],
};
