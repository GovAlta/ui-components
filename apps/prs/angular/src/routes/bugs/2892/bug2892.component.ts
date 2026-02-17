import { Component } from "@angular/core";

import { GoabBlock, GoabText, GoabInput, GoabFormItem } from "@abgov/angular-components";
import { GoabInputOnChangeDetail } from "@abgov/ui-components-common";

@Component({
  standalone: true,
  selector: "abgov-bug2892",
  templateUrl: "./bug2892.component.html",
  imports: [GoabBlock, GoabText, GoabInput, GoabFormItem],
})
export class Bug2892Component {
  handleInputChange(detail: GoabInputOnChangeDetail) {
    console.log("Input change:", detail);
  }
}
