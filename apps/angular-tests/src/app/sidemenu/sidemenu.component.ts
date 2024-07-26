import { GoABBadge, GoABSideMenu, GoABSideMenuGroup, GoABSideMenuHeading } from "@abgov/angular-components";
import { Component } from "@angular/core";

@Component({
  standalone: true,
  selector: "abgov-sidemenu",
  templateUrl: "./sidemenu.component.html",
  imports: [
    GoABSideMenu,
    GoABSideMenuGroup,
    GoABSideMenuHeading,
    GoABBadge
  ]
})
export class SideMenuComponent {
  constructor() { }
}
