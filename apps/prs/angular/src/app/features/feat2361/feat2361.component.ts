import { CommonModule, NgFor } from "@angular/common";
import { Component } from "@angular/core";
import {
  GoabBlock,
  GoabButton,
  GoabCheckbox,
  GoabCheckboxList,
  GoabFormItem,
  GoabGrid,
  GoabRadioGroup,
  GoabRadioItem,
  GoabText,
} from "@abgov/angular-components";

type SelectionOption = { value: string; label: string };

@Component({
  standalone: true,
  selector: "abgov-feat2361",
  templateUrl: "./feat2361.component.html",
  styleUrls: ["./feat2361.component.css"],
  imports: [
    CommonModule,
    NgFor,
    GoabBlock,
    GoabButton,
    GoabCheckbox,
    GoabCheckboxList,
    GoabFormItem,
    GoabGrid,
    GoabRadioGroup,
    GoabRadioItem,
    GoabText,
  ],
})
export class Feat2361Component {
  protected readonly horizontalOptions: SelectionOption[] = [
    { value: "sunrise", label: "Sunrise" },
    { value: "noon", label: "High noon" },
    { value: "sunset", label: "Sunset" },
  ];

  protected readonly verticalOptions: SelectionOption[] = [
    { value: "maple", label: "Maple" },
    { value: "spruce", label: "Spruce" },
    { value: "birch", label: "Birch" },
  ];

  protected readonly checkboxListOptions: SelectionOption[] = [
    { value: "analytics", label: "Analytics reports" },
    { value: "alerts", label: "Incident alerts" },
    { value: "news", label: "Program news" },
  ];

  protected readonly checkboxOptions: SelectionOption[] = [
    { value: "alpha", label: "Enable alpha feature" },
    { value: "beta", label: "Enable beta feature" },
    { value: "gamma", label: "Enable gamma feature" },
  ];

  protected errorActive = false;
  protected disabledActive = false;
  protected readonly errorMessage = "Example error message for feature 2361";

  protected toggleError(): void {
    this.errorActive = !this.errorActive;
  }

  protected toggleDisabled(): void {
    this.disabledActive = !this.disabledActive;
  }
}
