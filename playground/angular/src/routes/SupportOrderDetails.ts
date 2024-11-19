import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PublicFormComponent, requiredValidator } from "@abgov/angular-components";

type Page =
  | "what-is-your-role"
  | "children-subform"
  | "contact"
  | "address"
  | "do-you-receive-support"
  | "recalculated"
  | "summary";

type ChildPage = "child-list" | "name" | "alternate-name" | "dob";

@Component({
  standalone: true,
  selector: "abgov-fsos",
  templateUrl: "./SupportOrderDetails.html",
  styles: ``,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SupportOrderDetailsComponent implements OnInit {
  _childFormComponent: PublicFormComponent<ChildPage>;
  _mainFormComponent: PublicFormComponent<Page>;

  constructor(private router: Router) {
    this._mainFormComponent = new PublicFormComponent();
    this._childFormComponent = new PublicFormComponent();
  }

  ngOnInit(): void {
    // const data = `{"form":{"what-is-your-role":{"heading":"","data":{"role":{"name":"role","value":"Recipient","label":"Role"}}},"address":{"heading":"Current address","data":{"city":{"name":"city","value":"3100 Arthur's Cres","label":"Address"},"postal-code":{"name":"postal-code","value":"T6W 2H7","label":""}}}},"history":["what-is-your-role","address","do-you-receive-support"],"editting":"","lastModified":"2024-11-05T13:44:50.903Z","status":"not-started"}`;
    // this.initState(data);
  }

  _total: number = 0;

  updateState(e: Event) {
    this._mainFormComponent.updateState(e);
    if (this._mainFormComponent.state.currentFieldset?.dispatchType === "continue") {
      return;
    }

    switch (this._mainFormComponent.state.currentFieldset?.id) {
      case "what-is-your-role":
        this._total =
          (parseFloat(
            this._mainFormComponent.getStateValue("what-is-your-role", "amount1"),
          ) || 0) +
          (parseFloat(
            this._mainFormComponent.getStateValue("what-is-your-role", "amount2"),
          ) || 0);
        break;
    }
  }

  updateChildrenState(e: Event) {
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
    switch (from) {
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
    const [firstNameOk] = this._childFormComponent.validate("first-name", e, [
      requiredValidator(),
    ]);
    const [lastNameOk] = this._childFormComponent.validate("last-name", e, [
      requiredValidator(),
    ]);
    if (!firstNameOk || !lastNameOk) return;

    return "alternate-name";
  }

  handleChildrenAlternateName(e: Event): ChildPage | undefined {
    const [ok] = this._childFormComponent.validate("alternate-name", e, [
      requiredValidator(),
    ]);
    if (!ok) return;

    return "dob";
  }

  handleChildDateOfBirth(e: Event): ChildPage | undefined {
    const [ok] = this._childFormComponent.validate("dob", e, [requiredValidator()]);
    if (!ok) return;

    return "child-list";
  }
}
