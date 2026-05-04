import { Component } from "@angular/core";
import { GoabButton, GoabButtonGroup, GoabModal } from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-bug3654",
  templateUrl: "./bug3654.component.html",
  imports: [GoabButton, GoabButtonGroup, GoabModal],
})
export class Bug3654Component {
  basicOpen = false;
  infoOpen = false;
  successOpen = false;
  importantOpen = false;
  emergencyOpen = false;
}
