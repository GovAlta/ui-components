import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  GoabTabs,
  GoabTab,
  GoabBlock,
  GoabText,
  GoabBadge,
  GoabButton,
  GoabButtonGroup,
  GoabTabsOnChangeDetail,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-feat2611",
  templateUrl: "./feat2611.component.html",
  imports: [
    CommonModule,
    GoabTabs,
    GoabTab,
    GoabBlock,
    GoabText,
    GoabBadge,
    GoabButton,
    GoabButtonGroup,
  ],
})
export class Feat2611Component {
  activeTab = 1;
  dynamicLabel = "Overview";
  dynamicBadge = "3";

  onTabChange(detail: GoabTabsOnChangeDetail) {
    console.log("Tab changed:", detail);
    this.activeTab = detail.tab;
  }

  toggleDynamicLabel(): void {
    this.dynamicLabel =
      this.dynamicLabel === "Overview" ? "Overview with a much longer label" : "Overview";
  }

  toggleDynamicBadge(): void {
    this.dynamicBadge = this.dynamicBadge === "3" ? "Text Based Content" : "3";
  }
}
