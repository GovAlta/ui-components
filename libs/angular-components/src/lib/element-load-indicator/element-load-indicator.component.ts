import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { __values } from 'tslib';

/**
 * A page load indicator component with Government of Alberta styling.
 * selector: goa-element-load-indicator
 */
@Component({
  selector: 'goa-element-load-indicator',
  templateUrl: './element-load-indicator.component.html',
  styleUrls: ['./element-load-indicator.component.scss'],
})
export class GoAElementLoadIndicatorComponent implements OnInit, OnChanges {

  constructor() {
  }

  /**
   * Sets the page loader visibility state.
   */
  @Input() visible = true;

  /**
  * The diameter of the loader in pixels.
  */
  @Input() size: 'small' | 'default' = 'default';

  /**
   * The base color of the spinner.
   */
  @Input() baseColour = '#c8eef9';

  /**
   * The spinner color of the spinner.
   */
  @Input() spinnerColour = '#0070c4';

  radius = this.size === 'small' ? 16 : 18;

  innerRadius = this.radius - 4;
  diameter = this.radius * 2;
  dashArray = this.innerRadius * Math.PI * 2;
  dashOffset = this.innerRadius * Math.PI * 0.5;
  viewBox = `0 0 ${this.diameter} ${this.diameter}`;

  /**
  * @ignore
  */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.size) {
      this.radius = changes.size.currentValue === 'small' ? 16 : 18;
      this.innerRadius = this.radius - 4;
      this.diameter = this.radius * 2;
      this.viewBox = `0 0 ${this.diameter} ${this.diameter}`;
      this.dashArray = this.innerRadius * Math.PI * 2;
      this.dashOffset = this.innerRadius * Math.PI * 0.5;
    }
  }

  /**
  * @ignore
  */
  ngOnInit(): void { }
}