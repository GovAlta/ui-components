import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  GoabButton,
  GoabDropdown,
  GoabDropdownItem,
  GoabModal,
  GoabTextArea,
  GoabButtonGroup,
  GoabCheckbox,
  GoabCheckboxList,
  GoabFormItem,
  GoabInput,
  GoabRadioGroup,
  GoabRadioItem,
} from "@abgov/angular-components";


@Component({
  standalone: true,
  selector: "abgov-bug3685",
  templateUrl: "./bug3685.component.html",
  imports: [CommonModule,
  GoabButton,
  GoabDropdown,
  GoabDropdownItem,
  GoabModal,
  GoabTextArea,
  GoabButtonGroup,
  GoabCheckbox,
  GoabCheckboxList,
  GoabFormItem,
  GoabInput,
  GoabRadioGroup,
  GoabRadioItem,
],
})
export class Bug3685Component {
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
