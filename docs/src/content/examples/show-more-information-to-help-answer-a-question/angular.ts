import { Component } from "@angular/core";
import type { GoabRadioGroupOnChangeDetail } from "@abgov/ui-components-common";

@Component({
  selector: "app-show-more-info-to-help-answer-question",
  templateUrl: "./angular.html",
})
export class ShowMoreInfoToHelpAnswerQuestionComponent {
  onRadioChange(event: GoabRadioGroupOnChangeDetail): void {
    console.log("Radio changed:", event.value);
  }
}
