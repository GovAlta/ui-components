import { GoASideMenu, GoASideMenuGroup, GoASideMenuHeading } from "@abgov/react-components";

export function SideMenu() {
  return (
    <GoASideMenu>
      <GoASideMenuHeading>Nav section 1</GoASideMenuHeading>
      <a href="#about">Home</a>
      <a href="#contact">Profile</a>
      <GoASideMenuHeading>Nav section 2</GoASideMenuHeading>
      <a href="#about">About</a>
      <a href="#contact">Contact</a>
      <GoASideMenuGroup heading="Links">
        <GoASideMenuHeading>Nav section 3</GoASideMenuHeading>
        <a href="#foo">Foo</a>
        <a href="#bar">Bar</a>
        <GoASideMenuGroup heading="More Links">
          <GoASideMenuHeading>Nav section 4</GoASideMenuHeading>
          <a href="#more-foo">More Foo</a>
          <a href="#more-bar">More Bar</a>
        </GoASideMenuGroup>
      </GoASideMenuGroup>
    </GoASideMenu>
  );
}

export default SideMenu;
