import { Component } from "@angular/core";
import {
  GoabBlock,
  GoabButton,
  GoabButtonGroup,
  GoabDetails,
  GoabDivider,
  GoabLink,
  GoabModal,
  GoabText,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-bug2710",
  templateUrl: "./bug2710.component.html",
  imports: [
    GoabBlock,
    GoabButton,
    GoabButtonGroup,
    GoabDetails,
    GoabDivider,
    GoabLink,
    GoabModal,
    GoabText,
  ],
})
export class Bug2710Component {
  open = false;
  filler = Array.from({ length: 60 }, (_, i) => i + 1);

  openModal() {
    this.open = true;
  }

  closeModal() {
    this.open = false;
  }
}
