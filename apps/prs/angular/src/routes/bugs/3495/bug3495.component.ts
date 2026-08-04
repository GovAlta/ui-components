import { Component, signal } from "@angular/core";
import { GoabBlock, GoabButton, GoabText, GoabTooltip } from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-bug3495",
  templateUrl: "./bug3495.component.html",
  imports: [GoabBlock, GoabButton, GoabText, GoabTooltip],
})
export class Bug3495Component {
  label = signal("Copy");

  markCopied() {
    this.label.set("Copied");
  }

  reset() {
    this.label.set("Copy");
  }
}
