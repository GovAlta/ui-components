import { GoabIcon, GoabTooltip } from "@abgov/angular-components";
import { Component } from "@angular/core";

@Component({
  standalone: true,
  selector: "abgov-tooltip",
  templateUrl: "./tooltip.component.html",
  imports: [
    GoabTooltip,
    GoabIcon,
  ]
})
export class TooltipComponent {
  randomValue = "Trying some more long form text here to see how it's rendered"
  constructor() { }
}
