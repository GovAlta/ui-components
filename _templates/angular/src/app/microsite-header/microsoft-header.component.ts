import { GoabMicrositeHeader } from "@abgov/angular-components";
import { Component } from "@angular/core";

@Component({
  standalone: true,
  selector: "abgov-microsite-header",
  templateUrl: "./microsite-header.component.html",
  imports: [
    GoabMicrositeHeader,
  ],
})
export class MicrositeHeaderComponent {
  constructor() { }
}
