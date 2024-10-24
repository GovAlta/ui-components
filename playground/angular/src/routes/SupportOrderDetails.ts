import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { Router } from "@angular/router";

import {
  AppState,
  continueTo,
  FieldsetItemState,
  FieldsetState,
  requiredValidator,
  validate,
} from "@abgov/angular-components";

type Page = "what-is-your-role" | "do-you-receive-support" | "recalculated" | "summary";

@Component({
  standalone: true,
  selector: "abgov-fsos",
  templateUrl: "./SupportOrderDetails.html",
  styles: ``,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SupportOrderDetails {
  constructor(private router: Router) {}

  // =====
  // Props
  // =====

  _state: AppState = { form: {}, history: [], editting: "", status: "not-started" };
  _formData?: Record<string, string> = undefined;
  _formRef?: HTMLElement = undefined;

  _total: number = 0;

  // =========
  // Functions
  // =========

  saveFormRef(e: Event) {
    this._formRef = (e as CustomEvent).detail.el;
  }

  updateState(e: Event) {
    const state = (e as CustomEvent).detail;
    this._state = { ...this._state, form: state.form };

    switch (state.page as Page) {
      case "what-is-your-role":
        this._total =
          (parseFloat(this.getValue("what-is-your-role", "amount1")) || 0) +
          (parseFloat(this.getValue("what-is-your-role", "amount2")) || 0);
        break;
    }
  }

  getValue(group: string, key: string): string {
    const data = this._state.form[group] as Record<string, FieldsetItemState>[];
    // @ts-ignore
    return (data as Record<string, string>)[key]?.value ?? "";
  }

  onComplete(e: Event) {
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
      case "what-is-your-role":
        dest = this.validateRole(el, state);
        break;
      case "do-you-receive-support":
        dest = this.validateSupport(el, state);
        break;
      case "recalculated":
        dest = this.validateRecalculated(el, state);
        break;
      case "summary":
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

  validateRole(el: HTMLElement, state: FieldsetState): Page | undefined {
    const [ok, value] = validate("role", el, state, [
      requiredValidator("Role is required"),
    ]);
    console.log(value);
    if (!ok) {
      return;
    }

    return "do-you-receive-support";
  }

  validateSupport(el: HTMLElement, state: FieldsetState): Page | undefined {
    const [firstNameOk] = validate("support", el, state, [
      requiredValidator("Support response is required"),
    ]);

    return "recalculated";
  }

  validateRecalculated(el: HTMLElement, state: FieldsetState): Page | undefined {
    const [firstNameOk] = validate("firstname", el, state, [
      requiredValidator("First name is required"),
    ]);

    return "summary";
  }
}
