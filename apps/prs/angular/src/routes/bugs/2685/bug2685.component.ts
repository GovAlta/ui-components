import { Component } from "@angular/core";
import { GoabButton, GoabButtonGroup, GoabModal } from "@abgov/angular-components";

@Component({
  selector: "abgov-bug2685",
  standalone: true,
  imports: [GoabButton, GoabButtonGroup, GoabModal],
  template: `
    <goab-button-group alignment="end">
      <goab-button (click)="openWithActionsModal()">Show Modal w/ Actions</goab-button>
      <goab-button (click)="openWithoutActionsModal()">
        Show Modal w/o Actions
      </goab-button>
      <goab-button (click)="openNoneActionsModal()">
        Show Modal w/ No Actions
      </goab-button>
    </goab-button-group>

    <goab-modal testId="with-actions" heading="Actions Modal ng ✅" [open]="isWithOpen">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia obcaecati id
        molestiae, natus dicta, eaque qui iusto similique, libero explicabo eligendi eius
        laboriosam! Repellendus ducimus officia asperiores. Eos, eius numquam.
      </p>
      <goab-button-group
        testId="without-actions-bg"
        alignment="end"
        mt="none"
        slot="actions"
      >
        <goab-button type="tertiary" (click)="closeWithActionsModal()">
          Cancel
        </goab-button>
        <goab-button type="primary" (click)="closeWithActionsModal()"> Exit </goab-button>
      </goab-button-group>
    </goab-modal>

    <goab-modal
      testId="no-actions"
      heading="No Actions Modal ng ❌"
      [open]="isWithoutOpen"
    >
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia obcaecati id
        molestiae, natus dicta, eaque qui iusto similique, libero explicabo eligendi eius
        laboriosam! Repellendus ducimus officia asperiores. Eos, eius numquam.
      </p>
      <goab-button-group
        testId="without-actions-bg"
        alignment="end"
        mt="none"
        slot="actions"
      >
        <goab-button type="tertiary" (click)="closeWithActionsModal()">
          Cancel
        </goab-button>
        <goab-button type="primary" (click)="closeWithActionsModal()"> Exit </goab-button>
      </goab-button-group>
    </goab-modal>

    <goab-modal
      testId="none"
      heading="No Actions At All"
      [open]="isNoneOpen"
      (close)="closeNoneActionsModal()"
    >
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia obcaecati id
        molestiae, natus dicta, eaque qui iusto similique, libero explicabo eligendi eius
        laboriosam! Repellendus ducimus officia asperiores. Eos, eius numquam.
      </p>
    </goab-modal>
  `,
})
export class Bug2685Component {
  isWithOpen = false;
  isWithoutOpen = false;
  isNoneOpen = false;

  openWithActionsModal() {
    this.isWithOpen = true;
  }

  closeWithActionsModal() {
    this.isWithOpen = false;
  }

  openWithoutActionsModal() {
    this.isWithoutOpen = true;
  }

  closeWithoutActionsModal() {
    this.isWithoutOpen = false;
  }

  openNoneActionsModal() {
    this.isNoneOpen = true;
  }

  closeNoneActionsModal() {
    this.isNoneOpen = false;
  }
}
