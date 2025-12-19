import { Component } from "@angular/core";

@Component({
  selector: "app-add-another-item-in-a-modal",
  templateUrl: "./angular.html",
})
export class AddAnotherItemInAModalComponent {
  open = false;
  type: string | undefined = "";
  name = "";
  description = "";

  toggleModal() {
    this.open = !this.open;
  }

  updateType(event: any) {
    this.type = event.value;
  }

  updateName(event: any) {
    this.name = event.value;
  }

  updateDescription(event: any) {
    this.description = event.value;
  }
}
