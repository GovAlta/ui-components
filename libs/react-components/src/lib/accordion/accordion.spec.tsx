import { render } from "@testing-library/react";
import { GoABadge } from "../badge/badge";

import { GoAAccordion } from "./accordion";

describe("Accordion", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <GoAAccordion heading="The heading">Accordion Content</GoAAccordion>
    );
    const el = baseElement.querySelector("goa-accordion");
    expect(el.getAttribute("heading")).toBe("The heading");
    expect(baseElement.innerHTML).toContain("Accordion Content");
  });

  it("should set the props correctly", () => {
    const { baseElement } = render(
      <GoAAccordion
        heading="The heading"
        secondaryText="Secondary Text"
        open={true}
        headingContent={
          <GoABadge type="success" content="test-badge"></GoABadge>
        }
      >
        Accordion Content
      </GoAAccordion>
    );
    const el = baseElement.querySelector("goa-accordion");
    const headingContent = el?.querySelector("[slot='headingcontent']");
    expect(el?.getAttribute("secondarytext")).toBe("Secondary Text");
    expect(el?.getAttribute("open")).toBe("true");
    const badge = headingContent?.querySelector("goa-badge");
    expect(badge?.getAttribute("content")).toBe("test-badge");
  });
});
