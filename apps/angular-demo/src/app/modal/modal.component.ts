import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "abgov-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.css"],
})
export class ModalComponent {
  constructor(private router: Router) {}

  transition: "fast" | "slow" | "none" = "fast";

  calloutVariant:
    | "information"
    | "important"
    | "success"
    | "emergency"
    | "event" = "information";

  isOpen = false;
  isOpen2 = false;
  isOpen3 = false;
  isOpen4 = false;
  isOpen5 = false;

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }

  openModal2() {
    this.isOpen2 = true;
  }

  closeModal2() {
    this.isOpen2 = false;
  }

  closeModal3() {
    this.isOpen3 = false;
  }

  closeModal4() {
    this.isOpen4 = false;
    setTimeout(() => this.router.navigate(["/input"]), 0);
  }

  closeModal5() {
    this.isOpen5 = false;
  }

  showModal(transition: "fast" | "slow" | "none") {
    this.transition = transition;
    this.isOpen3 = true;
  }

  showCalloutModal(
    calloutVariant:
      | "information"
      | "important"
      | "success"
      | "emergency"
      | "event"
  ) {
    this.calloutVariant = calloutVariant;
    this.isOpen5 = true;
  }
}
