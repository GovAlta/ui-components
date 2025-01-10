import { GoabAccordion, GoabBadge, GoabButton } from "@abgov/angular-components";
import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

@Component({
  standalone: true,
  selector: "abgov-accordion",
  templateUrl: "./accordion.component.html",
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    GoabAccordion,
    GoabButton,
    GoabBadge,
  ],
})
export class AccordionComponent {
  constructor() { }
  open = false;
  onClick() {
    this.open = !this.open;
  }
}
