import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/svelte';
import GoAChip from './Chip.svelte'

describe('GoAChip', () => {

  it("should render", async () => {
    const { container } = render(GoAChip, { content: "Some Badge", variant: "filter" });

    expect(container.innerHTML).toContain("Some Badge");
    expect(container.querySelector(".leading-icon")).toBeNull();
    expect(container.querySelector(".deletable")).toBeNull();
    expect(container.querySelector(".error")).toBeNull();
    expect(container.querySelector(".delete-icon")).toBeNull();
  })

  it("should show the leading icon", async () => {
    const { container } = render(GoAChip, { content: "Some Badge", leadingicon: "arrow-right" , variant: "filter"});
    const leadingIcon = container.querySelector(".leading-icon");

    expect(leadingIcon).not.toBeNull();
  })

  it("should show the chip in the error state", async () => {
    const { container } = render(GoAChip, { content: "Some Badge", error: "true", variant: "filter" });

    expect(container.querySelector(".error")).not.toBeNull();
  })

  it("should show the trailing button and handle the the click event", async () => {
    const result = render(GoAChip, { content: "Some Badge", deletable: true, variant: "filter" });
    const deleteIcon = result.container.querySelector(".delete-icon");
    const chip = await result.findByTestId("chip");
    const onClick = jest.fn();

    expect(deleteIcon).not.toBeNull();
    chip.addEventListener("_click", onClick);
    await fireEvent.click(chip);

    expect(onClick).toHaveBeenCalled();
  })
})
