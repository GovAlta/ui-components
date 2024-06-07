import { Component, OnInit } from "@angular/core";

@Component({
  selector: "goab-container",
  templateUrl: "./container.component.html"
})
export class ContainerComponent implements OnInit {
  users: string[] = []

  constructor() { }

  ngOnInit() {
    console.log("setting colors in 3 secs")
    setTimeout(() => this.users = ["Chris", "James", "John"], 2000);
  }
}
