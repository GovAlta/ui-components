import React from "react";
import { render } from "@testing-library/react";
import GoAMicrositeHeader, { ServiceLevel } from "./microsite-header";

describe("Header", () => {
  ["alpha", "beta", "live"].forEach((mode: ServiceLevel) => {
    it("should show the all the flairs", async function () {
      render(<GoAMicrositeHeader type={mode} />);
      const el = document.querySelector("goa-microsite-header");
      expect(el).not.toBeNull();
      expect(el.getAttribute("type")).toEqual(mode);
    });
  });

  it("should show the all the flairs", async function () {
    render(<GoAMicrositeHeader type="alpha" version="v1.2.3" />);
    const el = document.querySelector("goa-microsite-header");
    expect(el.getAttribute("version")).toEqual("v1.2.3");
  });
});
