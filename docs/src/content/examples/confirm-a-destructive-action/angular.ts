import { Component } from "@angular/core";

@Component({
  selector: "app-confirm-a-destructive-action",
  templateUrl: "./angular.html",
})
export class ConfirmADestructiveActionComponent {
  open = false;

  toggleModal(): void {
    this.open = !this.open;
  }
}
