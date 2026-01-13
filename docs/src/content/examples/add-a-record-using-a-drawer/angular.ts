import { Component } from "@angular/core";

@Component({
  selector: "app-add-a-record-using-a-drawer",
  templateUrl: "./angular.html",
})
export class AddARecordUsingADrawerComponent {
  open = false;

  onClick() {
    this.open = true;
  }

  onClose() {
    this.open = false;
  }

  dropdownOnChange(event: any) {
    console.log(event);
  }

  inputOnChange(event: any) {
    console.log(event);
  }

  radioOnChange(event: any) {
    console.log(event);
  }

  dateOnChange(event: any) {
    console.log(event);
  }

  closeDrawer() {
    this.open = false;
  }
}
