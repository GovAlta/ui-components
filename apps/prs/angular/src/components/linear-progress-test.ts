import { Component, OnInit, OnDestroy } from "@angular/core";
import { GoabButton, GoabLinearProgress } from "@abgov/angular-components";

@Component({
  selector: "app-linear-progress-test",
  standalone: true,
  imports: [GoabLinearProgress, GoabButton],
  template: `
    <div class="linear-progress-examples">
      <h2>Linear Progress Examples</h2>

      <section>
        <h3>Indeterminate Progress</h3>
        <goab-linear-progress testid="indeterminate-progress" />
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
          [showPercentage]="true"
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
        <goab-linear-progress testid="dynamic-progress" [progress]="dynamicProgress" />
        <div class="controls">
          <goab-button (onClick)="decreaseProgress()">-10%</goab-button>
          <goab-button (onClick)="increaseProgress()">+10%</goab-button>
          <goab-button (onClick)="resetProgress()">Zero</goab-button>
          <goab-button (onClick)="nullProgress()">Indeterminate</goab-button>
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
export class LinearProgressTestComponent implements OnInit, OnDestroy {
  dynamicProgress: number | null = null;
  autoProgress = 0;
  nullProgressValue: number | null = null;
  private intervalId: any;

  increaseProgress(): void {
    if (this.dynamicProgress === null) {
      this.dynamicProgress = 0;
      return;
    }

    this.dynamicProgress = Math.min(100, this.dynamicProgress + 10);
  }

  decreaseProgress(): void {
    if (this.dynamicProgress === null) {
      this.dynamicProgress = 100;
      return;
    }

    this.dynamicProgress = Math.max(0, this.dynamicProgress - 10);
  }

  resetProgress(): void {
    this.dynamicProgress = 0;
  }

  nullProgress(): void {
    this.dynamicProgress = null;
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
