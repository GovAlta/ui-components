import { GoabBadge, GoabTab, GoabTabs } from "@abgov/angular-components";
import { Component } from "@angular/core";

@Component({
  standalone: true,
  selector: "abgov-tabs",
  templateUrl: "./tabs.html",
  imports: [
    GoabTab,
    GoabTabs,
    GoabBadge,
  ]
})
export class TabsComponent { }
