import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  forwardRef,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  QueryList,
  ContentChildren,
  InjectionToken,
  AfterContentInit,
  OnDestroy,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { GoARadioComponent } from '../radio/radio.component';
import { GoARadioChange } from '../radio/radio-change';
import { GoARadioService } from '../radio/radio.service';
import { Subscription } from 'rxjs';

/**
 * Control value accessor to use for the component's provider
 * @ignore
 */
export const GOA_RADIO_GROUP_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => GoARadioGroupComponent),
  multi: true,
};

/**
 * Injection token that can be used to inject instances of `GoARadioGroupComponent`. It serves as
 * alternative token to the actual `GoARadioGroupComponent` class which could cause unnecessary
 * retention of the class and its component metadata.
 * @ignore
 */
export const GOA_RADIO_GROUP = new InjectionToken<GoARadioGroupComponent>(
  'GoARadioGroup'
);

/**
 * Radiobutton group component with Government of Alberta styling.  Used to group a set of related radio buttons.
 */
@Component({
  selector: 'goa-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss'],
  providers: [
    GOA_RADIO_GROUP_CONTROL_VALUE_ACCESSOR,
    { provide: GOA_RADIO_GROUP, useExisting: GoARadioGroupComponent },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoARadioGroupComponent
  implements ControlValueAccessor, OnInit, AfterContentInit, OnDestroy {
  /**
   * Used to generate unique Id for this component
   * @ignore
   */
  static idNum = 0;

  /**
   * Unique Id for this component
   * @ignore
   */
  uniqueId: string;

  /**
   * Reference to the subscription to the radio change events so it can be unsubscribed on destroy
   * @ignore
   */
  radioServiceSubscription: Subscription;

  /**
   * The child radio buttons inside the radio group
   */
  @ContentChildren(forwardRef(() => GoARadioComponent), { descendants: true })
  _radios: QueryList<GoARadioComponent>;

  /**
   * @ignore
   */
  private _name = `goa-radio-group-${GoARadioGroupComponent.idNum++}`;

  /**
   * @ignore
   */
  private _value: any = null;

  /**
   * @ignore
   */
  private _selected: GoARadioComponent;

  /**
   * @ignore
   */
  private _required: boolean;

  /**
   * @ignore
   */
  private _disabled: boolean;

  /**
   * The title for the radio group.  Put the question being asked here
   */
  @Input() title: string;

  /**
   * Orientation of the radio buttons.
   */
  @Input() orientation: 'horizontal' | 'vertical' = 'vertical';

  /**
   * Helper text to provide further context as to what the radio group is for/asking
   */
  @Input() helperText: string;

  /**
   * The error message to display when the radio group selection is required and nothing has been selected
   */
  @Input() requiredErrorMessage = 'Please select one of the provided options.';

  /**
   * Indicates the "group" or set of radios this radio belongs to.
   */
  @Input()
  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
    this._updateRadioButtonNames();
  }

  /**
   * Value/unique identifier for the object the radiobutton represents.
   */
  @Input()
  get value(): any {
    return this._value;
  }
  set value(newValue: any) {
    if (this._value !== newValue) {
      // Set this before proceeding to ensure no circular loop occurs with selection.
      this._value = newValue;

      this._updateSelectedRadioFromValue();
      this._setSelectedRadioToChecked();
    }
  }

  /**
   * The currently selected radio.
   */
  @Input()
  get selected() {
    return this._selected;
  }
  set selected(selected: GoARadioComponent | null) {
    this._selected = selected;
    this.value = selected ? selected.value : null;
    this._setSelectedRadioToChecked();
  }

  /**
   * Boolean indicating whether or not the radiobutton is disabled.
   */
  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value) {
    this._disabled = value;
    this._updateRadioButtonDisabled();
  }

  /**
   * Event emitted containing the source radiobutton, and whether or not it is checked.
   */
  @Output()
  selectionChange: EventEmitter<GoARadioChange> = new EventEmitter<GoARadioChange>();

  /**
   * @ignore
   */
  _onTouchedCallback: () => void;

  /**
   * @ignore
   */
  _propagateChange = (_: any) => {};

  constructor(
    private _changeDetector: ChangeDetectorRef,
    private _radioService: GoARadioService
  ) {
    this.uniqueId = `goa-radiobutton-group-${GoARadioGroupComponent.idNum++}`;
  }

  /**
   * Lifecycle hook AfterContentInit.  Used to set properties on child radios based on the radio group's properties.
   * @ignore
   */
  ngAfterContentInit(): void {
    this._updateRadioButtonNames();
    this._updateSelectedRadioFromValue();
    this._updateRadioButtonDisabled();
  }

  /**
   * Lifecycle hook OnInit.  Used to subscribe to radio change messages from the radioService in order to set the 'selected' property
   * of the radio group based on which radio was selected
   * @ignore
   */
  ngOnInit(): void {
    this.radioServiceSubscription = this._radioService.radioChangeMessage.subscribe(
      (rcm) => {
        if (rcm && rcm.source && rcm.source.name === this.name && rcm.checked) {
          this.selected = this._radios.find(
            (r) => r.uniqueId === rcm.source.uniqueId
          );
          this.selectionChange.emit(rcm);
        }
      }
    );
  }

  /**
   * Lifecycle hook OnDestroy.  Used to unsubscribe from the radio change messages.
   * @ignore
   */
  ngOnDestroy(): void {
    this.radioServiceSubscription.unsubscribe();
  }

  /**
   * Updates the 'disabled' property of the child radio buttons to match the disabled state of the radio group
   */
  private _updateRadioButtonDisabled(): void {
    if (this._radios) {
      this._radios.forEach((radio) => {
        radio.disabled = this._disabled;
        radio.markForCheck();
      });
    }
  }

  /**
   * Updates the `selected` radio button from the internal _value state.
   */
  private _updateSelectedRadioFromValue(): void {
    // If the value already matches the selected radio, do nothing.
    const isAlreadySelected =
      this._selected !== undefined &&
      this._selected !== null &&
      this._selected.value === this._value;

    // need to wrap in setTimeout because _radios hasnt resolved yet when Input setter fires, need to get to next cycle in page lifecycle
    setTimeout(() => {
      if (this._radios && !isAlreadySelected) {
        this._selected = null;
        this._radios.forEach((radio) => {
          radio.checked = this.value === radio.value;
          if (radio.checked) {
            this._selected = radio;
          }
        });
      }
    });
  }

  /**
   * Sets the selected radio to checked if it is not already checked
   */
  private _setSelectedRadioToChecked(): void {
    if (this.selected && !this.selected.checked) {
      this.selected.checked = true;
    }
  }

  /**
   * Updates the 'name' property of the child radio buttons to match that of the group so they all function together
   */
  private _updateRadioButtonNames(): void {
    if (this._radios) {
      this._radios.forEach((radio) => {
        radio.name = this.name;
        radio.markForCheck();
      });
    }
  }

  /**
   * Implemented as part of ControlValueAccessor.
   * @param value The model bound property, i.e. the value of checked
   * @ignore
   */
  writeValue(value: any) {
    if (value !== undefined && value !== null) {
      this.selected = value;
      this._changeDetector.detectChanges();
    }
  }

  /**
   * Implemented as part of ControlValueAccessor.
   * @param fn The function to call on change.  Provided by ControlValueAccessor
   * @ignore
   */
  registerOnChange(fn: any) {
    this._propagateChange = fn;
  }

  /**
   * Implemented as part of ControlValueAccessor.
   * @param fn The function to call on touch.  Provided by ControlValueAccessor
   * @ignore
   */
  registerOnTouched(fn: any) {
    this._onTouchedCallback = fn;
  }
}
