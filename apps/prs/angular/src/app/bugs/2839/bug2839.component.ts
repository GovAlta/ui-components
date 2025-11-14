import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  GoabButton,
  GoabIconButton,
  GoabButtonGroup,
  GoabBlock,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-bug2839",
  templateUrl: "./bug2839.component.html",
  imports: [CommonModule, GoabButton, GoabIconButton, GoabButtonGroup, GoabBlock],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Bug2839Component {
  clickCount = 0;

  onButtonClick() {
    this.clickCount++;
    console.log(`Button clicked ${this.clickCount} times`);
  }
}
