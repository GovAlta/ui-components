import { Component } from "@angular/core";
import { GoabCallout, GoabTooltip, GoabText } from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-bug3248",
  templateUrl: "./bug3323.component.html",
  imports: [GoabCallout, GoabTooltip, GoabText],
})
export class Bug3323Component {}
