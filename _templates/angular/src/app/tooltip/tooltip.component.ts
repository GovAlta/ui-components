import { GoABIcon, GoABTooltip } from "@abgov/angular-components";
import { Component } from "@angular/core";

@Component({
  standalone: true,
  selector: "abgov-tooltip",
  templateUrl: "./tooltip.component.html",
  imports: [
    GoABTooltip,
    GoABIcon,
  ]
})
export class TooltipComponent {
  randomValue = "Trying some more long form text here to see how it's rendered"
  constructor() { }
}
