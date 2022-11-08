import "@testing-library/jest-dom";
import { render, cleanup, waitFor } from "@testing-library/svelte";
import GoAButtonGroup from "./ButtonGroup.svelte"

afterEach(cleanup);

describe("GoA ButtonGroup", () => {

  ['start', 'end', 'center'].forEach(type => {
    it(`should render ButtonGroup with ${type} alignment`, async () => {
      const baseElement = render(GoAButtonGroup, { alignment: type });
      const buttonGroup = baseElement.container.querySelector('goa-button-group');

      waitFor(() => {
        expect(buttonGroup).toHaveAttribute("type", "warning");
      })
    });
  });

  it(`should not render ButtonGroup with invalid alignment`, async () => {
    const mock = jest.spyOn(console, "error").mockImplementation();
    render(GoAButtonGroup, { alignment: "staart" });
    await waitFor(() => {
      expect(console.error["mock"].calls.length).toBeGreaterThan(0);
    })
    mock.mockRestore();
  });

  it(`should not render ButtonGroup with empty alignment`, async () => {
    const mock = jest.spyOn(console, "error").mockImplementation();
    render(GoAButtonGroup, { alignment: "" });
    await waitFor(() => {
      expect(console.error["mock"].calls.length).toBeGreaterThan(0);
    })
    mock.mockRestore();
  });

  it(`should not render ButtonGroup with invalid gap`, async () => {
    const mock = jest.spyOn(console, "error").mockImplementation();
    render(GoAButtonGroup, { alignment: "start", gap: "relaaexd" });
    await waitFor(() => {
      expect(console.error["mock"].calls.length).toBeGreaterThan(0);
    })
    mock.mockRestore();
  });

});
