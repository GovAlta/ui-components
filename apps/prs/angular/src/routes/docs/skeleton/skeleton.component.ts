import { Component } from "@angular/core";
import {
  GoabAppFooter, GoabAppHeader, GoabButton, GoabColumnLayout, GoabFormStep,
  GoabFormStepper, GoabGrid, GoabPageBlock, GoabPages, GoabSkeleton, GoabSpacer,
} from "@abgov/angular-components";
import type { GoabFormStepperOnChangeDetail } from "@abgov/ui-components-common";

@Component({
  standalone: true,
  selector: "abgov-docs-skeleton",
  templateUrl: "./skeleton.component.html",
  imports: [
    GoabAppFooter, GoabAppHeader, GoabButton, GoabColumnLayout, GoabFormStep,
    GoabFormStepper, GoabGrid, GoabPageBlock, GoabPages, GoabSkeleton, GoabSpacer,
  ],
})
export class DocsSkeletonComponent {
  step = 1;

  updateStep(event: GoabFormStepperOnChangeDetail): void {
    this.step = event.step;
  }

  setPage(page: number): void {
    if (page < 1 || page > 4) return;
    this.step = page;
  }
}
