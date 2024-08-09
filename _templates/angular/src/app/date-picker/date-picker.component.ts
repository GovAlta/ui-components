import { Component } from "@angular/core";
import { GoABDatePicker } from "@abgov/angular-components";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { GoABDatePickerOnChangeDetail } from "@abgov/ui-components-common";

@Component({
 standalone: true,
 selector: "abgov-date-picker",
 templateUrl: "./date-picker.component.html",
 imports: [
   GoABDatePicker,
   FormsModule,
   ReactiveFormsModule
 ]
})
export class DatePickerComponent {
  selectedDate = new Date();
  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      datePicker: new FormControl()
    });
  }

  handleDateChange(event: GoABDatePickerOnChangeDetail) {
    console.log("selected date: ", event);
  }
}
