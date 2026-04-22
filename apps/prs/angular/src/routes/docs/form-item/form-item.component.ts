import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GoabFormItem, GoabInput } from "@abgov/angular-components";
import type { GoabInputOnChangeDetail } from "@abgov/ui-components-common";

@Component({
  standalone: true,
  selector: "abgov-docs-form-item",
  templateUrl: "./form-item.component.html",
  imports: [CommonModule, GoabFormItem, GoabInput],
})
export class DocsFormItemComponent {
  firstName = "";

  handleChange(event: GoabInputOnChangeDetail): void {
    this.firstName = event.value;
  }
}
