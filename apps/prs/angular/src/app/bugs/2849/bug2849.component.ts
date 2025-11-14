import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GoabDropdown, GoabDropdownItem, GoabBlock } from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-bug2849",
  templateUrl: "./bug2849.component.html",
  styleUrls: ["./bug2849.component.css"],
  imports: [CommonModule, GoabDropdown, GoabDropdownItem, GoabBlock],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Bug2849Component {
  selectedValue = "";

  onDropdownChange(event: any) {
    this.selectedValue = event.value;
  }
}
