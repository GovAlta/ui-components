import { GoASideMenu, GoASideMenuGroup } from "@abgov/react-components";

export function SideMenu() {
  return (
    <GoASideMenu>
      <a href="#about">About</a>
      <a href="#contact">Contact</a>
      <GoASideMenuGroup heading="Links">
        <a href="#foo">Foo</a>
        <a href="#bar">Bar</a>
        <GoASideMenuGroup heading="More Links">
          <a href="#more-foo">More Foo</a>
          <a href="#more-bar">More Bar</a>
        </GoASideMenuGroup>
      </GoASideMenuGroup>
    </GoASideMenu>
  );
}

export default SideMenu;
