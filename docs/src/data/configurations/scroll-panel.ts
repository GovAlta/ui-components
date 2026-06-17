/**
 * Scroll Panel Component Configurations
 *
 * Bounded container with sticky header / footer slots and a scrollable body.
 * Renders a subtle border on header/footer + inset shadows on content when the
 * body overflows, so users know there's more content above or below.
 */

import type { ComponentConfigurations } from "./types";

export const scrollPanelConfigurations: ComponentConfigurations = {
  componentSlug: "scroll-panel",
  componentName: "Scroll Panel",
  defaultConfigurationId: "basic",

  // ScrollPanel fills its parent — strip the sandbox's default padding so the
  // panel sits flush to the preview edges, matching how it appears in real use.
  previewStyle: "padding: 0;",

  configurations: [
    {
      id: "basic",
      name: "Basic scroll panel",
      description: "Header + scrollable body + footer with a fixed height.",
      code: {
        react: {
          ts: `const paragraphs = Array.from({ length: 15 }, (_, i) => i + 1);`,
          jsx: `<GoabScrollPanel
  height="480px"
  header={
    <div style={{ padding: "16px 24px" }}>
      <GoabText tag="h2" size="heading-m" mt="none" mb="none">
        Case details
      </GoabText>
    </div>
  }
  footer={
    <div style={{ padding: "12px 24px" }}>
      <GoabButtonGroup alignment="end">
        <GoabButton type="secondary" size="compact">Cancel</GoabButton>
        <GoabButton type="primary" size="compact">Save changes</GoabButton>
      </GoabButtonGroup>
    </div>
  }
>
  <div style={{ padding: "16px 24px" }}>
    {paragraphs.map((n) => (
      <p key={n}>
        Paragraph {n} — Scrollable body content. The panel will scroll inside its
        480px height, with sticky header and footer pinned. Notice the subtle
        border + inset shadow that appears when scrolling indicates more content.
      </p>
    ))}
  </div>
</GoabScrollPanel>`,
        },
        angular: {
          ts: `export class SomeComponent {
  paragraphs = Array.from({ length: 15 }, (_, i) => i + 1);
}`,
          template: `<ng-template #panelHeader>
  <div style="padding: 16px 24px">
    <goab-text tag="h2" size="heading-m" mt="none" mb="none">Case details</goab-text>
  </div>
</ng-template>
<ng-template #panelFooter>
  <div style="padding: 12px 24px">
    <goab-button-group alignment="end">
      <goab-button type="secondary" size="compact">Cancel</goab-button>
      <goab-button type="primary" size="compact">Save changes</goab-button>
    </goab-button-group>
  </div>
</ng-template>

<goab-scroll-panel height="480px" [header]="panelHeader" [footer]="panelFooter">
  <div style="padding: 16px 24px">
    @for (n of paragraphs; track n) {
      <p>
        Paragraph {{ n }} — Scrollable body content. The panel will scroll inside
        its 480px height, with sticky header and footer pinned. Notice the subtle
        border + inset shadow that appears when scrolling indicates more content.
      </p>
    }
  </div>
</goab-scroll-panel>`,
        },
        webComponents: `<goa-scroll-panel height="480px">
  <div slot="header" style="padding: 16px 24px">
    <goa-text tag="h2" size="heading-m" mt="none" mb="none">Case details</goa-text>
  </div>
  <div id="case-details-body" style="padding: 16px 24px"></div>
  <div slot="footer" style="padding: 12px 24px">
    <goa-button-group alignment="end">
      <goa-button type="secondary" size="compact" version="2">Cancel</goa-button>
      <goa-button type="primary" size="compact" version="2">Save changes</goa-button>
    </goa-button-group>
  </div>
</goa-scroll-panel>
<script>
  document.getElementById("case-details-body").innerHTML = Array.from(
    { length: 8 },
    (_, i) =>
      \`<p>Paragraph \${i + 1} — Scrollable body content. The panel will scroll inside its 480px height, with sticky header and footer pinned. Notice the subtle border + inset shadow that appears when scrolling indicates more content.</p>\`,
  ).join("");
</script>`,
      },
    },
    {
      id: "header-only",
      name: "Header only",
      description: "Sticky header pinned at the top with a scrollable body — no footer slot.",
      code: {
        react: {
          ts: `const rows = Array.from({ length: 12 }, (_, i) => i + 1);`,
          jsx: `<GoabScrollPanel
  height="320px"
  header={
    <div style={{ padding: "12px 24px" }}>
      <GoabText tag="h2" size="heading-s" mt="none" mb="none">
        Activity feed
      </GoabText>
    </div>
  }
>
  <div style={{ padding: "12px 24px" }}>
    {rows.map((n) => (
      <p key={n}>Row {n} — scroll me, header stays pinned at the top.</p>
    ))}
  </div>
</GoabScrollPanel>`,
        },
        angular: {
          ts: `export class SomeComponent {
  rows = Array.from({ length: 12 }, (_, i) => i + 1);
}`,
          template: `<ng-template #activityHeader>
  <div style="padding: 12px 24px">
    <goab-text tag="h2" size="heading-s" mt="none" mb="none">Activity feed</goab-text>
  </div>
</ng-template>

<goab-scroll-panel height="320px" [header]="activityHeader">
  <div style="padding: 12px 24px">
    @for (n of rows; track n) {
      <p>Row {{ n }} — scroll me, header stays pinned at the top.</p>
    }
  </div>
</goab-scroll-panel>`,
        },
        webComponents: `<goa-scroll-panel height="320px">
  <div slot="header" style="padding: 12px 24px">
    <goa-text tag="h2" size="heading-s" mt="none" mb="none">Activity feed</goa-text>
  </div>
  <div id="activity-feed-body" style="padding: 12px 24px"></div>
</goa-scroll-panel>
<script>
  document.getElementById("activity-feed-body").innerHTML = Array.from(
    { length: 12 },
    (_, i) => \`<p>Row \${i + 1} — scroll me, header stays pinned at the top.</p>\`,
  ).join("");
</script>`,
      },
    },
    {
      id: "footer-only",
      name: "Footer only",
      description: "Sticky footer pinned at the bottom with a scrollable body — no header slot.",
      code: {
        react: {
          ts: `const rows = Array.from({ length: 12 }, (_, i) => i + 1);`,
          jsx: `<GoabScrollPanel
  height="320px"
  footer={
    <div style={{ padding: "12px 24px" }}>
      <GoabButtonGroup alignment="end">
        <GoabButton type="primary" size="compact">
          Submit
        </GoabButton>
      </GoabButtonGroup>
    </div>
  }
>
  <div style={{ padding: "12px 24px" }}>
    {rows.map((n) => (
      <p key={n}>Row {n} — scroll me, footer stays pinned at the bottom.</p>
    ))}
  </div>
</GoabScrollPanel>`,
        },
        angular: {
          ts: `export class SomeComponent {
  rows = Array.from({ length: 12 }, (_, i) => i + 1);
}`,
          template: `<ng-template #submitFooter>
  <div style="padding: 12px 24px">
    <goab-button-group alignment="end">
      <goab-button type="primary" size="compact">Submit</goab-button>
    </goab-button-group>
  </div>
</ng-template>

<goab-scroll-panel height="320px" [footer]="submitFooter">
  <div style="padding: 12px 24px">
    @for (n of rows; track n) {
      <p>Row {{ n }} — scroll me, footer stays pinned at the bottom.</p>
    }
  </div>
</goab-scroll-panel>`,
        },
        webComponents: `<goa-scroll-panel height="320px">
  <div id="footer-only-body" style="padding: 12px 24px"></div>
  <div slot="footer" style="padding: 12px 24px">
    <goa-button-group alignment="end">
      <goa-button type="primary" size="compact" version="2">Submit</goa-button>
    </goa-button-group>
  </div>
</goa-scroll-panel>
<script>
  document.getElementById("footer-only-body").innerHTML = Array.from(
    { length: 12 },
    (_, i) => \`<p>Row \${i + 1} — scroll me, footer stays pinned at the bottom.</p>\`,
  ).join("");
</script>`,
      },
    },
    {
      id: "custom-height",
      name: "Custom height",
      description:
        "The `height` prop accepts any valid CSS height value (e.g. \"600px\", \"80vh\"). It defaults to \"100%\" so the panel can fill a height-constrained parent — useful when the panel is inside a div, modal, or drawer that already establishes the viewport bounds.",
      code: {
        react: {
          ts: `const rows = Array.from({ length: 20 }, (_, i) => i + 1);`,
          jsx: `<GoabScrollPanel
  height="600px"
  header={
    <div style={{ padding: "12px 24px" }}>
      <GoabText tag="h2" size="heading-s" mt="none" mb="none">
        Custom 600px height
      </GoabText>
    </div>
  }
  footer={
    <div style={{ padding: "12px 24px" }}>
      <span>Footer pinned at bottom</span>
    </div>
  }
>
  <div style={{ padding: "12px 24px" }}>
    {rows.map((n) => (
      <p key={n}>
        Row {n} — Body scrolls within the explicit 600px height. Swap to
        "80vh" for viewport-relative sizing, or leave the prop off (defaults
        to "100%") when a parent already constrains height.
      </p>
    ))}
  </div>
</GoabScrollPanel>`,
        },
        angular: {
          ts: `export class SomeComponent {
  rows = Array.from({ length: 20 }, (_, i) => i + 1);
}`,
          template: `<ng-template #panelHeader>
  <div style="padding: 12px 24px">
    <goab-text tag="h2" size="heading-s" mt="none" mb="none">Custom 600px height</goab-text>
  </div>
</ng-template>
<ng-template #panelFooter>
  <div style="padding: 12px 24px">
    <span>Footer pinned at bottom</span>
  </div>
</ng-template>

<goab-scroll-panel height="600px" [header]="panelHeader" [footer]="panelFooter">
  <div style="padding: 12px 24px">
    @for (n of rows; track n) {
      <p>
        Row {{ n }} — Body scrolls within the explicit 600px height. Swap to
        "80vh" for viewport-relative sizing, or leave the prop off (defaults
        to "100%") when a parent already constrains height.
      </p>
    }
  </div>
</goab-scroll-panel>`,
        },
        webComponents: `<goa-scroll-panel height="600px">
  <div slot="header" style="padding: 12px 24px">
    <goa-text tag="h2" size="heading-s" mt="none" mb="none">Custom 600px height</goa-text>
  </div>
  <div id="custom-height-body" style="padding: 12px 24px"></div>
  <div slot="footer" style="padding: 12px 24px">
    <span>Footer pinned at bottom</span>
  </div>
</goa-scroll-panel>
<script>
  document.getElementById("custom-height-body").innerHTML = Array.from(
    { length: 10 },
    (_, i) =>
      \`<p>Row \${i + 1} — Body scrolls within the explicit 600px height. Swap to "80vh" for viewport-relative sizing, or leave the height attribute off (defaults to "100%") when a parent already constrains height.</p>\`,
  ).join("");
</script>`,
      },
    },
  ],
};
