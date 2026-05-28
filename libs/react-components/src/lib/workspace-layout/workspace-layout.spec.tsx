import { act, render } from "@testing-library/react";
import {
  GoabWorkspaceLayout,
  useGoabWorkspaceLayoutScrollState,
} from "./workspace-layout";

function ScrollStateConsumer() {
  const { scrollPosition, isScrollable } = useGoabWorkspaceLayoutScrollState();
  return (
    <span data-testid="scroll-state">
      {scrollPosition}/{String(isScrollable)}
    </span>
  );
}

describe("WorkspaceLayout", () => {
  it("renders children into the default slot", () => {
    const { container } = render(<GoabWorkspaceLayout>Body content</GoabWorkspaceLayout>);
    const el = container.querySelector("goa-workspace-layout");
    expect(el).toBeTruthy();
    expect(el?.textContent).toContain("Body content");
  });

  it("renders sideMenu into the side-menu slot", () => {
    const { container } = render(
      <GoabWorkspaceLayout sideMenu={<span>Nav</span>}>Body</GoabWorkspaceLayout>,
    );
    const el = container.querySelector("goa-workspace-layout");
    const slot = el?.querySelector("[slot='side-menu']");
    expect(slot?.textContent).toContain("Nav");
  });

  it("renders pageHeader into the page-header slot", () => {
    const { container } = render(
      <GoabWorkspaceLayout pageHeader={<span>Header</span>}>Body</GoabWorkspaceLayout>,
    );
    const el = container.querySelector("goa-workspace-layout");
    const slot = el?.querySelector("[slot='page-header']");
    expect(slot?.textContent).toContain("Header");
  });

  it("renders pageFooter into the page-footer slot", () => {
    const { container } = render(
      <GoabWorkspaceLayout pageFooter={<span>Footer</span>}>Body</GoabWorkspaceLayout>,
    );
    const el = container.querySelector("goa-workspace-layout");
    const slot = el?.querySelector("[slot='page-footer']");
    expect(slot?.textContent).toContain("Footer");
  });

  it("passes testId as testid attribute", () => {
    const { container } = render(
      <GoabWorkspaceLayout testId="ws-test">Body</GoabWorkspaceLayout>,
    );
    const el = container.querySelector("goa-workspace-layout");
    expect(el?.getAttribute("testid")).toBe("ws-test");
  });

  it("exposes default scroll state via hook before any event fires", () => {
    const { getByTestId } = render(
      <GoabWorkspaceLayout>
        <ScrollStateConsumer />
      </GoabWorkspaceLayout>,
    );
    expect(getByTestId("scroll-state").textContent).toBe("no-scroll/false");
  });

  it("updates context + invokes onScrollStateChange when the web component dispatches", () => {
    const onScrollStateChange = vi.fn();
    const { container, getByTestId } = render(
      <GoabWorkspaceLayout onScrollStateChange={onScrollStateChange}>
        <ScrollStateConsumer />
      </GoabWorkspaceLayout>,
    );

    const el = container.querySelector("goa-workspace-layout") as HTMLElement;
    act(() => {
      el.dispatchEvent(
        new CustomEvent("_scrollStateChange", {
          detail: { state: "middle", isScrollable: true },
        }),
      );
    });

    expect(getByTestId("scroll-state").textContent).toBe("middle/true");
    expect(onScrollStateChange).toHaveBeenCalledWith(
      expect.objectContaining({ state: "middle", isScrollable: true }),
    );
  });
});
