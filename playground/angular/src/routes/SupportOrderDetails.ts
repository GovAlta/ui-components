import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PublicFormComponent, relay, requiredValidator } from "@abgov/angular-components";

type Page =
  | "what-is-your-role"
  | "contact"
  | "address"
  | "do-you-receive-support"
  | "recalculated"
  | "summary";

@Component({
  standalone: true,
  selector: "abgov-fsos",
  templateUrl: "./SupportOrderDetails.html",
  styles: ``,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SupportOrderDetails extends PublicFormComponent<Page> implements OnInit {
  constructor(private router: Router) {
    super();
  }

  ngOnInit(): void {
    // const data = `{"form":{"what-is-your-role":{"heading":"","data":{"role":{"name":"role","value":"Recipient","label":"Role"}}},"address":{"heading":"Current address","data":{"city":{"name":"city","value":"3100 Arthur's Cres","label":"Address"},"postal-code":{"name":"postal-code","value":"T6W 2H7","label":""}}}},"history":["what-is-your-role","address","do-you-receive-support"],"editting":"","lastModified":"2024-11-05T13:44:50.903Z","status":"not-started"}`;
    // this.initState(data);
  }

  _total: number = 0;

  override updateState(e: Event) {
    super.updateState(e);
    if (this.state.currentFieldset?.dispatchType === "continue") {
      return;
    }

    switch (this.state.currentFieldset?.id) {
      case "what-is-your-role":
        this._total =
          (parseFloat(this.getStateValue("what-is-your-role", "amount1")) || 0) +
          (parseFloat(this.getStateValue("what-is-your-role", "amount2")) || 0);
        break;
    }
  }

  onComplete(_e: Event) {
    this.router.navigate(["/fsos"]);
  }

  onPageChange(e: Event, from?: Page) {
    let dest: Page | undefined = undefined;
    switch (from) {
      case "what-is-your-role":
        dest = this.handleRole(e);
        break;
      case "contact":
        dest = this.handleContact(e);
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
      this.continueTo(dest);
    }
  }

  // ===========
  // Validations
  // ===========

  handleRole(e: Event): Page | undefined {
    const [ok, value] = this.validate("role", e, [requiredValidator("Role is required")]);
    if (!ok) {
      return;
    }

    if (value === "Payor") {
      return "recalculated";
    }

    return "contact";
  }

  handleContact(e: Event): Page | undefined {
    // const [phoneOk] = this.validate("phone-number", e, [
    //   requiredValidator("Phone number is require"),
    // ]);

    // if (!ok) {
    //   return;
    // }

    return "address";
  }

  handleAddress(e: Event): Page | undefined {
    const [cityOk] = this.validate("city", e, [requiredValidator()]);
    const [addressOk] = this.validate("address", e, [requiredValidator()]);
    const [postalCodeOk] = this.validate("postal-code", e, [requiredValidator()]);

    if (!cityOk || !addressOk || !postalCodeOk) {
      return;
    }

    return "do-you-receive-support";
  }

  handleSupport(e: Event): Page | undefined {
    const [ok] = this.validate("support", e, [
      requiredValidator("Support response is required"),
    ]);
    if (!ok) return;

    return "recalculated";
  }

  handleRecalculated(e: Event): Page | undefined {
    const [ok] = this.validate("recalculated", e, [requiredValidator()]);
    if (!ok) return;

    return "summary";
  }
}
