import { Component } from "@angular/core";
import { GoabTab, GoabTabs } from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-bug3921",
  templateUrl: "./bug3921.component.html",
  imports: [GoabTab, GoabTabs],
})
export class Bug3921Component {}
