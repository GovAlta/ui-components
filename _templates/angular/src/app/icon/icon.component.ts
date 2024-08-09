import { GoABIcon } from "@abgov/angular-components";
import { Component } from "@angular/core";

@Component({
  standalone: true,
  selector: "abgov-icon",
  templateUrl: "./icon.component.html",
  imports: [
    GoABIcon
  ],
})
export class IconComponent {
  constructor() { }
}
