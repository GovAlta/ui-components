import { CommonModule, NgFor } from "@angular/common";
import { Component } from "@angular/core";
import {
  GoabBlock,
  GoabButton,
  GoabDropdown,
  GoabDropdownItem,
  GoabFormItem,
  GoabGrid,
  GoabMenuAction,
  GoabMenuButton,
  GoabText,
} from "@abgov/angular-components";
import {
  GoabDropdownOnChangeDetail,
  GoabIconType,
  GoabMenuButtonOnActionDetail,
} from "@abgov/ui-components-common";

type MenuScenarioAction = {
  text: string;
  action: string;
  icon?: GoabIconType;
};

@Component({
  standalone: true,
  selector: "abgov-feat3102",
  templateUrl: "./feat3102.component.html",
  styleUrls: ["./feat3102.component.css"],
  imports: [
    CommonModule,
    NgFor,
    GoabBlock,
    GoabButton,
    GoabDropdown,
    GoabDropdownItem,
    GoabFormItem,
    GoabGrid,
    GoabMenuAction,
    GoabMenuButton,
    GoabText,
  ],
})
export class Feat3102Component {
  protected readonly baselineActions: MenuScenarioAction[] = [
    { text: "View profile", action: "profile", icon: "person-circle" },
    { text: "Notification settings", action: "notifications", icon: "notifications" },
    { text: "Sign out", action: "sign-out", icon: "log-out" },
  ];

  protected readonly teamActions: MenuScenarioAction[] = [
    { text: "Add collaborator", action: "add-collaborator", icon: "person-add" },
    {
      text: "Transfer ownership across",
      action: "transfer-ownership",
      icon: "swap-horizontal",
    },
    { text: "Deactivate access", action: "deactivate-access", icon: "shield" },
  ];

  protected readonly longLabelActions: MenuScenarioAction[] = [
    {
      text: "Download the comprehensive quarterly analytics package for executive review",
      action: "download-analytics",
      icon: "download",
    },
    {
      text: "Request account access for a new departmental collaborator with limited permissions",
      action: "request-access",
      icon: "person-circle",
    },
    {
      text: "Archive this program and remove it from the active reporting dashboards immediately",
      action: "archive-program",
      icon: "archive",
    },
  ];

  protected readonly dropdownOptions: MenuScenarioAction[] = [
    {
      text: "Municipal program summary with quarterly commitments (preferred)",
      action: "municipal-program-summary",
    },
    {
      text: "Community housing revitalization initiative for northern regions",
      action: "community-housing-revitalization",
    },
    {
      text: "Provincial collaboration and engagement framework for stakeholders",
      action: "engagement-framework",
    },
  ];

  protected leadingIconEnabled = true;
  protected readonly defaultLeadingIcon: GoabIconType = "calendar";
  protected readonly dropdownWidth = "420px";
  protected lastActionDetail: GoabMenuButtonOnActionDetail | undefined;
  protected dropdownSelection?: string;

  protected get currentLeadingIcon(): GoabIconType | undefined {
    return this.leadingIconEnabled ? this.defaultLeadingIcon : undefined;
  }

  protected toggleLeadingIcon(): void {
    this.leadingIconEnabled = !this.leadingIconEnabled;
  }

  protected handleAction(detail: GoabMenuButtonOnActionDetail): void {
    this.lastActionDetail = detail;
  }

  protected clearLog(): void {
    this.lastActionDetail = undefined;
  }

  protected onDropdownChange(detail: GoabDropdownOnChangeDetail): void {
    this.dropdownSelection = detail.value ?? detail.values?.join(", ");
  }
}
