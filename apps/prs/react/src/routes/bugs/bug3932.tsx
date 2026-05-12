import {
  GoabBlock,
  GoabText,
  GoabWorkSideMenu,
  GoabWorkSideMenuGroup,
  GoabWorkSideMenuItem,
} from "@abgov/react-components";

export function Bug3932Route() {
  const menuHeight = { "--goa-work-side-menu-height": "500px" } as React.CSSProperties;
  return (
    <div style={menuHeight}>
      <GoabBlock gap="m" direction="column">
        <GoabText tag="h1" mt="m">
          Bug #3932: Work Side Menu tooltips
        </GoabText>
        <GoabText tag="span">
          This page renders a closed Work Side Menu so tooltip behavior can be tested
          manually.
        </GoabText>
        <GoabText tag="span">
          Move between multiple items and confirm each tooltip appears in the correct
          position and shows the matching label.
        </GoabText>

        <GoabWorkSideMenu
          heading="Bug 3932"
          url="#"
          open={false}
          primaryContent={
            <>
              <GoabWorkSideMenuItem icon="home" label="Dashboard" url="#dashboard" />
              <GoabWorkSideMenuItem icon="search" label="Search" url="#search" />
              <GoabWorkSideMenuItem icon="document" label="Reports" url="#reports" />
              <GoabWorkSideMenuGroup heading="Applications" icon="folder" open={true}>
                <GoabWorkSideMenuItem label="New applications" url="#new-applications" />
                <GoabWorkSideMenuItem label="In progress" url="#in-progress" />
                <GoabWorkSideMenuItem label="Approved" url="#approved" />
              </GoabWorkSideMenuGroup>
            </>
          }
          secondaryContent={
            <>
              <GoabWorkSideMenuItem
                icon="help-circle"
                label="Get support"
                url="#support"
              />
              <GoabWorkSideMenuItem
                icon="information-circle"
                label="Release notes"
                url="#release-notes"
              />
            </>
          }
        />
      </GoabBlock>
    </div>
  );
}

export default Bug3932Route;
