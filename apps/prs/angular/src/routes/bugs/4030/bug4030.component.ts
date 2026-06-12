import { Component } from "@angular/core";
import { GoabAppFooter, GoabText } from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-bug4030",
  templateUrl: "./bug4030.component.html",
  imports: [GoabAppFooter, GoabText],
})
export class Bug4030Component {}
