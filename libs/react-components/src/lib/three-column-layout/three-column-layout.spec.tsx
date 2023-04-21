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
const SideBar = () => (
  <>
    <h2>Sidebar</h2>
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
        sidebar={<SideBar />}
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
    expect(baseElement.querySelector("[slot=sidebar] h2").innerHTML).toContain(
      "Sidebar"
    );
    expect(baseElement.querySelector("[slot=sidebar] p").innerHTML).toContain(
      "Add content."
    );
  });

  it("should render leftColumnWidth, rightColumnWidth, maxContentWidth accordingly", () => {
    const { baseElement } = render(
      <ThreeColumnLayout
        header={<GoAAppHeader />}
        footer={<GoAAppFooter />}
        nav={<Links />}
        sidebar={<SideBar />}
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

    const goaThreeColumnLayout = baseElement.querySelector(
      "goa-three-column-layout"
    );
    expect(goaThreeColumnLayout).toBeTruthy();
    expect(goaThreeColumnLayout.getAttribute("leftcolumnwidth")).toBe("20%");
    expect(goaThreeColumnLayout.getAttribute("rightcolumnwidth")).toBe("300px");
    expect(goaThreeColumnLayout.getAttribute("maxcontentwidth")).toBe("50%");
  });
});
