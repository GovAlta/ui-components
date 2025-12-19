import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-ask-a-long-answer-question",
  templateUrl: "./angular.html",
})
export class AskALongAnswerQuestionComponent {
  form!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      program: [""],
    });
  }
}
