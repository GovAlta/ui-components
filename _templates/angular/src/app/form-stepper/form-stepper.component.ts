import { GoabButton, GoabFormStep, GoabFormStepper, GoabPages } from "@abgov/angular-components";
import { GoabFormStepStatus, GoabFormStepperOnChangeDetail, GoabFormStepperType } from "@abgov/ui-components-common";
import { Component } from "@angular/core";

@Component({
  standalone: true,
  selector: "abgov-form-stepper",
  templateUrl: "./form-stepper.component.html",
  imports: [
    GoabFormStepper,
    GoabFormStep,
    GoabPages,
    GoabButton,
  ]
})
export class FormStepperComponent {
  freeStep = -1
  constrainedStep = 1;

  // controlled by the user based on form completion
  status: GoabFormStepStatus[] = ["complete", "complete", "incomplete"];

  updateFreeStep(event: GoabFormStepperOnChangeDetail) {
    console.log(event)
    this.freeStep = event.step;
  }

  setFreePage(page: number) {
    console.log("setting page..", page)
    if (page < 1 || page > 4) return;
    this.freeStep = page;
  }

  updateConstrainedStep(event: GoabFormStepperOnChangeDetail) {
    console.log(event)
    this.constrainedStep = event.step;
  }

  setConstrainedPage(page: number) {
    console.log("setting page..", page)
    if (page < 1 || page > 4) return;
    this.constrainedStep = page;
  }
}
