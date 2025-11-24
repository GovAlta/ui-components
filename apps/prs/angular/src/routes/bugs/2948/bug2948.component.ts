import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  GoabModal,
  GoabButton,
  GoabButtonGroup,
  GoabBlock,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-bug2948",
  templateUrl: "./bug2948.component.html",
  imports: [CommonModule, GoabModal, GoabButton, GoabButtonGroup, GoabBlock],
})
export class Bug2948Component {
  // Modal 1: String heading
  modal1Open = false;

  // Modal 2: ng-template heading and content
  modal2Open = false;

  // Modal 3: Empty heading and actions
  modal3Open = false;

  // Modal 4: ng-template heading and actions with ButtonGroup
  modal4Open = false;

  openModal1() {
    this.modal1Open = true;
  }

  openModal2() {
    this.modal2Open = true;
  }

  openModal3() {
    this.modal3Open = true;
  }

  openModal4() {
    this.modal4Open = true;
  }

  closeModal1() {
    this.modal1Open = false;
  }

  closeModal2() {
    this.modal2Open = false;
  }

  closeModal3() {
    this.modal3Open = false;
  }

  closeModal4() {
    this.modal4Open = false;
  }
}
