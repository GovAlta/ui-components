import { Component } from "@angular/core";
import { GoabLinearProgress } from "@abgov/angular-components";

@Component({
  selector: "app-linear-progress-test",
  standalone: true,
  imports: [GoabLinearProgress],
  template: `
    <div class="linear-progress-examples">
      <h2>Linear Progress Examples</h2>

      <section>
        <h3>Indeterminate Progress</h3>
        <goab-linear-progress />
      </section>

      <section>
        <h3>Determinate Progress - 0%</h3>
        <goab-linear-progress [progress]="0" />
      </section>
      <section>
        <h3>Indeterminate Progress - 0%</h3>
        <goab-linear-progress [progress]="null" />
      </section>
      <section>
        <h3>Determinate Progress - 25%</h3>
        <goab-linear-progress
          [progress]="25"
          [showPercentage]="true"
          ariaLabel="Demo progress indicator"
          ariaLabelledBy="progress-indicator-label"
        ></goab-linear-progress>
      </section>

      <section>
        <h3>Determinate Progress - 50%</h3>
        <goab-linear-progress [progress]="50" />
      </section>

      <section>
        <h3>Determinate Progress - 75%</h3>
        <goab-linear-progress [progress]="75" />
      </section>

      <section>
        <h3>Determinate Progress - 100%</h3>
        <goab-linear-progress [progress]="100" />
      </section>

      <section>
        <h3>Dynamic Progress</h3>
        <goab-linear-progress [progress]="progress" />
        <div class="controls">
          <button (click)="decreaseProgress()">-10%</button>
          <button (click)="increaseProgress()">+10%</button>
          <button (click)="resetProgress()">Reset</button>
        </div>
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
export class LinearProgressTestComponent {
  progress = 0;

  increaseProgress(): void {
    this.progress = Math.min(100, this.progress + 10);
  }

  decreaseProgress(): void {
    this.progress = Math.max(0, this.progress - 10);
  }

  resetProgress(): void {
    this.progress = 0;
  }
}
