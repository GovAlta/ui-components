import { Component } from "@angular/core";
import {
  GoabWorkSideMenu,
  GoabWorkSideMenuGroup,
  GoabWorkSideMenuItem,
  GoabWorkSideNotificationItem,
  GoabWorkSideNotificationPanel,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-docs-work-side-menu",
  templateUrl: "./work-side-menu.component.html",
  imports: [
    GoabWorkSideMenu,
    GoabWorkSideMenuGroup,
    GoabWorkSideMenuItem,
    GoabWorkSideNotificationItem,
    GoabWorkSideNotificationPanel,
  ],
})
export class DocsWorkSideMenuComponent {
  handleNavigate(path: string): void {
    console.log("navigate", path);
  }

  handleMarkAllRead(): void {
    console.log("mark all read");
  }

  handleViewAll(): void {
    console.log("view all");
  }

  handleClick(id: string): void {
    console.log("click", id);
  }
}
