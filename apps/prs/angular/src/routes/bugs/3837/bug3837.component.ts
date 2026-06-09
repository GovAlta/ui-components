import { Component } from "@angular/core";
import { GoabTab, GoabTabs, GoabText } from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-bug3837",
  templateUrl: "./bug3837.component.html",
  imports: [GoabTab, GoabTabs, GoabText],
})
export class Bug3837Component {}
