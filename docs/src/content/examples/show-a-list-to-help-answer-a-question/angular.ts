import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-show-a-list-to-help-answer-a-question",
  templateUrl: "./angular.html"
})
export class ShowAListToHelpAnswerAQuestionComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      additional: [""]
    });
  }

  onRadioChange(event: Event): void {
    const detail = (event as CustomEvent).detail;
    console.log("value is", detail.value);
  }
}
