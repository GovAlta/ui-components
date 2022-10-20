import "@testing-library/jest-dom";
import { fireEvent, render, waitFor } from "@testing-library/react";
import React, { useState } from "react";
import GoAButton from "../../lib/button/button";
import { GoAModal } from "./modal";

describe("Modal Tests", () => {
  it("Modal - should render with close capability via icon and background", async () => {
    const props = {
      heading: "Modal Heading",
      open: true,
      width: "500px",
      actions: <GoAButton onClick={() => {}}>Close</GoAButton>,
      onClose: () => {},
    };

    const { baseElement } = render(
      <GoAModal {...props}>Modal Content</GoAModal>
    );
    const modal = baseElement.querySelector("goa-modal");
    const actionContent = modal.querySelector("[slot='actions']");

    expect(modal.getAttribute("heading")).toBe("Modal Heading");
    expect(modal.getAttribute("open")).toBe("true");
    expect(modal.getAttribute("width")).toBe("500px");
    expect(modal.getAttribute("closable")).toBe("true");
    expect(modal.textContent).toContain("Modal Content");
    expect(actionContent.textContent).toContain("Close");
  });
});
