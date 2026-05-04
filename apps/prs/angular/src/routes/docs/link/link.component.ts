import { Component } from "@angular/core";
import { GoabLink } from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-docs-link",
  templateUrl: "./link.component.html",
  imports: [GoabLink],
})
export class DocsLinkComponent {}
