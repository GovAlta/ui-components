import PagesWrapper from './PagesWrapper.test.svelte'
import { fireEvent, render, waitFor } from '@testing-library/svelte'
import { it } from "vitest";

it("switches pages", async () => {
  const { getByTestId } = render(PagesWrapper)

  const previousBtn = getByTestId("previous");
  const nextBtn = getByTestId("next");

  await waitFor(() => {
    expect(getByTestId("page-1").style.display).toBe("block")
    expect(getByTestId("page-2").style.display).toBe("none")
    expect(getByTestId("page-3").style.display).toBe("none")
  })

  await fireEvent.click(nextBtn);
  await waitFor(() => {
    expect(getByTestId("page-1").style.display).toBe("none")
    expect(getByTestId("page-2").style.display).toBe("block")
    expect(getByTestId("page-3").style.display).toBe("none")
  })

  await fireEvent.click(previousBtn);
  await waitFor(() => {
    expect(getByTestId("page-1").style.display).toBe("block")
    expect(getByTestId("page-2").style.display).toBe("none")
    expect(getByTestId("page-3").style.display).toBe("none")
  })
})

