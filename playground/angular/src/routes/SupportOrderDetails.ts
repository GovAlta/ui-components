import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  AppState,
  PublicFormComponent,
  requiredValidator,
} from "@abgov/angular-components";
import { JsonPipe, NgFor, NgIf } from "@angular/common";

type Page =
  | "what-is-your-role"
  | "contact"
  | "optional"
  | "children-subform"
  | "address"
  | "do-you-receive-support"
  | "recalculated"
  | "summary";

type ChildPage = "child-list" | "name" | "alternate-name" | "dob" | "summary";

@Component({
  standalone: true,
  selector: "abgov-fsos",
  templateUrl: "./SupportOrderDetails.html",
  imports: [NgFor, NgIf],
  styles: ``,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SupportOrderDetailsComponent implements OnInit {
  _childFormComponent: PublicFormComponent<ChildPage>;
  _mainFormComponent: PublicFormComponent<Page>;
  _total: number = 0;

  children(): Record<string, string>[] {
    console.log("here", JSON.stringify(this._childFormComponent.getStateList()));
    return this._childFormComponent.getStateList();
  }

  constructor(private router: Router) {
    this._mainFormComponent = new PublicFormComponent("details");
    this._childFormComponent = new PublicFormComponent("list");
  }

  ngOnInit(): void {
    // const data = null;
    const raw = `{"form":{"what-is-your-role":{"heading":"","data":{"type":"details","fieldsets":{"role":{"name":"role","value":"Recipient","label":"Role","order":1}}}},"contact":{"skipSummary":false,"heading":""},"optional":{"heading":"Alternate names","data":{"type":"details","fieldsets":{"nickname":{"name":"nickname","value":"test","label":"Nick name","order":1},"alias":{"name":"alias","value":"qwerty","label":"Secret alias","order":2}}}},"children-subform":{"data":{"type":"list","items":[{"id":"26182ca7-92cb-4439-8d66-34cab61160a6","form":{"child-list":{"skipSummary":true,"heading":""},"name":{"heading":"","data":{"type":"details","fieldsets":{"firstName":{"name":"firstName","value":"Chris","label":"First name","order":1},"lastName":{"name":"lastName","value":"Olsen","label":"Last name","order":2}}}},"alternate-name":{"skipSummary":false,"heading":""},"dob":{"skipSummary":false,"heading":""},"summary":{"skipSummary":true,"heading":""}},"history":["child-list","name","summary","child-list"],"editting":"","lastModified":"2024-12-12T19:28:04.743Z","status":"not-started","currentFieldset":{"id":"summary","dispatchType":"continue"}}]}},"address":{"heading":"Current address","data":{"type":"details","fieldsets":{"address":{"name":"address","value":"123-45st","label":"Address","order":2},"city":{"name":"city","value":"Edmonton","label":"","order":3},"postal-code":{"name":"postal-code","value":"T5W 1O3","label":"","order":4}}}},"do-you-receive-support":{"heading":"","data":{"type":"details","fieldsets":{"support":{"name":"support","value":"Yes","label":"Support?","order":1}}}},"recalculated":{"heading":"","data":{"type":"details","fieldsets":{"recalculated":{"name":"recalculated","value":"Yes","label":"Recalculated?","order":1}}}},"summary":{"skipSummary":true,"heading":"Review your answers"}},"history":["what-is-your-role","optional","children-subform","address","do-you-receive-support","recalculated","summary"],"editting":"","status":"not-started","currentFieldset":{"id":"recalculated","dispatchType":"continue"}}`;
    // const data = JSON.parse(raw) as AppState<Page>;
    const data = null;
    if (data) {
      this._mainFormComponent.initState(data);
    }
  }

  updateState(e: Event) {
    this._mainFormComponent.updateState(e);
    const detail = (e as CustomEvent).detail;

    console.log("SupportOrderDetails:updateState", detail);
    // DEV ONLY: saving the state to local storage
    localStorage.setItem(
      "support-order-details",
      JSON.stringify(this._mainFormComponent.state),
    );

    // if (this._mainFormComponent.state?.currentFieldset?.dispatchType === "continue") {
    //   return;
    // }

    // switch (this._mainFormComponent.state?.currentFieldset?.id) {
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
      case "optional":
        dest = this.handleOptional(e);
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
      alert("foo");
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
      case "summary":
        dest = "child-list";
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
    // this._childFormComponent.continueTo("child-list");

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

    return "optional";
  }

  handleContact(_e: Event): Page | undefined {
    // const [phoneOk] = this.validate("phone-number", e, [
    //   requiredValidator("Phone number is require"),
    // ]);

    // if (!ok) {
    //   return;
    // }

    return "optional";
  }

  handleOptional(e: Event): Page | undefined {
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

    return "summary";
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
    console.log("handleChildDateOfBirth", ok);
    if (!ok) return;

    return "summary";
  }
}
