import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Countries, CountrySubdivisions} from "playground/angular/src/app/countries.data";

@Component({
  selector: "goab-root",
  templateUrl: "./app.component.html",
  styles: ``,
})
export class AppComponent implements OnInit {
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

  constructor(
    private fb: FormBuilder,
  ) {
    this.fg = this.fb.group({
      businessName: [null as (string|null), []],
      address1: [null as (string|null), []],
      address2: [null as (string|null), []],
      locality: [null as (string|null), []],
      region: [null as (string|null), []],
      country: [null as (string|null), []],
      postalCode: [null as (string|null), []]
    });
  }
  ngOnInit() {
    this.fg.get('country')?.valueChanges.subscribe((value) => {
      console.log("Hey country is changed ", value);
    });
    this.fg.get('region')?.valueChanges.subscribe((value) => {
      console.log("region is changed  ", value);
    });
  }

  submit() {
    console.log("Form  value is ", this.fg.value);
  }
}
