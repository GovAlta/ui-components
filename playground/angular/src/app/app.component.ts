import { Component, OnInit } from "@angular/core";

import { differenceInYears } from "date-fns";
import type { AppState } from "./public-form-utils";
import { continueTo, relay } from "./public-form-utils";
import {
  birthDayValidator,
  birthMonthValidator,
  birthYearValidator,
  dateValidator,
  FieldsetState,
  requiredValidator,
  validate,
} from "./validation";
import { FormBuilder, FormGroup } from "@angular/forms";

type Page =
  | "name"
  | "sin"
  | "postalcode"
  | "residence"
  | "residence-duration"
  | "birthdate"
  | "currently-employed"
  | "highest-education"
  | "other-education"
  | "previously-applied"
  | "summary"
  | "ineligible";

@Component({
  selector: "abgov-root",
  templateUrl: "./app.component.html",
  styles: ``,
})
export class AppComponent {
  // =====
  // Props
  // =====

  _state: AppState = { form: {}, history: [], editting: "" };
  _formData?: Record<string, string> = undefined;
  _formRef?: HTMLElement = undefined;
  _showConfirmationModal = false;

  // =========
  // Functions
  // =========

  showConfirmation(e: Event) {
    const { form } = (e as CustomEvent).detail;
    this._formData = form;
    this._showConfirmationModal = true;
  }

  hideConfirmationModal() {
    this._showConfirmationModal = false;
  }

  submitForm() {
    this._showConfirmationModal = false;
    console.log(JSON.stringify(this._formData, null, 2));
  }

  saveFormRef(e: Event) {
    this._formRef = (e as CustomEvent).detail.el;
  }

  updateState(e: Event) {
    const state = (e as CustomEvent).detail;
    this._state = { ...this._state, form: state.form };
  }

  showDrawer = false;
  toggleDrawer() {
    this.showDrawer = !this.showDrawer;
  }

  // ======
  // Events
  // ======

  onPageChange(e: Event, from: Page) {
    if (!this._formRef) {
      console.error("Missing _formRef");
      return;
    }

    const { el, state } = (e as CustomEvent).detail;

    let dest: Page | undefined = undefined;
    switch (from) {
      case "name":
        dest = this.validateName(el, state);
        break;
      case "sin":
        dest = this.validateSIN(el, state);
        this.formatSIN(el, state);
        break;
      case "postalcode":
        dest = this.validatePostalCode(el, state);
        break;
      case "residence":
        dest = this.validateResidence(el, state);
        break;
      case "residence-duration":
        dest = this.validateResidenceDuration(el, state);
        break;
      case "birthdate":
        dest = this.validateBirthdate(el, state);
        break;
      case "currently-employed":
        dest = this.validateEmployment(el, state);
        break;
      case "highest-education":
        dest = this.validateEducation(el, state);
        break;
      case "previously-applied":
        dest = this.validatePreviousApplication(el, state);
        break;
      case "other-education":
        dest = this.validateOtherEducation(el, state);
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

  validateName(el: HTMLElement, state: FieldsetState): Page | undefined {
    const [firstNameOk] = validate("firstname", el, state, [
      requiredValidator("First name is required"),
    ]);
    const [lastNameOk] = validate("lastname", el, state, [
      requiredValidator("Last name is required"),
    ]);
    if (!firstNameOk || !lastNameOk) {
      return;
    }

    return "sin";
  }

  validateSIN(el: HTMLElement, state: FieldsetState): Page | undefined {
    const [ok] = validate("sin", el, state, [requiredValidator("SIN is required")]);
    if (!ok) {
      return;
    }

    return "postalcode";
  }

  validatePostalCode(el: HTMLElement, state: FieldsetState): Page | undefined {
    const [ok] = validate("postal-code", el, state, [
      requiredValidator("Postal code is required"),
    ]);
    if (!ok) {
      return;
    }

    return "residence";
  }

  formatSIN(el: HTMLElement, state: FieldsetState) {
    const sin = state["sin"]["value"];
    const sinArr = sin.replace(/ -/g, "").split("");

    sinArr.splice(6, 0, " ");
    sinArr.splice(3, 0, " ");

    const formattedSIN = sinArr.join("");

    relay(el, "form::state:alter", {
      sin: { value: formattedSIN },
    });
  }

  validateResidence(el: HTMLElement, state: FieldsetState): Page | undefined {
    const [ok, value] = validate("alberta", el, state, [
      requiredValidator("Residence status is required"),
    ]);
    if (!ok) {
      return;
    }

    if (value === "No") {
      return "ineligible";
    }
    return "residence-duration";
  }

  validateResidenceDuration(el: HTMLElement, state: FieldsetState): Page | undefined {
    const [ok, value] = validate("duration", el, state, [
      requiredValidator("Duration is required"),
    ]);
    if (!ok) {
      return;
    }

    if (value === "Less than a year") {
      return "ineligible";
    }
    return "birthdate";
  }

  validateBirthdate(el: HTMLElement, state: FieldsetState): Page | undefined {
    const [dayValid, date] = validate("birth-date", el, state, [
      dateValidator({ invalidMsg: "Invalid date" }),
    ]);

    if (!dayValid) {
      return;
    }

    const birthdate = new Date(date);
    const isAdult = differenceInYears(new Date(), birthdate) > 18;

    if (!isAdult) {
      return "ineligible";
    }
    return "currently-employed";
  }

  validateEmployment(el: HTMLElement, state: FieldsetState): Page | undefined {
    const [ok, value] = validate("employed", el, state, [
      requiredValidator("Employment status is required"),
    ]);
    if (!ok) {
      return;
    }

    if (value === "No") {
      return "ineligible";
    }
    return "highest-education";
  }

  validateEducation(el: HTMLElement, state: FieldsetState): Page | undefined {
    const [ok, value] = validate("education", el, state, [
      requiredValidator("Education response is required"),
    ]);
    if (!ok) {
      return;
    }

    if (value === "Other") {
      return "other-education";
    }
    return "previously-applied";
  }

  validateOtherEducation(el: HTMLElement, state: FieldsetState): Page | undefined {
    const [ok, _value] = validate("other-education-description", el, state, [
      requiredValidator("Education description is required"),
    ]);
    if (!ok) {
      return;
    }

    return "previously-applied";
  }

  validatePreviousApplication(el: HTMLElement, state: FieldsetState): Page | undefined {
    const [ok, _value] = validate("previously-applied", el, state, [
      requiredValidator("Previously application status is required"),
    ]);
    if (!ok) {
      return;
    }

    return "summary";
  }
}
