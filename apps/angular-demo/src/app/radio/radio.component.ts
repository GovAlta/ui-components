import { Component } from "@angular/core";

@Component({
  selector: "abgov-radio",
  templateUrl: "./radio.component.html",
  styleUrls: ["./radio.component.css"],
})
export class RadioComponent {
  constructor() {}

  boundVal = "";

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

  onChange(e: any) {
    console.log("onChange", e.detail.name, e.detail.value);
  }
}
