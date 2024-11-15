import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

import { differenceInYears } from "date-fns";
import {
  dateValidator,
  PublicFormComponent,
  requiredValidator,
} from "@abgov/angular-components";

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
  standalone: true,
  selector: "abgov-root",
  templateUrl: "./ApplicationComponent.html",
  styles: ``,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ApplicationComponent extends PublicFormComponent<Page> {
  // =====
  // Props
  // =====

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
  }

  showDrawer = false;
  toggleDrawer() {
    this.showDrawer = !this.showDrawer;
  }

  // ======
  // Events
  // ======

  onPageChange(e: Event, from: Page) {
    let dest: Page | undefined = undefined;
    switch (from) {
      case "name":
        dest = this.validateName(e);
        break;
      case "sin":
        dest = this.validateSIN(e);
        break;
      case "postalcode":
        dest = this.validatePostalCode(e);
        break;
      case "residence":
        dest = this.validateResidence(e);
        break;
      case "residence-duration":
        dest = this.validateResidenceDuration(e);
        break;
      case "birthdate":
        dest = this.validateBirthdate(e);
        break;
      case "currently-employed":
        dest = this.validateEmployment(e);
        break;
      case "highest-education":
        dest = this.validateEducation(e);
        break;
      case "previously-applied":
        dest = this.validatePreviousApplication(e);
        break;
      case "other-education":
        dest = this.validateOtherEducation(e);
        break;
      case "summary":
        break;
    }

    this.continueTo(dest);
  }

  // ===========
  // Validations
  // ===========

  validateName(e: Event): Page | undefined {
    const [firstNameOk] = this.validate("firstname", e, [
      requiredValidator("First name is required"),
    ]);
    const [lastNameOk] = this.validate("lastname", e, [
      requiredValidator("Last name is required"),
    ]);
    if (!firstNameOk || !lastNameOk) {
      return;
    }

    return "sin";
  }

  validateSIN(e: Event): Page | undefined {
    const [ok] = this.validate("sin", e, [requiredValidator("SIN is required")]);
    if (!ok) {
      return;
    }

    return "postalcode";
  }

  validatePostalCode(e: Event): Page | undefined {
    const [ok] = this.validate("postal-code", e, [
      requiredValidator("Postal code is required"),
    ]);
    if (!ok) {
      return;
    }

    return "residence";
  }

  validateResidence(e: Event): Page | undefined {
    const [ok, value] = this.validate("alberta", e, [
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

  validateResidenceDuration(e: Event): Page | undefined {
    const [ok, value] = this.validate("duration", e, [
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

  validateBirthdate(e: Event): Page | undefined {
    const [dayValid, date] = this.validate("birth-date", e, [
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

  validateEmployment(e: Event): Page | undefined {
    const [ok, value] = this.validate("employed", e, [
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

  validateEducation(e: Event): Page | undefined {
    const [ok, value] = this.validate("education", e, [
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

  validateOtherEducation(e: Event): Page | undefined {
    const [ok, _value] = this.validate("other-education-description", e, [
      requiredValidator("Education description is required"),
    ]);
    if (!ok) {
      return;
    }

    return "previously-applied";
  }

  validatePreviousApplication(e: Event): Page | undefined {
    const [ok, _value] = this.validate("previously-applied", e, [
      requiredValidator("Previously application status is required"),
    ]);
    if (!ok) {
      return;
    }

    return "summary";
  }
}
