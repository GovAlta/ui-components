import { GoabBadge, GoabBlock, GoabButton, GoabIcon, GoabInput, GoabSpacer, GoabTextArea } from "@abgov/angular-components";
import { Component } from "@angular/core";

@Component({
  standalone: true,
  selector: "abgov-spacing",
  templateUrl: "./spacing.html",
  imports: [
    GoabInput,
    GoabButton,
    GoabIcon,
    GoabSpacer,
    GoabBlock,
    GoabTextArea,
    GoabBadge,
  ]
})
export class SpacingComponent {
  constructor() { }
}
