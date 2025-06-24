import { render } from "vitest-browser-react";
import { GoabModal, GoabButton, GoabIcon } from "../src";
import { expect, describe, it, vi } from "vitest";
import { useState } from "react";

describe("Modal", () => {
  it("should not auto-scroll to links at the bottom when modal with long content opens", async () => {
    const Component = () => {
      const [open, setOpen] = useState(false);

      const longContent = (
        <>
          <strong>Lorem ipsum dolor sit amet</strong>
          <ol>
            <li>Consectetur adipiscing elit</li>
            <li>Sed do eiusmod tempor</li>
          </ol>
          <strong>Section One</strong>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
            commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum 
            dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <strong>Section Two</strong>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
            doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore 
            veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim 
            ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
          </p>
          <p>
            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis 
            praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias 
            excepturi sint occaecati cupiditate non provident, similique sunt in culpa 
            qui officia deserunt mollitia animi, id est laborum et dolorum fuga.
          </p>
          <p style={{ marginTop: "3rem", marginBottom: "0.5rem" }}>
            Additional information:
          </p>
          <p style={{ marginBottom: 0 }} data-testid="links-container">
            <a href="/" target="_blank" data-testid="test-link-1">
              Lorem ipsum reference link
              <GoabIcon type="open" size="small" />
            </a>
            <br />
            <a href="/" target="_blank" data-testid="test-link-2">
              Dolor sit amet reference link
              <GoabIcon type="open" size="small" />
            </a>
          </p>
        </>
      );

      return (
        <>
          <GoabButton onClick={() => setOpen(true)} testId="open-modal">
            Open Modal
          </GoabButton>
          <GoabModal
            heading="Lorem Ipsum Modal"
            open={open}
            maxWidth="60%"
            onClose={() => setOpen(false)}
            testId="test-modal"
          >
            {longContent}
          </GoabModal>
        </>
      );
    };

    const result = render(<Component />);
    const openButton = result.getByTestId("open-modal");

    // Open the modal
    await openButton.click();

    // Wait for modal to be rendered and visible
    await vi.waitFor(async () => {
      const modal = result.container.querySelector("goa-modal");
      expect(modal).toBeTruthy();
      // The modal should be present in the DOM when open is true
    }, { timeout: 3000 });

    // Give time for the modal to fully render and any potential scrolling to occur
    await new Promise(resolve => setTimeout(resolve, 500));

    // Find the modal element and access its shadow root
    const modal = result.container.querySelector("goa-modal");
    const modalShadow = modal?.shadowRoot;
    
    if (modalShadow) {
      // Find the scrollable element within the modal's shadow DOM
      const scrollableEl = modalShadow.querySelector("goa-scrollable");
      
      if (scrollableEl && scrollableEl.shadowRoot) {
        // Access the actual scrolling container within goa-scrollable
        const scrollContainer = scrollableEl.shadowRoot.querySelector(".goa-scrollable");
        
        if (scrollContainer) {
          // Verify that the scroll position is at the top
          const scrollTop = (scrollContainer as HTMLElement).scrollTop;
          expect(scrollTop).toBe(0);
          
          // Verify that the container is scrollable (content height > container height)
          const isScrollable = (scrollContainer as HTMLElement).scrollHeight > (scrollContainer as HTMLElement).clientHeight;
          expect(isScrollable).toBe(true);
        }
      }
    }

    // Verify that the links are present in the DOM
    const linksContainer = result.getByTestId("links-container");
    expect(linksContainer.element()).toBeTruthy();
    
    const testLink1 = result.getByTestId("test-link-1");
    const testLink2 = result.getByTestId("test-link-2");
    
    expect(testLink1.element()).toBeTruthy();
    expect(testLink2.element()).toBeTruthy();
  });
});