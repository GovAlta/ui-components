import { render } from "@testing-library/react";
import ThreeColumnLayout from "./three-column-layout";
import { GoAAppHeader } from "../app-header/app-header";
import { GoAAppFooter } from "../footer/footer";

const Links = () => (
  <>
    <a href="#dashboard">Dashboard</a>
    <a href="#accounts">Accounts</a>
    <a href="#invoices">Invoices</a>
    <a href="#employees">Employees</a>
    <a href="#claims">Claims</a>
  </>
);
const SideMenu = () => (
  <>
    <h2>Side Menu</h2>
    <p>Add content.</p>
  </>
);

describe("ThreeColumnLayout", () => {
  it("should render successfully", () => {
    const { baseElement } = render(
      <ThreeColumnLayout
        header={<GoAAppHeader />}
        footer={<GoAAppFooter />}
        nav={<Links />}
        sideMenu={<SideMenu />}
      >
        <h1>Heading</h1>
        <p>
          Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
          cillum sint consectetur cupidatat.
        </p>
      </ThreeColumnLayout>
    );
    expect(baseElement).toBeTruthy();
    expect(baseElement.innerHTML).toContain(
      "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat."
    );
    expect(baseElement.innerHTML).toContain("<goa-app-header>");
    expect(baseElement.innerHTML).toContain("<goa-app-footer>");
    expect(baseElement.querySelectorAll("[slot=nav] a").length).toEqual(5);

    expect(
      baseElement?.querySelector("[slot=side-menu] h2")?.innerHTML
    ).toContain("Side Menu");
    expect(baseElement?.querySelector("[slot=side-menu] p")?.innerHTML).toContain(
      "Add content."
    );
  });

  it("should render leftColumnWidth, rightColumnWidth, maxContentWidth accordingly", () => {
    const { baseElement } = render(
      <ThreeColumnLayout
        header={<GoAAppHeader />}
        footer={<GoAAppFooter />}
        nav={<Links />}
        sideMenu={<SideMenu />}
        leftColumnWidth="20%"
        rightColumnWidth="300px"
        maxContentWidth="50%"
      >
        <h1>Heading</h1>
        <p>
          Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
          cillum sint consectetur cupidatat.
        </p>
      </ThreeColumnLayout>
    );

    const el = baseElement.querySelector(
      "goa-three-column-layout"
    );

    expect(el).toBeTruthy();
    expect(el?.getAttribute("leftcolumnwidth")).toBe("20%");
    expect(el?.getAttribute("rightcolumnwidth")).toBe("300px");
    expect(el?.getAttribute("maxcontentwidth")).toBe("50%");
  });
});
