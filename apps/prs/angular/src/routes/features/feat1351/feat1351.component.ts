import { Component } from "@angular/core";
import {
  GoabBadge,
  GoabBlock,
  GoabDetails,
  GoabDivider,
  GoabDropdown,
  GoabDropdownItem,
  GoabDropdownOnChangeDetail,
  GoabLink,
  GoabText,
} from "@abgov/angular-components";

type Person = {
  value: string;
  name: string;
  role: string;
  location: string;
  status: "information" | "success" | "emergency";
  statusText: string;
};

@Component({
  standalone: true,
  selector: "abgov-feat1351",
  templateUrl: "./feat1351.component.html",
  imports: [
    GoabBadge,
    GoabBlock,
    GoabDetails,
    GoabDivider,
    GoabDropdown,
    GoabDropdownItem,
    GoabLink,
    GoabText,
  ],
})
export class Feat1351Component {
  people: Person[] = [
    {
      value: "sarah",
      name: "Sarah Johnson",
      role: "Case worker",
      location: "Edmonton",
      status: "success",
      statusText: "Available",
    },
    {
      value: "michael",
      name: "Michael Chen",
      role: "Supervisor",
      location: "Calgary",
      status: "information",
      statusText: "In a meeting",
    },
    {
      value: "amara",
      name: "Amara Okafor",
      role: "Case worker",
      location: "Red Deer",
      status: "emergency",
      statusText: "On leave",
    },
  ];

  basicValue?: string;
  filterValue?: string;
  mixedValue?: string;
  nativeValue?: string;

  onBasicChange(detail: GoabDropdownOnChangeDetail) {
    this.basicValue = detail.value as string;
  }

  onFilterChange(detail: GoabDropdownOnChangeDetail) {
    this.filterValue = detail.value as string;
  }

  onMixedChange(detail: GoabDropdownOnChangeDetail) {
    this.mixedValue = detail.value as string;
  }

  onNativeChange(detail: GoabDropdownOnChangeDetail) {
    this.nativeValue = detail.value as string;
  }
}
