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
   * Boolean indicating whether or not the Page Load Indicator is visible.
   */
  @Input() visible: boolean = false;

  /**
   * The type of the progress.
   */
  @Input() type: 'progress' | 'infinite' = 'infinite';

  /**
   * What message to display under the loading spinner.
   */
  @Input() message: string = '';
  @Input() progress: number = 0;

  /**
   * Set defaults
   */
  animation: boolean = false;
  strokeDashoffsetDefault: number = 280;
  progressMaxValue: number = 283;
  strokeDashoffset: number = 0;

  ngOnInit(): void {
    if (this.type !== 'progress') {
      this.strokeDashoffset = this.strokeDashoffsetDefault;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.visible) {
      this.blockScrollingToggle(changes.visible.currentValue);
    }
    if (changes.progress) {
      if (this.type === 'progress') {
        this.setProgress(changes.progress.currentValue);
      }
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

    var value = this.progressMaxValue - Math.round(this.progressMaxValue * progress / 100);
    this.strokeDashoffset = value;
  }
}
