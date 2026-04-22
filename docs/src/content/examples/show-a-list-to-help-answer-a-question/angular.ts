import { Component } from "@angular/core";
import type { GoabRadioGroupOnChangeDetail } from "@abgov/ui-components-common";

@Component({
  selector: "app-show-a-list-to-help-answer-a-question",
  templateUrl: "./angular.html",
})
export class ShowAListToHelpAnswerAQuestionComponent {
  onRadioChange(event: GoabRadioGroupOnChangeDetail): void {
    console.log("value is", event.value);
  }
}
