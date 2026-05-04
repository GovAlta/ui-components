import { Component } from "@angular/core";
import {
  GoabBadge,
  GoabTab,
  GoabTabs,
  GoabText,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-docs-tabs",
  templateUrl: "./tabs.component.html",
  imports: [GoabBadge, GoabTab, GoabTabs, GoabText],
})
export class DocsTabsComponent {}
