import Details from './Details.svelte'
import { render } from '@testing-library/svelte'
import { it } from "vitest";


it('should render', async () => {
  const { container } = render(Details, { heading: "The title", open: true })

  const summary = container.querySelector("summary")
  expect(summary?.innerHTML).toContain("The title");
  expect(summary?.getAttribute("aria-controls")).length.greaterThan(0);
  const randomId = summary?.getAttribute("aria-controls")?.split("-content")[0];

  expect(summary?.getAttribute("aria-controls")).toBe(`${randomId}-content`);
  expect(summary?.getAttribute("aria-expanded")).toBe("false");

  const heading = summary?.querySelector("span");
  expect(heading?.getAttribute("id")).toBe(`${randomId}-heading`);

  const details = container.querySelector("details");
  expect(details?.hasAttribute("open")).toBe(true);

  // Content's accessibility attributes
  const content = container.querySelector("div.content");
  expect(content?.getAttribute("role")).toBe("region");
  expect(content?.getAttribute("id")).toBe(`${randomId}-content`);
  expect(content?.getAttribute("aria-labelledby")).toBe(heading?.getAttribute("id"));
})

it('should render - with max width', async () => {
  const { container } = render(Details, { heading: "The title", maxwidth: "480px" });
  const details = container.querySelector("details");
  expect(details?.getAttribute("style")).toContain("max-width: 480px;");
});
