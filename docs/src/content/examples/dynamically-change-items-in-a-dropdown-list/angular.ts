import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "app-dynamically-change-dropdown-items",
  templateUrl: "./angular.html",
})
export class DynamicallyChangeDropdownItemsComponent implements OnInit {
  changeForm = new FormGroup({
    parentDropdown: new FormControl(""),
    childDropdown: new FormControl(""),
  });

  parents = ["All", "Big", "Small"];
  children: string[] = [];

  childrenAll = ["Bus", "Elephant", "Key", "Pen", "Watch", "Truck"];
  childrenBig = ["Elephant", "Truck", "Bus"];
  childrenSmall = ["Key", "Pen", "Watch"];

  ngOnInit(): void {
    this.onChange();
  }

  onChange(): void {
    this.changeForm.get("parentDropdown")?.valueChanges.subscribe((value) => {
      if (value === "All") this.children = this.childrenAll;
      else if (value === "Big") this.children = this.childrenBig;
      else this.children = this.childrenSmall;
    });
  }

  generateUniqueKey(index: number, item: string): string {
    return `${item}_${index}_${Math.random()}`;
  }
}
