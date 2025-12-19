import { Component } from "@angular/core";
import { GoabFormStepperOnChangeDetail } from "@abgov/ui-components-common";

@Component({
  selector: "app-form-stepper-controlled",
  templateUrl: "./angular.html"
})
export class FormStepperControlledComponent {
  step = 1;

  updateStep(event: GoabFormStepperOnChangeDetail): void {
    this.step = event.step;
  }

  setPage(page: number): void {
    if (page < 1 || page > 4) return;
    this.step = page;
  }
}
