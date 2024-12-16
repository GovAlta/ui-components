import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

import { PublicFormComponent, requiredValidator } from "@abgov/angular-components";
import { Router } from "@angular/router";

type Page = "professional-status" | "summary";

@Component({
  standalone: true,
  selector: "abgov-fsos",
  templateUrl: "./OtherPartyProfile.html",
  styles: ``,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class OtherPartyProfile extends PublicFormComponent<Page> {
  constructor(private router: Router) {
    super("details");
  }

  onComplete(_e: Event) {
    this.router.navigate(["/fsos"]);
  }

  onPageChange(e: Event, from?: Page) {
    let dest: Page | undefined = undefined;
    switch (from) {
      case "professional-status":
        dest = this.validateRequired(e, "professional-status");
        break;
    }

    this.continueTo(dest);
  }

  // ===========
  // Validations
  // ===========

  validateRequired(e: Event, id: string): Page | undefined {
    const [ok] = this.validate(id, e, [requiredValidator()]);
    if (!ok) {
      return;
    }

    return "summary";
  }
}
