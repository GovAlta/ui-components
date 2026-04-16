/**
 * Shared preview style/wrapper templates for ConfigurationPreview.
 *
 * Use these when a component is meant to be seen inside a larger product layout
 * (e.g. work-side-menu and notification panel sit next to a workspace area).
 *
 * - previewStyle: CSS applied to the preview container (replaces inline cssText).
 * - previewWrapper: HTML around the component. `{{slot}}` is replaced with the
 *   component code at render time. Only used in the preview, never in the code
 *   snippet shown to users.
 */

export const workspacePreviewStyle =
  "background: var(--goa-color-greyscale-50, #f8f8f8); padding: 0; display: flex; min-height: 500px;";

export const workspacePreviewWrapper = `<div style="height:100%;margin-bottom:1.5rem;">{{slot}}</div>
<div style="flex:1;padding:1rem 1rem 1rem 0;">
  <div style="background:var(--goa-color-greyscale-white, white);border-radius:2rem;padding:2rem;height:100%;box-sizing:border-box;border:1px solid var(--goa-color-greyscale-150,#e0e0e0);">
    <h2 style="margin:0 0 1rem;font:var(--goa-typography-heading-m);">Dashboard</h2>
    <p style="color:var(--goa-color-text-secondary,#666);font:var(--goa-typography-body-m);">Welcome back.</p>
  </div>
</div>`;
