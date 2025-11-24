import { Component } from "@angular/core";
import {
  GoabBlock,
  GoabDropdown,
  GoabDropdownItem,
  GoabFormItem,
  GoabInput,
} from "@abgov/angular-components";
import { GoabDropdownOnChangeDetail } from "@abgov/ui-components-common";
import { NgFor } from "@angular/common";

// US State Capitals
const US_CAPITALS = [
  { value: "montgomery", label: "Montgomery" },
  { value: "juneau", label: "Juneau" },
  { value: "phoenix", label: "Phoenix" },
  { value: "Little Rock" },
  { value: "sacramento", label: "Sacramento" },
  { value: "denver", label: "Denver" },
  { value: "hartford", label: "Hartford" },
  { value: "dover", label: "Dover" },
  { value: "tallahassee", label: "Tallahassee" },
  { value: "atlanta", label: "Atlanta" },
  { value: "honolulu", label: "Honolulu" },
  { value: "boise", label: "Boise" },
  { value: "springfield", label: "Springfield" },
  { value: "indianapolis", label: "Indianapolis" },
  { value: "des-moines" },
  { value: "topeka", label: "Topeka" },
  { value: "frankfort", label: "Frankfort" },
  { value: "baton-rouge", label: "Baton Rouge" },
  { value: "augusta", label: "Augusta" },
  { value: "annapolis", label: "Annapolis" },
  { value: "boston", label: "Boston" },
  { value: "lansing", label: "Lansing" },
  { value: "saint-paul", label: "Saint Paul" },
  { value: "jackson", label: "Jackson" },
  { value: "jefferson-city", label: "Jefferson City" },
  { value: "helena", label: "Helena" },
  { value: "lincoln", label: "Lincoln" },
  { value: "carson-city", label: "Carson City" },
  { value: "concord", label: "Concord" },
  { value: "trenton", label: "Trenton" },
  { value: "santa-fe", label: "Santa Fe" },
  { value: "albany", label: "Albany" },
  { value: "raleigh", label: "Raleigh" },
  { value: "bismarck", label: "Bismarck" },
  { value: "columbus", label: "Columbus" },
  { value: "oklahoma-city", label: "Oklahoma City" },
  { value: "salem", label: "Salem" },
  { value: "harrisburg", label: "Harrisburg" },
  { value: "providence", label: "Providence" },
  { value: "columbia", label: "Columbia" },
  { value: "pierre", label: "Pierre" },
  { value: "nashville", label: "Nashville" },
  { value: "austin", label: "Austin" },
  { value: "salt-lake-city", label: "Salt Lake City" },
  { value: "montpelier", label: "Montpelier" },
  { value: "richmond", label: "Richmond" },
  { value: "olympia", label: "Olympia" },
  { value: "charleston", label: "Charleston" },
  { value: "madison", label: "Madison" },
  { value: "cheyenne", label: "Cheyenne" },
];

@Component({
  selector: "abgov-bug2852",
  templateUrl: "./bug2852.component.html",
  standalone: true,
  imports: [GoabBlock, GoabDropdown, GoabFormItem, GoabDropdownItem, GoabInput, NgFor],
})
export class Bug2852Component {
  selectedCapital: string | number = "";
  usCapitals = US_CAPITALS;

  onChange(detail: GoabDropdownOnChangeDetail) {
    console.log("Dropdown changed:", detail);
    this.selectedCapital = detail.value || "";
  }

  getSelectedCapitalLabel(): string {
    const capital = this.usCapitals.find((c) => c.value === this.selectedCapital);
    return capital ? capital.value : "None";
  }
}
