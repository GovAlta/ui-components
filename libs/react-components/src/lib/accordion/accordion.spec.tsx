import { render } from "@testing-library/react";
import { ABGovBadge } from "../badge/badge";

import { ABGovAccordion } from "./accordion";

describe("Accordion", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <ABGovAccordion heading="The heading">Accordion Content</ABGovAccordion>
    );
    const el = baseElement.querySelector("goa-accordion");
    expect(el.getAttribute("heading")).toBe("The heading");
    expect(baseElement.innerHTML).toContain("Accordion Content");
  });

  it("should set the props correctly", () => {
    const { baseElement } = render(
      <ABGovAccordion
        heading="The heading"
        secondaryText="Secondary Text"
        open={true}
        headingContent={
          <ABGovBadge type="success" content="test-badge"></ABGovBadge>
        }
      >
        Accordion Content
      </ABGovAccordion>
    );
    const el = baseElement.querySelector("goa-accordion");
    const headingContent = el?.querySelector("[slot='headingcontent']");
    expect(el?.getAttribute("secondarytext")).toBe("Secondary Text");
    expect(el?.getAttribute("open")).toBe("true");
    const badge = headingContent?.querySelector("goa-badge");
    expect(badge?.getAttribute("content")).toBe("test-badge");
  });
});
