import { Component } from "@angular/core";
import { GoabTab, GoabTabs, GoabText } from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-bug3665",
  templateUrl: "./bug3665.component.html",
  imports: [GoabTab, GoabTabs, GoabText],
})
export class Bug3665Component {}
