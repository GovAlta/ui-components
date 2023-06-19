import {
  GoAAppFooter,
  GoAAppHeader,
  GoAThreeColumnLayout,
} from "@abgov/react-components";

export default function ThreeColumnLayout() {
  const nav = (
    <>
      <a className="navigation-link" href="#dashboard">
        Dashboard
      </a>
      <a className="navigation-link" href="#accounts">
        Accounts
      </a>
      <a className="navigation-link" href="#invoices">
        Invoices
      </a>
      <a className="navigation-link" href="#employees">
        Employees
      </a>
      <a className="navigation-link" href="#claims">
        Claims
      </a>
    </>
  );
  const sideMenu = (
    <>
      <h2>Side Menu</h2>
      <p>Add in your content here.</p>
    </>
  );
  const mainContent = (
    <>
      <h1>Main content</h1>
      <p>Add main content here.</p>
    </>
  );
  return (
    <>
      <h1>Basic</h1>
      <GoAThreeColumnLayout
        header={<GoAAppHeader />}
        footer={<GoAAppFooter />}
        nav={nav}
        sideMenu={sideMenu}
      >
        {mainContent}
      </GoAThreeColumnLayout>

      <h1>Max Content Width</h1>
      <GoAThreeColumnLayout
        maxContentWidth={"100%"}
        header={<GoAAppHeader />}
        footer={<GoAAppFooter />}
        nav={nav}
        sideMenu={sideMenu}
      >
        {mainContent}
      </GoAThreeColumnLayout>

      <h1>Nav Column Width</h1>
      <GoAThreeColumnLayout
        leftColumnWidth={"32ch"}
        header={<GoAAppHeader />}
        footer={<GoAAppFooter />}
        nav={nav}
        sideMenu={sideMenu}
      >
        {mainContent}
      </GoAThreeColumnLayout>

      <h1>Side menu Column Width</h1>
      <GoAThreeColumnLayout
        rightColumnWidth={"32ch"}
        header={<GoAAppHeader />}
        footer={<GoAAppFooter />}
        nav={nav}
        sideMenu={sideMenu}
      >
        {mainContent}
      </GoAThreeColumnLayout>
    </>
  );
}
