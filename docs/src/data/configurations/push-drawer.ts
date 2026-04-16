/**
 * Push Drawer Component Configurations
 *
 * Push drawers push the main page content aside on desktop,
 * falling back to an overlay drawer on smaller screens.
 */

import type { ComponentConfigurations } from "./types";

const pushDrawerScript = `
document.getElementById('open-push-drawer').addEventListener('click', () => {
  document.getElementById('demo-push-drawer').setAttribute('open', 'true');
});
document.getElementById('demo-push-drawer').addEventListener('_close', (e) => {
  e.target.removeAttribute('open');
});
`;

const reactDrawerSetup = `const [isOpen, setIsOpen] = useState<boolean>(false);

const handleClose = () => {
  setIsOpen(false);
};`;

const angularDrawerSetup = `export class SomeOtherComponent {
  isOpen = false;

  openDrawer() {
    this.isOpen = true;
  }

  handleClose() {
    this.isOpen = false;
  }
}`;

const angularDrawerSetupWithCheckbox = `export class SomeOtherComponent {
  isOpen = false;
  checkboxListValues = ["updates", "deadlines"];

  openDrawer() {
    this.isOpen = true;
  }

  handleClose() {
    this.isOpen = false;
  }
}`;

export const pushDrawerConfigurations: ComponentConfigurations = {
  componentSlug: "push-drawer",
  componentName: "Push Drawer",
  defaultConfigurationId: "basic",
  previewStyle: "padding: 0;",

  configurations: [
    {
      id: "basic",
      name: "Basic push drawer",
      description: "Opens from the right, pushing page content aside",
      code: {
        react: {
          ts: reactDrawerSetup,
          jsx: `<div style={{ display: "flex", minHeight: "320px" }}>
  <div style={{ flex: 1, minWidth: 0 }}>
    <GoabButton onClick={() => setIsOpen(true)}>Open push drawer</GoabButton>
  </div>
  <GoabPushDrawer heading="Application details" width="260px" open={isOpen} onClose={handleClose}>
    <GoabText tag="h4" size="heading-xs" mb="s" mt="none">Applicant name</GoabText>
    <GoabText size="body-m" mt="none">Jane Smith</GoabText>
    <GoabText tag="h4" size="heading-xs" mb="s" mt="none">File number</GoabText>
    <GoabText size="body-m" mt="none">24567-9876</GoabText>
    <GoabText tag="h4" size="heading-xs" mb="s" mt="none">Status</GoabText>
    <GoabBadge type="success" content="Approved" />
    <GoabText tag="h4" size="heading-xs" mb="s" mt="m">Submitted</GoabText>
    <GoabText size="body-m" mt="none">January 15, 2025</GoabText>
  </GoabPushDrawer>
</div>`,
        },
        angular: {
          ts: angularDrawerSetup,
          template: `<div style="display: flex; min-height: 320px">
  <div style="flex: 1; min-width: 0">
    <goab-button (onClick)="openDrawer()">Open push drawer</goab-button>
  </div>
  <goab-push-drawer heading="Application details" width="260px" [open]="isOpen" (onClose)="handleClose()">
    <goab-text tag="h4" size="heading-xs" mb="s" mt="none">Applicant name</goab-text>
    <goab-text size="body-m" mt="none">Jane Smith</goab-text>
    <goab-text tag="h4" size="heading-xs" mb="s" mt="none">File number</goab-text>
    <goab-text size="body-m" mt="none">24567-9876</goab-text>
    <goab-text tag="h4" size="heading-xs" mb="s" mt="none">Status</goab-text>
    <goab-badge type="success" content="Approved"></goab-badge>
    <goab-text tag="h4" size="heading-xs" mb="s" mt="m">Submitted</goab-text>
    <goab-text size="body-m" mt="none">January 15, 2025</goab-text>
  </goab-push-drawer>
</div>`,
        },
        webComponents: `<div style="display: flex; min-height: 320px;">
  <div style="flex: 1; min-width: 0; display: flex; align-items: center; justify-content: center;">
    <goa-button version="2" id="open-push-drawer">Open push drawer</goa-button>
  </div>
  <goa-push-drawer version="2" id="demo-push-drawer" heading="Application details" width="260px">
    <goa-text as="h4" size="heading-xs" mb="s" mt="none">Applicant name</goa-text>
    <goa-text size="body-m" mt="none">Jane Smith</goa-text>
    <goa-text as="h4" size="heading-xs" mb="s" mt="none">File number</goa-text>
    <goa-text size="body-m" mt="none">24567-9876</goa-text>
    <goa-text as="h4" size="heading-xs" mb="s" mt="none">Status</goa-text>
    <goa-badge version="2" type="success" content="Approved"></goa-badge>
    <goa-text as="h4" size="heading-xs" mb="s" mt="m">Submitted</goa-text>
    <goa-text size="body-m" mt="none">January 15, 2025</goa-text>
  </goa-push-drawer>
</div>
<script>${pushDrawerScript}</script>`,
      },
    },
    {
      id: "custom-width",
      name: "Custom width",
      description: "Push drawer with a custom width",
      code: {
        react: {
          ts: reactDrawerSetup,
          jsx: `<div style={{ display: "flex", minHeight: "320px" }}>
  <div style={{ flex: 1, minWidth: 0 }}>
    <GoabButton onClick={() => setIsOpen(true)}>Open push drawer</GoabButton>
  </div>
  <GoabPushDrawer heading="Case notes" width="600px" open={isOpen} onClose={handleClose}>
    <GoabText tag="h4" size="heading-xs" mb="s" mt="none">Officer</GoabText>
    <GoabText size="body-m" mt="none">Const. M. Roberts, Badge #4412</GoabText>
    <GoabText tag="h4" size="heading-xs" mb="s" mt="none">Date</GoabText>
    <GoabText size="body-m" mt="none">February 3, 2025</GoabText>
    <GoabText tag="h4" size="heading-xs" mb="s" mt="none">Notes</GoabText>
    <GoabText size="body-m" mt="none">Applicant provided updated documentation. Reviewed supporting evidence and confirmed eligibility criteria are met. Forwarded to supervisor for final approval.</GoabText>
  </GoabPushDrawer>
</div>`,
        },
        angular: {
          ts: angularDrawerSetup,
          template: `<div style="display: flex; min-height: 320px">
  <div style="flex: 1; min-width: 0">
    <goab-button (onClick)="openDrawer()">Open push drawer</goab-button>
  </div>
  <goab-push-drawer heading="Case notes" width="600px" [open]="isOpen" (onClose)="handleClose()">
    <goab-text tag="h4" size="heading-xs" mb="s" mt="none">Officer</goab-text>
    <goab-text size="body-m" mt="none">Const. M. Roberts, Badge #4412</goab-text>
    <goab-text tag="h4" size="heading-xs" mb="s" mt="none">Date</goab-text>
    <goab-text size="body-m" mt="none">February 3, 2025</goab-text>
    <goab-text tag="h4" size="heading-xs" mb="s" mt="none">Notes</goab-text>
    <goab-text size="body-m" mt="none">Applicant provided updated documentation. Reviewed supporting evidence and confirmed eligibility criteria are met. Forwarded to supervisor for final approval.</goab-text>
  </goab-push-drawer>
</div>`,
        },
        webComponents: `<div style="display: flex; min-height: 320px;">
  <div style="flex: 1; min-width: 0; display: flex; align-items: center; justify-content: center;">
    <goa-button version="2" id="open-push-drawer">Open push drawer</goa-button>
  </div>
  <goa-push-drawer version="2" id="demo-push-drawer" heading="Case notes" width="600px">
    <goa-text as="h4" size="heading-xs" mb="s" mt="none">Officer</goa-text>
    <goa-text size="body-m" mt="none">Const. M. Roberts, Badge #4412</goa-text>
    <goa-text as="h4" size="heading-xs" mb="s" mt="none">Date</goa-text>
    <goa-text size="body-m" mt="none">February 3, 2025</goa-text>
    <goa-text as="h4" size="heading-xs" mb="s" mt="none">Notes</goa-text>
    <goa-text size="body-m" mt="none">Applicant provided updated documentation. Reviewed supporting evidence and confirmed eligibility criteria are met. Forwarded to supervisor for final approval.</goa-text>
  </goa-push-drawer>
</div>
<script>${pushDrawerScript}</script>`,
      },
    },
    {
      id: "with-actions",
      name: "With actions",
      description: "Push drawer with footer actions",
      code: {
        react: {
          ts: reactDrawerSetup,
          jsx: `<div style={{ display: "flex", minHeight: "320px" }}>
  <div style={{ flex: 1, minWidth: 0 }}>
    <GoabButton onClick={() => setIsOpen(true)}>Open push drawer</GoabButton>
  </div>
  <GoabPushDrawer
    heading="Edit notification preferences"
    width="280px"
    open={isOpen}
    onClose={handleClose}
    actions={
      <GoabButtonGroup alignment="start">
        <GoabButton size="compact">Save</GoabButton>
        <GoabButton type="secondary" size="compact">Cancel</GoabButton>
      </GoabButtonGroup>
    }
  >
    <GoabFormItem label="Email notifications">
      <GoabCheckboxList name="email-notifications" value={["updates", "deadlines"]}>
        <GoabCheckbox name="updates" text="Case status updates" />
        <GoabCheckbox name="deadlines" text="Upcoming deadlines" />
        <GoabCheckbox name="assignments" text="New assignments" />
      </GoabCheckboxList>
    </GoabFormItem>
  </GoabPushDrawer>
</div>`,
        },
        angular: {
          ts: angularDrawerSetupWithCheckbox,
          template: `<div style="display: flex; min-height: 320px">
  <div style="flex: 1; min-width: 0">
    <goab-button (onClick)="openDrawer()">Open push drawer</goab-button>
  </div>
  <goab-push-drawer
    heading="Edit notification preferences"
    width="280px"
    [open]="isOpen"
    (onClose)="handleClose()"
    [actions]="pushDrawerActions"
  >
    <goab-form-item label="Email notifications">
      <goab-checkbox-list name="email-notifications" [value]="checkboxListValues">
        <goab-checkbox name="updates" text="Case status updates"></goab-checkbox>
        <goab-checkbox name="deadlines" text="Upcoming deadlines"></goab-checkbox>
        <goab-checkbox name="assignments" text="New assignments"></goab-checkbox>
      </goab-checkbox-list>
    </goab-form-item>
  </goab-push-drawer>
</div>

<ng-template #pushDrawerActions>
  <goab-button-group alignment="start">
    <goab-button size="compact">Save</goab-button>
    <goab-button type="secondary" size="compact">Cancel</goab-button>
  </goab-button-group>
</ng-template>`,
        },
        webComponents: `<div style="display: flex; min-height: 320px;">
  <div style="flex: 1; min-width: 0; display: flex; align-items: center; justify-content: center;">
    <goa-button version="2" id="open-push-drawer">Open push drawer</goa-button>
  </div>
  <goa-push-drawer version="2" id="demo-push-drawer" heading="Edit notification preferences" width="280px">
    <goa-form-item version="2" label="Email notifications">
      <goa-checkbox-list name="email-notifications" value="updates,deadlines">
        <goa-checkbox version="2" name="updates" text="Case status updates"></goa-checkbox>
        <goa-checkbox version="2" name="deadlines" text="Upcoming deadlines"></goa-checkbox>
        <goa-checkbox version="2" name="assignments" text="New assignments"></goa-checkbox>
      </goa-checkbox-list>
    </goa-form-item>
    <goa-button-group slot="actions" alignment="start">
      <goa-button version="2" size="compact">Save</goa-button>
      <goa-button version="2" type="secondary" size="compact">Cancel</goa-button>
    </goa-button-group>
  </goa-push-drawer>
</div>
<script>${pushDrawerScript}</script>`,
      },
    },
    {
      id: "long-content",
      name: "Long content",
      description:
        "Content that exceeds the drawer height scrolls while the header and actions stay pinned",
      code: {
        react: {
          ts: reactDrawerSetup,
          jsx: `<div style={{ display: "flex", minHeight: "320px" }}>
  <div style={{ flex: 1, minWidth: 0 }}>
    <GoabButton onClick={() => setIsOpen(true)}>Open push drawer</GoabButton>
  </div>
  <GoabPushDrawer
    heading="Case history"
    width="320px"
    open={isOpen}
    onClose={handleClose}
    actions={
      <GoabButtonGroup alignment="start">
        <GoabButton size="compact">Export</GoabButton>
        <GoabButton type="secondary" size="compact">Close</GoabButton>
      </GoabButtonGroup>
    }
  >
    <GoabText tag="h4" size="heading-xs" mb="s" mt="none">Jan 15, 2025</GoabText>
  <GoabText size="body-m" mt="none">Application received. Initial review completed by intake officer. All required documents present.</GoabText>
  <GoabText tag="h4" size="heading-xs" mb="s" mt="l">Feb 3, 2025</GoabText>
  <GoabText size="body-m" mt="none">Background check initiated. Applicant contacted for additional verification of employment history.</GoabText>
  <GoabText tag="h4" size="heading-xs" mb="s" mt="l">Feb 18, 2025</GoabText>
  <GoabText size="body-m" mt="none">Employment verification received. Forwarded to senior reviewer for assessment.</GoabText>
  <GoabText tag="h4" size="heading-xs" mb="s" mt="l">Mar 1, 2025</GoabText>
  <GoabText size="body-m" mt="none">Senior review complete. Recommendation for approval pending supervisor sign-off.</GoabText>
  <GoabText tag="h4" size="heading-xs" mb="s" mt="l">Mar 10, 2025</GoabText>
  <GoabText size="body-m" mt="none">Supervisor approved. Final documentation prepared for applicant notification.</GoabText>
  <GoabText tag="h4" size="heading-xs" mb="s" mt="l">Mar 12, 2025</GoabText>
    <GoabText size="body-m" mt="none">Approval letter sent to applicant via registered mail. Case marked as complete.</GoabText>
  </GoabPushDrawer>
</div>`,
        },
        angular: {
          ts: angularDrawerSetup,
          template: `<div style="display: flex; min-height: 320px">
  <div style="flex: 1; min-width: 0">
    <goab-button (onClick)="openDrawer()">Open push drawer</goab-button>
  </div>
  <goab-push-drawer
    heading="Case history"
    width="320px"
    [open]="isOpen"
    (onClose)="handleClose()"
    [actions]="pushDrawerActions"
  >
    <goab-text tag="h4" size="heading-xs" mb="s" mt="none">Jan 15, 2025</goab-text>
  <goab-text size="body-m" mt="none">Application received. Initial review completed by intake officer. All required documents present.</goab-text>
  <goab-text tag="h4" size="heading-xs" mb="s" mt="l">Feb 3, 2025</goab-text>
  <goab-text size="body-m" mt="none">Background check initiated. Applicant contacted for additional verification of employment history.</goab-text>
  <goab-text tag="h4" size="heading-xs" mb="s" mt="l">Feb 18, 2025</goab-text>
  <goab-text size="body-m" mt="none">Employment verification received. Forwarded to senior reviewer for assessment.</goab-text>
  <goab-text tag="h4" size="heading-xs" mb="s" mt="l">Mar 1, 2025</goab-text>
  <goab-text size="body-m" mt="none">Senior review complete. Recommendation for approval pending supervisor sign-off.</goab-text>
  <goab-text tag="h4" size="heading-xs" mb="s" mt="l">Mar 10, 2025</goab-text>
  <goab-text size="body-m" mt="none">Supervisor approved. Final documentation prepared for applicant notification.</goab-text>
  <goab-text tag="h4" size="heading-xs" mb="s" mt="l">Mar 12, 2025</goab-text>
    <goab-text size="body-m" mt="none">Approval letter sent to applicant via registered mail. Case marked as complete.</goab-text>
  </goab-push-drawer>
</div>

<ng-template #pushDrawerActions>
  <goab-button-group alignment="start">
    <goab-button size="compact">Export</goab-button>
    <goab-button type="secondary" size="compact">Close</goab-button>
  </goab-button-group>
</ng-template>`,
        },
        webComponents: `<div style="display: flex; min-height: 320px;">
  <div style="flex: 1; min-width: 0; display: flex; align-items: center; justify-content: center;">
    <goa-button version="2" id="open-push-drawer">Open push drawer</goa-button>
  </div>
  <goa-push-drawer version="2" id="demo-push-drawer" heading="Case history" width="320px">
    <goa-text as="h4" size="heading-xs" mb="s" mt="none">Jan 15, 2025</goa-text>
    <goa-text size="body-m" mt="none">Application received. Initial review completed by intake officer. All required documents present.</goa-text>
    <goa-text as="h4" size="heading-xs" mb="s" mt="l">Feb 3, 2025</goa-text>
    <goa-text size="body-m" mt="none">Background check initiated. Applicant contacted for additional verification of employment history.</goa-text>
    <goa-text as="h4" size="heading-xs" mb="s" mt="l">Feb 18, 2025</goa-text>
    <goa-text size="body-m" mt="none">Employment verification received. Forwarded to senior reviewer for assessment.</goa-text>
    <goa-text as="h4" size="heading-xs" mb="s" mt="l">Mar 1, 2025</goa-text>
    <goa-text size="body-m" mt="none">Senior review complete. Recommendation for approval pending supervisor sign-off.</goa-text>
    <goa-text as="h4" size="heading-xs" mb="s" mt="l">Mar 10, 2025</goa-text>
    <goa-text size="body-m" mt="none">Supervisor approved. Final documentation prepared for applicant notification.</goa-text>
    <goa-text as="h4" size="heading-xs" mb="s" mt="l">Mar 12, 2025</goa-text>
    <goa-text size="body-m" mt="none">Approval letter sent to applicant via registered mail. Case marked as complete.</goa-text>
    <goa-button-group slot="actions" alignment="start">
      <goa-button version="2" size="compact">Export</goa-button>
      <goa-button version="2" type="secondary" size="compact">Close</goa-button>
    </goa-button-group>
  </goa-push-drawer>
</div>
<script>${pushDrawerScript}</script>`,
      },
    },
  ],
};
