import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  forwardRef,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GoARadioChange } from './radio-change';
import { GoARadioService } from './radio.service';

/**
 * Control value accessor to use for the component's provider
 * @ignore
 */
export const GOA_RADIO_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => GoARadioComponent),
  multi: true
}

/**
 * Radiobutton component with Government of Alberta styling.
 */
@Component({
  selector: 'goa-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  //register our custom ControlValueAccessor with angular DI system so angular knows how to get instance of it for ngModel binding
  providers: [GOA_RADIO_CONTROL_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoARadioComponent implements ControlValueAccessor, OnInit, OnDestroy {
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
   * Indicates the "group" or set of radios this radio belongs to.
   */
  @Input() name: string;

  /**
   * Value/unique identifier for the object the radiobutton represents.
   */
  @Input() value: any;

  /**
   * Boolean indicating whether or not the radiobutton is checked/selected.
   */
  @Input() checked: boolean;

  /**
   * Boolean indicating whether or not the radiobutton is disabled.
   */
  @Input() disabled: boolean;

   /**
   * Event emitted containing the source radiobutton, and whether or not it is checked.
   */
  @Output() selectionChange: EventEmitter<GoARadioChange> = new EventEmitter<GoARadioChange>();

  /**
   * @ignore
   */
  _onTouchedCallback: () => void;

  /**
   * @ignore
   */
  _propagateChange = (_: any) => { };

  constructor(private _changeDetector: ChangeDetectorRef,
              private _radioService: GoARadioService) {
    this.uniqueId = `goa-radiobutton-${GoARadioComponent.idNum++}`;
  }

  /**
   * Lifecycle hook OnInit.  Used to subscribe to radio change messages from the radioService in order to know whether or not
   * this radio should be checked or not.
   * @ignore
   */
  ngOnInit() {
    this.radioServiceSubscription = this._radioService.radioChangeMessage.subscribe(rcm => {
      if (rcm && rcm.source && rcm.source.name === this.name && rcm.source.uniqueId !== this.uniqueId) {
        this.checked = false;
        this._changeDetector.detectChanges();
      }
    });
  }

  /**
   * Lifecycle hook OnDestroy.  Used to unsubscribe from the radio change messages.
   * @ignore
   */
  ngOnDestroy(): void {
    this.radioServiceSubscription.unsubscribe();
  }

  /**
   * Marks the radio button as needing checking for change detection.
   * This method is exposed because the parent radio group will directly
   * update bound properties of the radio button.
   */
  markForCheck(): void {
    // When group value changes, the button will not be notified. Use `markForCheck` to explicitly
    // update radio button's status
    this._changeDetector.markForCheck();
  }

  /**
   * Implemented as part of ControlValueAccessor.
   * @param value The model bound property, i.e. the value of checked
   * @ignore
   */
  writeValue(value: any) {
    if ((value !== undefined) && (value !== null)) {
      this.checked = value;
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
  };

  /**
   * User interaction event on click of the radiobutton or its label to indicate toggling of the current checked status.
   * Emits selectionChange to parent components.
   * @ignore
   */
  onClick() {
    // flip the checked state of this radio
    this.checked = !this.checked;

    // emit radio change event for those interested
    const radioChange = {
      source: this,
      checked: this.checked
    } as GoARadioChange;

    this._propagateChange(this.checked);
    this.selectionChange.emit(radioChange);

    // notify other radios in group/with same name via radio service so they know to flip their states to not checked
    this._radioService.selectRadio(radioChange);
  }
}
