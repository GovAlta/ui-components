import { Component } from "@angular/core";
import { GoabBlock, GoabDatePicker, GoabFormItem, GoabText } from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-bug3610",
  templateUrl: "./bug3610.component.html",
  imports: [GoabBlock, GoabDatePicker, GoabFormItem, GoabText],
})
export class Bug3610Component {
  date: Date | undefined = undefined;

  onDateChange(event: { value: Date | undefined }) {
    this.date = event.value;
  }
}
