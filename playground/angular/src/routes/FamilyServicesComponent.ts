import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

import {
  dateValidator,
  emailValidator,
  numericValidator,
  postalCodeValidator,
  PublicFormComponent,
  regexValidator,
  requiredValidator,
  SINValidator,
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
export class FamilyServicesComponent extends PublicFormComponent<Page> {
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

  onPageChange(e: Event, from?: Page) {
    let dest: Page | undefined = undefined;
    switch (from) {
      case "name":
        dest = this.validateName(e);
        break;
      case "other-names":
        dest = "gender";
        break;
      case "gender":
        dest = this.validateGender(e);
        break;
      case "birthdate":
        dest = this.validateBirthdate(e);
        break;
      case "first-nation":
        dest = this.validateFirstNationStatus(e);
        break;
      case "first-nation-status-number":
        dest = this.validateFirstNationStatusNumber(e);
        break;
      case "sin":
        dest = this.validateSIN(e);
        break;
      case "healthcare-number":
        dest = this.validateHealthcareNumber(e);
        break;
      case "mailing-address":
        dest = this.validateMailingAddress(e);
        break;
      case "contact-information":
        dest = this.validateContactInformation(e);
        break;
      case "other-contact-information":
        dest = this.validateOtherContactInformation(e);
        break;
      case "summary":
        break;
      default:
        console.warn("Unhandled page", from);
        break;
    }

    if (dest) {
      this.continueTo(dest);
    }
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

    return "other-names";
  }

  validateGender(e: Event): Page | undefined {
    const [ok] = this.validate("gender", e, [requiredValidator("Gender is required")]);
    if (!ok) {
      return;
    }

    return "birthdate";
  }

  validateBirthdate(e: Event): Page | undefined {
    const [dayValid, date] = this.validate("birthdate", e, [
      dateValidator({ invalidMsg: "Invalid date" }),
    ]);

    if (!dayValid) {
      return;
    }

    return "first-nation";
  }

  validateFirstNationStatus(e: Event): Page | undefined {
    const [ok, val] = this.validate("first-nation", e, [
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

  validateFirstNationStatusNumber(e: Event): Page | undefined {
    const [ok] = this.validate("first-nation-status-number", e, [
      numericValidator({ max: 1e10, maxMsg: "Must be 10 digits or less" }),
      requiredValidator(),
    ]);
    if (!ok) {
      return;
    }

    return "sin";
  }

  validateSIN(e: Event): Page | undefined {
    const [ok] = this.validate("sin", e, [
      requiredValidator("SIN is required"),
      SINValidator(),
    ]);
    if (!ok) {
      return;
    }

    return "healthcare-number";
  }

  validateHealthcareNumber(e: Event): Page | undefined {
    const [ok] = this.validate("healthcare-number", e, [
      requiredValidator(),
      regexValidator(/^(\d{5})-(\d{4})$/, "Must be in a 12345-6789 format"),
    ]);
    if (!ok) {
      return;
    }
    return "mailing-address";
  }

  validateMailingAddress(e: Event): Page | undefined {
    const [addressOk] = this.validate("address", e, [requiredValidator()]);
    const [cityOk] = this.validate("city", e, [requiredValidator()]);
    const [postalCodeOk] = this.validate("postal-code", e, [
      requiredValidator(),
      postalCodeValidator(),
    ]);

    if (!addressOk || !cityOk || !postalCodeOk) {
      return;
    }

    return "contact-information";
  }

  validateContactInformation(e: Event): Page | undefined {
    // TODO: phone number validator required
    const [phoneOk] = this.validate("primary-phone", e, [requiredValidator()]);
    const [emailOk] = this.validate("email", e, [requiredValidator(), emailValidator()]);

    if (!phoneOk || !emailOk) return;

    return "other-contact-information";
  }

  validateOtherContactInformation(e: Event): Page | undefined {
    const [nameOk] = this.validate("other-name", e, [requiredValidator()]);
    const [relationshipOk] = this.validate("other-relationship", e, [
      requiredValidator(),
    ]);

    if (!nameOk || !relationshipOk) return;

    return "summary";
  }
}
