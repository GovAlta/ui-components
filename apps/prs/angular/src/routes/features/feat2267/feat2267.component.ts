import { Component } from "@angular/core";
import {
  GoabFormItem,
  GoabCheckbox,
  GoabCheckboxList,
  GoabText,
  GoabInput,
  GoabCheckboxListOnChangeDetail,
  GoabCheckboxOnChangeDetail,
} from "@abgov/angular-components";
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder } from "@angular/forms";

@Component({
  standalone: true,
  selector: "abgov-feat1547",
  templateUrl: "./feat2267.component.html",
  imports: [
    GoabFormItem,
    GoabCheckbox,
    GoabCheckboxList,
    GoabText,
    GoabInput,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class Feat2267Component {
  form!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      checkboxItem: [""],
    });
  }
  private readonly manualContactOptions = ["email", "phone", "sms"];
  basicSelection: string[] = [];
  errorSelection: string[] = [];
  checkboxListError = "";
  checkboxListHasError = false;
  manualContactPreferences: string[] = [];

  checkboxOnChange(details: GoabCheckboxOnChangeDetail) {
    console.log(details.value);
  }

  checkboxFormControlOnChange() {
    console.log(this.form.get("checkboxItem")?.value);
  }

  inputOnChange() {
    console.log("Input changed");
  }

  checkboxListBasicOnChange(details: GoabCheckboxListOnChangeDetail) {
    console.log(details);
    this.basicSelection = details.value;
  }

  checkboxListErrorOnChange(details: GoabCheckboxListOnChangeDetail) {
    console.log(details);
    this.errorSelection = details.value;
    if (this.errorSelection.includes("error4")) {
      this.checkboxListHasError = true;
      this.checkboxListError = "This is an error";
    } else {
      this.checkboxListHasError = false;
      this.checkboxListError = "";
    }
  }

  get manualAllChecked(): boolean {
    return this.manualContactPreferences.length === this.manualContactOptions.length;
  }

  get manualAllIndeterminate(): boolean {
    const len = this.manualContactPreferences.length;
    return len > 0 && len < this.manualContactOptions.length;
  }

  toggleManualAll() {
    if (this.manualAllChecked) {
      this.manualContactPreferences = [];
    } else {
      this.manualContactPreferences = [...this.manualContactOptions];
    }
  }

  onManualContactPreferencesChange(event: GoabCheckboxListOnChangeDetail) {
    this.manualContactPreferences = event.value;
  }
}
