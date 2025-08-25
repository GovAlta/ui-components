import { configure, render } from "@testing-library/react";
import { GoabLink } from "./link";

configure({
  testIdAttribute: "testId",
});

describe("GoabLink", () => {
  it("should render the properties", () => {
    const { container } = render(
      <GoabLink
        leadingIcon="add"
        trailingIcon="archive"
        testId="test-id"
        mt="s"
        mr="m"
        mb="l"
        ml="xl"
      >
        <a href="https://example.com">Test link</a>
      </GoabLink>,
    );
    const el = container.querySelector("goa-link");
    const link = container.querySelector("a");

    expect(el).toBeTruthy();
    expect(el?.getAttribute("leadingicon")).toBe("add");
    expect(el?.getAttribute("trailingicon")).toBe("archive");
    expect(el?.getAttribute("testid")).toBe("test-id");
    expect(el?.getAttribute("mt")).toBe("s");
    expect(el?.getAttribute("mr")).toBe("m");
    expect(el?.getAttribute("mb")).toBe("l");
    expect(el?.getAttribute("ml")).toBe("xl");

    expect(link).toBeTruthy();
    expect(link?.getAttribute("href")).toBe("https://example.com");
  });

  it("should pass data-grid attributes", () => {
    const { container } = render(
      <GoabLink data-grid="cell">
        <a href="https://example.com">Test link</a>
      </GoabLink>
    );
    const el = container.querySelector("goa-link");
    expect(el?.getAttribute("data-grid")).toBe("cell");
  });
});
