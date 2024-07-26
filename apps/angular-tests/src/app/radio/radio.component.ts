import { GoABFormItem, GoABRadioGroup, GoABRadioItem } from "@abgov/angular-components";
import { GoABRadioGroupOnChangeDetail } from "@abgov/ui-components-common";
import { NgForOf } from "@angular/common";
import { Component } from "@angular/core";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";

@Component({
  standalone: true,
  selector: "abgov-radio",
  templateUrl: "./radio.component.html",
  styleUrls: ["./radio.component.css"],
  imports: [
    GoABRadioGroup,
    GoABRadioItem,
    GoABFormItem,
    ReactiveFormsModule,
    NgForOf,
    FormsModule
  ]
})
export class RadioComponent {
  selectedValue = '';

  handleRadioChange(event: GoABRadioGroupOnChangeDetail) {
    this.selectedValue = event.value;
  }
  example2Form: FormGroup;
  example3Value = "";

  constructor() {
    this.example2Form = new FormGroup({
      radioControl: new FormControl('')
    });
  }

  boundVal = "";
  radioValue = "orange"

  reactiveFormCtrl = new FormControl("blue");

  dynamicItems = [
    {
      name: "Fruits",
      value: "banana",
      options: [{ value: "apple" }, { value: "orange" }, { value: "banana" }],
    },
    {
      name: "Vegetables",
      value: "carrot",
      options: [
        { value: "brocolli" },
        { value: "carrot" },
        { value: "spinach" },
      ],
    },
  ];

  onChange(e: GoABRadioGroupOnChangeDetail) {
    console.log("onChange", e.name, e.value);
    this.radioValue = e.value;
  }
}
