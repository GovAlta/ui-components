import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: "abgov-tabs",
  templateUrl: "./tabs.html",
})
export class TabsComponent {
  colors: string[] = ['red', 'green', 'blue'];
  reactiveFormCtrl = new FormControl("");
}
