import { Component } from "@angular/core";

@Component({
  selector: "abgov-detail",
  templateUrl: "./detail.html",
})
export class DetailComponent {
  isOpen1 = true;
  constructor() {}
  toggle() {
    this.isOpen1 = !this.isOpen1;
  }
}
