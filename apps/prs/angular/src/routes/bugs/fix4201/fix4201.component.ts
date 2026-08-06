import { Component } from "@angular/core";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  GoabBlock,
  GoabDivider,
  GoabRadioGroup,
  GoabRadioItem,
  GoabText,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-fix-4201",
  templateUrl: "./fix4201.component.html",
  imports: [
    FormsModule,
    ReactiveFormsModule,
    GoabBlock,
    GoabDivider,
    GoabRadioGroup,
    GoabRadioItem,
    GoabText,
  ],
})
export class Fix4201Component {
  templateDrivenValue = "one";

  formControlDisabled = new FormControl({ value: "one", disabled: true });

  componentDisabled = new FormControl("one");
}
