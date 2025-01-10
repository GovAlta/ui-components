import { GoabAppHeader, GoabAppHeaderMenu } from "@abgov/angular-components";
import { Component } from "@angular/core";

@Component({
  standalone: true,
  selector: "abgov-app-header",
  templateUrl: "./app-header.component.html",
  imports: [
    GoabAppHeader,
    GoabAppHeaderMenu,
  ],
})
export class AppHeaderComponent {
  constructor() { }
}
