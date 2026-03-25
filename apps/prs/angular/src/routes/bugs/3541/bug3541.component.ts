import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  GoabButton,
  GoabCheckboxList,
  GoabFormItem,
  GoabDropdown,
  GoabDropdownItem,
  GoabRadioGroup,
  GoabRadioItem,
  GoabInput,
  GoabModal,
  GoabTextArea,
  GoabCheckbox,
  GoabButtonGroup,
  GoabxButton,
  GoabxCheckboxList,
  GoabxFormItem,
  GoabxDropdown,
  GoabxDropdownItem,
  GoabxRadioGroup,
  GoabxRadioItem,
  GoabxInput,
  GoabxModal,
  GoabxTextArea,
  GoabxCheckbox
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-bug3541",
  templateUrl: "./bug3541.component.html",
  imports: [CommonModule,
  GoabButton,
  GoabCheckboxList,
  GoabFormItem,
  GoabDropdown,
  GoabDropdownItem,
  GoabRadioGroup,
  GoabRadioItem,
  GoabInput,
  GoabModal,
  GoabTextArea,
  GoabCheckbox,
  GoabButtonGroup,
  GoabxButton,
  GoabxCheckboxList,
  GoabxFormItem,
  GoabxDropdown,
  GoabxDropdownItem,
  GoabxRadioGroup,
  GoabxRadioItem,
  GoabxInput,
  GoabxModal,
  GoabxTextArea,
  GoabxCheckbox
],
})
export class Bug3541Component {
  open = false;
  openTwo = false;
  type: string | undefined = "";
  name = "";
  description = "";

  toggleModal() {
    this.open = !this.open;
  }

  toggleModalTwo() {
    this.openTwo = !this.openTwo;
  }

  updateType(event: any) {
    this.type = event.value;
  }

  updateName(event: any) {
    this.name = event.value;
  }

  updateDescription(event: any) {
    this.description = event.value;
  }


}
