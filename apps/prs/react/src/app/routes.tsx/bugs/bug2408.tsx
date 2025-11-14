import { useState } from "react";
import {
  GoabFormStepper,
  GoabFormStep,
  GoabBlock,
  GoabText,
  GoabButton,
} from "@abgov/react-components";
import { GoabFormStepperOnChangeDetail } from "@abgov/ui-components-common";

export const Bug2408Route = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleStepChange = (details: GoabFormStepperOnChangeDetail) => {
    console.log("Step changed:", details);
    setCurrentStep(details.step);
  };

  return (
    <main>
      <GoabText tag="h1">Bug 2408: Form Stepper "Incomplete" Status Fix</GoabText>
      <GoabText tag="p">
        Testing the fix for Form Stepper where "incomplete" status was being rendered as
        "Partially complete" instead of "Incomplete".
      </GoabText>

      <GoabBlock gap="l" direction="column">
        <section>
          <GoabText tag="h2">Form Stepper with Different Status Types</GoabText>
          <GoabText tag="p">
            This demonstrates the corrected status display for each step status type.
          </GoabText>

          <GoabFormStepper step={currentStep} onChange={handleStepChange}>
            <GoabFormStep text="Personal Information" status="complete" />
            <GoabFormStep text="Employment History" status="incomplete" />
            <GoabFormStep text="Education Details" status="not-started" />
            <GoabFormStep text="Review & Submit" status="not-started" />
          </GoabFormStepper>
        </section>

        <section>
          <GoabText tag="h2">Status Test Controls</GoabText>
          <GoabText tag="p">
            Use these buttons to test different step combinations:
          </GoabText>

          <GoabBlock gap="s" direction="row">
            <GoabButton type="secondary" size="compact" onClick={() => setCurrentStep(1)}>
              Step 1 (Complete)
            </GoabButton>
            <GoabButton type="secondary" size="compact" onClick={() => setCurrentStep(2)}>
              Step 2 (Incomplete)
            </GoabButton>
            <GoabButton type="secondary" size="compact" onClick={() => setCurrentStep(3)}>
              Step 3 (Not Started)
            </GoabButton>
            <GoabButton type="secondary" size="compact" onClick={() => setCurrentStep(4)}>
              Step 4 (Not Started)
            </GoabButton>
          </GoabBlock>
        </section>

        <section>
          <GoabText tag="h2">Test Results</GoabText>
          <GoabBlock gap="s" direction="column">
            <GoabText tag="p">
              <strong>Current Step:</strong> {currentStep}
            </GoabText>
            <GoabText tag="p">
              <strong>Expected Status Display:</strong>
            </GoabText>
            <ul>
              <li>
                Step 1: <strong>Complete</strong> (green checkmark)
              </li>
              <li>
                Step 2: <strong>Incomplete</strong> (red X - was previously showing
                "Partially complete")
              </li>
              <li>
                Step 3: <strong>Not Started</strong> (gray circle - new status type)
              </li>
              <li>
                Step 4: <strong>Not Started</strong> (gray circle - new status type)
              </li>
            </ul>
          </GoabBlock>
        </section>

        <section>
          <GoabText tag="h2">Bug Description</GoabText>
          <GoabBlock gap="s" direction="column">
            <GoabText tag="p">
              <strong>Issue:</strong> The "incomplete" status was being incorrectly
              rendered as "Partially complete" in the Form Stepper component.
            </GoabText>
            <GoabText tag="p">
              <strong>Fix:</strong> Updated the status display logic to properly show
              "Incomplete" for the "incomplete" status.
            </GoabText>
            <GoabText tag="p">
              <strong>Additional:</strong> Added new "not-started" status option to
              replace "unstarted" for better clarity.
            </GoabText>
          </GoabBlock>
        </section>

        <section>
          <GoabText tag="h2">Accessibility Testing</GoabText>
          <GoabText tag="p">
            Screen readers should announce steps in the format: "Step X of Y, Step name:
            [Name], Status: [Status]"
          </GoabText>
          <GoabText tag="p">
            When clicking step navigation buttons, the screen reader should announce the
            step change immediately.
          </GoabText>
        </section>
      </GoabBlock>
    </main>
  );
};
