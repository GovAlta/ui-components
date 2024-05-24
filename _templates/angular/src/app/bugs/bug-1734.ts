import { Component } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Countries, CountrySubdivisions } from "playground/angular/src/app/dropdown/countries.data";

@Component({
  selector: "goa-bug1734",
  templateUrl: "./bug-1734.html",
})
export class Bug1734 {
  colors: string[] = ["red", "green", "blue"];
  selectedColor = "red";
  boundVal = "";
  reactiveFormCtrl = new FormControl({ value: "green", disabled: true });

  color = new FormControl("green");

  provinces: string[] = [
    "BC",
    "Alberta",
    "Saskatchewan",
    "Manitoba",
    "Ontario",
    "Quebec",
  ];

  /* eslint-disable @typescript-eslint/naming-convention */
  cities: Record<string, string[]> = {
    BC: ["Vancouver", "Kelowna", "Fernie"],
    Alberta: ["Edmonton", "Calgary"],
    Saskatchewan: ["Regina", "Saskatoon"],
    Manitoba: ["Winnipeg"],
    Ontario: ["Toronto", "Ottawa"],
    Quebec: ["Montreal", "Quebec City"],
  };

  pcities: string[] = [];

  isMobile = window.matchMedia("(any-pointer:coarse)").matches;
  disabled = false;

  groups = [
    {
      name: "Fruits",
      value: "banana",
      items: [{ value: "apple" }, { value: "orange" }, { value: "banana" }],
    },
    {
      name: "Vegetables",
      value: "carrot",
      items: [{ value: "brocolli" }, { value: "carrot" }, { value: "spinach" }],
    },
  ];

  countries = Countries;
  subdivisions = CountrySubdivisions;

  fg: FormGroup<{
    businessName: FormControl<string | null>;
    address1: FormControl<string | null>;
    address2: FormControl<string | null>;
    locality: FormControl<string | null>;
    region: FormControl<string | null>;
    country: FormControl<string | null>;
    postalCode: FormControl<string | null>;
  }>;



  constructor(private fb: FormBuilder) {
    this.fg = this.fb.group({
      businessName: [null as (string | null), []],
      address1: [null as (string | null), []],
      address2: [null as (string | null), []],
      locality: [null as (string | null), []],
      region: [null as (string | null), []],
      country: ["CA", []],
      postalCode: [null as (string | null), []]
    });
  }

  selectColor(event: any) {
    console.log("Select Color", event);
    this.selectedColor = event.detail.value;
  }

  selectProvince(event: any) {
    this.pcities = this.cities[event.detail.value];
  }

  handleSelectChange(event: any) {
    console.log("select change", event.detail.value, event);
  }





}
