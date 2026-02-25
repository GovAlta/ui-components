import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GoabBlock, GoabText, GoabxTable } from "@abgov/angular-components";

type Row = {
  service: string;
  status: string;
  requests: number;
  updated: string;
};

@Component({
  standalone: true,
  selector: "abgov-bug3384",
  templateUrl: "./bug3384.component.html",
  imports: [CommonModule, GoabBlock, GoabText, GoabxTable],
})
export class Bug3384Component {
  readonly rows: Row[] = [
    {
      service: "Alberta.ca Accounts",
      status: "Operational",
      requests: 128,
      updated: "2026-02-05",
    },
    { service: "Payments", status: "Degraded", requests: 42, updated: "2026-02-04" },
    {
      service: "Notifications",
      status: "Maintenance",
      requests: 7,
      updated: "2026-02-03",
    },
  ];
}
