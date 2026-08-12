import { render } from "@testing-library/svelte";
import "@testing-library/jest-dom";
import FooterNavSectionWrapper from "./FooterNavSectionWrapper.test.svelte";

describe("FooterNavSection", () => {
  it("renders its heading and slotted content without replacing it", () => {
    const { getByTestId, getByText } = render(FooterNavSectionWrapper);

    expect(getByText("Resources")).toBeInTheDocument();
    expect(getByTestId("standard-link")).toHaveAttribute("href", "/services");
    expect(getByTestId("goa-link").tagName).toBe("GOA-LINK");
    expect(getByTestId("custom-content")).toHaveTextContent("Custom content");
  });
});
