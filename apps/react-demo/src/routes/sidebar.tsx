import { GoASidebar, GoASidebarGroup } from "@abgov/react-components";

export function Sidebar() {
  return (
    <GoASidebar>
      <a href="#about">About</a>
      <a href="#contact">Contact</a>
      <GoASidebarGroup heading="Links">
        <a href="#foo">Foo</a>
        <a href="#bar">Bar</a>
        <GoASidebarGroup heading="More Links">
          <a href="#more-foo">More Foo</a>
          <a href="#more-bar">More Bar</a>
        </GoASidebarGroup>
      </GoASidebarGroup>
    </GoASidebar>
  );
}

export default Sidebar;
