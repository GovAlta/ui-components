import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  GoabButton,
  GoabDropdown,
  GoabDropdownItem,
  GoabDropdownOnChangeDetail,
  GoabText,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-bug3248",
  templateUrl: "./bug3248.component.html",
  imports: [CommonModule, GoabButton, GoabDropdown, GoabDropdownItem, GoabText],
})
export class Bug3248Component {
  colors = ["red", "blue", "green", "yellow", "purple"];
  selectedColor = "";

  reduceToOne(): void {
    this.colors = ["blue"];
  }

  reduceToTwo(): void {
    this.colors = ["green", "yellow"];
  }

  resetToAll(): void {
    this.colors = ["red", "blue", "green", "yellow", "purple"];
  }

  onChange(detail: GoabDropdownOnChangeDetail): void {
    console.log("Dropdown changed:", detail);
    this.selectedColor = Array.isArray(detail.value) ? detail.value[0] : detail.value;
  }

  get colorsList(): string {
    return this.colors.join(", ");
  }

  get colorsCount(): number {
    return this.colors.length;
  }
}
