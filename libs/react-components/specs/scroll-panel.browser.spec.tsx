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
});
