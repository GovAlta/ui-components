import { Component } from "@angular/core";
import { GoabRadioGroupOnChangeDetail } from "@abgov/ui-components-common";

@Component({
  selector: "app-ask-a-user-one-question-at-a-time",
  templateUrl: "./angular.html",
  styles: [
    `
      a.back-link::before {
        content: "";
        display: inline-block;
        width: 42px;
        height: 24px;
        vertical-align: middle;
        background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 2 22 22" fill="none" stroke="%230070C4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>')
          center center no-repeat;
      }

      a.back-link:visited::before,
      a.back-link:hover::before {
        background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 2 22 22" fill="none" stroke="%23004f84" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>')
          center center no-repeat;
      }

      a.back-link {
        margin-top: var(--goa-space-m);
      }
    `,
  ],
})
export class AskAUserOneQuestionAtATimeComponent {
  selectedValue = "";

  onSchoolChange(event: GoabRadioGroupOnChangeDetail): void {
    this.selectedValue = event.value as string;
  }
}
