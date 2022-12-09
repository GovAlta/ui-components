import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: "abgov-dropdown",
  templateUrl: "./dropdown.component.html",
  styleUrls: ["./dropdown.component.css"],
})
export class DropdownComponent {
  colors: string[] = ["red", "green", "blue"];
  selectedColor = "red";
  boundVal = "";
  reactiveFormCtrl = new FormControl("red");

  color = new FormControl("green");

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

  constructor() {}

  selectColor(event: any) {
    console.log("Select Color", event);
    this.selectedColor = event.detail.value;
  }

  handleSelectChange(event: any) {
    console.log("select change", event.detail.value, event);
  }
}
