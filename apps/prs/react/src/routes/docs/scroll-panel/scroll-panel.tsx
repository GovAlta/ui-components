import {
  GoabButton,
  GoabButtonGroup,
  GoabScrollPanel,
  GoabText,
} from "@abgov/react-components";

const paragraphs = Array.from({ length: 15 }, (_, i) => i + 1);
const rows = Array.from({ length: 12 }, (_, i) => i + 1);
const tallRows = Array.from({ length: 20 }, (_, i) => i + 1);

export function DocsScrollPanelRoute() {
  return (
    <div>
      <h2>Scroll panel</h2>
      <p>
        Mirrors the documentation examples for <code>GoabScrollPanel</code>: a bounded
        container with sticky header / footer slots and a scrollable body.
      </p>

      <h3>Basic scroll panel</h3>
      <div style={{ marginBottom: "2rem" }}>
        <GoabScrollPanel
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
                <GoabButton type="secondary" size="compact">
                  Cancel
                </GoabButton>
                <GoabButton type="primary" size="compact">
                  Save changes
                </GoabButton>
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
        </GoabScrollPanel>
      </div>

      <h3>Header only</h3>
      <div style={{ marginBottom: "2rem" }}>
        <GoabScrollPanel
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
        </GoabScrollPanel>
      </div>

      <h3>Footer only</h3>
      <div style={{ marginBottom: "2rem" }}>
        <GoabScrollPanel
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
        </GoabScrollPanel>
      </div>

      <h3>Custom height</h3>
      <p>
        The <code>height</code> prop accepts any valid CSS height value (e.g. "600px",
        "80vh"). It defaults to "100%" so the panel fills a height-constrained parent.
      </p>
      <div style={{ marginBottom: "2rem" }}>
        <GoabScrollPanel
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
            {tallRows.map((n) => (
              <p key={n}>
                Row {n} — Body scrolls within the explicit 600px height. Swap to "80vh"
                for viewport-relative sizing, or leave the prop off (defaults to "100%")
                when a parent already constrains height.
              </p>
            ))}
          </div>
        </GoabScrollPanel>
      </div>
    </div>
  );
}
