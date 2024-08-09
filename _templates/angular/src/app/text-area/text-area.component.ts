import { GoABFormItem, GoABInput, GoABTextArea } from "@abgov/angular-components";
import { GoABTextAreaOnChangeDetail, GoABTextAreaOnKeyPressDetail } from "@abgov/ui-components-common";
import { JsonPipe } from "@angular/common";
import { Component } from "@angular/core";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";

@Component({
  standalone: true,
  selector: "abgov-text-area",
  templateUrl: "./text-area.component.html",
  imports: [
    GoABTextArea,
    GoABFormItem,
    GoABInput,
    ReactiveFormsModule,
    JsonPipe,
    FormsModule
  ]
})
export class TextAreaComponent {
  example1 = "";
  handleExample1(event: GoABTextAreaOnChangeDetail) {
    this.example1 = event.value;
  }
  example2Form: FormGroup;
  example3 = "";

  boundVal = "";
  reactiveFormCtrl = new FormControl();
  form = new FormGroup({
    textarea: new FormControl(),
    input: new FormControl(),
  })

  constructor() {
    this.example2Form = new FormGroup({
      example2: new FormControl("")
    })
  }

  onChange(e: GoABTextAreaOnChangeDetail) {
    console.log("onChange", e.value)
    this.boundVal = e.value;
  }

  onKeyPress(e: GoABTextAreaOnKeyPressDetail) {
    // console.log("keypressed", e.name, e.value, e.key);
  }
}
