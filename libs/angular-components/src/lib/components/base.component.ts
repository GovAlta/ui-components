/* eslint-disable @typescript-eslint/no-explicit-any */
import { Spacing } from "@abgov/ui-components-common";
import { booleanAttribute, Component, Input } from "@angular/core";
import { ControlValueAccessor } from "@angular/forms";

@Component({
  standalone: true,
  template: ``, //** IMPLEMENT IN SUBCLASS
})
export abstract class GoabBaseComponent {
  @Input() mt?: Spacing;
  @Input() mb?: Spacing;
  @Input() ml?: Spacing;
  @Input() mr?: Spacing;
  @Input() testId?: string;
}

@Component({
  standalone: true,
  template: ``, //** IMPLEMENT IN SUBCLASS
})
/**
 * An abstract base class that extends `GoabBaseComponent` and implements the `ControlValueAccessor` interface.
 * This class provides a foundation for creating custom form controls in Angular, enabling them to integrate
 * seamlessly with Angular forms. It includes support for handling value changes, touch events, and disabled states.
 *
 * ## Features
 * - Supports `disabled="true"` and `error="true` attribute bindings for convenience.
 * - Handles form control value changes and touch events via `ControlValueAccessor` methods.
 * - Allows for flexible value types (`unknown`), making it suitable for various data types like integers, dates, or booleans.
 *
 * ## Usage
 * Extend this class to create custom form controls. Implement additional functionality as needed for your specific use case.
 *
 * ## Properties
 * - `id?`: An optional identifier for the component.
 * - `disabled?`: A boolean indicating whether the component is disabled.
 * - `error?`: A boolean indicating whether the component is in an error state.
 * - `value?`: The current value of the component, which can be of any type.
 *
 * ## Methods
 * - `markAsTouched()`: Marks the component as touched and triggers the `fcTouched` callback if defined.
 * - `writeValue(value: unknown)`: Writes a new value to the form control.
 * - `registerOnChange(fn: any)`: Registers a function to handle changes in the form control value.
 * - `registerOnTouched(fn: any)`: Registers a function to handle touch events on the form control.
 * - `setDisabledState?(isDisabled: boolean)`: Sets the disabled state of the component.
 *
 * ## Callbacks
 * - `fcChange?`: A function to handle changes in the form control value.
 * - `fcTouched?`: A function to handle touch events on the form control.
 */
export abstract class GoabControlValueAccessor
  extends GoabBaseComponent
  implements ControlValueAccessor
{
  @Input() id?: string;
  // supports disabled="true" instead of [disabled]="true"
  @Input({ transform: booleanAttribute }) public disabled?: boolean;
  // supports error="true" instead of [error]="true"
  @Input({ transform: booleanAttribute }) public error?: boolean;
  // this should be unknown (not string) as it might be an integer or a date or a boolean
  @Input() value?: unknown | null | undefined;

  // implement ControlValueAccessor

  /**
   * Function to handle changes in the form control value.
   * @param {unknown} value - The new value.
   */
  public fcChange?: (value: unknown) => void;

  /**
   * Function to handle touch events on the form control.
   */
  public fcTouched?: () => unknown;

  private touched = false;

  /**
   * Marks the component as touched. If the component is not already marked as touched,
   * it triggers the `fcTouched` callback (if defined) and sets the `touched` property to `true`.
   */
  public markAsTouched() {
    if (!this.touched) {
      this.fcTouched?.();
      this.touched = true;
    }
  }

  /**
   * Writes a new value to the form control.
   * @param {unknown} value - The value to write.
   */
  public writeValue(value: unknown): void {
    this.value = value;
  }

  /**
   * Registers a function to call when the form control value changes.
   * @param {function} fn - The function to call.
   */
  public registerOnChange(fn: any): void {
    this.fcChange = fn;
  }

  /**
   * Registers a function to call when the form control is touched.
   * @param {function} fn - The function to call.
   */
  public registerOnTouched(fn: any): void {
    this.fcTouched = fn;
  }

  /**
   * Sets the disabled state of the component.
   *
   * @param isDisabled - A boolean indicating whether the component should be disabled.
   */
  public setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
