import { Component } from "@angular/core";
import {
  GoabInput,
  GoabFormItem,
  GoabText,
  GoabInputOnBlurDetail,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-bug3635",
  templateUrl: "./bug3635.component.html",
  imports: [GoabInput, GoabText, GoabFormItem],
})
export class Bug3635Component {
  inputValue = "";

  inputBlur(details: GoabInputOnBlurDetail) {
    this.inputValue = details.value;
  }
}
