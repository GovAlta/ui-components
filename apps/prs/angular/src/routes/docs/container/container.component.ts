import { Component, inject } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import {
  GoabContainer, GoabBadge, GoabGrid, GoabLink, GoabText, GoabBlock, GoabButton,
  GoabModal, GoabButtonGroup, GoabFormItem, GoabDatePicker, GoabTable,
  GoabRadioGroup, GoabRadioItem, GoabDropdown, GoabDropdownItem, GoabTextArea, GoabTooltip,
  GoabInput, GoabFilterChip,
} from "@abgov/angular-components";
import { GoabDatePickerOnChangeDetail, GoabInputOnChangeDetail, GoabInputOnKeyPressDetail } from "@abgov/ui-components-common";

@Component({
  standalone: true,
  selector: "abgov-docs-container",
  templateUrl: "./container.component.html",
  styleUrls: ["./container.component.css"],
  imports: [
    GoabContainer, GoabBadge, GoabGrid, GoabLink, GoabText, GoabBlock, GoabButton,
    GoabModal, GoabButtonGroup, GoabFormItem, GoabDatePicker, GoabTable,
    GoabRadioGroup, GoabRadioItem, GoabDropdown, GoabDropdownItem, GoabTextArea, GoabTooltip,
    GoabInput, GoabFilterChip,
    ReactiveFormsModule,
  ],
})
export class DocsContainerComponent {
  private fb = inject(FormBuilder);

  open = false;
  effectiveDate = new Date();
  form: FormGroup = this.fb.group({
    case: [""],
    reason: [""],
    message: [""],
  });

  toggleModal(): void {
    this.open = !this.open;
  }

  onChangeEffectiveDate(event: GoabDatePickerOnChangeDetail): void {
    this.effectiveDate = event.value as Date;
  }

  onAddToCalendar(): void {
    console.log("Add to calendar clicked");
  }

  onConfirmAdjournment(): void {
    console.log("Confirm clicked!");
  }

  typedChips: string[] = [];
  inputValue = "";

  handleInputChange(detail: GoabInputOnChangeDetail): void {
    const newValue = detail.value.trim();
    this.inputValue = newValue;
  }

  handleInputKeyPress(detail: GoabInputOnKeyPressDetail): void {
    const newValue = detail.value.trim();
    if (detail.key === "Enter" && newValue !== "") {
      this.addChip();
    } else if (
      !this.inputValue &&
      this.typedChips.length > 0 &&
      detail.key === "Backspace"
    ) {
      this.typedChips.pop();
    }
  }

  addChip(): void {
    if (this.inputValue.trim()) {
      this.typedChips.push(this.inputValue.trim());
      this.inputValue = "";
    }
  }

  removeTypedChip(chip: string): void {
    this.typedChips = this.typedChips.filter((c) => c !== chip);
  }
}
