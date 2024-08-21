import { render } from "@testing-library/react";
import { GoabBadge } from "../badge/badge";

import { GoabAccordion } from "./accordion";

describe("Accordion", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <GoabAccordion heading="The heading">Accordion Content</GoabAccordion>,
    );
    const el = baseElement.querySelector("goa-accordion");
    expect(el?.getAttribute("heading")).toBe("The heading");
    expect(baseElement.innerHTML).toContain("Accordion Content");
  });

  it("should set the props correctly", () => {
    const { baseElement } = render(
      <GoabAccordion
        heading="The heading"
        secondaryText="Secondary Text"
        open={true}
        headingContent={<GoabBadge type="success" content="test-badge"></GoabBadge>}
        maxWidth="480px"
      >
        Accordion Content
      </GoabAccordion>,
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
