import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  GoabFormItem,
  GoabInput,
  GoabRadioGroup,
  GoabRadioItem,
  GoabxFormItem,
  GoabxInput,
  GoabxRadioGroup,
  GoabxRadioItem,
} from "@abgov/angular-components";


@Component({
  standalone: true,
  selector: "abgov-bug3498",
  templateUrl: "./bug3498.component.html",
  imports: [CommonModule,
  GoabFormItem,
  GoabInput,
  GoabRadioGroup,
  GoabRadioItem,
  GoabxFormItem,
  GoabxInput,
  GoabxRadioGroup,
  GoabxRadioItem,
],
})
export class Bug3498Component {}
