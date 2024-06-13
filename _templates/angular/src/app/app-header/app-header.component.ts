import { GoABAppHeader, GoABAppHeaderMenu } from "@abgov/angular-components";
import { Component } from "@angular/core";

@Component({
  standalone: true,
  selector: "abgov-app-header",
  templateUrl: "./app-header.component.html",
  imports: [
    GoABAppHeader,
    GoABAppHeaderMenu,
  ],
})
export class AppHeaderComponent {
  constructor() { }
}
