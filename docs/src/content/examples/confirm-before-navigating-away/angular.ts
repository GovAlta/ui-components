import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-confirm-before-navigating-away",
  templateUrl: "./angular.html",
})
export class ConfirmBeforeNavigatingAwayComponent {
  open = false;

  constructor(private router: Router) {}

  onOpen(): void {
    this.open = true;
  }

  onClose(): void {
    this.open = false;
  }

  onChangeRoute(): void {
    this.open = false;
    // setTimeout will allow any modal transitions to be run
    setTimeout(() => this.router.navigate(["/components"]), 0);
  }
}
