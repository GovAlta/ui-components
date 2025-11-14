import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  GoabButton,
  GoabModal,
  GoabDatePicker,
  GoabDropdown,
  GoabDropdownItem,
  GoabFormItem,
} from "@abgov/angular-components";

@Component({
  selector: "abgov-bug2655",
  standalone: true,
  imports: [
    CommonModule,
    GoabButton,
    GoabModal,
    GoabDatePicker,
    GoabDropdown,
    GoabDropdownItem,
    GoabFormItem,
  ],
  template: `
    <div>
      <h1>Bug 2655 - Modal with Date Pickers and Dropdowns</h1>
      <p>This page tests the integration of modals with form components.</p>

      <goab-button (onClick)="openModal()"> Open Modal </goab-button>

      <goab-modal
        [open]="isModalOpen"
        heading="Test Modal"
        [closable]="true"
        (onClose)="closeModal()"
      >
        <div>
          <div [style.margin-bottom]="'20px'">
            <goab-form-item>
              <goab-date-picker
                name="date1"
                (onChange)="onDate1Change($event)"
              ></goab-date-picker>
            </goab-form-item>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae
            ultricies leo. Cras sodales lacinia sagittis. Aliquam viverra, risus quis
            imperdiet euismod, libero lacus blandit tortor, vel tristique est sapien sed
            urna. Phasellus convallis auctor leo sed volutpat. Sed vel arcu suscipit,
            porta augue et, vehicula felis. Pellentesque at pulvinar velit. Phasellus
            lacus metus, dictum vel ultricies eu, rutrum eu nibh. Curabitur at dapibus
            ligula. Nam nulla massa, egestas vitae urna a, maximus aliquam leo.
            Suspendisse condimentum condimentum nunc, eu pulvinar tellus convallis sed.
            Praesent non mauris quis diam feugiat gravida nec porta ipsum. Proin elementum
            nibh eu tellus porta, sed rhoncus felis dictum. Nullam mattis purus at urna
            convallis vulputate. Sed aliquet maximus varius. Sed aliquet mi eget arcu
            ullamcorper tempor. Etiam condimentum fermentum lacus, sed ultricies velit
            scelerisque id.
          </p>
          <div [style.margin-bottom]="'20px'" style="position: relative;">
            <goab-form-item>
              <goab-date-picker
                name="date2"
                (onChange)="onDate2Change($event)"
              ></goab-date-picker>
            </goab-form-item>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae
            ultricies leo. Cras sodales lacinia sagittis. Aliquam viverra, risus quis
            imperdiet euismod, libero lacus blandit tortor, vel tristique est sapien sed
            urna. Phasellus convallis auctor leo sed volutpat. Sed vel arcu suscipit,
            porta augue et, vehicula felis. Pellentesque at pulvinar velit. Phasellus
            lacus metus, dictum vel ultricies eu, rutrum eu nibh. Curabitur at dapibus
            ligula. Nam nulla massa, egestas vitae urna a, maximus aliquam leo.
            Suspendisse condimentum condimentum nunc, eu pulvinar tellus convallis sed.
            Praesent non mauris quis diam feugiat gravida nec porta ipsum. Proin elementum
            nibh eu tellus porta, sed rhoncus felis dictum. Nullam mattis purus at urna
            convallis vulputate. Sed aliquet maximus varius. Sed aliquet mi eget arcu
            ullamcorper tempor. Etiam condimentum fermentum lacus, sed ultricies velit
            scelerisque id.
          </p>
          <div [style.margin-bottom]="'20px'">
            <goab-form-item>
              <goab-dropdown name="dropdown1" (onChange)="onDropdown1Change($event)">
                <goab-dropdown-item value="red" label="Red"></goab-dropdown-item>
                <goab-dropdown-item value="green" label="Green"></goab-dropdown-item>
                <goab-dropdown-item value="blue" label="Blue"></goab-dropdown-item>
              </goab-dropdown>
            </goab-form-item>
          </div>

          <div [style.margin-bottom]="'20px'" style="position: relative;">
            <goab-form-item>
              <goab-dropdown name="dropdown2" (onChange)="onDropdown2Change($event)">
                <goab-dropdown-item value="red" label="Red"></goab-dropdown-item>
                <goab-dropdown-item value="green" label="Green"></goab-dropdown-item>
                <goab-dropdown-item value="blue" label="Blue"></goab-dropdown-item>
              </goab-dropdown>
            </goab-form-item>
          </div>
        </div>
      </goab-modal>
    </div>
  `,
  styles: [],
})
export class Bug2655Component {
  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  onDate1Change(event: any) {
    console.log("Date 1 changed:", event);
  }

  onDate2Change(event: any) {
    console.log("Date 2 changed:", event);
  }

  onDropdown1Change(event: any) {
    console.log("Dropdown 1 changed:", event);
  }

  onDropdown2Change(event: any) {
    console.log("Dropdown 2 changed:", event);
  }
}
