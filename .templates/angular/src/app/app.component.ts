import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "abgov-root",
  template: "<router-outlet></router-outlet>",
  standalone: true,
  imports: [RouterOutlet],
})
export class AppComponent implements OnInit {
  ngOnInit() {
    console.log("Hello from Angular");
  }
}
