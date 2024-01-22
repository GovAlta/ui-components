import { render } from "@testing-library/svelte";
import GoATwoColumnLayout from "./TwoColumnLayoutWrapper.test.svelte"
import { it, describe } from "vitest";

describe("GoAAppHeader", () => {
  it("should render", async () => {
    const baseElement = render(GoATwoColumnLayout);
    const el = baseElement.container;
    const header = el.querySelector("[slot=header]")
    const footer = el.querySelector("[slot=footer]")
    const nav = el.querySelector("[slot=nav]")

    expect(el).toBeTruthy();
    expect(el.innerHTML).toContain("Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.");
    expect(header).toBeTruthy();
    expect(footer).toBeTruthy();
    expect(nav).toBeTruthy();
    expect(nav?.querySelectorAll("a").length).toBe(5)
  });
});
