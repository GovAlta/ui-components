import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  GoabBlock,
  GoabDropdown,
  GoabDropdownItem,
  GoabText,
  GoabTextArea,
  GoabTooltip,
} from "@abgov/angular-components";

interface MaxWidthExample {
  readonly label: string;
  readonly maxWidth: string;
}

@Component({
  standalone: true,
  selector: "abgov-feat2054",
  templateUrl: "./feat2054.component.html",
  styleUrls: ["./feat2054.component.css"],
  imports: [
    CommonModule,
    GoabBlock,
    GoabDropdown,
    GoabDropdownItem,
    GoabText,
    GoabTextArea,
    GoabTooltip,
  ],
})
export class Feat2054Component {
  readonly examples: MaxWidthExample[] = [
    { label: "maxWidth 200px", maxWidth: "200px" },
    { label: "maxWidth 60ch", maxWidth: "60ch" },
    { label: "maxWidth 50%", maxWidth: "50%" },
  ];

  readonly dropdownItems = [
    {
      label:
        "Comprehensive option label designed to span the full 800px width when maxWidth allows",
      value: "full-width-option",
    },
    {
      label: "Secondary descriptive choice reinforcing measurement comparisons",
      value: "secondary-choice",
    },
    {
      label: "Additional entry mirroring content for consistent evaluations",
      value: "tertiary-choice",
    },
  ];

  readonly textareaValue =
    "This textarea content intentionally stretches across the full 800px width so the maxWidth attribute" +
    " clearly demonstrates how the component constrains layout. Each example reuses the same text" +
    " to make comparisons straightforward.";

  readonly tooltipContent =
    "This tooltip description mirrors the other component content. It is lengthy enough to occupy" +
    " the full 800px width where permitted, making changes in maxWidth easy to compare across" +
    " scenarios.";
}
