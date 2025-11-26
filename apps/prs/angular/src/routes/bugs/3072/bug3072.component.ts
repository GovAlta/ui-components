import { AsyncPipe, CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import {
  GoabBlock,
  GoabButton,
  GoabCheckbox,
  GoabCheckboxList,
  GoabDatePicker,
  GoabDropdown,
  GoabDropdownItem,
  GoabFormItem,
  GoabGrid,
  GoabInput,
  GoabInputNumber,
  GoabText,
  GoabTextArea,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-bug3072",
  templateUrl: "./bug3072.component.html",
  styleUrls: ["./bug3072.component.css"],
  imports: [
    CommonModule,
    AsyncPipe,
    ReactiveFormsModule,
    GoabBlock,
    GoabButton,
    GoabCheckbox,
    GoabCheckboxList,
    GoabDatePicker,
    GoabDropdown,
    GoabDropdownItem,
    GoabFormItem,
    GoabGrid,
    GoabInput,
    GoabInputNumber,
    GoabText,
    GoabTextArea,
  ],
})
export class Bug3072Component {
  private readonly fb = inject(FormBuilder);

  readonly bugForm: FormGroup = this.fb.group({
    lastName: this.fb.control(""),
    firstName: this.fb.control(""),
    memberId: this.fb.control<number | null>(null),
    genderId: this.fb.control(""),
    birthDate: this.fb.control<Date | string | null>(null),
    subscribe: this.fb.control(false),
    interests: this.fb.control<string[]>([]),
    notes: this.fb.control(""),
  });

  readonly genders = [
    { value: "1", label: "Male" },
    { value: "2", label: "Female" },
    { value: "3", label: "Other" },
  ];

  readonly interests = [
    { value: "newsletter", label: "Newsletter" },
    { value: "alerts", label: "Service alerts" },
    { value: "offers", label: "Program offers" },
  ];

  readonly valueChanges$ = this.bugForm.valueChanges;

  resetForm(): void {
    this.bugForm.reset();
  }

  populateSampleData(): void {
    this.bugForm.setValue({
      lastName: "Smith",
      firstName: "Dana",
      memberId: 123456,
      genderId: "2",
      birthDate: new Date("1990-05-19"),
      subscribe: true,
      interests: ["newsletter", "alerts"],
      notes: "Populated to demonstrate repeated reset behaviour.",
    });
  }
}
