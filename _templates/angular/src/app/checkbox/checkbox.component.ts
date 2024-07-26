import { GoABCheckbox } from "@abgov/angular-components";
import { GoABCheckboxOnChangeDetail } from "@abgov/ui-components-common";
import { Component } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";

@Component({
  standalone: true,
  selector: "abgov-checkbox",
  templateUrl: "./checkbox.component.html",
  imports: [
    GoABCheckbox,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class CheckboxComponent {
  checked = false;
  checkboxValue = false;
  onChange(event: GoABCheckboxOnChangeDetail) {
    console.log("Checkbox onChanged is triggered with event ", event);
    this.checked = !this.checked;
    this.checkbox1Checked = !this.checkbox1Checked;
  }

  form!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      checkbox: [false]
    });

    this.form.get('checkbox')?.valueChanges.subscribe(value => {
      console.log('Checkbox value changed:', value);
    });
  }
  checkbox1Checked = false;
  checkbox2Checked = true;
  checkbox3Checked = false;
  reactiveFormCtrl = new FormControl("foobar");

  testFormCtrl = new FormControl({
    value: null,
    disabled: false
  });
  test1FormCtrl = new FormControl();
  bindingVal = "";
  bindingNoVal = "";


  onChange2(e: GoABCheckboxOnChangeDetail) {
    console.log(e)
    this.checkbox2Checked = !this.checkbox2Checked;
  }

  onChange3(e: GoABCheckboxOnChangeDetail) {
    console.log(e)
    this.checkbox3Checked = !this.checkbox3Checked;
  }
}
