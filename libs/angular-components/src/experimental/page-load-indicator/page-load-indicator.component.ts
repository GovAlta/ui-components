import { HostListener, OnDestroy } from '@angular/core';

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
 * selector: goa-page-load-indicator
 */
@Component({
  selector: 'goa-page-load-indicator',
  templateUrl: './page-load-indicator.component.html',
  styleUrls: ['./page-load-indicator.component.scss'],
})
export class GoAPageLoadIndicatorComponent implements OnInit, OnChanges, OnDestroy {

  constructor() {
  }

  /**
   * Sets the page loader visibility state.
   */
  @Input() visible = false;

  /**
   * The type of page loader, deterministic and indeterministic.
   */
  @Input() type: 'progress' | 'infinite' = 'infinite';

  /**
  * The message to display while loading.
  */
  @Input() message = '';

  /**
   * Sets the percentage value of the page loader while set to progress type, 0 - 100 percent.
   */
  @Input() value = 0;

  /**
   * Sets the page to locked and does not accept user input.
   */
  @Input()
  pagelock = true;

  /**
   * Sets the progress indicator display type size.
   */
  @Input() displayType: 'large' | 'small' = 'large';

  /**
   * Set defaults
   */
  strokeDashoffsetDefault = 280;
  progressMaxValue = 283;
  strokeDashoffset = 0;

  ngOnInit(): void {
    if (this.type !== 'progress') {
      this.strokeDashoffset = this.strokeDashoffsetDefault;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.visible) {
      this.blockScrollingToggle(changes.visible.currentValue);
    }
    if (changes.value) {
      if (this.type === 'progress') {
        this.setProgress(changes.value.currentValue);
      }
    }
  }

  /**
   * Toggles the page scrolling based on page load indicator's visibility.
   * @param isBlock The flag to enable/disable page scroll.
   * @ignore
   */
  private blockScrollingToggle(isBlock: boolean): void {
    if (!isBlock || !this.pagelock) {
      document.body.style.removeProperty('height');
      document.body.style.removeProperty('overflow');
    } else {
      document.body.style.height = '100%';
      document.body.style.overflow = 'hidden';
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

  setProgress(progress: number): void {
    if (this.type !== 'progress') {
      return;
    };

    if (progress === 0) {
      this.strokeDashoffset = this.progressMaxValue;
      return;
    }

    if (progress >= 100) {
      return;
    }

    const value = this.progressMaxValue - Math.round(this.progressMaxValue * progress / 100);
    this.strokeDashoffset = value;
  }
}
