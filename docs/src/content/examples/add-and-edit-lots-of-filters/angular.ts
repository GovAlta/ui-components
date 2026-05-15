import { Component } from "@angular/core";

@Component({
  selector: "app-add-and-edit-lots-of-filters",
  templateUrl: "./angular.html",
})
export class AddAndEditLotsOfFiltersComponent {
  open = false;
  assignedTo = "";
  takenBy = "";

  onClick() {
    this.open = true;
  }

  onClose() {
    this.open = false;
  }

  radioOnChange(event: any) {
    console.log(event);
  }

  onChangeAssignedTo(e: any) {
    this.assignedTo = e.value as string;
  }

  closeDrawer() {
    this.open = false;
  }
}
