import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

import { GoabInput, GoabBlock, GoabFormItem } from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-bug2782",
  templateUrl: "./bug2782.component.html",
  imports: [GoabInput, GoabBlock, GoabFormItem],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Bug2782Component {
  textValue =
    "This is a disabled textarea that should be visible regardless of background color.";
}
