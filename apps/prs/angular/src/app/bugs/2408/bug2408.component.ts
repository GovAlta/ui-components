import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  GoabFormStepper,
  GoabFormStep,
  GoabBlock,
  GoabText,
  GoabButton,
  GoabFormStepperOnChangeDetail,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-bug2408",
  templateUrl: "./bug2408.component.html",
  imports: [CommonModule, GoabFormStepper, GoabFormStep, GoabBlock, GoabText, GoabButton],
})
export class Bug2408Component {
  currentStep = 1;

  handleStepChange(details: GoabFormStepperOnChangeDetail) {
    console.log("Step changed:", details);
    this.currentStep = details.step;
  }

  setStep(step: number) {
    this.currentStep = step;
  }
}
