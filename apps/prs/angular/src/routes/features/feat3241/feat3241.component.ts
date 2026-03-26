import { Component } from "@angular/core";
import {
  GoabAppFooter,
  GoabAppFooterMetaSection,
  GoabAppFooterNavSection,
  GoabBadge,
  GoabGrid,
  GoabButton,
  GoabButtonGroup,
  GoabCallout,
  GoabCalendar,
  GoabCheckbox,
  GoabDatePicker,
  GoabDrawer,
  GoabDropdown,
  GoabDropdownItem,
  GoabFileUploadCard,
  GoabFileUploadInput,
  GoabFilterChip,
  GoabFormItem,
  GoabInput,
  GoabLink,
  GoabModal,
  GoabNotification,
  GoabPagination,
  GoabRadioGroup,
  GoabRadioItem,
  GoabSideMenu,
  GoabSideMenuGroup,
  GoabSideMenuHeading,
  GoabTab,
  GoabTable,
  GoabTableSortHeader,
  GoabTabs,
  GoabText,
  GoabTextArea,
} from "@abgov/angular-components";
import {
  GoabPaginationOnChangeDetail,
  GoabTabsOnChangeDetail,
  GoabTableOnSortDetail,
} from "@abgov/ui-components-common";

interface User {
  firstName: string;
  lastName: string;
  age: number;
}

@Component({
  standalone: true,
  selector: "abgov-feat3241",
  templateUrl: "./feat3241.component.html",
  imports: [
    GoabAppFooter,
    GoabAppFooterMetaSection,
    GoabAppFooterNavSection,
    GoabBadge,
    GoabGrid,
    GoabButton,
    GoabButtonGroup,
    GoabCalendar,
    GoabCallout,
    GoabCheckbox,
    GoabDatePicker,
    GoabDrawer,
    GoabDropdown,
    GoabDropdownItem,
    GoabFileUploadCard,
    GoabFileUploadInput,
    GoabFilterChip,
    GoabFormItem,
    GoabInput,
    GoabLink,
    GoabModal,
    GoabNotification,
    GoabPagination,
    GoabRadioGroup,
    GoabRadioItem,
    GoabSideMenu,
    GoabSideMenuGroup,
    GoabSideMenuHeading,
    GoabTab,
    GoabTable,
    GoabTableSortHeader,
    GoabTabs,
    GoabText,
    GoabTextArea,
  ],
})
export class Feat3241Component {
  goabxDrawerOpen = false;
  goabDrawerOpen = false;
  goabxModalOpen = false;
  goabModalOpen = false;

  goabxPage = 1;
  goabPage = 1;

  goabxTab = 1;
  goabTab = 1;

  goabxFilterClicks = 0;
  goabFilterClicks = 0;

  goabxNotificationStatus = "No dismiss action yet.";
  goabNotificationStatus = "No dismiss action yet.";

  users: User[] = [];

  constructor() {
    this.users = [
      {
        firstName: "Christian",
        lastName: "Batz",
        age: 18,
      },
      {
        firstName: "Brain",
        lastName: "Wisozk",
        age: 19,
      },
      {
        firstName: "Neha",
        lastName: "Jones",
        age: 23,
      },
      {
        firstName: "Tristin",
        lastName: "Buckridge",
        age: 31,
      },
    ];
  }

  handleSort(event: GoabTableOnSortDetail) {
    const { sortBy, sortDir } = event;
    this.users.sort((a: any, b: any) => (a[sortBy] > b[sortBy] ? 1 : -1) * sortDir);
  }

  openGoabxDrawer() {
    this.goabxDrawerOpen = true;
  }

  closeGoabxDrawer() {
    this.goabxDrawerOpen = false;
  }

  openGoabDrawer() {
    this.goabDrawerOpen = true;
  }

  closeGoabDrawer() {
    this.goabDrawerOpen = false;
  }

  openGoabxModal() {
    this.goabxModalOpen = true;
  }

  closeGoabxModal() {
    this.goabxModalOpen = false;
  }

  openGoabModal() {
    this.goabModalOpen = true;
  }

  closeGoabModal() {
    this.goabModalOpen = false;
  }

  onGoabxPaginationChange(detail: GoabPaginationOnChangeDetail) {
    this.goabxPage = detail.page;
  }

  onGoabPaginationChange(detail: GoabPaginationOnChangeDetail) {
    this.goabPage = detail.page;
  }

  onGoabxTabsChange(detail: GoabTabsOnChangeDetail) {
    this.goabxTab = detail.tab;
  }

  onGoabTabsChange(detail: GoabTabsOnChangeDetail) {
    this.goabTab = detail.tab;
  }

  onGoabxFilterClick() {
    this.goabxFilterClicks += 1;
  }

  onGoabFilterClick() {
    this.goabFilterClicks += 1;
  }

  onGoabxNotificationDismiss() {
    this.goabxNotificationStatus = "Goabx notification dismissed.";
  }

  onGoabNotificationDismiss() {
    this.goabNotificationStatus = "Goab notification dismissed.";
  }
}
