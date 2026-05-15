import { Component } from "@angular/core";

import { GoabFormItem, GoabInput } from "@abgov/angular-components";
import { GoabInputOnChangeDetail } from "@abgov/ui-components-common";

@Component({
  standalone: true,
  selector: "abgov-bug2991",
  templateUrl: "./bug2991.component.html",
  styleUrls: ["./bug2991.component.css"],
  imports: [GoabFormItem, GoabInput],
})
export class Bug2991Component {
  validationError?: string;

  onValidatedChange(detail: GoabInputOnChangeDetail) {
    const clean = detail.value?.toString().trim() ?? "";
    this.validationError = /^\d{3}$/.test(clean) ? undefined : "Enter a three digit code";
  }
}
