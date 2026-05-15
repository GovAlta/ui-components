import { Component } from "@angular/core";
import {
  GoabButton,
  GoabContainer,
  GoabDetails,
  GoabLink,
  GoabText,
  GoabWorkSideMenu,
  GoabWorkSideMenuGroup,
  GoabWorkSideMenuItem,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-bug3279",
  templateUrl: "./bug3279.component.html",
  imports: [
    GoabButton,
    GoabContainer,
    GoabDetails,
    GoabLink,
    GoabText,
    GoabWorkSideMenu,
    GoabWorkSideMenuGroup,
    GoabWorkSideMenuItem,
  ],
})
export class Bug3279Component {
  open = true;

  onToggle(): void {
    this.open = !this.open;
  }

  onActionClick(): void {
    alert("Action button in primary content clicked");
  }
}
