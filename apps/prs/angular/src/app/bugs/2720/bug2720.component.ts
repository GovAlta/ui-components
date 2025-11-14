import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  GoabTabs,
  GoabTab,
  GoabBlock,
  GoabText,
  GoabButton,
  GoabLink,
  GoabBadge,
} from "@abgov/angular-components";
import { GoabTabsOnChangeDetail } from "@abgov/ui-components-common";

@Component({
  standalone: true,
  selector: "abgov-bug2720",
  templateUrl: "./bug2720.component.html",
  styleUrls: ["./bug2720.component.css"],
  imports: [
    CommonModule,
    GoabTabs,
    GoabTab,
    GoabBlock,
    GoabText,
    GoabButton,
    GoabLink,
    GoabBadge,
  ],
})
export class Bug2720Component {
  currentTab = 0;
  tabChangeLog: string[] = [];

  handleTabChange(detail: GoabTabsOnChangeDetail) {
    this.currentTab = detail.tab;
    const logEntry = `Tab changed to: ${detail.tab} (${this.getTabName(detail.tab)})`;
    this.tabChangeLog.push(logEntry);
    console.log("Tab change event:", detail);
  }

  getTabName(tabIndex: number): string {
    const tabNames = ["Profile", "Settings", "Help"];
    return tabNames[tabIndex] || `Tab ${tabIndex}`;
  }

  resetTest() {
    this.tabChangeLog = [];
  }

  // Function to programmatically change URL hash
  changeToTab(tabIndex: number) {
    const newHash = `tab-${tabIndex}`;
    window.location.hash = newHash;
    console.log(`Programmatically changed URL to: #${newHash}`);
  }

  // Function to simulate search functionality that switches to first non-empty tab
  simulateSearch() {
    // Simulate finding results in tab 2 (Settings)
    console.log("Search completed - switching to Settings tab (tab 2)");
    this.changeToTab(2);
  }

  trackByIndex(index: number): number {
    return index;
  }
}
