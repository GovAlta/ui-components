import { fireEvent, render } from "@testing-library/svelte";
import "@testing-library/jest-dom";
import FooterMetaSectionWrapper from "./FooterMetaSectionWrapper.test.svelte";

describe("FooterMetaSection", () => {
  it("renders slotted content without replacing it", () => {
    const { getByTestId } = render(FooterMetaSectionWrapper);

    expect(getByTestId("standard-link")).toHaveAttribute(
      "href",
      "https://example.com",
    );
    expect(getByTestId("goa-link").tagName).toBe("GOA-LINK");
    expect(getByTestId("custom-content")).toHaveTextContent("Custom content");
  });

  it("preserves events on slotted content", async () => {
    const { getByTestId } = render(FooterMetaSectionWrapper);
    const link2 = getByTestId("specialClick");

    await fireEvent.click(link2);

    expect(getByTestId("link-is-clicked")).toHaveTextContent("Link 2 clicked");
  });
});
