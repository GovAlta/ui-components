import { Component } from "@angular/core";
import { GoabLinearProgress } from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-docs-linear-progress",
  templateUrl: "./linear-progress.component.html",
  imports: [GoabLinearProgress],
})
export class DocsLinearProgressComponent {}
