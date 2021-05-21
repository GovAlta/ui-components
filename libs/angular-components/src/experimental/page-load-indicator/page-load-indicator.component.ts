import { HostListener, OnDestroy } from '@angular/core';
import { SpinnerComponentWithSecondaryColor } from './spinner-utils/utils'

import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

/**
 * A page load indicator component with Government of Alberta styling.
 * selector: goa-page-load-indicator
 */
@Component({
  selector: 'goa-page-load-indicator',
  templateUrl: './page-load-indicator.component.html',
  styleUrls: ['./page-load-indicator.component.scss'],
})
export class GoAPageLoadIndicatorComponent extends SpinnerComponentWithSecondaryColor implements OnInit, OnChanges, OnDestroy {

  constructor() {
    super();
  }

  /**
   * Boolean indicating whether or not the Page Load Indicator is visible.
   */
  @Input() visible: boolean = false;

  /**
   * What message to display under the loading spinner.
   */
  @Input() message: string = '';

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.visible) {
      this.blockScrollingToggle(changes.visible.currentValue);
    }
  }

  /**
   * Toggles the page scrolling based on page load indicator's visibility.
   * @param isBlock The flag to enable/disable page scroll.
   * @ignore
   */
  private blockScrollingToggle(isBlock: boolean): void {
    if (isBlock) {
      document.body.style.height = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.removeProperty('height');
      document.body.style.removeProperty('overflow');
    }
  }

  /**
   * Blocks the keyboard input when page load indicator is visible.
   * @ignore
   */
  @HostListener('document:keydown', ['$event'])
  disableKeyboardInputHandler(event: KeyboardEvent) {
    if (this.visible) {
      event.returnValue = false;
      event.preventDefault();
    }
  }

  ngOnDestroy(): void {
    this.blockScrollingToggle(false);
  }

  get strokeWidth() {
    return 4 * (this.thickness / 100);
  }

  get dashStyle() {
    return {
      color: this.color,
      ...(
        !this.still
          ? { animation: `spinners-angular-circular-fixed ${140 / this.speed}s linear infinite` }
          : {}
      ),
    };
  }
}
