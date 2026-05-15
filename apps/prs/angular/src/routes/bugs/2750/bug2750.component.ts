import { Component } from "@angular/core";
import { GoabFormItem, GoabDatePicker } from "@abgov/angular-components";
import { FormControl } from "@angular/forms";

@Component({
  selector: "abgov-accordion",
  standalone: true,
  templateUrl: "./bug2750.component.html",
  imports: [GoabFormItem, GoabDatePicker],
})
export class Bug2750Component {
  public readonly dateToday = new Date(
    new Date().setFullYear(new Date().getFullYear() + 100),
  );
  public readonly date100YearsAgo = new Date(
    new Date().setFullYear(new Date().getFullYear() - 100),
  );

  dob = new FormControl();
}
