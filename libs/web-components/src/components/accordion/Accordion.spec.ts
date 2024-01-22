import Accordion from './Accordion.svelte'
import { render } from '@testing-library/svelte'
import { it, describe } from "vitest";

describe("Accordian", () => {
  it('renders', async () => {
    const { container } = render(Accordion, { heading: 'Title', secondarytext: 'sub title' });
    const heading = container.querySelector("summary .heading");
    const secondaryText = container.querySelector("summary .secondary-text");
    expect(heading).toBeTruthy();
    expect(heading?.innerHTML).toContain("Title");
    expect(secondaryText).toBeTruthy();
    expect(secondaryText?.innerHTML).toContain("sub title");
  })

  it('renders larger heading text', async () => {
    const { container } = render(Accordion, { heading: 'Title', headingsize: "medium" });
    const heading = container.querySelector("summary .heading");
    expect(heading).toBeTruthy();
    expect(heading?.classList.contains("heading-medium"));
  })

  it('should expand the container when open prop is set', async () => {
    const { container } = render(Accordion, { heading: 'Title', open: "true" });
    const details = container.querySelector("details");
    expect(details).toBeTruthy();
    expect(details?.getAttribute('open')).not.toBeNull();
  })

  it('should not expand the container when open prop is not set', async () => {
    const { container } = render(Accordion, { heading: 'Title' });
    const details = container.querySelector("details");
    expect(details).toBeTruthy();
    expect(details?.getAttribute('open')).toBeNull();
  })
})
