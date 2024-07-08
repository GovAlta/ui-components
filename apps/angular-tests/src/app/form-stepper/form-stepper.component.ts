import { GoABButton, GoABFormStep, GoABFormStepper, GoABPages } from "@abgov/angular-components";
import { GoABFormStepStatus, GoABFormStepperOnChangeDetail, GoABFormStepperType } from "@abgov/ui-components-common";
import { Component } from "@angular/core";

@Component({
  standalone: true,
  selector: "abgov-form-stepper",
  templateUrl: "./form-stepper.component.html",
  imports: [
    GoABFormStepper,
    GoABFormStep,
    GoABPages,
    GoABButton,
  ]
})
export class FormStepperComponent {
  freeStep = -1
  constrainedStep = 1;

  // controlled by the user based on form completion
  status: GoABFormStepStatus[] = ["complete", "complete", "incomplete"];

  updateFreeStep(event: GoABFormStepperOnChangeDetail) {
    console.log(event)
    this.freeStep = event.step;
  }

  setFreePage(page: number) {
    console.log("setting page..", page)
    if (page < 1 || page > 4) return;
    this.freeStep = page;
  }

  updateConstrainedStep(event: GoABFormStepperOnChangeDetail) {
    console.log(event)
    this.constrainedStep = event.step;
  }

  setConstrainedPage(page: number) {
    console.log("setting page..", page)
    if (page < 1 || page > 4) return;
    this.constrainedStep = page;
  }
}
