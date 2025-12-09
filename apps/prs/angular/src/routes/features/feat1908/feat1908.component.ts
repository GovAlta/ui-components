import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  GoabButton,
  GoabCheckbox,
  GoabCheckboxOnChangeDetail,
  GoabLinearProgress,
} from "@abgov/angular-components";

@Component({
  selector: "abgov-app-linear-progress-test",
  standalone: true,
  imports: [GoabLinearProgress, GoabButton, GoabCheckbox],
  template: `
    <div class="linear-progress-examples">
      <h2>Linear Progress Examples</h2>
      <section>
        <h3>Indeterminate Progress</h3>
        <goab-linear-progress testid="indeterminate-progress" />
      </section>
      <section>
        <h3>Indeterminate Progress - no percentage</h3>
        <goab-linear-progress
          testid="indeterminate-progress-no-percentage"
          [percentVisibility]="'hidden'"
        />
      </section>
      <section>
        <h3>Determinate Progress - 0%</h3>
        <goab-linear-progress testid="determinate-progress-0" [progress]="0" />
      </section>
      <section>
        <h3>Determinate Progress - 25%</h3>
        <goab-linear-progress
          testid="determinate-progress-25"
          [progress]="25"
          [percentVisibility]="'visible'"
          ariaLabel="Demo progress indicator"
          ariaLabelledBy="progress-indicator-label"
        ></goab-linear-progress>
      </section>
      <section>
        <h3>Determinate Progress - 50%</h3>
        <goab-linear-progress testid="determinate-progress-50" [progress]="50" />
      </section>
      <section>
        <h3>Determinate Progress - 75%</h3>
        <goab-linear-progress testid="determinate-progress-75" [progress]="75" />
      </section>
      <section>
        <h3>Determinate Progress - 100%</h3>
        <goab-linear-progress testid="determinate-progress-100" [progress]="100" />
      </section>
      <section>
        <h3>Dynamic Progress</h3>
        <goab-linear-progress
          testid="dynamic-progress"
          [progress]="dynamicProgress"
          [percentVisibility]="showPercentage ? 'visible' : 'hidden'"
        />
        <div class="controls">
          <goab-button (onClick)="decreaseProgress()">-10%</goab-button>
          <goab-button (onClick)="increaseProgress()">+10%</goab-button>
          <goab-button (onClick)="resetProgress()">Zero</goab-button>
          <goab-button (onClick)="indeterminateProgress()">Indeterminate</goab-button>
          <goab-checkbox
            name="showPercentage"
            text="Show Percentage?"
            [checked]="showPercentage"
            (onChange)="onShowPercentageChange($event)"
          ></goab-checkbox>
        </div>
      </section>
      <section>
        <h3>Updating Determinate Progress - 0% ➡️ 100%</h3>
        <goab-linear-progress testid="auto-progress" [progress]="autoProgress" />
      </section>
    </div>
  `,
  styles: [
    `
      .linear-progress-examples {
        padding: 2rem;
        max-width: 800px;
      }
      section {
        margin-bottom: 2rem;
      }
      h3 {
        margin-bottom: 1rem;
      }
      .controls {
        margin-top: 1rem;
        display: flex;
        gap: 0.5rem;
      }
      button {
        padding: 0.5rem 1rem;
        cursor: pointer;
      }
    `,
  ],
})
export class Feat1908Component implements OnInit, OnDestroy {
  dynamicProgress: number | null | undefined = null;
  autoProgress = 0;
  nullProgressValue: number | null | undefined = undefined;
  showPercentage = true;
  percentVisibility: "visible" | "hidden" | undefined = "visible";

  private intervalId: any;

  increaseProgress(): void {
    if (
      this.dynamicProgress === null ||
      this.dynamicProgress === undefined ||
      this.dynamicProgress >= 100
    ) {
      this.dynamicProgress = 0;
      return;
    }

    this.dynamicProgress = Math.min(100, this.dynamicProgress + 10);
  }

  decreaseProgress(): void {
    if (
      this.dynamicProgress === null ||
      this.dynamicProgress === undefined ||
      this.dynamicProgress <= 0
    ) {
      this.dynamicProgress = 100;
      return;
    }

    this.dynamicProgress = Math.max(0, this.dynamicProgress - 10);
  }

  resetProgress(): void {
    this.dynamicProgress = 0;
  }

  indeterminateProgress(): void {
    this.dynamicProgress = undefined;
  }

  onShowPercentageChange(event: GoabCheckboxOnChangeDetail): void {
    if (event.checked !== undefined) {
      this.showPercentage = event.checked;
      this.percentVisibility = this.showPercentage ? "visible" : "hidden";
    }
  }

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.autoProgress += 0.25;
      if (this.autoProgress > 100) {
        this.autoProgress = 0;
      }
    }, 100);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
