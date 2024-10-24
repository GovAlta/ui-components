import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

import type { AppState } from "../app/public-form-utils";
import { continueTo } from "../app/public-form-utils";
import {
  dateValidator,
  emailValidator,
  FieldsetState,
  numericValidator,
  postalCodeValidator,
  regexValidator,
  requiredValidator,
  SINValidator,
  validate,
} from "@abgov/angular-components";

type Page =
  | "name"
  | "other-names"
  | "gender"
  | "birthdate"
  | "first-nation"
  | "first-nation-status-number"
  | "sin"
  | "healthcare-number"
  | "mailing-address"
  | "contact-information"
  | "other-contact-information"
  | "summary"
  | "ineligible";

@Component({
  standalone: true,
  selector: "abgov-fsos",
  templateUrl: "./FamilyServicesComponent.html",
  styles: ``,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FamilyServicesComponent {
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

  onPageChange(e: Event, _from?: Page) {
    if (!this._formRef) {
      console.error("Missing _formRef");
      return;
    }

    const from = (e.target as Element)?.id;
    const { el, state } = (e as CustomEvent).detail;

    let dest: Page | undefined = undefined;
    switch (from) {
      case "name":
        dest = this.validateName(el, state);
        break;
      case "other-names":
        dest = "gender";
        break;
      case "gender":
        dest = this.validateGender(el, state);
        break;
      case "birthdate":
        dest = this.validateBirthdate(el, state);
        break;
      case "first-nation":
        dest = this.validateFirstNationStatus(el, state);
        break;
      case "first-nation-status-number":
        dest = this.validateFirstNationStatusNumber(el, state);
        break;
      case "sin":
        dest = this.validateSIN(el, state);
        break;
      case "healthcare-number":
        dest = this.validateHealthcareNumber(el, state);
        break;
      case "mailing-address":
        console.log("asfasfasdf");
        dest = this.validateMailingAddress(el, state);
        break;
      case "contact-information":
        dest = this.validateContactInformation(el, state);
        break;
      case "other-contact-information":
        dest = this.validateOtherContactInformation(el, state);
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

    return "other-names";
  }

  validateGender(el: HTMLElement, state: FieldsetState): Page | undefined {
    const [ok] = validate("gender", el, state, [requiredValidator("Gender is required")]);
    if (!ok) {
      return;
    }

    return "birthdate";
  }

  validateBirthdate(el: HTMLElement, state: FieldsetState): Page | undefined {
    const [dayValid, date] = validate("birthdate", el, state, [
      dateValidator({ invalidMsg: "Invalid date" }),
    ]);

    if (!dayValid) {
      return;
    }

    return "first-nation";
  }

  validateFirstNationStatus(el: HTMLElement, state: FieldsetState): Page | undefined {
    const [ok, val] = validate("first-nation", el, state, [
      requiredValidator("First Nation status is required"),
    ]);
    if (!ok) {
      return;
    }

    if (val === "Yes") {
      return "first-nation-status-number";
    }

    return "sin";
  }

  validateFirstNationStatusNumber(
    el: HTMLElement,
    state: FieldsetState,
  ): Page | undefined {
    const [ok] = validate("first-nation-status-number", el, state, [
      numericValidator({ max: 1e10, maxMsg: "Must be 10 digits or less" }),
      requiredValidator(),
    ]);
    if (!ok) {
      return;
    }

    return "sin";
  }

  validateSIN(el: HTMLElement, state: FieldsetState): Page | undefined {
    const [ok] = validate("sin", el, state, [
      requiredValidator("SIN is required"),
      SINValidator(),
    ]);
    if (!ok) {
      return;
    }

    return "healthcare-number";
  }

  validateHealthcareNumber(el: HTMLElement, state: FieldsetState): Page | undefined {
    const [ok] = validate("healthcare-number", el, state, [
      requiredValidator(),
      regexValidator(/^(\d{5})-(\d{4})$/, "Must be in a 12345-6789 format"),
    ]);
    if (!ok) {
      return;
    }
    return "mailing-address";
  }

  validateMailingAddress(el: HTMLElement, state: FieldsetState): Page | undefined {
    const [addressOk] = validate("address", el, state, [requiredValidator()]);
    const [cityOk] = validate("city", el, state, [requiredValidator()]);
    const [postalCodeOk] = validate("postal-code", el, state, [
      requiredValidator(),
      postalCodeValidator(),
    ]);

    if (!addressOk || !cityOk || !postalCodeOk) {
      return;
    }

    return "contact-information";
  }

  validateContactInformation(el: HTMLElement, state: FieldsetState): Page | undefined {
    // TODO: phone number validator required
    const [phoneOk] = validate("primary-phone", el, state, [requiredValidator()]);
    const [emailOk] = validate("email", el, state, [
      requiredValidator(),
      emailValidator(),
    ]);

    if (!phoneOk || !emailOk) return;

    return "other-contact-information";
  }

  validateOtherContactInformation(
    el: HTMLElement,
    state: FieldsetState,
  ): Page | undefined {
    const [nameOk] = validate("other-name", el, state, [requiredValidator()]);
    const [relationshipOk] = validate("other-relationship", el, state, [
      requiredValidator(),
    ]);

    if (!nameOk || !relationshipOk) return;

    return "summary";
  }
}
