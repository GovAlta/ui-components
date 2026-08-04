import { Component, ChangeDetectorRef, OnDestroy, inject } from "@angular/core";
import {
  GoabBlock,
  GoabButton,
  GoabButtonGroup,
  GoabCircularProgress,
  GoabDetails,
  GoabDivider,
  GoabDrawer,
  GoabLink,
  GoabModal,
  GoabText,
} from "@abgov/angular-components";

@Component({
  standalone: true,
  selector: "abgov-bug2710",
  templateUrl: "./bug2710.component.html",
  imports: [
    GoabBlock,
    GoabButton,
    GoabButtonGroup,
    GoabCircularProgress,
    GoabDetails,
    GoabDivider,
    GoabDrawer,
    GoabLink,
    GoabModal,
    GoabText,
  ],
})
export class Bug2710Component implements OnDestroy {
  modalOpen = false;
  drawerOpen = false;
  progressVisible = false;
  filler = Array.from({ length: 60 }, (_, i) => i + 1);
  private timeoutId: number | null = null;
  private cdr = inject(ChangeDetectorRef);

  ngOnDestroy() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  openModal() {
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }

  openDrawer() {
    this.drawerOpen = true;
  }

  closeDrawer() {
    this.drawerOpen = false;
  }

  showProgress() {
    this.progressVisible = true;
    this.timeoutId = window.setTimeout(() => {
      this.progressVisible = false;
      this.cdr.detectChanges();
    }, 3000);
  }
}
