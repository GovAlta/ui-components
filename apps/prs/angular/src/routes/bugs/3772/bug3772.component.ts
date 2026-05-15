import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  GoabBlock,
  GoabFormItem,
  GoabFormItemSlot,
  GoabInput,
  GoabText,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-bug3772",
  templateUrl: "./bug3772.component.html",
  imports: [
    CommonModule,
    GoabBlock,
    GoabFormItem,
    GoabFormItemSlot,
    GoabInput,
    GoabText,
  ],
})
export class Bug3772Component {}
