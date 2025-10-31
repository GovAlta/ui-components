import { configure, render } from "@testing-library/react";
import { GoabBadge } from "./badge";

configure({ testIdAttribute: "testId" });

describe("GoabBadge", () => {
  it("should render with default behavior (no icon)", () => {
    const { container } = render(<GoabBadge type="information" content="Text Content" />);

    const el = container.querySelector("goa-badge");
    expect(el?.getAttribute("icon")).toBe("false");
  });

  it("should render the properties", () => {
    const { container } = render(
      <GoabBadge
        type="information"
        content="Text Content"
        icon
        mt="s"
        mr="m"
        mb="l"
        ml="xl"
        ariaLabel="text"
      />,
    );
    const el = container.querySelector("goa-badge");

    expect(el?.getAttribute("type")).toBe("information");
    expect(el?.getAttribute("content")).toBe("Text Content");
    expect(el?.getAttribute("icon")).toBe("true");
    expect(el?.getAttribute("mt")).toBe("s");
    expect(el?.getAttribute("mr")).toBe("m");
    expect(el?.getAttribute("mb")).toBe("l");
    expect(el?.getAttribute("ml")).toBe("xl");
    expect(el?.getAttribute("arialabel")).toBe("text");
  });

  it("should pass data-grid attributes", () => {
    const { container } = render(
      <GoabBadge
        type="information"
        content="Text Content"
        data-grid="cell"
      />,
    );
    const el = container.querySelector("goa-badge");
    expect(el?.getAttribute("data-grid")).toBe("cell");
  });

  it("should render custom icon type when icontype is provided", () => {
    const { container } = render(
      <GoabBadge
        type="information"
        content="Custom Icon"
        iconType="home"
      />,
    );
    const el = container.querySelector("goa-badge");

    expect(el?.getAttribute("icontype")).toBe("home");
    expect(el?.getAttribute("icon")).toBe("true");
  });

  it("should not render icontype when not provided", () => {
    const { container } = render(
      <GoabBadge
        type="success"
        content="Default Icon"
        icon
      />,
    );
    const el = container.querySelector("goa-badge");

    expect(el?.getAttribute("icontype")).toBeNull();
    expect(el?.getAttribute("icon")).toBe("true");
  });

  it("should pass icon=false correctly to web component", () => {
    const { container } = render(
      <GoabBadge
        type="success"
        content="No Icon"
        icon={false}
        iconType="star"
      />,
    );
    const el = container.querySelector("goa-badge");

    expect(el?.getAttribute("icon")).toBe("false");
    expect(el?.getAttribute("icontype")).toBe("star");
  });

  it("should pass icon='true' when icon={true} explicitly", () => {
    const { container } = render(
      <GoabBadge
        type="information"
        content="Show Icon"
        icon={true}
      />,
    );
    const el = container.querySelector("goa-badge");

    expect(el?.getAttribute("icon")).toBe("true");
    expect(el?.getAttribute("icontype")).toBeNull();
  });

  it("should pass icon='false' when icon={false} without iconType", () => {
    const { container } = render(
      <GoabBadge
        type="success"
        content="No Icon"
        icon={false}
      />,
    );
    const el = container.querySelector("goa-badge");

    expect(el?.getAttribute("icon")).toBe("false");
    expect(el?.getAttribute("icontype")).toBeNull();
  });

  it("should pass icon='false' when icon={undefined}", () => {
    const { container } = render(
      <GoabBadge
        type="important"
        content="Undefined Icon"
        icon={undefined}
      />,
    );
    const el = container.querySelector("goa-badge");

    expect(el?.getAttribute("icon")).toBe("false");
  });

  it("should pass icon='true' when iconType and icon={true} both provided", () => {
    const { container } = render(
      <GoabBadge
        type="success"
        content="Custom Star"
        icon={true}
        iconType="star"
      />,
    );
    const el = container.querySelector("goa-badge");

    expect(el?.getAttribute("icon")).toBe("true");
    expect(el?.getAttribute("icontype")).toBe("star");
  });
});
