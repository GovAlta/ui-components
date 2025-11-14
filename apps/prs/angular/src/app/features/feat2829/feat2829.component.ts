import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  GoabButton,
  GoabModal,
  GoabText,
  GoabInput,
  GoabFormItem,
  GoabBlock,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-feat2829",
  templateUrl: "./feat2829.component.html",
  imports: [
    CommonModule,
    GoabButton,
    GoabModal,
    GoabText,
    GoabInput,
    GoabFormItem,
    GoabBlock,
  ],
})
export class Feat2829Component {
  isModalOpen = false;
  isAlertModalOpen = false;

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  openAlertModal(): void {
    this.isAlertModalOpen = true;
  }

  closeAlertModal(): void {
    this.isAlertModalOpen = false;
  }
}
