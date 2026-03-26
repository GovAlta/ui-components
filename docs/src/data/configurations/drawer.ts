/**
 * Drawer Component Configurations
 *
 * Drawers slide in from the side of the screen.
 */

import type { ComponentConfigurations } from './types';

const drawerScript = `
document.getElementById('open-drawer').addEventListener('click', () => {
  document.getElementById('demo-drawer').setAttribute('open', 'true');
});
document.getElementById('demo-drawer').addEventListener('_close', (e) => {
  e.target.removeAttribute('open');
});
`;

export const drawerConfigurations: ComponentConfigurations = {
  componentSlug: 'drawer',
  componentName: 'Drawer',
  defaultConfigurationId: 'basic',

  configurations: [
    {
      id: 'basic',
      name: 'Basic drawer',
      description: 'Simple drawer from right side',
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
        angular: `<goab-drawer heading="Application details" position="right" [open]="isOpen" (_close)="handleClose()">
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
      id: 'position-bottom',
      name: 'Bottom position',
      description: 'Drawer opening from the bottom of the screen',
      code: {
        react: `<GoabDrawer heading="Bottom drawer" position="bottom" open={isOpen} onClose={handleClose}>
  <p>Opens from the bottom of the screen.</p>
</GoabDrawer>`,
        angular: `<goab-drawer heading="Bottom drawer" position="bottom" [open]="isOpen" (_close)="handleClose()">
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
      id: 'with-actions',
      name: 'With actions',
      description: 'Drawer with footer actions',
      code: {
        react: `<GoabDrawer heading="Edit settings" position="right" open={isOpen} onClose={handleClose}>
  <p>Make changes to your settings here.</p>
  <GoabButtonGroup slot="actions" alignment="end">
    <GoabButton type="secondary" onClick={handleClose}>Cancel</GoabButton>
    <GoabButton onClick={handleSave}>Save</GoabButton>
  </GoabButtonGroup>
</GoabDrawer>`,
        angular: `<goab-drawer heading="Edit settings" position="right" [open]="isOpen" (_close)="handleClose()">
  <p>Make changes to your settings here.</p>
  <goab-button-group slot="actions" alignment="end">
    <goab-button type="secondary" (_click)="handleClose()">Cancel</goab-button>
    <goab-button (_click)="handleSave()">Save</goab-button>
  </goab-button-group>
</goab-drawer>`,
        webComponents: `<goa-button version="2" id="open-drawer">Open drawer</goa-button>
<goa-drawer version="2" id="demo-drawer" heading="Edit settings" position="right">
  <p>Make changes to your settings here.</p>
  <goa-button-group slot="actions" alignment="end">
    <goa-button version="2" type="secondary">Cancel</goa-button>
    <goa-button version="2">Save</goa-button>
  </goa-button-group>
</goa-drawer>
<script>${drawerScript}</script>`,
      },
    },
    {
      id: 'size-narrow',
      name: 'Narrow size',
      description: 'Narrow drawer for simple content',
      code: {
        react: `<GoabDrawer heading="Narrow drawer" position="right" size="narrow" open={isOpen} onClose={handleClose}>
  <p>Narrow width for simple content.</p>
</GoabDrawer>`,
        angular: `<goab-drawer heading="Narrow drawer" position="right" size="narrow" [open]="isOpen" (_close)="handleClose()">
  <p>Narrow width for simple content.</p>
</goab-drawer>`,
        webComponents: `<goa-button version="2" id="open-drawer">Open drawer</goa-button>
<goa-drawer version="2" id="demo-drawer" heading="Narrow drawer" position="right" size="narrow">
  <p>Narrow width for simple content.</p>
</goa-drawer>
<script>${drawerScript}</script>`,
      },
    },
    {
      id: 'size-wide',
      name: 'Wide size',
      description: 'Wide drawer for complex content',
      code: {
        react: `<GoabDrawer heading="Wide drawer" position="right" size="wide" open={isOpen} onClose={handleClose}>
  <p>Wide width for more complex content.</p>
</GoabDrawer>`,
        angular: `<goab-drawer heading="Wide drawer" position="right" size="wide" [open]="isOpen" (_close)="handleClose()">
  <p>Wide width for more complex content.</p>
</goab-drawer>`,
        webComponents: `<goa-button version="2" id="open-drawer">Open drawer</goa-button>
<goa-drawer version="2" id="demo-drawer" heading="Wide drawer" position="right" size="wide">
  <p>Wide width for more complex content.</p>
</goa-drawer>
<script>${drawerScript}</script>`,
      },
    },
  ],
};
