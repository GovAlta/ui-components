import {Component, OnInit} from "@angular/core";

@Component({
  selector: "goab-root",
  template: "<abgov-component-wrapper></abgov-component-wrapper>"
})
export class AppComponent implements OnInit {
  ngOnInit() {
    console.log("Hello from Angular");
  }
}
