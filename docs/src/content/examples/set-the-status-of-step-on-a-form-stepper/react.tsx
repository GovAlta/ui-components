import { useState } from "react";
import {
  GoabButton,
  GoabFormStep,
  GoabFormStepper,
  GoabPages,
  GoabSkeleton,
  GoabSpacer
} from "@abgov/react-components";
import { GoabFormStepStatus } from "@abgov/ui-components-common";

export function SetTheStatusOfStepOnAFormStepper() {
  const [step, setStep] = useState<number>(-1);
  const status: GoabFormStepStatus[] = [
    "complete",
    "complete",
    "incomplete",
    "not-started"
  ];

  function setPage(page: number) {
    if (page < 1 || page > 4) return;
    setStep(page);
  }

  return (
    <>
      <GoabFormStepper step={step} onChange={(event) => setStep(event.step)}>
        <GoabFormStep text="Personal details" status={status[0]} />
        <GoabFormStep text="Employment history" status={status[1]} />
        <GoabFormStep text="References" status={status[2]} />
        <GoabFormStep text="Review" status={status[3]} />
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
