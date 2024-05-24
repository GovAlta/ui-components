import { render } from "@testing-library/react";
import { GoABBadge } from "../badge/badge";

import { GoABAccordion } from "./accordion";

describe("Accordion", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <GoABAccordion heading="The heading">Accordion Content</GoABAccordion>,
    );
    const el = baseElement.querySelector("goa-accordion");
    expect(el.getAttribute("heading")).toBe("The heading");
    expect(baseElement.innerHTML).toContain("Accordion Content");
  });

  it("should set the props correctly", () => {
    const { baseElement } = render(
      <GoABAccordion
        heading="The heading"
        secondaryText="Secondary Text"
        open={true}
        headingContent={<GoABBadge type="success" content="test-badge"></GoABBadge>}
      >
        Accordion Content
      </GoABAccordion>,
    );
    const el = baseElement.querySelector("goa-accordion");
    const headingContent = el?.querySelector("[slot='headingcontent']");
    expect(el?.getAttribute("secondarytext")).toBe("Secondary Text");
    expect(el?.getAttribute("open")).toBe("true");
    const badge = headingContent?.querySelector("goa-badge");
    expect(badge?.getAttribute("content")).toBe("test-badge");
    expect(el?.getAttribute("maxwidth")).toBe("480px");
  });
});
