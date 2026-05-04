import { Component } from "@angular/core";
import { GoabDivider, GoabText } from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-docs-divider",
  templateUrl: "./divider.component.html",
  imports: [GoabDivider, GoabText],
})
export class DocsDividerComponent {}
