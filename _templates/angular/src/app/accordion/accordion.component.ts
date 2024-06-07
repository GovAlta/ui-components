import { Component } from "@angular/core";

// import { GoABAccordion } from "@abgov/angular-components";

@Component({
  selector: "gov-accordion",
  templateUrl: "./accordion.component.html",
})
export class AccordionComponent {
  constructor() { }
  open = false;
  onClick() {
    this.open = !this.open;
  }
}
