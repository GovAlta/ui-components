import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { GoabTab, GoabxTabs } from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-feat2885-navigation-tabs",
  templateUrl: "./feat2885-navigation-tabs.component.html",
  imports: [GoabTab, GoabxTabs],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Feat2885NavigationTabsComponent {
  onTabChange(event: Event) {
    const detail = (event as CustomEvent).detail;
    console.log("Tab changed:", detail);
  }
}
