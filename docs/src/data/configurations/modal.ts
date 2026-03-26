/**
 * Modal Component Configurations
 *
 * Modals display content in a layer above the page.
 */

import type { ComponentConfigurations } from './types';

const modalScript = `
const modal = document.getElementById('demo-modal');
document.getElementById('open-modal').addEventListener('click', () => {
  modal.setAttribute('open', 'true');
});
modal.addEventListener('_close', () => {
  modal.removeAttribute('open');
});
// Close modal when any button inside is clicked
modal.querySelectorAll('goa-button').forEach(btn => {
  btn.addEventListener('_click', () => {
    modal.removeAttribute('open');
  });
});
`;

export const modalConfigurations: ComponentConfigurations = {
  componentSlug: 'modal',
  componentName: 'Modal',
  defaultConfigurationId: 'basic',

  configurations: [
    {
      id: 'basic',
      name: 'Basic modal',
      description: 'Simple modal with heading and content',
      code: {
        react: `<GoabModal heading="Confirm action" open={isOpen} closable onClose={handleClose}>
  <p>Are you sure you want to proceed with this action?</p>
  <GoabButtonGroup alignment="end" mt="l">
    <GoabButton type="secondary" size="compact" onClick={handleClose}>Cancel</GoabButton>
    <GoabButton size="compact" onClick={handleConfirm}>Confirm</GoabButton>
  </GoabButtonGroup>
</GoabModal>`,
        angular: `<goab-modal heading="Confirm action" [open]="isOpen" [closable]="true" (_close)="handleClose()">
  <p>Are you sure you want to proceed with this action?</p>
  <goab-button-group alignment="end" mt="l">
    <goab-button type="secondary" size="compact" (_click)="handleClose()">Cancel</goab-button>
    <goab-button size="compact" (_click)="handleConfirm()">Confirm</goab-button>
  </goab-button-group>
</goab-modal>`,
        webComponents: `<goa-button version="2" id="open-modal">Open modal</goa-button>
<goa-modal version="2" id="demo-modal" heading="Confirm action" closable>
  <p>Are you sure you want to proceed with this action?</p>
  <goa-button-group alignment="end" mt="l">
    <goa-button version="2" type="secondary" size="compact">Cancel</goa-button>
    <goa-button version="2" size="compact">Confirm</goa-button>
  </goa-button-group>
</goa-modal>
<script>${modalScript}</script>`,
      },
    },
    {
      id: 'with-transition',
      name: 'With transition',
      description: 'Modal with animated opening/closing',
      code: {
        react: `<GoabModal heading="Animated modal" open={isOpen} transition="fast" closable onClose={handleClose}>
  <p>This modal animates when opening and closing.</p>
</GoabModal>`,
        angular: `<goab-modal heading="Animated modal" [open]="isOpen" transition="fast" [closable]="true" (_close)="handleClose()">
  <p>This modal animates when opening and closing.</p>
</goab-modal>`,
        webComponents: `<goa-button version="2" id="open-modal">Open modal</goa-button>
<goa-modal version="2" id="demo-modal" heading="Animated modal" transition="fast" closable>
  <p>This modal animates when opening and closing.</p>
</goa-modal>
<script>${modalScript}</script>`,
      },
    },
    {
      id: 'custom-width',
      name: 'Custom width',
      description: 'Modal with specified maximum width',
      code: {
        react: `<GoabModal heading="Wide modal" open={isOpen} maxWidth="80ch" closable onClose={handleClose}>
  <p>This modal has a wider maximum width for more content.</p>
</GoabModal>`,
        angular: `<goab-modal heading="Wide modal" [open]="isOpen" maxWidth="80ch" [closable]="true" (_close)="handleClose()">
  <p>This modal has a wider maximum width for more content.</p>
</goab-modal>`,
        webComponents: `<goa-button version="2" id="open-modal">Open modal</goa-button>
<goa-modal version="2" id="demo-modal" heading="Wide modal" maxwidth="80ch" closable>
  <p>This modal has a wider maximum width for more content.</p>
</goa-modal>
<script>${modalScript}</script>`,
      },
    },
    {
      id: 'destructive-action',
      name: 'Destructive action',
      description: 'Confirmation modal for destructive actions',
      code: {
        react: `<GoabModal heading="Are you sure you want to delete this item?" open={isOpen} closable onClose={handleClose}>
  <p>This action cannot be undone. The item will be permanently removed.</p>
  <GoabButtonGroup alignment="end" mt="l">
    <GoabButton type="secondary" size="compact" onClick={handleClose}>Cancel</GoabButton>
    <GoabButton variant="destructive" size="compact" onClick={handleDelete}>Delete</GoabButton>
  </GoabButtonGroup>
</GoabModal>`,
        angular: `<goab-modal heading="Are you sure you want to delete this item?" [open]="isOpen" [closable]="true" (_close)="handleClose()">
  <p>This action cannot be undone. The item will be permanently removed.</p>
  <goab-button-group alignment="end" mt="l">
    <goab-button type="secondary" size="compact" (_click)="handleClose()">Cancel</goab-button>
    <goab-button variant="destructive" size="compact" (_click)="handleDelete()">Delete</goab-button>
  </goab-button-group>
</goab-modal>`,
        webComponents: `<goa-button version="2" id="open-modal">Open modal</goa-button>
<goa-modal version="2" id="demo-modal" heading="Are you sure you want to delete this item?" closable>
  <p>This action cannot be undone. The item will be permanently removed.</p>
  <goa-button-group alignment="end" mt="l">
    <goa-button version="2" type="secondary" size="compact">Cancel</goa-button>
    <goa-button version="2" variant="destructive" size="compact">Delete</goa-button>
  </goa-button-group>
</goa-modal>
<script>${modalScript}</script>`,
      },
    },
  ],
};
