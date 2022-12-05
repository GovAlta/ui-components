import { GoAOption } from "./option";
import { fireEvent, render, waitFor } from "@testing-library/react";

import GoASelect from "./select";

describe("Select", () => {
  it("should bind properies", () => {
    const { baseElement } = render(
      <GoASelect name="basic" value="green" onChange={() => {}}>
        <GoAOption name="basic" value="red" />
        <GoAOption name="basic" value="green" />
        <GoAOption name="basic" value="blue" />
      </GoASelect>
    );
    const select = baseElement.querySelector("goa-select");
    expect(select).toBeTruthy();
    expect(select.childNodes.length).toBe(3);
    expect(select.childNodes[0].nodeName).toBe("GOA-OPTION");

    expect(
      select.querySelector("goa-option:nth-child(1)").getAttribute("name")
    ).toBe("basic");
    expect(
      select.querySelector("goa-option:nth-child(1)").getAttribute("value")
    ).toBe("red");
    expect(
      select.querySelector("goa-option:nth-child(2)").getAttribute("name")
    ).toBe("basic");
    expect(
      select.querySelector("goa-option:nth-child(2)").getAttribute("value")
    ).toBe("green");
    expect(
      select.querySelector("goa-option:nth-child(3)").getAttribute("name")
    ).toBe("basic");
    expect(
      select.querySelector("goa-option:nth-child(3)").getAttribute("value")
    ).toBe("blue");
  });

  it("should handle onChange event", async () => {
    const onChange = jest.fn();
    const { baseElement } = render(
      <GoASelect name="basic" value="green" onChange={onChange}>
        <GoAOption name="basic" value="red" />
        <GoAOption name="basic" value="green" />
        <GoAOption name="basic" value="blue" />
      </GoASelect>
    );

    const select = baseElement.querySelector("goa-select");

    fireEvent(
      select,
      new CustomEvent("_change", {
        detail: { name: "basic", value: "green" },
      })
    );

    await waitFor(() => {
      expect(onChange).toBeCalledWith("basic", "green");
    });
  });
});
