import { GoabFormStep, GoabFormStepper } from "@abgov/react-components";

export function DocsFormStepperRoute() {
  return (
    <div>
      <h2>Form stepper</h2>

      <h3>Basic form stepper</h3>
      <GoabFormStepper step={1}>
        <GoabFormStep text="Personal info" />
        <GoabFormStep text="Contact details" />
        <GoabFormStep text="Review" />
      </GoabFormStepper>

      <h3>Middle step</h3>
      <GoabFormStepper step={2}>
        <GoabFormStep text="Account" status="complete" />
        <GoabFormStep text="Details" />
        <GoabFormStep text="Confirmation" />
      </GoabFormStepper>

      <h3>All completed</h3>
      <GoabFormStepper step={4}>
        <GoabFormStep text="Start" status="complete" />
        <GoabFormStep text="Details" status="complete" />
        <GoabFormStep text="Review" status="complete" />
        <GoabFormStep text="Done" />
      </GoabFormStepper>
    </div>
  );
}
