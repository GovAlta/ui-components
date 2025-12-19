import { Component } from "@angular/core";
import type { GoabBadgeType } from "@abgov/ui-components-common";

interface BadgeValue {
  type: GoabBadgeType;
  content: string;
}

@Component({
  selector: "app-show-status-in-a-table",
  templateUrl: "./angular.html",
})
export class ShowStatusInATableComponent {
  badgeValues: BadgeValue[] = [
    { type: "important", content: "Pending" },
    { type: "emergency", content: "Failed" },
    { type: "success", content: "Complete" },
    { type: "information", content: "In progress" },
    { type: "midtone", content: "Closed" },
    { type: "success", content: "Complete" },
  ];

  onClick(): void {
    console.log("clicked");
  }
}
