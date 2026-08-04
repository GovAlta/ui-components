import { Component } from "@angular/core";
import {
  GoabBlock,
  GoabText,
  GoabDivider,
  GoabDetails,
  GoabLink,
  GoabFormItem,
  GoabTextArea,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-bug3893",
  templateUrl: "./bug3893.component.html",
  imports: [
    GoabBlock,
    GoabText,
    GoabDivider,
    GoabDetails,
    GoabLink,
    GoabFormItem,
    GoabTextArea,
  ],
})
export class Bug3893Component {}
