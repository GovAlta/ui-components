import { Component } from "@angular/core";

import { GoabFormStepper, GoabFormStep } from "@abgov/angular-components";
import { GoabFormStepperOnChangeDetail } from "@abgov/ui-components-common";

@Component({
  standalone: true,
  selector: "abgov-bug2922",
  templateUrl: "./bug2922.component.html",
  imports: [GoabFormStepper, GoabFormStep],
})
export class Bug2922Component {
  currentStep = 1;

  handleStepperChange(detail: GoabFormStepperOnChangeDetail) {
    console.log("Form stepper change:", detail);
    this.currentStep = detail.step;
  }
}
