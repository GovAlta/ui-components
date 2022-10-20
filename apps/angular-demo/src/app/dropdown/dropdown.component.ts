import { Component } from "@angular/core";

@Component({
  selector: "abgov-dropdown",
  templateUrl: "./dropdown.component.html",
  styleUrls: ["./dropdown.component.css"],
})
export class DropdownComponent {
  colors: string[] = ["red", "green", "blue"];
  selectedColor = "red";
  boundVal = "";

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
    this.selectedColor = event.detail.value;
  }
}
