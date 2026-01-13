import { Component } from "@angular/core";

@Component({
  selector: "app-require-user-action-before-continuing",
  templateUrl: "./angular.html",
})
export class RequireUserActionBeforeContinuingComponent {
  open = false;

  toggleModal(): void {
    this.open = !this.open;
  }
}
