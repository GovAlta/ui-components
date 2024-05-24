import { GoABDivider } from "@abgov/angular-components";
import { Component } from "@angular/core";

@Component({
  standalone: true,
  selector: "abgov-divider",
  templateUrl: "./divider.component.html",
  imports: [
    GoABDivider,
  ]
})
export class DividerComponent {
  constructor() { }
}
