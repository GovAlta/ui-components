import { Component } from "@angular/core";
import {
  GoabButton,
  GoabCallout,
  GoabContainer,
  GoabIcon,
  GoabTooltip,
  GoabText,
  GoabGrid,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-bug3323",
  templateUrl: "./bug3323.component.html",
  imports: [
    GoabButton,
    GoabCallout,
    GoabContainer,
    GoabIcon,
    GoabTooltip,
    GoabText,
    GoabGrid,
  ],
})
export class Bug3323Component {
  readonly supportsCssAnchorPositioning =
    typeof CSS !== "undefined" &&
    typeof CSS.supports === "function" &&
    CSS.supports("anchor-name: --goa-tooltip-target");
}
