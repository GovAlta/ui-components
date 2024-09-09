import { GoabFormItem, GoabInput, GoabTextArea } from "@abgov/angular-components";
import { GoabTextAreaOnChangeDetail, GoabTextAreaOnKeyPressDetail } from "@abgov/ui-components-common";
import { JsonPipe } from "@angular/common";
import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

@Component({
  standalone: true,
  selector: "abgov-text-area",
  templateUrl: "./text-area.component.html",
  imports: [
    GoabTextArea,
    GoabFormItem,
    GoabInput,
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

  onChange(e: GoabTextAreaOnChangeDetail) {
    console.log("onChange", e.value)
    this.boundVal = e.value;
  }

  onKeyPress(e: GoabTextAreaOnKeyPressDetail) {
    // console.log("keypressed", e.name, e.value, e.key);
  }
}
