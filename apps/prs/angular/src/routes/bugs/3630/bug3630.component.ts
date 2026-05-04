import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { GoabDrawer, GoabButton, GoabButtonGroup } from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-bug3630",
  templateUrl: "./bug3630.component.html",
  imports: [GoabDrawer, GoabButton, GoabButtonGroup],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Bug3630Component {
  rightOpen = false;
  rightActionsOpen = false;
  leftOpen = false;
  bottomOpen = false;
  longHeadingOpen = false;
}
