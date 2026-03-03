import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GoabCalendar } from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-bug3497",
  templateUrl: "./bug3497.component.html",
  imports: [CommonModule, GoabCalendar],
})
export class Bug3497Component implements OnInit {
  today = new Date();

  ngOnInit() {
    console.log("today", this.today);
  }
}
