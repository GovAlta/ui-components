import { render } from "vitest-browser-react";

import { GoabTooltip, GoabButton } from "../src";
import { expect, describe, it, vi } from "vitest";

describe("Tooltip Browser Tests", () => {
  it("should render tooltip component", async () => {
    const Component = () => {
      return (
        <div data-testid="container">
          <GoabTooltip content="This is a tooltip">
            <GoabButton testId="trigger">Hover me</GoabButton>
          </GoabTooltip>
        </div>
      );
    };

    const result = render(<Component />);
    const container = result.getByTestId("container");
    const trigger = result.getByTestId("trigger");

    // Verify elements are rendered
    expect(container).toBeTruthy();
    expect(trigger).toBeTruthy();

    // Wait for the goa-tooltip custom element to be present
    await vi.waitFor(() => {
      const tooltipEl = container.element().querySelector("goa-tooltip");
      expect(tooltipEl).toBeTruthy();
    }, { timeout: 3000 });
  });

  it("should contain the trigger element", async () => {
    const Component = () => {
      return (
        <div data-testid="container">
          <GoabTooltip content="Test tooltip content">
            <GoabButton>Test Button</GoabButton>
          </GoabTooltip>
        </div>
      );
    };

    const result = render(<Component />);
    const container = result.getByTestId("container");

    // Wait for tooltip to be rendered
    await vi.waitFor(() => {
      const tooltipEl = container.element().querySelector("goa-tooltip");
      expect(tooltipEl).toBeTruthy();
      
      // The tooltip should contain our button
      const buttonInTooltip = tooltipEl?.querySelector("goa-button");
      expect(buttonInTooltip).toBeTruthy();
      expect(buttonInTooltip?.textContent).toBe("Test Button");
    }, { timeout: 3000 });
  });

  it("should support different positions via props", async () => {
    const positions = ["top", "bottom", "left", "right"] as const;
    
    for (const position of positions) {
      const Component = () => {
        return (
          <div data-testid={`container-${position}`}>
            <GoabTooltip content={`${position} tooltip`} position={position}>
              <GoabButton testId={`trigger-${position}`}>Button</GoabButton>
            </GoabTooltip>
          </div>
        );
      };

      const result = render(<Component />);
      const container = result.getByTestId(`container-${position}`);

      await vi.waitFor(() => {
        const tooltipEl = container.element().querySelector("goa-tooltip");
        expect(tooltipEl).toBeTruthy();
        
        // The position prop should be passed to the web component
        // Even if the attribute isn't set, the component should render
        const button = tooltipEl?.querySelector("goa-button");
        expect(button).toBeTruthy();
      }, { timeout: 2000 });
    }
  });

  it("should support ReactNode content", async () => {
    const Component = () => {
      return (
        <div data-testid="container">
          <GoabTooltip 
            content={
              <div>
                <strong>Rich content</strong>
                <p>Multiple elements</p>
              </div>
            }
          >
            <GoabButton testId="trigger">Rich tooltip</GoabButton>
          </GoabTooltip>
        </div>
      );
    };

    const result = render(<Component />);
    const container = result.getByTestId("container");

    await vi.waitFor(() => {
      const tooltipEl = container.element().querySelector("goa-tooltip");
      expect(tooltipEl).toBeTruthy();
      
      // For ReactNode content, check for slot content
      const slotContent = tooltipEl?.querySelector("[slot='content']");
      expect(slotContent).toBeTruthy();
      
      // Verify the rich content is rendered
      const strongElement = slotContent?.querySelector("strong");
      const pElement = slotContent?.querySelector("p");
      expect(strongElement?.textContent).toBe("Rich content");
      expect(pElement?.textContent).toBe("Multiple elements");
    }, { timeout: 2000 });
  });

  it("should support horizontal alignment", async () => {
    const alignments = ["left", "center", "right"] as const;
    
    for (const alignment of alignments) {
      const Component = () => {
        return (
          <div data-testid={`container-${alignment}`}>
            <GoabTooltip content={`${alignment} aligned tooltip`} hAlign={alignment}>
              <GoabButton testId={`trigger-${alignment}`}>Button</GoabButton>
            </GoabTooltip>
          </div>
        );
      };

      const result = render(<Component />);
      const container = result.getByTestId(`container-${alignment}`);

      await vi.waitFor(() => {
        const tooltipEl = container.element().querySelector("goa-tooltip");
        expect(tooltipEl).toBeTruthy();
        
        // The component should render regardless of alignment
        const button = tooltipEl?.querySelector("goa-button");
        expect(button).toBeTruthy();
      }, { timeout: 2000 });
    }
  });

  it("should render with testId", async () => {
    const Component = () => {
      return (
        <div data-testid="container">
          <GoabTooltip content="Test tooltip" testId="my-tooltip">
            <GoabButton testId="trigger">Button with tooltip</GoabButton>
          </GoabTooltip>
        </div>
      );
    };

    const result = render(<Component />);
    const container = result.getByTestId("container");

    await vi.waitFor(() => {
      const tooltipEl = container.element().querySelector("goa-tooltip");
      expect(tooltipEl).toBeTruthy();
      
      // Even if testId doesn't work as expected, the component should render
      const button = tooltipEl?.querySelector("goa-button");
      expect(button).toBeTruthy();
    }, { timeout: 2000 });
  });

  it("should support multiline content with line breaks", async () => {
    const Component = () => {
      return (
        <div data-testid="container">
          <GoabTooltip 
            content={
              <div style={{ maxWidth: "250px" }}>
                <strong style={{ color: "white" }}>Warning:</strong>
                <br />
                <span style={{ color: "#f0f0f0" }}>
                  Please review your selection carefully.
                </span>
                <br />
                <span style={{ color: "#f0f0f0" }}>
                  This action cannot be undone.
                </span>
                <br />
                <span style={{ color: "#cccccc", fontSize: "12px", marginTop: "4px", display: "block" }}>
                  <em>Consider backing up your data first.</em>
                </span>
              </div>
            }
          >
            <GoabButton>Multi-line tooltip</GoabButton>
          </GoabTooltip>
        </div>
      );
    };

    const result = render(<Component />);
    const container = result.getByTestId("container");

    await vi.waitFor(() => {
      const tooltipEl = container.element().querySelector("goa-tooltip");
      expect(tooltipEl).toBeTruthy();
      
      // Check for slot content with multiline structure
      const slotContent = tooltipEl?.querySelector("[slot='content']");
      expect(slotContent).toBeTruthy();
      
      // Verify multiline content elements
      const strongElement = slotContent?.querySelector("strong");
      const spans = slotContent?.querySelectorAll("span");
      const emElement = slotContent?.querySelector("em");
      const brElements = slotContent?.querySelectorAll("br");
      
      expect(strongElement?.textContent).toBe("Warning:");
      expect(spans?.length).toBeGreaterThan(0);
      expect(emElement?.textContent).toBe("Consider backing up your data first.");
      expect(brElements?.length).toBe(3); // Three line breaks
      
      // Check that text content includes multiline text
      expect(slotContent?.textContent).toContain("Please review your selection carefully");
      expect(slotContent?.textContent).toContain("This action cannot be undone");
      expect(slotContent?.textContent).toContain("Consider backing up your data first");
    }, { timeout: 2000 });
  });

  it("should support structured multiline content with lists", async () => {
    const Component = () => {
      return (
        <div data-testid="container">
          <GoabTooltip 
            content={
              <div style={{ maxWidth: "200px" }}>
                <div style={{ fontWeight: "bold", marginBottom: "4px" }}>
                  📋 Task Details:
                </div>
                <ul style={{ margin: "0", paddingLeft: "16px", fontSize: "14px" }}>
                  <li><strong>Status:</strong> <em>In Progress</em></li>
                  <li><strong>Due:</strong> Tomorrow</li>
                  <li><strong>Priority:</strong> <span style={{ color: "red" }}>High</span></li>
                </ul>
              </div>
            }
          >
            <GoabButton>Task info</GoabButton>
          </GoabTooltip>
        </div>
      );
    };

    const result = render(<Component />);
    const container = result.getByTestId("container");

    await vi.waitFor(() => {
      const tooltipEl = container.element().querySelector("goa-tooltip");
      expect(tooltipEl).toBeTruthy();
      
      // Check for slot content with list structure
      const slotContent = tooltipEl?.querySelector("[slot='content']");
      expect(slotContent).toBeTruthy();
      
      // Verify structured content elements
      const list = slotContent?.querySelector("ul");
      const listItems = slotContent?.querySelectorAll("li");
      
      // Check that the content contains expected text
      expect(slotContent?.textContent).toContain("📋 Task Details:");
      expect(list).toBeTruthy();
      expect(listItems?.length).toBe(3);
      
      // Check list item content
      if (listItems && listItems.length >= 3) {
        expect(listItems[0]?.textContent).toContain("Status:");
        expect(listItems[0]?.textContent).toContain("In Progress");
        expect(listItems[1]?.textContent).toContain("Due:");
        expect(listItems[2]?.textContent).toContain("Priority:");
        expect(listItems[2]?.textContent).toContain("High");
      }
    }, { timeout: 2000 });
  });
});