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

export const pushDrawerConfigurations: ComponentConfigurations = {
  componentSlug: "push-drawer",
  componentName: "Push Drawer",
  defaultConfigurationId: "basic",

  configurations: [
    {
      id: "basic",
      name: "Basic push drawer",
      description: "Opens from the right, pushing page content aside",
      code: {
        react: `<GoabxPushDrawer heading="Application details" width="260px" open={isOpen} onClose={handleClose}>
  <GoabText tag="h4" size="heading-xs" mb="s" mt="none">Applicant name</GoabText>
  <GoabText size="body-m" mt="none">Jane Smith</GoabText>
  <GoabText tag="h4" size="heading-xs" mb="s" mt="none">File number</GoabText>
  <GoabText size="body-m" mt="none">24567-9876</GoabText>
  <GoabText tag="h4" size="heading-xs" mb="s" mt="none">Status</GoabText>
  <GoabxBadge type="success" content="Approved" />
  <GoabText tag="h4" size="heading-xs" mb="s" mt="m">Submitted</GoabText>
  <GoabText size="body-m" mt="none">January 15, 2025</GoabText>
</GoabxPushDrawer>`,
        angular: `<goabx-push-drawer heading="Application details" width="260px" [open]="isOpen" (onClose)="handleClose()">
  <goab-text tag="h4" size="heading-xs" mb="s" mt="none">Applicant name</goab-text>
  <goab-text size="body-m" mt="none">Jane Smith</goab-text>
  <goab-text tag="h4" size="heading-xs" mb="s" mt="none">File number</goab-text>
  <goab-text size="body-m" mt="none">24567-9876</goab-text>
  <goab-text tag="h4" size="heading-xs" mb="s" mt="none">Status</goab-text>
  <goab-badge version="2" type="success" content="Approved"></goab-badge>
  <goab-text tag="h4" size="heading-xs" mb="s" mt="m">Submitted</goab-text>
  <goab-text size="body-m" mt="none">January 15, 2025</goab-text>
</goabx-push-drawer>`,
        webComponents: `<div style="display: flex; min-height: 320px;">
  <div style="flex: 1; min-width: 0; display: flex; align-items: center; justify-content: center;">
    <goa-button version="2" id="open-push-drawer">Open push drawer</goa-button>
  </div>
  <goa-push-drawer version="2" id="demo-push-drawer" heading="Application details" width="260px">
    <goa-text tag="h4" size="heading-xs" mb="s" mt="none">Applicant name</goa-text>
    <goa-text size="body-m" mt="none">Jane Smith</goa-text>
    <goa-text tag="h4" size="heading-xs" mb="s" mt="none">File number</goa-text>
    <goa-text size="body-m" mt="none">24567-9876</goa-text>
    <goa-text tag="h4" size="heading-xs" mb="s" mt="none">Status</goa-text>
    <goa-badge version="2" type="success" content="Approved"></goa-badge>
    <goa-text tag="h4" size="heading-xs" mb="s" mt="m">Submitted</goa-text>
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
        react: `<GoabxPushDrawer heading="Case notes" width="600px" open={isOpen} onClose={handleClose}>
  <GoabText tag="h4" size="heading-xs" mb="s" mt="none">Officer</GoabText>
  <GoabText size="body-m" mt="none">Const. M. Roberts, Badge #4412</GoabText>
  <GoabText tag="h4" size="heading-xs" mb="s" mt="none">Date</GoabText>
  <GoabText size="body-m" mt="none">February 3, 2025</GoabText>
  <GoabText tag="h4" size="heading-xs" mb="s" mt="none">Notes</GoabText>
  <GoabText size="body-m" mt="none">Applicant provided updated documentation. Reviewed supporting evidence and confirmed eligibility criteria are met. Forwarded to supervisor for final approval.</GoabText>
</GoabxPushDrawer>`,
        angular: `<goabx-push-drawer heading="Case notes" width="600px" [open]="isOpen" (onClose)="handleClose()">
  <goab-text tag="h4" size="heading-xs" mb="s" mt="none">Officer</goab-text>
  <goab-text size="body-m" mt="none">Const. M. Roberts, Badge #4412</goab-text>
  <goab-text tag="h4" size="heading-xs" mb="s" mt="none">Date</goab-text>
  <goab-text size="body-m" mt="none">February 3, 2025</goab-text>
  <goab-text tag="h4" size="heading-xs" mb="s" mt="none">Notes</goab-text>
  <goab-text size="body-m" mt="none">Applicant provided updated documentation. Reviewed supporting evidence and confirmed eligibility criteria are met. Forwarded to supervisor for final approval.</goab-text>
</goabx-push-drawer>`,
        webComponents: `<div style="display: flex; min-height: 320px;">
  <div style="flex: 1; min-width: 0; display: flex; align-items: center; justify-content: center;">
    <goa-button version="2" id="open-push-drawer">Open push drawer</goa-button>
  </div>
  <goa-push-drawer version="2" id="demo-push-drawer" heading="Case notes" width="600px">
    <goa-text tag="h4" size="heading-xs" mb="s" mt="none">Officer</goa-text>
    <goa-text size="body-m" mt="none">Const. M. Roberts, Badge #4412</goa-text>
    <goa-text tag="h4" size="heading-xs" mb="s" mt="none">Date</goa-text>
    <goa-text size="body-m" mt="none">February 3, 2025</goa-text>
    <goa-text tag="h4" size="heading-xs" mb="s" mt="none">Notes</goa-text>
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
        react: `<GoabxPushDrawer
  heading="Edit notification preferences"
  width="280px"
  open={isOpen}
  onClose={handleClose}
  actions={
    <GoabButtonGroup alignment="start">
      <GoabxButton size="compact">Save</GoabxButton>
      <GoabxButton type="secondary" size="compact">Cancel</GoabxButton>
    </GoabButtonGroup>
  }
>
  <GoabxFormItem label="Email notifications">
    <GoabxCheckboxList name="email-notifications" value={["updates", "deadlines"]}>
      <GoabxCheckbox name="updates" text="Case status updates" />
      <GoabxCheckbox name="deadlines" text="Upcoming deadlines" />
      <GoabxCheckbox name="assignments" text="New assignments" />
    </GoabxCheckboxList>
  </GoabxFormItem>
</GoabxPushDrawer>`,
        angular: `<goabx-push-drawer
  heading="Edit notification preferences"
  width="280px"
  [open]="isOpen"
  (onClose)="handleClose()"
  [actions]="pushDrawerActions"
>
  <goabx-form-item label="Email notifications">
    <goabx-checkbox-list name="email-notifications" [value]="checkboxListValues">
      <goabx-checkbox name="updates" text="Case status updates"></goabx-checkbox>
      <goabx-checkbox name="deadlines" text="Upcoming deadlines"></goabx-checkbox>
      <goabx-checkbox name="assignments" text="New assignments"></goabx-checkbox>
    </goabx-checkbox-list>
  </goabx-form-item>
</goabx-push-drawer>

<ng-template #pushDrawerActions>
  <goab-button-group alignment="start">
    <goabx-button size="compact">Save</goabx-button>
    <goabx-button type="secondary" size="compact">Cancel</goabx-button>
  </goab-button-group>
</ng-template>`,
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
  ],
};
