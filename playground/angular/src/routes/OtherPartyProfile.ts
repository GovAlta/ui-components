import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

import {
  AppState,
  continueTo,
  FieldsetState,
  requiredValidator,
  validate,
} from "@abgov/angular-components";
import { Router } from "@angular/router";

type Page = "professional-status" | "summary";

@Component({
  standalone: true,
  selector: "abgov-fsos",
  templateUrl: "./OtherPartyProfile.html",
  styles: ``,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class OtherPartyProfile {
  constructor(private router: Router) {}

  // =====
  // Props
  // =====

  _state: AppState = { form: {}, history: [], editting: "", status: "not-started" };
  _formData?: Record<string, string> = undefined;
  _formRef?: HTMLElement = undefined;

  // =========
  // Functions
  // =========

  saveFormRef(e: Event) {
    this._formRef = (e as CustomEvent).detail.el;
  }

  updateState(e: Event) {
    const state = (e as CustomEvent).detail;
    this._state = { ...this._state, form: state.form };
  }

  onComplete(_e: Event) {
    this.router.navigate(["/fsos"]);
  }

  // ======
  // Events
  // ======

  onPageChange(e: Event, from?: Page) {
    if (!this._formRef) {
      console.error("Missing _formRef");
      return;
    }

    const { el, state } = (e as CustomEvent).detail;

    let dest: Page | undefined = undefined;
    switch (from) {
      case "professional-status":
        dest = this.validateRequired(el, state, "professional-status");
        break;
    }

    // update api with state

    if (dest) {
      continueTo(this._formRef, dest);
    }
  }

  // ===========
  // Validations
  // ===========

  validateRequired(el: HTMLElement, state: FieldsetState, id: string): Page | undefined {
    const [ok] = validate(id, el, state, [requiredValidator()]);
    if (!ok) {
      return;
    }

    return "summary";
  }
}
