import { Component } from "@angular/core";
import {
  GoabFormStepperOnChangeDetail,
  GoabFormStepStatus,
} from "@abgov/ui-components-common";

@Component({
  selector: "app-set-the-status-of-step-on-a-form-stepper",
  templateUrl: "./angular.html",
})
export class SetTheStatusOfStepOnAFormStepperComponent {
  step = -1;
  status: GoabFormStepStatus[] = ["complete", "complete", "incomplete", "not-started"];

  updateStep(event: GoabFormStepperOnChangeDetail): void {
    this.step = event.step;
  }

  setPage(page: number): void {
    if (page < 1 || page > 4) return;
    this.step = page;
  }
}
