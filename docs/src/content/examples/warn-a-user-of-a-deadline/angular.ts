import { Component } from "@angular/core";

@Component({
  selector: "app-warn-a-user-of-a-deadline",
  templateUrl: "./angular.html",
})
export class WarnAUserOfADeadlineComponent {
  open = false;

  toggleModal(): void {
    this.open = !this.open;
  }
}
