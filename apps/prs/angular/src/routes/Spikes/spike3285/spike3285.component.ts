import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import {
  GoabBlock,
  GoabButton,
  GoabDivider,
  GoabText,
  GoabxButton,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-spike3285",
  templateUrl: "./spike3285.component.html",
  imports: [CommonModule, GoabBlock, GoabText, GoabDivider, GoabButton, GoabxButton],
})
export class Spike3285Component {
  clickCount = 0;

  onExperimentalClick(): void {
    this.clickCount += 1;
  }
}
