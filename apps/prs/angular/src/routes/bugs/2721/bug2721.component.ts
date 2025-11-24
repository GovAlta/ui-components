import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GoabText, GoabBlock } from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-bug2721",
  templateUrl: "./bug2721.component.html",
  styleUrls: ["./bug2721.component.css"],
  imports: [CommonModule, GoabText, GoabBlock],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Bug2721Component {}
