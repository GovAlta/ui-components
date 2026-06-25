import { Component } from "@angular/core";
import { GoabButton, GoabButtonGroup, GoabText, GoabDivider } from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-bug3986",
  templateUrl: "./bug3986.component.html",
  imports: [GoabButton, GoabButtonGroup, GoabText, GoabDivider],
})
export class Bug3986Component {}
