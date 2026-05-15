import { Component } from "@angular/core";
import { GoabIcon, GoabTooltip } from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-icon",
  templateUrl: "./bug2152.component.html",
  imports: [GoabIcon, GoabTooltip],
})
export class Bug2152Component {}
