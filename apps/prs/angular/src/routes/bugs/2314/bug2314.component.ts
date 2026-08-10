import { Component } from "@angular/core";
import { GoabButton, GoabText, GoabDivider } from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-icon",
  templateUrl: "./bug2314.component.html",
  imports: [GoabButton, GoabText, GoabDivider],
})
export class Bug2314Component {}
