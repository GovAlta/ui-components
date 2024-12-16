import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

import { PublicFormComponent, requiredValidator } from "@abgov/angular-components";
import { Router } from "@angular/router";

type Page = "previous-registrations" | "summary";

@Component({
  standalone: true,
  selector: "abgov-prior-registrations",
  templateUrl: "./PriorRegistrations.html",
  styles: ``,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PriorRegistrations extends PublicFormComponent<Page> {
  constructor(private router: Router) {
    super("details");
  }

  onComplete(_e: Event) {
    this.router.navigate(["/fsos"]);
  }

  onPageChange(e: Event, from?: Page) {
    let dest: Page | undefined = undefined;
    switch (from) {
      case "previous-registrations":
        dest = this.validatePreviousRegistration(e);
        break;
    }

    this.continueTo(dest);
  }

  validatePreviousRegistration(e: Event): Page | undefined {
    const [ok] = this.validate("previous-registration", e, [requiredValidator()]);
    if (!ok) {
      return;
    }

    return "summary";
  }
}
