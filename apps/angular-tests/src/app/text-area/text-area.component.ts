import { GoABFormItem, GoABInput, GoABTextArea } from "@abgov/angular-components";
import { GoABTextAreaOnChangeDetail, GoABTextAreaOnKeyPressDetail } from "@abgov/ui-components-common";
import { JsonPipe } from "@angular/common";
import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

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
  ]
})
export class TextAreaComponent {
  boundVal = "";
  reactiveFormCtrl = new FormControl();
  form = new FormGroup({
    textarea: new FormControl(),
    input: new FormControl(),
  })

  constructor() { }

  onChange(e: GoABTextAreaOnChangeDetail) {
    console.log("onChange", e.value)
    this.boundVal = e.value;
  }

  onKeyPress(e: GoABTextAreaOnKeyPressDetail) {
    // console.log("keypressed", e.name, e.value, e.key);
  }
}
