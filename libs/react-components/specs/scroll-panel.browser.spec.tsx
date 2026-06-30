import { render } from "vitest-browser-react";
import { GoabScrollPanel } from "../src";
import { expect, describe, it, vi } from "vitest";
import { page } from "@vitest/browser/context";

describe("ScrollPanel", () => {
  it("keeps the header and footer pinned while the body scrolls", async () => {
    await page.viewport(1024, 768);

    const paragraphs = Array.from({ length: 15 }, (_, i) => i + 1);

    const Component = () => (
      <GoabScrollPanel
        height="480px"
        header={<div data-testid="panel-header">Case details</div>}
        footer={<div data-testid="panel-footer">Footer actions</div>}
      >
        {paragraphs.map((n) => (
          <p key={n} data-testid={`para-${n}`}>
            Paragraph {n} — scrollable body content that overflows the 480px panel.
          </p>
        ))}
      </GoabScrollPanel>
    );

    const result = render(<Component />);

    // The scrollable region lives in the component's shadow DOM. Reach it via the
    // host's shadowRoot rather than a testid so we don't race the custom-element upgrade.
    const host = result.baseElement.querySelector(
      "goa-scroll-panel",
    ) as HTMLElement;
    await vi.waitFor(() => {
      const el = host.shadowRoot?.querySelector(
        ".scroll-panel-content",
      ) as HTMLElement | null;
      // Body must actually overflow, otherwise the test proves nothing.
      expect(el && el.scrollHeight > el.clientHeight).toBe(true);
    });
    const scrollEl = host.shadowRoot!.querySelector(
      ".scroll-panel-content",
    ) as HTMLElement;

    const header = result.getByTestId("panel-header");
    const footer = result.getByTestId("panel-footer");
    const firstPara = result.getByTestId("para-1");

    // Baseline screen positions before scrolling.
    const headerTopBefore = header.element().getBoundingClientRect().top;
    const footerBottomBefore = footer.element().getBoundingClientRect().bottom;
    const paraTopBefore = firstPara.element().getBoundingClientRect().top;

    // Scroll the body down.
    scrollEl.scrollTop = 200;
    await vi.waitFor(() => {
      expect(scrollEl.scrollTop).toBeCloseTo(200, 0);
      // Body content moved up by the scrolled amount.
      expect(firstPara.element().getBoundingClientRect().top).toBeCloseTo(
        paraTopBefore - 200,
        0,
      );
    });

    // Header and footer stayed pinned while the body scrolled down.
    expect(header.element().getBoundingClientRect().top).toBeCloseTo(
      headerTopBefore,
      0,
    );
    expect(footer.element().getBoundingClientRect().bottom).toBeCloseTo(
      footerBottomBefore,
      0,
    );

    // Scroll the body back up to the top.
    scrollEl.scrollTop = 0;
    await vi.waitFor(() => {
      expect(scrollEl.scrollTop).toBeCloseTo(0, 0);
      expect(firstPara.element().getBoundingClientRect().top).toBeCloseTo(
        paraTopBefore,
        0,
      );
    });

    // Header and footer remained pinned after scrolling back up.
    expect(header.element().getBoundingClientRect().top).toBeCloseTo(
      headerTopBefore,
      0,
    );
    expect(footer.element().getBoundingClientRect().bottom).toBeCloseTo(
      footerBottomBefore,
      0,
    );
  });

  it("falls back to a usable height when given an invalid height value", async () => {
    await page.viewport(1024, 768);

    const paragraphs = Array.from({ length: 20 }, (_, i) => i + 1);

    // Parent establishes a 400px height context; the panel height is garbage.
    const Component = () => (
      <div style={{ height: "400px" }}>
        <GoabScrollPanel height="not-a-valid-height">
          {paragraphs.map((n) => (
            <p key={n} data-testid={`row-${n}`}>
              Row {n} — body content that overflows the fallback height.
            </p>
          ))}
        </GoabScrollPanel>
      </div>
    );

    const result = render(<Component />);
    const host = result.baseElement.querySelector(
      "goa-scroll-panel",
    ) as HTMLElement;

    // With the height:100% floor the invalid value is dropped and the host fills
    // the 400px parent, so the body overflows and scrolls. Without it the host
    // would grow to content height and be unscrollable.
    await vi.waitFor(() => {
      const el = host.shadowRoot?.querySelector(
        ".scroll-panel-content",
      ) as HTMLElement | null;
      expect(el && el.scrollHeight > el.clientHeight).toBe(true);
    });

    // The panel did not collapse to content height; it is bounded by the parent.
    expect(host.getBoundingClientRect().height).toBeLessThanOrEqual(400);
  });

  it("keeps the header and footer pinned while content scrolls horizontally", async () => {
    await page.viewport(1024, 768);

    // Wide elements to force horizontal overflow.
    const items = Array.from({ length: 20 }, (_, i) => i + 1);

    const Component = () => (
      <div style={{ width: "400px" }}>
        <GoabScrollPanel
          width="400px"
          direction="horizontal"
          header={<div data-testid="h-header">Left</div>}
          footer={<div data-testid="h-footer">Right</div>}
        >
          <div style={{ display: "flex", gap: "1rem", width: "2000px" }}>
            {items.map((n) => (
              <span key={n} data-testid={`h-item-${n}`} style={{ flex: "0 0 auto", width: "80px" }}>
                Item {n}
              </span>
            ))}
          </div>
        </GoabScrollPanel>
      </div>
    );

    const result = render(<Component />);
    const host = result.baseElement.querySelector(
      "goa-scroll-panel",
    ) as HTMLElement;

    await vi.waitFor(() => {
      const el = host.shadowRoot?.querySelector(
        ".scroll-panel-content",
      ) as HTMLElement | null;
      expect(el && el.scrollWidth > el.clientWidth).toBe(true);
    });

    const scrollEl = host.shadowRoot!.querySelector(
      ".scroll-panel-content",
    ) as HTMLElement;

    const header = result.getByTestId("h-header");
    const footer = result.getByTestId("h-footer");
    const firstItem = result.getByTestId("h-item-1");

    const headerLeftBefore = header.element().getBoundingClientRect().left;
    const footerRightBefore = footer.element().getBoundingClientRect().right;
    const itemLeftBefore = firstItem.element().getBoundingClientRect().left;

    // Scroll the content to the right.
    scrollEl.scrollLeft = 300;
    await vi.waitFor(() => {
      expect(scrollEl.scrollLeft).toBeCloseTo(300, 0);
      expect(firstItem.element().getBoundingClientRect().left).toBeCloseTo(
        itemLeftBefore - 300,
        0,
      );
    });

    // Header and footer stayed pinned while content scrolled.
    expect(header.element().getBoundingClientRect().left).toBeCloseTo(
      headerLeftBefore,
      0,
    );
    expect(footer.element().getBoundingClientRect().right).toBeCloseTo(
      footerRightBefore,
      0,
    );

    // Scroll back to the start.
    scrollEl.scrollLeft = 0;
    await vi.waitFor(() => {
      expect(scrollEl.scrollLeft).toBeCloseTo(0, 0);
      expect(firstItem.element().getBoundingClientRect().left).toBeCloseTo(
        itemLeftBefore,
        0,
      );
    });

    // Header and footer remained pinned after scrolling back.
    expect(header.element().getBoundingClientRect().left).toBeCloseTo(
      headerLeftBefore,
      0,
    );
    expect(footer.element().getBoundingClientRect().right).toBeCloseTo(
      footerRightBefore,
      0,
    );
  });
});
