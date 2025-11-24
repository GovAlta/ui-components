import React, { useState } from "react";
import { GoabFormStepper, GoabFormStep } from "@abgov/react-components";
import { GoabFormStepperOnChangeDetail } from "@abgov/ui-components-common";

export function Bug2922Route() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleStepperChange = (detail: GoabFormStepperOnChangeDetail) => {
    console.log("Form stepper change:", detail);
    setCurrentStep(detail.step);
  };

  return (
    <main>
      <h1>Bug #2922: Form Stepper Test</h1>

      <p>
        This test demonstrates GoabFormStepper components with 5 GoabFormStep components
        each.
      </p>

      {/* Constrained width stepper (500px) */}
      <div style={{ width: "500px", marginBottom: "2rem", border: "1px solid #000" }}>
        <h2>Constrained Width Stepper (500px)</h2>
        <GoabFormStepper step={currentStep} onChange={handleStepperChange}>
          <GoabFormStep text="Step 1" />
          <GoabFormStep text="Step 2" />
          <GoabFormStep text="Step 3" />
          <GoabFormStep text="Step 4" />
          <GoabFormStep text="Step 5" />
        </GoabFormStepper>
      </div>

      {/* Full width stepper */}
      <h2>Full Width Stepper</h2>
      <GoabFormStepper step={currentStep} onChange={handleStepperChange}>
        <GoabFormStep text="Step 1" />
        <GoabFormStep text="Step 2" />
        <GoabFormStep text="Step 3" />
        <GoabFormStep text="Step 4" />
        <GoabFormStep text="Step 5" />
      </GoabFormStepper>
    </main>
  );
}
