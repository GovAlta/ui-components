import '@testing-library/jest-dom';
import { fireEvent, render, waitFor } from '@testing-library/svelte';
import GoAChip from './Chip.svelte'

describe('GoAChip', () => {

  it("should render", async () => {
    const { container } = render(GoAChip, { content: "Some Badge"});
    expect(container.innerHTML).toContain("Some Badge");
  })

  it("should show the leading icon", async () => {
    const { container } = render(GoAChip, { content: "Some Badge", leadingicon: "arrow-right"});

    const leadingIcon = container.querySelector(".leading-icon");
    expect(leadingIcon).not.toBeNull();
  })

  it("should show the trailing button and handle the the click event", async () => {
    const { container } = render(GoAChip, { content: "Some Badge", deletable: true});
    const deleteIcon = container.querySelector(".delete-icon");
    const deleteIconClick = jest.fn();

    expect(deleteIcon).not.toBeNull();
    deleteIcon.addEventListener("_onDeleteIconClick", deleteIconClick);
    await fireEvent.click(deleteIcon);

    expect(deleteIconClick).toHaveBeenCalled();
  })
})
