import { GoabDivider } from "@abgov/angular-components";
import { Component } from "@angular/core";

@Component({
  standalone: true,
  selector: "abgov-divider",
  templateUrl: "./divider.component.html",
  imports: [
    GoabDivider,
  ]
})
export class DividerComponent {
  constructor() { }
}
