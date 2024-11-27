import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  postalCodeValidator,
  PublicFormComponent,
  requiredValidator,
} from "@abgov/angular-components";
import { JsonPipe, NgFor } from "@angular/common";

type Page =
  | "what-is-your-role"
  | "children-subform"
  | "contact"
  | "address"
  | "do-you-receive-support"
  | "recalculated"
  | "summary";

type ChildPage = "child-list" | "name" | "alternate-name" | "dob" | "summary";

@Component({
  standalone: true,
  selector: "abgov-fsos",
  templateUrl: "./SupportOrderDetails.html",
  imports: [NgFor, JsonPipe],
  styles: ``,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SupportOrderDetailsComponent implements OnInit {
  _childFormComponent: PublicFormComponent<ChildPage>;
  _mainFormComponent: PublicFormComponent<Page>;
  _total: number = 0;

  constructor(private router: Router) {
    this._mainFormComponent = new PublicFormComponent();
    this._childFormComponent = new PublicFormComponent();
  }

  ngOnInit(): void {
    // const data = `{ "form": { "children-subform": { "heading": "", "data": [ { "name": { "heading": "", "data": { "firstName": { "name": "firstName", "value": "Chris", "label": "First name", "order": 1 }, "lastName": { "name": "lastName", "value": "Olsen", "label": "Last name", "order": 2 } } }, "alternate-name": { "heading": "", "data": { "alternateName": { "name": "alternateName", "value": "Foo", "label": "Alternate name", "order": 1 } } }, "dob": { "heading": "", "data": { "dob": { "name": "dob", "value": "1986-01-12", "label": "Date of birth", "order": 2 } } } }, { "name": { "heading": "", "data": { "firstName": { "name": "firstName", "value": "Welsey", "label": "First name", "order": 1 }, "lastName": { "name": "lastName", "value": "Olsen", "label": "Last name", "order": 2 } } }, "alternate-name": { "heading": "", "data": { "alternateName": { "name": "alternateName", "value": "Bad boy", "label": "Alternate name", "order": 1 } } }, "dob": { "heading": "", "data": { "dob": { "name": "dob", "value": "2019-03-12", "label": "Date of birth", "order": 2 } } } } ] }, "what-is-your-role": { "heading": "", "data": { "role": { "name": "role", "value": "Recipient", "label": "Role", "order": 1 }, "canadian-resident": { "name": "canadian-resident", "value": "Yes", "label": "Lived in Canada > 5years", "order": 2 }, "amount1": { "name": "amount1", "value": "123", "label": "Amount 1", "order": 3 }, "amount2": { "name": "amount2", "value": "123", "label": "Amount 2", "order": 4 } } } }, "history": [], "editting": "", "status": "not-started", "currentFieldset": { "dispatchType": "continue" } }`;
    const data = null;

    if (data) {
      this._mainFormComponent.initState(data);
    }
  }

  updateState(e: Event) {
    this._mainFormComponent.updateState(e);

    // DEV ONLY: saving the state to local storage
    localStorage.setItem(
      "support-order-details",
      JSON.stringify(this._mainFormComponent.state),
    );

    // if (this._mainFormComponent.state.currentFieldset?.dispatchType === "continue") {
    //   return;
    // }

    // switch (this._mainFormComponent.state.currentFieldset?.id) {
    //   case "what-is-your-role":
    //     this._total =
    //       (parseFloat(
    //         this._mainFormComponent.getStateValue("what-is-your-role", "amount1"),
    //       ) || 0) +
    //       (parseFloat(
    //         this._mainFormComponent.getStateValue("what-is-your-role", "amount2"),
    //       ) || 0);
    //     break;
    // }
  }

  updateChildrenState(e: Event) {
    console.log("updateChildrenState");
    this._childFormComponent.updateState(e);
  }

  onComplete(_e: Event) {
    this.router.navigate(["/fsos"]);
  }

  onPageChange(e: Event, from: Page) {
    let dest: Page | undefined = undefined;
    switch (from) {
      case "what-is-your-role":
        dest = this.handleRole(e);
        break;
      case "contact":
        dest = this.handleContact(e);
        break;
      case "children-subform":
        dest = "address";
        break;
      case "address":
        dest = this.handleAddress(e);
        break;
      case "do-you-receive-support":
        dest = this.handleSupport(e);
        break;
      case "recalculated":
        dest = this.handleRecalculated(e);
        break;
      case "summary":
        break;
      default:
        console.warn("Unhandled page", from);
        break;
    }

    if (dest) {
      this._mainFormComponent.continueTo(dest);
    }
  }

  onChildPageChange(e: Event, from: ChildPage) {
    let dest: ChildPage | undefined = undefined;
    console.log("onChildPageChange", from);
    switch (from) {
      case "child-list":
        dest = "name";
        break;
      case "name":
        dest = this.handleChildrenNames(e);
        break;
      case "alternate-name":
        dest = this.handleChildrenAlternateName(e);
        break;
      case "dob":
        dest = this.handleChildDateOfBirth(e);
        break;
      default:
        console.warn("Unhandled page", from);
        break;
    }

    if (dest) {
      this._childFormComponent.continueTo(dest);
    }
  }

  onChildComplete(e: Event) {
    console.log("onChildComplete", e);
    this._childFormComponent.continueTo("child-list");

    // need to stop the _complete event here, otherwise the parent will also act on it
    e.stopPropagation();
  }

  // ===========
  // Validations
  // ===========

  handleRole(e: Event): Page | undefined {
    const [ok, value] = this._mainFormComponent.validate("role", e, [
      requiredValidator("Role is required"),
    ]);
    if (!ok) {
      return;
    }

    if (value === "Payor") {
      return "recalculated";
    }

    return "contact";
  }

  handleContact(_e: Event): Page | undefined {
    // const [phoneOk] = this.validate("phone-number", e, [
    //   requiredValidator("Phone number is require"),
    // ]);

    // if (!ok) {
    //   return;
    // }

    return "children-subform";
  }

  handleAddress(e: Event): Page | undefined {
    const [cityOk] = this._mainFormComponent.validate("city", e, [requiredValidator()]);
    const [addressOk] = this._mainFormComponent.validate("address", e, [
      requiredValidator(),
    ]);
    const [postalCodeOk] = this._mainFormComponent.validate("postal-code", e, [
      requiredValidator(),
    ]);

    if (!cityOk || !addressOk || !postalCodeOk) {
      return;
    }

    return "do-you-receive-support";
  }

  handleSupport(e: Event): Page | undefined {
    const [ok] = this._mainFormComponent.validate("support", e, [
      requiredValidator("Support response is required"),
    ]);
    if (!ok) return;

    return "recalculated";
  }

  handleRecalculated(e: Event): Page | undefined {
    const [ok] = this._mainFormComponent.validate("recalculated", e, [
      requiredValidator(),
    ]);
    if (!ok) return;

    return "summary";
  }

  // Children

  handleChildrenNames(e: Event): ChildPage | undefined {
    const [firstNameOk] = this._childFormComponent.validate("firstName", e, [
      requiredValidator(),
    ]);
    const [lastNameOk] = this._childFormComponent.validate("lastName", e, [
      requiredValidator(),
    ]);
    if (!firstNameOk || !lastNameOk) return;

    return "alternate-name";
  }

  handleChildrenAlternateName(e: Event): ChildPage | undefined {
    const [ok] = this._childFormComponent.validate("alternateName", e, [
      requiredValidator(),
    ]);
    if (!ok) return;

    return "dob";
  }

  handleChildDateOfBirth(e: Event): ChildPage | undefined {
    const [ok] = this._childFormComponent.validate("dob", e, [requiredValidator()]);
    if (!ok) return;

    return "summary";
  }
}
