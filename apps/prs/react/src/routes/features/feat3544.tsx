import { GoabContainer, GoabText } from "@abgov/react-components";
import {
  GoabxWorkSideMenu,
  GoabxWorkSideMenuGroup,
  GoabxWorkSideMenuItem,
} from "@abgov/react-components/experimental";

export function Feat3544Route() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: "var(--goa-spacing-l)" }}
    >
      <GoabText tag="h1">Feature 3544: Optional Side Menu Icons</GoabText>
      <GoabText>
        Both menus below use the same structure in primary content: one item and one
        group. The left menu includes icons, and the right menu does not.
      </GoabText>

      <div
        style={{
          display: "grid",
          gap: "var(--goa-spacing-l)",
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
        }}
      >
        <GoabContainer>
          <GoabText tag="h2">With icons</GoabText>
          <div style={{ height: "380px", overflow: "hidden" }}>
            <GoabxWorkSideMenu
              heading="Test Menu"
              url="/"
              open={true}
              primaryContent={
                <>
                  <GoabxWorkSideMenuItem
                    label="Standalone item"
                    url="/features/3544"
                    icon="home"
                  />
                  <GoabxWorkSideMenuGroup heading="Grouped items" icon="folder">
                    <GoabxWorkSideMenuItem
                      label="Group child"
                      url="/features/3544"
                      icon="document"
                    />
                  </GoabxWorkSideMenuGroup>
                </>
              }
            />
          </div>
        </GoabContainer>

        <GoabContainer>
          <GoabText tag="h2">Without icons</GoabText>
          <div style={{ height: "380px", overflow: "hidden" }}>
            <GoabxWorkSideMenu
              heading="Test Menu"
              url="/"
              open={true}
              primaryContent={
                <>
                  <GoabxWorkSideMenuItem label="Standalone item" url="/features/3544" />
                  <GoabxWorkSideMenuGroup heading="Grouped items">
                    <GoabxWorkSideMenuItem label="Group child" url="/features/3544" />
                  </GoabxWorkSideMenuGroup>
                </>
              }
            />
          </div>
        </GoabContainer>

        <GoabContainer>
          <GoabText tag="h2">Mixed: back icon + no icons</GoabText>
          <div style={{ height: "380px", overflow: "hidden" }}>
            <GoabxWorkSideMenu
              heading="Test Menu"
              url="/"
              open={true}
              primaryContent={
                <>
                  <GoabxWorkSideMenuItem label="All" url="/features/3544" icon="arrow-back" />
                  <GoabxWorkSideMenuItem label="All Components" url="/features/3544" />
                  <GoabxWorkSideMenuGroup heading="Content layout">
                    <GoabxWorkSideMenuItem label="Container" url="/features/3544" />
                    <GoabxWorkSideMenuItem label="Divider" url="/features/3544" />
                    <GoabxWorkSideMenuItem label="Grid" url="/features/3544" />
                  </GoabxWorkSideMenuGroup>
                  <GoabxWorkSideMenuGroup heading="Inputs and actions">
                    <GoabxWorkSideMenuItem label="Button" url="/features/3544" />
                    <GoabxWorkSideMenuItem label="Input" url="/features/3544" />
                  </GoabxWorkSideMenuGroup>
                </>
              }
            />
          </div>
        </GoabContainer>
      </div>
    </div>
  );
}
