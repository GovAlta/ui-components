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
        (onClose)="closeModal()"
        [closable]="true"
      >
        <div [style.margin-bottom]="'2em'">
          <h4>At the top these open downwards</h4>
          <div [style.margin-bottom]="'20px'">
            <goab-form-item>
              <goab-date-picker
                name="date1"
                (onChange)="onDate1Change($event)"
              ></goab-date-picker>
            </goab-form-item>
          </div>

          <div [style.margin-bottom]="'20px'">
            <goab-form-item>
              <goab-dropdown name="dropdown1" (onChange)="onDropdown1Change($event)">
                <goab-dropdown-item value="red" label="Red"></goab-dropdown-item>
                <goab-dropdown-item value="green" label="Green"></goab-dropdown-item>
                <goab-dropdown-item value="blue" label="Blue"></goab-dropdown-item>
              </goab-dropdown>
            </goab-form-item>
          </div>

          <div
            [style.margin-bottom]="'20px'"
            [style.margin-top]="'200px'"
            style="position: relative;"
          >
            <h4>At the bottom these open upwards</h4>
            <goab-form-item>
              <goab-date-picker
                name="date2"
                (onChange)="onDate2Change($event)"
              ></goab-date-picker>
            </goab-form-item>
          </div>

          <div [style.margin-bottom]="'20px'">
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

      <goab-button (onClick)="openSmallModal()" ml="4"> Open Small Modal </goab-button>

      <goab-modal
        [open]="isSmallModalOpen"
        heading="Small Height Test Modal"
        (onClose)="closeSmallModal()"
        [closable]="true"
      >
        <div [style.margin-bottom]="'2em'" [style.height]="'200px'">
          <h4>
            It should expand downwards within a space too small for the popover content
          </h4>
          <div [style.margin-bottom]="'20px'">
            <goab-form-item>
              <goab-date-picker
                name="date3"
                (onChange)="onDate3Change($event)"
              ></goab-date-picker>
            </goab-form-item>
          </div>
        </div>
      </goab-modal>
      <div [style.margin-top]="'20px'" style="position: relative;">
        <p>
          A good testing cheat to test if the dropdown opens above or below the target is
          to anchor the developer tools window to the bottom and slide it up and down to
          reduce window size.
        </p>
        <goab-form-item>
          <goab-dropdown name="dropdown3" (onChange)="onDropdown3Change($event)">
            <goab-dropdown-item value="red" label="Red"></goab-dropdown-item>
            <goab-dropdown-item value="green" label="Green"></goab-dropdown-item>
            <goab-dropdown-item value="blue" label="Blue"></goab-dropdown-item>
          </goab-dropdown>
        </goab-form-item>
      </div>
    </div>
  `,
  styles: [],
})
export class Bug2655Component {
  isModalOpen = false;
  isSmallModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  openSmallModal() {
    this.isSmallModalOpen = true;
  }

  closeSmallModal() {
    this.isSmallModalOpen = false;
  }

  onDate1Change(event: any) {
    console.log("Date 1 changed:", event);
  }

  onDate2Change(event: any) {
    console.log("Date 2 changed:", event);
  }

  onDate3Change(event: any) {
    console.log("Date 3 changed:", event);
  }

  onDropdown1Change(event: any) {
    console.log("Dropdown 1 changed:", event);
  }

  onDropdown2Change(event: any) {
    console.log("Dropdown 2 changed:", event);
  }

  onDropdown3Change(event: any) {
    console.log("Dropdown 3 changed:", event);
  }
}
