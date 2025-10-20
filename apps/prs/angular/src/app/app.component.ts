import { Component, OnInit } from "@angular/core";

@Component({
  selector: "abgov-root",
  template: "<router-outlet></router-outlet>",
})
export class AppComponent implements OnInit {
  ngOnInit() {
    console.log("Hello from Angular");
  }
}
