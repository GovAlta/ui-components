import { Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-form-item-slot",
  template: `<ng-content></ng-content>`,
})
/**
 * This component is used to define the slot for the form item component.
 * We need to use a separate component with a required attribute `slot` because
 * svelte component renders based on the `slot` of the wrapper component (which is `div` before)
 * // similar to app-footer-meta-section & app-footer-nav-section
 */
export class GoabFormItemSlot {
  @Input({ required: true }) slot!: "helptext" | "error";
}
