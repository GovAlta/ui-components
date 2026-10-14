import { JsonPipe } from "@angular/common";
import { Component, OnDestroy } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Subscription } from "rxjs";
import type { GoabDropdownMultiselectOnBlurDetail } from "@abgov/ui-components-common";
import {
  GoabCheckbox,
  GoabCheckboxList,
  GoabDatePicker,
  GoabDropdown,
  GoabDropdownItem,
  GoabDropdownMultiselect,
  GoabFormItem,
  GoabInput,
  GoabRadioGroup,
  GoabRadioItem,
  GoabText,
  GoabTextArea,
  GoabButton,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-bug4092",
  templateUrl: "./bug4092.component.html",
  imports: [
    ReactiveFormsModule,
    JsonPipe,
    GoabCheckbox,
    GoabCheckboxList,
    GoabDatePicker,
    GoabDropdown,
    GoabDropdownItem,
    GoabDropdownMultiselect,
    GoabFormItem,
    GoabInput,
    GoabRadioGroup,
    GoabRadioItem,
    GoabText,
    GoabTextArea,
    GoabButton,
  ],
})
export class Bug4092Component implements OnDestroy {
  private readonly subscriptions = new Subscription();

  readonly form = new FormGroup(
    {
      input: new FormControl(""),
      textArea: new FormControl(""),
      radio: new FormControl(""),
      checkbox: new FormControl(false),
      checkboxList: new FormControl<string[]>([]),
      datePicker: new FormControl<Date | string | null>(null),
      dropdown: new FormControl(""),
      dropdownMultiselect: new FormControl<string[]>([]),
    },
    { updateOn: "blur" },
  );

  readonly blurCount = {
    input: 0,
    textArea: 0,
    radio: 0,
    checkbox: 0,
    checkboxList: 0,
    datePicker: 0,
    dropdown: 0,
    dropdownMultiselect: 0,
  };
  readonly formUpdateCount = { ...this.blurCount };
  lastMultiselectBlur?: GoabDropdownMultiselectOnBlurDetail;

  constructor() {
    for (const field of Object.keys(
      this.formUpdateCount,
    ) as (keyof typeof this.blurCount)[]) {
      const control = this.form.get(field);
      if (!control) continue;
      this.subscriptions.add(
        control.valueChanges.subscribe(() => this.formUpdateCount[field]++),
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  recordBlur(
    field: keyof typeof this.blurCount,
    detail?: GoabDropdownMultiselectOnBlurDetail,
  ): void {
    this.blurCount[field]++;
    if (detail) {
      this.lastMultiselectBlur = {
        ...detail,
        value: [...detail.value],
        labels: [...detail.labels],
      };
    }
  }
}
