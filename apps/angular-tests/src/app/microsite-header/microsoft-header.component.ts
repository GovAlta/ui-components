import { GoABMicrositeHeader } from "@abgov/angular-components";
import { Component } from "@angular/core";

@Component({
  standalone: true,
  selector: "abgov-microsite-header",
  templateUrl: "./microsite-header.component.html",
  imports: [
    GoABMicrositeHeader,
  ],
})
export class MicrositeHeaderComponent {
  constructor() { }
}
