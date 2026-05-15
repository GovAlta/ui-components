import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { GoabSideMenu, GoabSideMenuGroup } from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-bug3273-2",
  templateUrl: "./bug3273-2.component.html",
  imports: [CommonModule, RouterLink, GoabSideMenu, GoabSideMenuGroup],
})
export class Bug32732Component {}
