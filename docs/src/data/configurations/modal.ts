/**
 * Modal Component Configurations
 *
 * Modals display content in a layer above the page.
 */

import type { ComponentConfigurations } from "./types";

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
  componentSlug: "modal",
  componentName: "Modal",
  defaultConfigurationId: "basic",

  configurations: [
    {
      id: "basic",
      name: "Basic modal",
      description: "Simple modal with heading and content",
      code: {
        react: `<GoabModal heading="Confirm action" open={isOpen}>
  <p>Are you sure you want to proceed with this action?</p>
  <GoabButtonGroup alignment="end" mt="l">
    <GoabButton type="secondary" size="compact" onClick={handleClose}>Cancel</GoabButton>
    <GoabButton size="compact" onClick={handleConfirm}>Confirm</GoabButton>
  </GoabButtonGroup>
</GoabModal>`,
        angular: `<goab-modal heading="Confirm action" [open]="isOpen">
  <p>Are you sure you want to proceed with this action?</p>
  <goab-button-group alignment="end" mt="l">
    <goab-button type="secondary" size="compact" (onClick)="handleClose()">Cancel</goab-button>
    <goab-button size="compact" (onClick)="handleConfirm()">Confirm</goab-button>
  </goab-button-group>
</goab-modal>`,
        webComponents: `<goa-button version="2" id="open-modal">Open modal</goa-button>
<goa-modal version="2" id="demo-modal" heading="Confirm action">
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
      id: "dismissable",
      name: "Dismissable",
      description: "Modal with close button and backdrop dismiss",
      code: {
        react: `<GoabModal heading="Information" open={isOpen} onClose={handleClose}>
  <p>You can close this modal with the X button or by clicking the backdrop.</p>
</GoabModal>`,
        angular: `<goab-modal heading="Information" [open]="isOpen" [closable]="true" (onClose)="handleClose()">
  <p>You can close this modal with the X button or by clicking the backdrop.</p>
</goab-modal>`,
        webComponents: `<goa-button version="2" id="open-modal">Open modal</goa-button>
<goa-modal version="2" id="demo-modal" heading="Information" closable>
  <p>You can close this modal with the X button or by clicking the backdrop.</p>
</goa-modal>
<script>${modalScript}</script>`,
      },
    },
    {
      id: "destructive-action",
      name: "Destructive action",
      description: "Confirmation modal for destructive actions",
      code: {
        react: `<GoabModal heading="Are you sure you want to delete this item?" open={isOpen} calloutVariant="emergency">
  <p>This action cannot be undone. The item will be permanently removed.</p>
  <GoabButtonGroup alignment="end" mt="l">
    <GoabButton type="secondary" size="compact" onClick={handleClose}>Cancel</GoabButton>
    <GoabButton variant="destructive" size="compact" onClick={handleDelete}>Delete</GoabButton>
  </GoabButtonGroup>
</GoabModal>`,
        angular: `<goab-modal heading="Are you sure you want to delete this item?" [open]="isOpen" calloutVariant="emergency">
  <p>This action cannot be undone. The item will be permanently removed.</p>
  <goab-button-group alignment="end" mt="l">
    <goab-button type="secondary" size="compact" (onClick)="handleClose()">Cancel</goab-button>
    <goab-button variant="destructive" size="compact" (onClick)="handleDelete()">Delete</goab-button>
  </goab-button-group>
</goab-modal>`,
        webComponents: `<goa-button version="2" id="open-modal">Open modal</goa-button>
<goa-modal version="2" id="demo-modal" heading="Are you sure you want to delete this item?" calloutvariant="emergency">
  <p>This action cannot be undone. The item will be permanently removed.</p>
  <goa-button-group alignment="end" mt="l">
    <goa-button version="2" type="secondary" size="compact">Cancel</goa-button>
    <goa-button version="2" variant="destructive" size="compact">Delete</goa-button>
  </goa-button-group>
</goa-modal>
<script>${modalScript}</script>`,
      },
    },
    {
      id: "callout-important",
      name: "Important callout",
      description: "Modal with important callout header",
      code: {
        react: `<GoabModal heading="Your session is about to expire" open={isOpen} calloutVariant="important">
  <p>You will be logged out in 5 minutes due to inactivity.</p>
  <GoabButtonGroup alignment="end" mt="l">
    <GoabButton size="compact" onClick={handleExtend}>Stay logged in</GoabButton>
  </GoabButtonGroup>
</GoabModal>`,
        angular: `<goab-modal heading="Your session is about to expire" [open]="isOpen" calloutVariant="important">
  <p>You will be logged out in 5 minutes due to inactivity.</p>
  <goab-button-group alignment="end" mt="l">
    <goab-button size="compact" (onClick)="handleExtend()">Stay logged in</goab-button>
  </goab-button-group>
</goab-modal>`,
        webComponents: `<goa-button version="2" id="open-modal">Open modal</goa-button>
<goa-modal version="2" id="demo-modal" heading="Your session is about to expire" calloutvariant="important">
  <p>You will be logged out in 5 minutes due to inactivity.</p>
  <goa-button-group alignment="end" mt="l">
    <goa-button version="2" size="compact">Stay logged in</goa-button>
  </goa-button-group>
</goa-modal>
<script>${modalScript}</script>`,
      },
    },
    {
      id: "callout-information",
      name: "Information callout",
      description: "Modal with information callout header",
      code: {
        react: `<GoabModal heading="New features available" open={isOpen} calloutVariant="information" onClose={handleClose}>
  <p>We have updated the application with new features. Review the changes to get started.</p>
</GoabModal>`,
        angular: `<goab-modal heading="New features available" [open]="isOpen" [closable]="true" calloutVariant="information" (onClose)="handleClose()">
  <p>We have updated the application with new features. Review the changes to get started.</p>
</goab-modal>`,
        webComponents: `<goa-button version="2" id="open-modal">Open modal</goa-button>
<goa-modal version="2" id="demo-modal" heading="New features available" closable calloutvariant="information">
  <p>We have updated the application with new features. Review the changes to get started.</p>
</goa-modal>
<script>${modalScript}</script>`,
      },
    },
    {
      id: "callout-success",
      name: "Success callout",
      description: "Modal with success callout header",
      code: {
        react: `<GoabModal heading="Application submitted" open={isOpen} calloutVariant="success" onClose={handleClose}>
  <p>Your application has been successfully submitted. You will receive a confirmation email shortly.</p>
</GoabModal>`,
        angular: `<goab-modal heading="Application submitted" [open]="isOpen" [closable]="true" calloutVariant="success" (onClose)="handleClose()">
  <p>Your application has been successfully submitted. You will receive a confirmation email shortly.</p>
</goab-modal>`,
        webComponents: `<goa-button version="2" id="open-modal">Open modal</goa-button>
<goa-modal version="2" id="demo-modal" heading="Application submitted" closable calloutvariant="success">
  <p>Your application has been successfully submitted. You will receive a confirmation email shortly.</p>
</goa-modal>
<script>${modalScript}</script>`,
      },
    },
    {
      id: "callout-event",
      name: "Event callout",
      description: "Modal with event callout header",
      code: {
        react: `<GoabModal heading="Scheduled maintenance" open={isOpen} calloutVariant="event" onClose={handleClose}>
  <p>The system will be unavailable on March 28 from 10:00 PM to 2:00 AM for scheduled maintenance.</p>
</GoabModal>`,
        angular: `<goab-modal heading="Scheduled maintenance" [open]="isOpen" [closable]="true" calloutVariant="event" (onClose)="handleClose()">
  <p>The system will be unavailable on March 28 from 10:00 PM to 2:00 AM for scheduled maintenance.</p>
</goab-modal>`,
        webComponents: `<goa-button version="2" id="open-modal">Open modal</goa-button>
<goa-modal version="2" id="demo-modal" heading="Scheduled maintenance" closable calloutvariant="event">
  <p>The system will be unavailable on March 28 from 10:00 PM to 2:00 AM for scheduled maintenance.</p>
</goa-modal>
<script>${modalScript}</script>`,
      },
    },
    {
      id: "custom-width",
      name: "Custom width",
      description: "Modal with specified maximum width",
      code: {
        react: `<GoabModal heading="Wide modal" open={isOpen} maxWidth="80ch" onClose={handleClose}>
  <p>This modal has a wider maximum width for more content.</p>
</GoabModal>`,
        angular: `<goab-modal heading="Wide modal" [open]="isOpen" maxWidth="80ch" [closable]="true" (onClose)="handleClose()">
  <p>This modal has a wider maximum width for more content.</p>
</goab-modal>`,
        webComponents: `<goa-button version="2" id="open-modal">Open modal</goa-button>
<goa-modal version="2" id="demo-modal" heading="Wide modal" maxwidth="80ch" closable>
  <p>This modal has a wider maximum width for more content.</p>
</goa-modal>
<script>${modalScript}</script>`,
      },
    },
  ],
};
