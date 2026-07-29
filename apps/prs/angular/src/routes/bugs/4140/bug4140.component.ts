import { Component } from "@angular/core";
import {
  GoabBlock,
  GoabCheckbox,
  GoabCheckboxList,
  GoabDivider,
  GoabRadioGroup,
  GoabRadioItem,
  GoabText,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-bug-4140",
  templateUrl: "./bug4140.component.html",
  imports: [
    GoabBlock,
    GoabCheckbox,
    GoabCheckboxList,
    GoabDivider,
    GoabRadioGroup,
    GoabRadioItem,
    GoabText,
  ],
})
export class Bug4140Component {
  payment = "cheque";
  compactPayment = "cheque";
  described = "deposit";
  compactDescribed = "deposit";
  mixed = "cheque";
  wrapping = "deposit";
  wrappingDescribed = "deposit";
  compactWrapping = "deposit";
}
