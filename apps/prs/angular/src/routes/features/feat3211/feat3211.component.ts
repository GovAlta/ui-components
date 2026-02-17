import {
  GoabBlock,
  GoabButton,
  GoabButtonGroup,
  GoabFormItem,
  GoabFormStep,
  GoabFormStepper,
  GoabFormStepperOnChangeDetail,
  GoabFormStepStatus,
  GoabInput,
  GoabPages,
} from "@abgov/angular-components";

import { Component } from "@angular/core";

@Component({
  standalone: true,
  selector: "abgov-feat3211",
  templateUrl: "./feat3211.component.html",
  imports: [
    GoabBlock,
    GoabButton,
    GoabButtonGroup,
    GoabFormItem,
    GoabFormStep,
    GoabFormStepper,
    GoabInput,
    GoabPages,
  ],
})
export class Feat3211Component {
  step = -1;
  status: GoabFormStepStatus[] = ["complete", "complete", "incomplete", "not-started"];

  onChange(detail: GoabFormStepperOnChangeDetail) {
    console.log("Changed");
    this.step = detail.step;
  }

  setPage(page: number) {
    console.log("Page button clicked");
    if (page < 1 || page > 4) return;
    this.step = page;
  }
}
