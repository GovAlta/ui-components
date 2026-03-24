/**
 * Drawer Component Configurations
 *
 * Drawers slide in from the side of the screen.
 */

import type { ComponentConfigurations } from "./types";

const drawerScript = `
document.getElementById('open-drawer').addEventListener('click', () => {
  document.getElementById('demo-drawer').setAttribute('open', 'true');
});
document.getElementById('demo-drawer').addEventListener('_close', (e) => {
  e.target.removeAttribute('open');
});
`;

export const drawerConfigurations: ComponentConfigurations = {
  componentSlug: "drawer",
  componentName: "Drawer",
  defaultConfigurationId: "basic",

  configurations: [
    {
      id: "basic",
      name: "Basic drawer",
      description: "Simple drawer from right side",
      code: {
        react: `<GoabDrawer heading="Application details" position="right" open={isOpen} onClose={handleClose}>
  <p>Use a drawer to display supplementary content or actions without navigating away from the current page.</p>
  <p>Drawers are useful for:</p>
  <ul>
    <li>Viewing detailed information about a selected item</li>
    <li>Editing settings or preferences</li>
    <li>Completing a quick task related to the main content</li>
  </ul>
</GoabDrawer>`,
        angular: `<goab-drawer heading="Application details" position="right" [open]="isOpen" (onClose)="handleClose()">
  <p>Use a drawer to display supplementary content or actions without navigating away from the current page.</p>
  <p>Drawers are useful for:</p>
  <ul>
    <li>Viewing detailed information about a selected item</li>
    <li>Editing settings or preferences</li>
    <li>Completing a quick task related to the main content</li>
  </ul>
</goab-drawer>`,
        webComponents: `<goa-button version="2" id="open-drawer">Open drawer</goa-button>
<goa-drawer version="2" id="demo-drawer" heading="Application details" position="right">
  <p>Use a drawer to display supplementary content or actions without navigating away from the current page.</p>
  <p>Drawers are useful for:</p>
  <ul>
    <li>Viewing detailed information about a selected item</li>
    <li>Editing settings or preferences</li>
    <li>Completing a quick task related to the main content</li>
  </ul>
</goa-drawer>
<script>${drawerScript}</script>`,
      },
    },
    {
      id: "position-bottom",
      name: "Bottom position",
      description: "Drawer opening from the bottom of the screen",
      code: {
        react: `<GoabDrawer heading="Bottom drawer" position="bottom" open={isOpen} onClose={handleClose}>
  <p>Opens from the bottom of the screen.</p>
</GoabDrawer>`,
        angular: `<goab-drawer heading="Bottom drawer" position="bottom" [open]="isOpen" (onClose)="handleClose()">
  <p>Opens from the bottom of the screen.</p>
</goab-drawer>`,
        webComponents: `<goa-button version="2" id="open-drawer">Open drawer</goa-button>
<goa-drawer version="2" id="demo-drawer" heading="Bottom drawer" position="bottom">
  <p>Opens from the bottom of the screen.</p>
</goa-drawer>
<script>${drawerScript}</script>`,
      },
    },
    {
      id: "position-left",
      name: "Left position",
      description: "Drawer opening from the left side",
      code: {
        react: `<GoabDrawer heading="Navigation" position="left" open={isOpen} onClose={handleClose}>
  <p>Opens from the left side of the screen.</p>
</GoabDrawer>`,
        angular: `<goab-drawer heading="Navigation" position="left" [open]="isOpen" (onClose)="handleClose()">
  <p>Opens from the left side of the screen.</p>
</goab-drawer>`,
        webComponents: `<goa-button version="2" id="open-drawer">Open drawer</goa-button>
<goa-drawer version="2" id="demo-drawer" heading="Navigation" position="left">
  <p>Opens from the left side of the screen.</p>
</goa-drawer>
<script>${drawerScript}</script>`,
      },
    },
    {
      id: "with-actions",
      name: "With actions",
      description: "Drawer with footer actions",
      code: {
        react: `<GoabDrawer heading="Edit settings" position="right" open={isOpen} onClose={handleClose} actions={
  <GoabButtonGroup alignment="end">
    <GoabButton size="compact" onClick={handleSave}>Save</GoabButton>
    <GoabButton type="tertiary" size="compact" onClick={handleClose}>Cancel</GoabButton>
  </GoabButtonGroup>
}>
  <p>Make changes to your settings here.</p>
</GoabDrawer>`,
        angular: `<goab-drawer heading="Edit settings" position="right" [open]="isOpen" (onClose)="handleClose()" [actions]="actionsTpl">
  <ng-template #actionsTpl>
    <goab-button-group alignment="end">
      <goab-button size="compact" (onClick)="handleSave()">Save</goab-button>
      <goab-button type="tertiary" size="compact" (onClick)="handleClose()">Cancel</goab-button>
    </goab-button-group>
  </ng-template>
  <p>Make changes to your settings here.</p>
</goab-drawer>`,
        webComponents: `<goa-button version="2" id="open-drawer">Open drawer</goa-button>
<goa-drawer version="2" id="demo-drawer" heading="Edit settings" position="right">
  <p>Make changes to your settings here.</p>
  <div slot="actions">
    <goa-button-group alignment="end">
      <goa-button version="2" type="primary" size="compact">Save</goa-button>
      <goa-button version="2" type="tertiary" size="compact">Cancel</goa-button>
    </goa-button-group>
  </div>
</goa-drawer>
<script>${drawerScript}</script>`,
      },
    },
    {
      id: "size-narrow",
      name: "Narrow size",
      description: "Narrow drawer for simple content",
      code: {
        react: `<GoabDrawer heading="Narrow drawer" position="right" maxSize="240px" open={isOpen} onClose={handleClose}>
  <p>Narrow width for simple content.</p>
</GoabDrawer>`,
        angular: `<goab-drawer heading="Narrow drawer" position="right" maxSize="240px" [open]="isOpen" (onClose)="handleClose()">
  <p>Narrow width for simple content.</p>
</goab-drawer>`,
        webComponents: `<goa-button version="2" id="open-drawer">Open drawer</goa-button>
<goa-drawer version="2" id="demo-drawer" heading="Narrow drawer" position="right" maxsize="240px">
  <p>Narrow width for simple content.</p>
</goa-drawer>
<script>${drawerScript}</script>`,
      },
    },
    {
      id: "size-wide",
      name: "Wide size",
      description: "Wide drawer for complex content",
      code: {
        react: `<GoabDrawer heading="Wide drawer" position="right" maxSize="600px" open={isOpen} onClose={handleClose}>
  <p>Wide width for more complex content.</p>
</GoabDrawer>`,
        angular: `<goab-drawer heading="Wide drawer" position="right" maxSize="600px" [open]="isOpen" (onClose)="handleClose()">
  <p>Wide width for more complex content.</p>
</goab-drawer>`,
        webComponents: `<goa-button version="2" id="open-drawer">Open drawer</goa-button>
<goa-drawer version="2" id="demo-drawer" heading="Wide drawer" position="right" maxsize="600px">
  <p>Wide width for more complex content.</p>
</goa-drawer>
<script>${drawerScript}</script>`,
      },
    },
  ],
};
