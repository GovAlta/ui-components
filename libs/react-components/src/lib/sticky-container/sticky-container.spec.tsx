import { render } from "@testing-library/react";
import GoabStickyContainer from "./sticky-container";

describe("StickyContainer", () => {
  it("renders children into the default slot", () => {
    const { container } = render(<GoabStickyContainer>Body content</GoabStickyContainer>);
    const el = container.querySelector("goa-sticky-container");
    expect(el).toBeTruthy();
    expect(el?.textContent).toContain("Body content");
  });

  it("renders header into the header slot", () => {
    const { container } = render(
      <GoabStickyContainer header={<span>Header area</span>}>
        Body content
      </GoabStickyContainer>,
    );
    const el = container.querySelector("goa-sticky-container");
    const headerSlot = el?.querySelector("[slot='header']");
    expect(headerSlot).toBeTruthy();
    expect(headerSlot?.textContent).toContain("Header area");
  });

  it("renders footer into the footer slot", () => {
    const { container } = render(
      <GoabStickyContainer footer={<span>Footer area</span>}>
        Body content
      </GoabStickyContainer>,
    );
    const el = container.querySelector("goa-sticky-container");
    const footerSlot = el?.querySelector("[slot='footer']");
    expect(footerSlot).toBeTruthy();
    expect(footerSlot?.textContent).toContain("Footer area");
  });

  it("passes height prop to the web component", () => {
    const { container } = render(
      <GoabStickyContainer height="400px">Body content</GoabStickyContainer>,
    );
    const el = container.querySelector("goa-sticky-container") as HTMLElement | null;
    expect(el?.getAttribute("height")).toBe("400px");
    // height is also applied as inline style on the host so the shadow-DOM flex layout
    // has a concrete reference before JS runs
    expect(el?.style.height).toBe("400px");
  });

  it("passes testId as testid attribute", () => {
    const { container } = render(
      <GoabStickyContainer testId="my-container">Body content</GoabStickyContainer>,
    );
    const el = container.querySelector("goa-sticky-container");
    expect(el?.getAttribute("testid")).toBe("my-container");
  });

  it("passes data attributes to the web component", () => {
    const { container } = render(
      <GoabStickyContainer data-testid="sc-test">Body content</GoabStickyContainer>,
    );
    const el = container.querySelector("goa-sticky-container");
    expect(el?.getAttribute("data-testid")).toBe("sc-test");
  });

  it("does not render header slot when header is not provided", () => {
    const { container } = render(<GoabStickyContainer>Body content</GoabStickyContainer>);
    const el = container.querySelector("goa-sticky-container");
    expect(el?.querySelector("[slot='header']")).toBeNull();
  });

  it("does not render footer slot when footer is not provided", () => {
    const { container } = render(<GoabStickyContainer>Body content</GoabStickyContainer>);
    const el = container.querySelector("goa-sticky-container");
    expect(el?.querySelector("[slot='footer']")).toBeNull();
  });
});
