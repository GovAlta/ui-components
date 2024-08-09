import { GoABCallout } from "@abgov/angular-components";
import { Component } from "@angular/core";

@Component({
  standalone: true,
  selector: "abgov-callout",
  templateUrl: "./callout.component.html",
  imports: [
    GoABCallout,
  ]
})
export class CalloutComponent {
  constructor() { }
}
