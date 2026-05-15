import { Component } from "@angular/core";

@Component({
  selector: "app-group-related-questions",
  templateUrl: "./angular.html",
})
export class GroupRelatedQuestionsComponent {
  addressLine1 = "";
  addressLine2 = "";
  townCity = "";
  province = "";
  postalCode = "";

  onAddressLine1Change(value: string): void {
    this.addressLine1 = value;
  }

  onAddressLine2Change(value: string): void {
    this.addressLine2 = value;
  }

  onTownCityChange(value: string): void {
    this.townCity = value;
  }

  onProvinceChange(value: string): void {
    this.province = value;
  }

  onPostalCodeChange(value: string): void {
    this.postalCode = value;
  }

  onSubmit(): void {
    console.log("Form submitted");
  }
}
