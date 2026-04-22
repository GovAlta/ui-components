import { Component } from "@angular/core";
import {
  GoabSideMenu,
  GoabSideMenuGroup,
  GoabSideMenuHeading,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-docs-side-menu",
  templateUrl: "./side-menu.component.html",
  imports: [GoabSideMenu, GoabSideMenuGroup, GoabSideMenuHeading],
})
export class DocsSideMenuComponent {}
