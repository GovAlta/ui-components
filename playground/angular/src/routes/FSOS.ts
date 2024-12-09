import { CommonModule } from "@angular/common";
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from "@angular/core";
import { fetchData, getValue } from "../utils/api";

type Status = "Not started" | "Incomplete" | "Completed";

type Data = {
  supportOrderDetails?: Record<string, unknown>;
  priorRegistrations?: Record<string, unknown>;
  otherPartyProfile?: Record<string, unknown>;
};

type State = {
  hasChildSupport?: boolean;
  userRole?: "payor" | "recipient";
};

@Component({
  standalone: true,
  selector: "abgov-fsos",
  templateUrl: "./FSOS.html",
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FSOS implements OnInit {
  state: State = {};
  data: Data = {};

  status: Record<string, Status> = {
    "support-order-details": "Not started",
    "prior-registrations": "Not started",
    "other-party-profile": "Not started",
  };

  ngOnInit() {
    this.data.supportOrderDetails = fetchData("/support-order-details");
    this.data.otherPartyProfile = fetchData("/other-party-profile");
    this.data.priorRegistrations = fetchData("/previous-registrations");

    this.setState();
  }

  setState() {
    this.state.hasChildSupport =
      getValue(this.data.supportOrderDetails, "do-you-receive-support", "support") ===
      "Yes";

    this.state.userRole = getValue(
      this.data.supportOrderDetails,
      "what-is-your-role",
      "role",
    ).toLowerCase();

    this.status["support-order-details"] = this.convertToStatus(
      this.data.supportOrderDetails?.["status"],
    );
  }

  convertToStatus(status: unknown): Status {
    switch (status) {
      case "incomplete":
        return "Incomplete";
      case "complete":
        return "Completed";
      default:
        return "Not started";
    }
  }

  getType(content: string) {
    switch (content) {
      case "Not started":
        return "information";
      case "Completed":
        return "success";
      default:
        return "";
    }
  }
}
