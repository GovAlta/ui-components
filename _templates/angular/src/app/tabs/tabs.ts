import { GoABBadge, GoABTab, GoABTabs } from "@abgov/angular-components";
import { Component } from "@angular/core";

@Component({
  standalone: true,
  selector: "abgov-tabs",
  templateUrl: "./tabs.html",
  imports: [
    GoABTab,
    GoABTabs,
    GoABBadge,
  ]
})
export class TabsComponent { }
