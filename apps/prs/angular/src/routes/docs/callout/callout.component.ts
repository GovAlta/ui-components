import { Component } from "@angular/core";
import {
  GoabButton, GoabButtonGroup, GoabCallout, GoabModal, GoabText,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-docs-callout",
  templateUrl: "./callout.component.html",
  imports: [GoabButton, GoabButtonGroup, GoabCallout, GoabModal, GoabText],
})
export class DocsCalloutComponent {
  deadlineOpen = false;

  toggleDeadlineModal(): void {
    this.deadlineOpen = !this.deadlineOpen;
  }
}
