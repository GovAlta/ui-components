import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  GoabInput,
  GoabInputNumber,
  GoabBlock,
  GoabText,
  GoabFormItem,
  GoabInputOnChangeDetail,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-feat2722",
  templateUrl: "./feat2722.component.html",
  imports: [CommonModule, GoabInput, GoabInputNumber, GoabBlock, GoabText, GoabFormItem],
})
export class Feat2722Component {
  textValue = "Sample text input";
  numberValue: number | null = 12345.67;
  currencyValue: number | null = 99.99;
  percentageValue: number | null = 85.5;

  onTextChange(details: GoabInputOnChangeDetail) {
    console.log("Text changed:", details);
    this.textValue = details.value;
  }

  onNumberChange(details: GoabInputOnChangeDetail) {
    console.log("Number changed:", details);
    this.numberValue = +details.value;
  }

  onCurrencyChange(details: GoabInputOnChangeDetail) {
    console.log("Currency changed:", details);
    this.currencyValue = +details.value;
  }

  onPercentageChange(details: GoabInputOnChangeDetail) {
    console.log("Percentage changed:", details);
    this.percentageValue = +details.value;
  }
}
