import { Component } from "@angular/core";
import { GoabBlock, GoabFormItem, GoabInput, GoabText } from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-bug3683",
  templateUrl: "./bug3683.component.html",
  imports: [GoabBlock, GoabFormItem, GoabInput, GoabText],
})
export class Bug3683Component {
  dateVal = "2025-06-09";
  timeVal = "09:30";
  datetimeVal = "2025-06-09T09:30";
  monthVal = "2025-06";
  weekVal = "2025-W23";
  textVal = "Reference text value";
}
