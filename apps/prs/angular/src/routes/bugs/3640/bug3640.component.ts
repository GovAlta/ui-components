import { Component } from "@angular/core";
import {
  GoabText,
  GoabWorkSideMenu,
  GoabWorkSideMenuGroup,
  GoabWorkSideMenuItem,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-bug3640",
  templateUrl: "./bug3640.component.html",
  imports: [
    GoabText,
    GoabWorkSideMenu,
    GoabWorkSideMenuGroup,
    GoabWorkSideMenuItem,
  ],
})
export class Bug3640Component {
  open = true;

  onToggle(): void {
    this.open = !this.open;
  }

  onActionClick(): void {
    alert("Action button in primary content clicked");
  }
}
