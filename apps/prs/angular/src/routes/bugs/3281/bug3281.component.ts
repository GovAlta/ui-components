import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GoabBlock, GoabContainer, GoabTable, GoabText } from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-bug3281",
  templateUrl: "./bug3281.component.html",
  styleUrls: ["./bug3281.component.css"],
  imports: [CommonModule, GoabBlock, GoabContainer, GoabTable, GoabText],
})
export class Bug3281Component implements OnInit {
  ngOnInit() {
    console.log("Bug 3281 Component Loaded");
  }
}
