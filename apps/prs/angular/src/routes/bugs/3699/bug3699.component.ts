import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  GoabWorkSideMenu,
  GoabWorkSideMenuItem,
  GoabWorkSideNotificationPanel,
  GoabWorkSideMenuGroup,
  GoabContainer,
  GoabWorkSideNotificationItem,
  GoabButton,
  GoabLink,
  GoabDetails,
} from "@abgov/angular-components";


@Component({
  standalone: true,
  selector: "abgov-bug3699",
  templateUrl: "./bug3699.component.html",
  imports: [CommonModule,
  GoabWorkSideMenu,
  GoabWorkSideMenuItem,
  GoabWorkSideNotificationPanel,
  GoabWorkSideNotificationItem,
  GoabWorkSideMenuGroup,
  GoabContainer,
  GoabButton,
  GoabLink,
  GoabDetails,
],
})
export class Bug3699Component {
  open = true;

  onToggle(): void {
    this.open = !this.open;
  }

  onActionClick(): void {
    alert("Action button in primary content clicked");
  }
}
