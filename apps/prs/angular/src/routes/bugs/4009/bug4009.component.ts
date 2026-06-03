import { Component } from "@angular/core";
import {
  GoabBlock,
  GoabCheckbox,
  GoabDivider,
  GoabRadioGroup,
  GoabRadioItem,
  GoabText,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-bug4009",
  templateUrl: "./bug4009.component.html",
  imports: [
    GoabBlock,
    GoabCheckbox,
    GoabDivider,
    GoabRadioGroup,
    GoabRadioItem,
    GoabText,
  ],
})
export class Bug4009Component {}
