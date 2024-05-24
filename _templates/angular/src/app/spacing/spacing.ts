import { GoABBadge, GoABBlock, GoABButton, GoABIcon, GoABInput, GoABSpacer, GoABTextArea } from "@abgov/angular-components";
import { Component } from "@angular/core";

@Component({
  standalone: true,
  selector: "abgov-spacing",
  templateUrl: "./spacing.html",
  imports: [
    GoABInput,
    GoABButton,
    GoABIcon,
    GoABSpacer,
    GoABBlock,
    GoABTextArea,
    GoABBadge,
  ]
})
export class SpacingComponent {
  constructor() { }
}
