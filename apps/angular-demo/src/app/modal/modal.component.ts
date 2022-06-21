import { Component } from '@angular/core';

@Component({
  selector: 'abgov-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  constructor() { }

  transition: "fast" | "slow" | "none" = "fast";

  isOpen = false;
  isOpen2 = false;
  isOpen3 = false;

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

  showModal(transition: "fast" | "slow" | "none") {
    this.transition = transition;
    this.isOpen3 = true;
  }

}
