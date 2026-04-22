import { Component } from "@angular/core";
import {
  GoabButton, GoabButtonGroup, GoabDropdown, GoabDropdownItem,
  GoabFormItem, GoabInput, GoabModal, GoabTextArea,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-docs-modal",
  templateUrl: "./modal.component.html",
  imports: [
    GoabButton, GoabButtonGroup, GoabDropdown, GoabDropdownItem,
    GoabFormItem, GoabInput, GoabModal, GoabTextArea,
  ],
})
export class DocsModalComponent {
  basicOpen = false;
  dismissableOpen = false;
  destructiveOpen = false;
  importantOpen = false;
  infoOpen = false;
  successOpen = false;
  eventOpen = false;
  wideOpen = false;

  addItemOpen = false;
  itemType: string | undefined = "";
  itemName = "";
  itemDescription = "";

  deleteOpen = false;
  navigateOpen = false;
  requireOpen = false;

  openBasic(): void { this.basicOpen = true; }
  closeBasic(): void { this.basicOpen = false; }

  openDismissable(): void { this.dismissableOpen = true; }
  closeDismissable(): void { this.dismissableOpen = false; }

  openDestructive(): void { this.destructiveOpen = true; }
  closeDestructive(): void { this.destructiveOpen = false; }

  openImportant(): void { this.importantOpen = true; }
  closeImportant(): void { this.importantOpen = false; }

  openInfo(): void { this.infoOpen = true; }
  closeInfo(): void { this.infoOpen = false; }

  openSuccess(): void { this.successOpen = true; }
  closeSuccess(): void { this.successOpen = false; }

  openEvent(): void { this.eventOpen = true; }
  closeEvent(): void { this.eventOpen = false; }

  openWide(): void { this.wideOpen = true; }
  closeWide(): void { this.wideOpen = false; }

  toggleAddItemModal(): void { this.addItemOpen = !this.addItemOpen; }
  updateType(event: any): void { this.itemType = event.value; }
  updateName(event: any): void { this.itemName = event.value; }
  updateDescription(event: any): void { this.itemDescription = event.value; }

  toggleDeleteModal(): void { this.deleteOpen = !this.deleteOpen; }

  openNavigate(): void { this.navigateOpen = true; }
  closeNavigate(): void { this.navigateOpen = false; }
  onChangeRoute(): void {
    this.navigateOpen = false;
    console.log("Navigating to new route...");
  }

  toggleRequireModal(): void { this.requireOpen = !this.requireOpen; }
}
