import { useState } from "react";
import {
  GoabButton,
  GoabFormStep,
  GoabFormStepper,
  GoabPages,
  GoabSkeleton,
  GoabSpacer,
} from "@abgov/react-components";

import { GoabFormStepperOnChangeDetail } from "@abgov/ui-components-common";

export function FormStepperWithControlledNavigation() {
  const [step, setStep] = useState(1);

  function setPage(page: number) {
    if (page < 1 || page > 4) return;
    setStep(page);
  }

  return (
    <>
      <GoabFormStepper
        step={step}
        onChange={(event: GoabFormStepperOnChangeDetail) => setStep(event.step)}
      >
        <GoabFormStep text="Personal details" />
        <GoabFormStep text="Employment history" />
        <GoabFormStep text="References" />
        <GoabFormStep text="Review" />
      </GoabFormStepper>

      <GoabPages current={step} mb="3xl" mt="xl" mr="xl" ml="xl">
        <div>
          <GoabSkeleton type="article" />
        </div>
        <div>
          <GoabSkeleton type="header" size="2" />
          <GoabSkeleton type="text" />
          <GoabSkeleton type="header" size="2" />
          <GoabSkeleton type="text" />
        </div>
        <div>
          <GoabSkeleton type="text" />
          <GoabSpacer vSpacing="m" />
          <GoabSkeleton type="text" />
        </div>
        <div>
          <GoabSkeleton type="header" size="2" />
          <GoabSkeleton type="text" />
          <GoabSpacer vSpacing="m" />
          <GoabSkeleton type="text" />
        </div>
      </GoabPages>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <GoabButton type="secondary" onClick={() => setPage(step - 1)}>
          Previous
        </GoabButton>
        <GoabButton type="primary" onClick={() => setPage(step + 1)}>
          Next
        </GoabButton>
      </div>
    </>
  );
}
