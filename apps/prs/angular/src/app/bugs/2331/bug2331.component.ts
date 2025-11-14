import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  GoabBlock,
  GoabButton,
  GoabTabs,
  GoabTab,
  GoabText,
} from "@abgov/angular-components";
import { GoabTabsOnChangeDetail } from "@abgov/ui-components-common";

@Component({
  standalone: true,
  selector: "abgov-bug2331",
  templateUrl: "./bug2331.component.html",
  imports: [CommonModule, GoabBlock, GoabButton, GoabTabs, GoabTab, GoabText],
})
export class Bug2331Component {
  blockContent: string | null = null;
  dynamicTabContent: string | null = null;

  addBlockContent(): void {
    this.blockContent = `Content updated at ${new Date().toLocaleString()}`;
  }

  updateDynamicTabContent(): void {
    this.dynamicTabContent = `Content updated at ${new Date().toLocaleString()}`;
  }

  onTabsChange(detail: GoabTabsOnChangeDetail): void {
    console.log("Tab changed to", detail.tab);
  }
}
