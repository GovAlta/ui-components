/**
 * Feature #3347 - Sticky Container Component
 *
 * Playground test page for the new goa-sticky-container component.
 * Demonstrates sticky header/footer with scrollable content.
 */

import { useState } from "react";
import {
  GoabBlock,
  GoabText,
  GoabDivider,
  GoabDetails,
  GoabLink,
  GoabButton,
  GoabButtonGroup,
  GoabBadge,
  GoabStickyContainer,
} from "@abgov/react-components";

const bodyItems = Array.from({ length: 30 }, (_, i) => `Item ${i + 1}`);

export function Feat3347Route() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSelect = (item: string) => {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item],
    );
  };

  const clearSelection = () => setSelected([]);

  return (
    <div>
      <GoabText tag="h1" mt="m">
        Feature #3347: Sticky Container
      </GoabText>

      <GoabBlock>
        <GoabLink trailingIcon="open">
          <a
            href="https://github.com/GovAlta/ui-components/issues/3347"
            target="_blank"
            rel="noopener"
          >
            View on GitHub
          </a>
        </GoabLink>

        <GoabDetails heading="Issue Description">
          <GoabText tag="p">
            Create reusable components (or a single component with header/footer
            positioning capability) to support "sticky" UI regions within scrollable
            pages. The component should support an optional sticky header, a scrollable
            content/body area, and an optional sticky footer.
          </GoabText>
        </GoabDetails>
      </GoabBlock>

      <GoabDivider mt="l" mb="l" />

      <GoabText tag="h2">Test Cases</GoabText>

      {/* Test 1: Full featured (header + footer + content) */}
      <GoabText tag="h3">Test 1: Header + Scrollable Content + Footer</GoabText>
      <GoabText tag="p">
        The header stays visible at the top; the list scrolls; the footer (bulk-action
        bar, visible only when items are selected) stays at the bottom. Click items to
        select them and show the footer.
      </GoabText>

      <div style={{ height: "400px", border: "1px solid #ccc" }}>
        <GoabStickyContainer
          height="100%"
          testId="sticky-full"
          header={
            <div
              style={{
                padding: "12px 16px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <GoabText tag="h4" mt="none" mb="none">
                Cases list
              </GoabText>
              <input
                type="search"
                placeholder="Search cases…"
                style={{
                  marginLeft: "auto",
                  padding: "6px 10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
            </div>
          }
          footer={
            selected.length > 0 ? (
              <div
                style={{
                  padding: "12px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <GoabBadge type="information" content={`${selected.length} selected`} />
                <GoabButtonGroup alignment="end">
                  <GoabButton type="secondary" size="compact" onClick={clearSelection}>
                    Clear selection
                  </GoabButton>
                  <GoabButton type="primary" size="compact" onClick={clearSelection}>
                    Assign
                  </GoabButton>
                </GoabButtonGroup>
              </div>
            ) : null
          }
        >
          <ul style={{ margin: 0, padding: "8px 0", listStyle: "none" }}>
            {bodyItems.map((item) => (
              <li
                key={item}
                onClick={() => toggleSelect(item)}
                style={{
                  padding: "10px 16px",
                  cursor: "pointer",
                  backgroundColor: selected.includes(item) ? "#e8f0fe" : "transparent",
                  borderBottom: "1px solid #eee",
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </GoabStickyContainer>
      </div>

      <GoabDivider mt="l" mb="l" />

      {/* Test 2: Header only */}
      <GoabText tag="h3">Test 2: Sticky Header Only (no footer)</GoabText>
      <GoabText tag="p">
        The header stays pinned at the top while content scrolls. No footer is rendered.
      </GoabText>

      <div style={{ height: "300px", border: "1px solid #ccc" }}>
        <GoabStickyContainer
          height="100%"
          testId="sticky-header-only"
          header={
            <div style={{ padding: "12px 16px", fontWeight: "bold" }}>Sticky Header</div>
          }
        >
          <ul style={{ margin: 0, padding: "8px 0", listStyle: "none" }}>
            {bodyItems.map((item) => (
              <li
                key={item}
                style={{ padding: "10px 16px", borderBottom: "1px solid #eee" }}
              >
                {item}
              </li>
            ))}
          </ul>
        </GoabStickyContainer>
      </div>

      <GoabDivider mt="l" mb="l" />

      {/* Test 3: Footer only */}
      <GoabText tag="h3">Test 3: Sticky Footer Only (no header)</GoabText>
      <GoabText tag="p">
        No header. A sticky footer stays pinned at the bottom while content scrolls above
        it.
      </GoabText>

      <div style={{ height: "300px", border: "1px solid #ccc" }}>
        <GoabStickyContainer
          height="100%"
          testId="sticky-footer-only"
          footer={
            <div
              style={{
                padding: "12px 16px",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Sticky Footer
            </div>
          }
        >
          <ul style={{ margin: 0, padding: "8px 0", listStyle: "none" }}>
            {bodyItems.map((item) => (
              <li
                key={item}
                style={{ padding: "10px 16px", borderBottom: "1px solid #eee" }}
              >
                {item}
              </li>
            ))}
          </ul>
        </GoabStickyContainer>
      </div>

      <GoabDivider mt="l" mb="l" />

      {/* Test 4: Content only (no header/footer) */}
      <GoabText tag="h3">Test 4: Content Only (no header or footer)</GoabText>
      <GoabText tag="p">
        No header or footer - just a scrollable content region. The component should
        render cleanly.
      </GoabText>

      <div style={{ height: "200px", border: "1px solid #ccc" }}>
        <GoabStickyContainer height="100%" testId="sticky-content-only">
          <ul style={{ margin: 0, padding: "8px 0", listStyle: "none" }}>
            {bodyItems.map((item) => (
              <li
                key={item}
                style={{ padding: "10px 16px", borderBottom: "1px solid #eee" }}
              >
                {item}
              </li>
            ))}
          </ul>
        </GoabStickyContainer>
      </div>
    </div>
  );
}

export default Feat3347Route;
