import { Component } from "@angular/core";

@Component({
  selector: "app-question-page",
  templateUrl: "./angular.html",
})
export class QuestionPageComponent {
  answer = "";

  onAnswerChange(event: { value: string }): void {
    this.answer = event.value;
  }

  handleContinue(): void {
    console.log("Answer submitted:", this.answer);
  }
}
