import { Component } from "@angular/core";

@Component({
  selector: "app-show-more-info-to-help-answer-question",
  templateUrl: "./angular.html",
  styles: [
    `
      .back-link::before {
        content: "";
        display: inline-block;
        width: 42px;
        height: 24px;
        vertical-align: middle;
        background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 2 22 22" fill="none" stroke="%230070C4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>')
          center center no-repeat;
      }
      .back-link:visited::before,
      .back-link:hover::before {
        background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 2 22 22" fill="none" stroke="%23004f84" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>')
          center center no-repeat;
      }
      .back-link {
        margin-top: var(--goa-space-m);
      }
    `,
  ],
})
export class ShowMoreInfoToHelpAnswerQuestionComponent {
  onRadioChange(event: Event): void {
    console.log("Radio changed:", event);
  }
}
