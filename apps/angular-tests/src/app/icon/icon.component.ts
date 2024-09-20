import { GoabIcon } from "@abgov/angular-components";
import { Component } from "@angular/core";

@Component({
  standalone: true,
  selector: "abgov-icon",
  templateUrl: "./icon.component.html",
  imports: [
    GoabIcon
  ],
})
export class IconComponent {
  constructor() { }
}
