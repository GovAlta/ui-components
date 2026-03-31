import {
  GoabContainer,
  GoabText,
  GoabWorkSideMenu,
  GoabWorkSideMenuGroup,
  GoabWorkSideMenuItem,
} from "@abgov/react-components";

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
            <GoabWorkSideMenu
              heading="Test Menu"
              url="/"
              open={true}
              primaryContent={
                <>
                  <GoabWorkSideMenuItem
                    label="Standalone item"
                    url="/features/3544"
                    icon="home"
                  />
                  <GoabWorkSideMenuGroup heading="Grouped items" icon="folder">
                    <GoabWorkSideMenuItem
                      label="Group child"
                      url="/features/3544"
                      icon="document"
                    />
                  </GoabWorkSideMenuGroup>
                </>
              }
            />
          </div>
        </GoabContainer>

        <GoabContainer>
          <GoabText tag="h2">Without icons</GoabText>
          <div style={{ height: "380px", overflow: "hidden" }}>
            <GoabWorkSideMenu
              heading="Test Menu"
              url="/"
              open={true}
              primaryContent={
                <>
                  <GoabWorkSideMenuItem label="Standalone item" url="/features/3544" />
                  <GoabWorkSideMenuGroup heading="Grouped items">
                    <GoabWorkSideMenuItem label="Group child" url="/features/3544" />
                  </GoabWorkSideMenuGroup>
                </>
              }
            />
          </div>
        </GoabContainer>

        <GoabContainer>
          <GoabText tag="h2">Mixed: back icon + no icons</GoabText>
          <div style={{ height: "380px", overflow: "hidden" }}>
            <GoabWorkSideMenu
              heading="Test Menu"
              url="/"
              open={true}
              primaryContent={
                <>
                  <GoabWorkSideMenuItem label="All" url="/features/3544" icon="arrow-back" />
                  <GoabWorkSideMenuItem label="All Components" url="/features/3544" />
                  <GoabWorkSideMenuGroup heading="Content layout">
                    <GoabWorkSideMenuItem label="Container" url="/features/3544" />
                    <GoabWorkSideMenuItem label="Divider" url="/features/3544" />
                    <GoabWorkSideMenuItem label="Grid" url="/features/3544" />
                  </GoabWorkSideMenuGroup>
                  <GoabWorkSideMenuGroup heading="Inputs and actions">
                    <GoabWorkSideMenuItem label="Button" url="/features/3544" />
                    <GoabWorkSideMenuItem label="Input" url="/features/3544" />
                  </GoabWorkSideMenuGroup>
                </>
              }
            />
          </div>
        </GoabContainer>
      </div>
    </div>
  );
}
