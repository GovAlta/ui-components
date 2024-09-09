import { GoabBadge, GoabSideMenu, GoabSideMenuGroup, GoabSideMenuHeading } from "@abgov/angular-components";
import { Component } from "@angular/core";

@Component({
  standalone: true,
  selector: "abgov-sidemenu",
  templateUrl: "./sidemenu.component.html",
  imports: [
    GoabSideMenu,
    GoabSideMenuGroup,
    GoabSideMenuHeading,
    GoabBadge
  ]
})
export class SideMenuComponent {
  constructor() { }
}
