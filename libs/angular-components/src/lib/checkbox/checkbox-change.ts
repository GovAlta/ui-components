import { GoACheckboxComponent } from './checkbox.component';

export class GoACheckboxChange {
    /** The source MatCheckbox of the event. */
    source: GoACheckboxComponent;
    /** The new `checked` value of the checkbox. */
    checked: boolean;
  }