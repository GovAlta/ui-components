import { Component } from "@angular/core";
import { GoabMicrositeHeader } from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-docs-microsite-header",
  templateUrl: "./microsite-header.component.html",
  imports: [GoabMicrositeHeader],
})
export class DocsMicrositeHeaderComponent {}
