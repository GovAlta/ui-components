import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {
  GoabAccordion,
  GoabBadge,
  GoabButton,
  GoabButtonGroup,
  GoabFormItem,
  GoabPushDrawer,
  GoabRadioGroup,
  GoabRadioItem,
  GoabTextarea,
  GoabWorkSideMenu,
  GoabWorkSideMenuGroup,
  GoabWorkSideMenuItem,
  GoabWorkspaceLayout,
} from "@abgov/angular-components";

type Decision = "approve" | "deny" | "more-info";

@Component({
  standalone: true,
  selector: "app-push-drawer-workspace-layout",
  imports: [
    FormsModule,
    GoabAccordion,
    GoabBadge,
    GoabButton,
    GoabButtonGroup,
    GoabFormItem,
    GoabPushDrawer,
    GoabRadioGroup,
    GoabRadioItem,
    GoabTextarea,
    GoabWorkSideMenu,
    GoabWorkSideMenuGroup,
    GoabWorkSideMenuItem,
    GoabWorkspaceLayout,
  ],
  template: `
    <ng-template #sideMenuTpl>
      <goab-work-side-menu
        heading="Workspace"
        url="/"
        [open]="true"
        [primaryContent]="primaryTpl"
      />
    </ng-template>

    <ng-template #primaryTpl>
      <goab-work-side-menu-group icon="grid" heading="Work">
        <goab-work-side-menu-item icon="document" label="Cases" url="/cases" />
        <goab-work-side-menu-item icon="folder" label="Documents" url="/documents" />
        <goab-work-side-menu-item icon="bar-chart" label="Reports" url="/reports" />
      </goab-work-side-menu-group>
    </ng-template>

    <ng-template #pageHeaderTpl>
      <div class="page-header">
        <div class="page-header__title-row">
          <h1 class="page-header__title">Emily Thompson</h1>
          <goab-badge type="important" content="Under Review" />
          <span class="page-header__case-id">SE-332983</span>
        </div>
        @if (!open) {
          <goab-button type="secondary" size="compact" (onClick)="openDrawer()">
            Review application
          </goab-button>
        }
      </div>
    </ng-template>

    <ng-template #pageFooterTpl>
      <div class="page-footer">
        Last updated 2 minutes ago · Assigned to Edna Mode
      </div>
    </ng-template>

    <ng-template #drawerTpl>
      <goab-push-drawer
        heading="Review application"
        [open]="open"
        width="420px"
        (onClose)="closeDrawer()"
        [actions]="drawerActionsTpl"
      >
        <goab-form-item label="Decision">
          <goab-radio-group
            name="decision"
            [value]="decision"
            (onChange)="decision = $event.value"
          >
            <goab-radio-item value="approve" label="Approve" />
            <goab-radio-item value="deny" label="Deny" />
            <goab-radio-item value="more-info" label="Request more information" />
          </goab-radio-group>
        </goab-form-item>

        @if (decision === "deny") {
          <goab-form-item
            mt="l"
            label="Reason for denial"
            requirement="required"
          >
            <goab-textarea
              name="reason"
              placeholder="Explain why this application is being denied..."
              [value]="reason"
              (onChange)="reason = $event.value"
            />
          </goab-form-item>
        }
      </goab-push-drawer>
    </ng-template>

    <ng-template #drawerActionsTpl>
      <goab-button-group alignment="end">
        <goab-button type="tertiary" size="compact" (onClick)="closeDrawer()">
          Cancel
        </goab-button>
        <goab-button
          type="primary"
          size="compact"
          [disabled]="decision === 'deny' && reason.trim().length === 0"
          (onClick)="closeDrawer()"
        >
          {{ decision === "approve" ? "Approve" : decision === "deny" ? "Deny" : "Send request" }}
        </goab-button>
      </goab-button-group>
    </ng-template>

    <goab-workspace-layout
      [sideMenu]="sideMenuTpl"
      [pageHeader]="pageHeaderTpl"
      [pageFooter]="pageFooterTpl"
      [pushDrawer]="drawerTpl"
    >
      <div class="content">
        <section class="case-section">
          <h2 class="case-section__heading">1. Verify your eligibility</h2>
          <goab-accordion heading="Verify your age">
            <goab-badge slot="headingcontent" type="success" content="Complete" />
            <p>
              Applicant's date of birth confirmed against the supporting document
              uploaded on file.
            </p>
          </goab-accordion>
          <goab-accordion heading="Your situation">
            <goab-badge slot="headingcontent" type="success" content="Complete" />
            <p>
              Applicant has confirmed their current living situation and household
              composition.
            </p>
          </goab-accordion>
        </section>

        <section class="case-section">
          <h2 class="case-section__heading">2. Your application</h2>
          <goab-accordion heading="Personal information">
            <goab-badge slot="headingcontent" type="success" content="Complete" />
            <p>Full name, contact details, and mailing address are on file.</p>
          </goab-accordion>
        </section>

        <section class="case-section">
          <h2 class="case-section__heading">3. Important documents</h2>
          <goab-accordion heading="Upload identification">
            <goab-badge slot="headingcontent" type="success" content="Complete" />
            <p>Government-issued ID uploaded and verified by the applicant.</p>
          </goab-accordion>
        </section>
      </div>
    </goab-workspace-layout>
  `,
  styles: [
    `
      .page-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--goa-space-m);
        padding: var(--goa-space-m) var(--goa-space-l);
        background: var(--goa-color-greyscale-white);
      }
      .page-header__title-row {
        display: flex;
        align-items: center;
        gap: var(--goa-space-m);
      }
      .page-header__title {
        margin: 0;
        font-size: var(--goa-font-size-5);
      }
      .page-header__case-id {
        color: var(--goa-color-text-secondary);
        font-size: var(--goa-font-size-3);
      }
      .page-footer {
        padding: var(--goa-space-m) var(--goa-space-l);
        color: var(--goa-color-text-secondary);
        font-size: var(--goa-font-size-2);
      }
      .content {
        padding: var(--goa-space-l) var(--goa-space-xl);
      }
      .case-section {
        margin-bottom: var(--goa-space-xl);
      }
      .case-section__heading {
        font-size: var(--goa-font-size-4);
        margin: 0 0 var(--goa-space-m);
      }
    `,
  ],
})
export class WorkspaceLayoutPushDrawerComponent {
  open = true;
  decision: Decision = "deny";
  reason = "";

  openDrawer(): void {
    this.open = true;
  }

  closeDrawer(): void {
    this.open = false;
  }
}
