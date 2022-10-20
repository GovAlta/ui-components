import { render } from "@testing-library/react";
import { GoAAppHeader } from "../app-header/app-header";
import { GoAAppFooter } from "../footer/footer";

import TwoColumnLayout from "./two-column-layout";

const Links = () => (
  <>
    <a href="#dashboard">Dashboard</a>
    <a href="#accounts">Accounts</a>
    <a href="#invoices">Invoices</a>
    <a href="#employees">Employees</a>
    <a href="#claims">Claims</a>
  </>
);

describe("TwoColumnLayout", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <TwoColumnLayout
        header={<GoAAppHeader />}
        footer={<GoAAppFooter />}
        nav={<Links />}
      >
        <h1>Heading</h1>
        <p>
          Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
          cillum sint consectetur cupidatat.
        </p>
      </TwoColumnLayout>
    );

    expect(baseElement).toBeTruthy();
    expect(baseElement.innerHTML).toContain(
      "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat."
    );
    expect(baseElement.innerHTML).toContain("<goa-app-header>");
    expect(baseElement.innerHTML).toContain("<goa-app-footer>");
    expect(baseElement.querySelectorAll("[slot=nav] a").length).toEqual(5);
  });
});
