import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  GoabCheckbox,
  GoabCheckboxList,
  GoabFormItem,
  GoabInput,
  GoabRadioGroup,
  GoabRadioItem,
} from "@abgov/angular-components";


@Component({
  standalone: true,
  selector: "abgov-bug3607",
  templateUrl: "./bug3607.component.html",
  imports: [
    CommonModule,
    GoabCheckbox,
    GoabCheckboxList,
    GoabFormItem,
    GoabInput,
    GoabRadioGroup,
    GoabRadioItem,
  ],
})
export class Bug3607Component {}
