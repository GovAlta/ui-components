import { GoabCallout } from "@abgov/angular-components";
import { Component } from "@angular/core";

@Component({
  standalone: true,
  selector: "abgov-callout",
  templateUrl: "./callout.component.html",
  imports: [
    GoabCallout,
  ]
})
export class CalloutComponent {
  constructor() { }
}
