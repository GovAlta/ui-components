import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  GoabBlock,
  GoabText,
  GoabInput,
  GoabInputNumber,
} from "@abgov/angular-components";
import { GoabInputOnChangeDetail } from "@abgov/ui-components-common";

@Component({
  standalone: true,
  selector: "abgov-bug2837",
  templateUrl: "./bug2837.component.html",
  imports: [CommonModule, GoabBlock, GoabText, GoabInput, GoabInputNumber],
})
export class Bug2837Component {
  handleInputChange(detail: GoabInputOnChangeDetail) {
    console.log("Input change:", detail);
  }

  handleNumberInputChange(detail: GoabInputOnChangeDetail) {
    console.log("Number input change:", detail);
  }
}
