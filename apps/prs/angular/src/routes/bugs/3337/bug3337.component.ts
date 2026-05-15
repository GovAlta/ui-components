import { Component } from "@angular/core";
import {
  GoabInput,
  GoabButton,
  GoabFormItem,
  GoabText,
  GoabInputOnBlurDetail,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-bug3337",
  templateUrl: "./bug3337.component.html",
  imports: [GoabInput, GoabButton, GoabText, GoabFormItem],
})
export class Bug3337Component {
  inputValue = "";

  buttonClick() {
    console.log("clicked");
  }

  inputBlur(details: GoabInputOnBlurDetail) {
    this.inputValue = details.value;
  }
}
