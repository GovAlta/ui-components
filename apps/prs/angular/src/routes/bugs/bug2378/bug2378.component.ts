import { Component } from "@angular/core";
import { GoabAccordion, GoabDetails, GoabText } from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-bug2378",
  templateUrl: "./bug2378.component.html",
  imports: [GoabAccordion, GoabDetails, GoabText],
})
export class Bug2378Component {}
