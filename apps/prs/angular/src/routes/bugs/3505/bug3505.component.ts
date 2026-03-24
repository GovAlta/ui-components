import { Component } from "@angular/core";
import { GoabBlock, GoabLink, GoabText } from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-bug3505",
  templateUrl: "./bug3505.component.html",
  imports: [GoabBlock, GoabLink, GoabText],
})
export class Bug3505Component {}