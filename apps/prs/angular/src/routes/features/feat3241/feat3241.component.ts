import { CommonModule } from "@angular/common";
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
  GoabCheckbox,
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
  GoabTabs,
  GoabText,
  GoabTextArea,
  GoabxAppFooter,
  GoabxAppFooterMetaSection,
  GoabxAppFooterNavSection,
  GoabxBadge,
  GoabxButton,
  GoabxCallout,
  GoabxCheckbox,
  GoabxDrawer,
  GoabxDropdown,
  GoabxDropdownItem,
  GoabxFileUploadCard,
  GoabxFileUploadInput,
  GoabxFilterChip,
  GoabxFormItem,
  GoabxInput,
  GoabxLink,
  GoabxModal,
  GoabxNotification,
  GoabxPagination,
  GoabxRadioGroup,
  GoabxRadioItem,
  GoabxSideMenu,
  GoabxSideMenuGroup,
  GoabxSideMenuHeading,
  GoabxTable,
  GoabxTabs,
  GoabxTextArea,
  GoabDatePicker,
  GoabCalendar,
  GoabxCalendar,
  GoabxDatePicker,
} from "@abgov/angular-components";
import {
  GoabPaginationOnChangeDetail,
  GoabTabsOnChangeDetail,
} from "@abgov/ui-components-common";

@Component({
  standalone: true,
  selector: "abgov-feat3241",
  templateUrl: "./feat3241.component.html",
  imports: [
    CommonModule,
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
    GoabTabs,
    GoabText,
    GoabTextArea,
    GoabxAppFooter,
    GoabxAppFooterMetaSection,
    GoabxAppFooterNavSection,
    GoabxBadge,
    GoabxButton,
    GoabxCalendar,
    GoabxCallout,
    GoabxCheckbox,
    GoabxDatePicker,
    GoabxDrawer,
    GoabxDropdown,
    GoabxDropdownItem,
    GoabxFileUploadCard,
    GoabxFileUploadInput,
    GoabxFilterChip,
    GoabxFormItem,
    GoabxInput,
    GoabxLink,
    GoabxModal,
    GoabxNotification,
    GoabxPagination,
    GoabxRadioGroup,
    GoabxRadioItem,
    GoabxSideMenu,
    GoabxSideMenuGroup,
    GoabxSideMenuHeading,
    GoabxTable,
    GoabxTabs,
    GoabxTextArea,
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
