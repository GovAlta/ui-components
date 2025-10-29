/* eslint-disable @typescript-eslint/no-explicit-any */
import { Spacing } from "@abgov/ui-components-common";
import {
  booleanAttribute,
  Component,
  Input,
  ElementRef,
  ViewChild,
  Renderer2,
} from "@angular/core";
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
 * - Uses ViewChild to capture a reference to the native GOA web component element via `#goaComponentRef`.
 * - Uses Renderer2 for safe DOM manipulation (compatible with SSR and security best practices).
 *
 * ## Usage
 * Extend this class to create custom form controls. Child components must:
 * 1. Add `#goaComponentRef` template reference to their `goa-*` element in the template
 * 2. Inject `Renderer2` in their constructor and pass it to `super(renderer)`
 *
 * ### Example:
 * ```typescript
 * @Component({
 *   template: `<goa-input #goaComponentRef [value]="value" ...></goa-input>`
 * })
 * export class GoabInput extends GoabControlValueAccessor {
 *   constructor(private cdr: ChangeDetectorRef, renderer: Renderer2) {
 *     super(renderer);  // Required: pass Renderer2 to base class
 *   }
 * }
 * ```
 *
 * ## Properties
 * - `id?`: An optional identifier for the component.
 * - `disabled?`: A boolean indicating whether the component is disabled.
 * - `error?`: A boolean indicating whether the component is in an error state.
 * - `value?`: The current value of the component, which can be of any type.
 *
 * ## Methods
 * - `markAsTouched()`: Marks the component as touched and triggers the `fcTouched` callback if defined.
 * - `writeValue(value: unknown)`: Writes a new value to the form control (can be overridden for special behavior like checkbox).
 * - `registerOnChange(fn: any)`: Registers a function to handle changes in the form control value.
 * - `registerOnTouched(fn: any)`: Registers a function to handle touch events on the form control.
 * - `setDisabledState?(isDisabled: boolean)`: Sets the disabled state of the component.
 * - `convertValueToString(value: unknown)`: Converts a value to a string for DOM attribute assignment (can be overridden).
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
   * Reference to the native GOA web component element.
   * Child templates should declare `#goaComponentRef` on the `goa-*` element.
   * The base class captures it here so children don't need their own ViewChild.
   */
  @ViewChild("goaComponentRef", { static: false, read: ElementRef })
  protected goaComponentRef?: ElementRef;

  constructor(protected renderer: Renderer2) {
    super();
  }

  /**
   * Convert an arbitrary value into a string for DOM attribute assignment.
   * Child classes can override when they need special formatting.
   * @param value The value to convert
   * @returns string representation or empty string for nullish/empty
   */
  protected convertValueToString(value: unknown): string {
    if (value === null || value === undefined || value === "") {
      return "";
    }
    return String(value);
  }

  /**
   * Writes a new value to the form control.
   * @param {unknown} value - The value to write.
   */
  public writeValue(value: unknown): void {
    this.value = value;
    const el = this.goaComponentRef?.nativeElement as HTMLElement | undefined;
    if (el) {
      const stringValue = this.convertValueToString(value);
      this.renderer.setAttribute(el, "value", stringValue);
    }
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
