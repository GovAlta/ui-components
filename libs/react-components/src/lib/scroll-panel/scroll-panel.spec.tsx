import { render } from "@testing-library/react";
import GoabScrollPanel from "./scroll-panel";

describe("ScrollPanel", () => {
  it("renders children into the default slot", () => {
    const { container } = render(<GoabScrollPanel>Body content</GoabScrollPanel>);
    const el = container.querySelector("goa-scroll-panel");
    expect(el).toBeTruthy();
    expect(el?.textContent).toContain("Body content");
  });

  it("renders header into the header slot", () => {
    const { container } = render(
      <GoabScrollPanel header={<span>Header area</span>}>
        Body content
      </GoabScrollPanel>,
    );
    const el = container.querySelector("goa-scroll-panel");
    const headerSlot = el?.querySelector("[slot='header']");
    expect(headerSlot).toBeTruthy();
    expect(headerSlot?.textContent).toContain("Header area");
  });

  it("renders footer into the footer slot", () => {
    const { container } = render(
      <GoabScrollPanel footer={<span>Footer area</span>}>
        Body content
      </GoabScrollPanel>,
    );
    const el = container.querySelector("goa-scroll-panel");
    const footerSlot = el?.querySelector("[slot='footer']");
    expect(footerSlot).toBeTruthy();
    expect(footerSlot?.textContent).toContain("Footer area");
  });

  it("passes height prop to the web component", () => {
    const { container } = render(
      <GoabScrollPanel height="400px">Body content</GoabScrollPanel>,
    );
    const el = container.querySelector("goa-scroll-panel") as HTMLElement | null;
    expect(el?.getAttribute("height")).toBe("400px");
    // height is also applied as inline style on the host so the shadow-DOM flex layout
    // has a concrete reference before JS runs
    expect(el?.style.height).toBe("400px");
  });

  it("passes testId as testid attribute", () => {
    const { container } = render(
      <GoabScrollPanel testId="my-panel">Body content</GoabScrollPanel>,
    );
    const el = container.querySelector("goa-scroll-panel");
    expect(el?.getAttribute("testid")).toBe("my-panel");
  });

  it("passes data attributes to the web component", () => {
    const { container } = render(
      <GoabScrollPanel data-testid="sp-test">Body content</GoabScrollPanel>,
    );
    const el = container.querySelector("goa-scroll-panel");
    expect(el?.getAttribute("data-testid")).toBe("sp-test");
  });

  it("passes direction prop to the web component", () => {
    const { container } = render(
      <GoabScrollPanel direction="horizontal">Body content</GoabScrollPanel>,
    );
    const el = container.querySelector("goa-scroll-panel");
    expect(el?.getAttribute("direction")).toBe("horizontal");
  });

  it("does not render header slot when header is not provided", () => {
    const { container } = render(<GoabScrollPanel>Body content</GoabScrollPanel>);
    const el = container.querySelector("goa-scroll-panel");
    expect(el?.querySelector("[slot='header']")).toBeNull();
  });

  it("does not render footer slot when footer is not provided", () => {
    const { container } = render(<GoabScrollPanel>Body content</GoabScrollPanel>);
    const el = container.querySelector("goa-scroll-panel");
    expect(el?.querySelector("[slot='footer']")).toBeNull();
  });
});
