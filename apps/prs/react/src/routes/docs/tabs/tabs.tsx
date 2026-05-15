import {
  GoabBadge,
  GoabTab,
  GoabTabs,
  GoabText,
} from "@abgov/react-components";

export function DocsTabsRoute() {
  return (
    <div>
      <h2>Tabs</h2>

      <h3>Basic tabs</h3>
      <GoabTabs initialTab={1}>
        <GoabTab heading="Overview">
          <p>Overview content goes here.</p>
        </GoabTab>
        <GoabTab heading="Details">
          <p>Detailed information goes here.</p>
        </GoabTab>
        <GoabTab heading="History">
          <p>Historical data goes here.</p>
        </GoabTab>
      </GoabTabs>

      <h3>Segmented variant</h3>
      <GoabTabs variant="segmented">
        <GoabTab heading="Day">Daily view</GoabTab>
        <GoabTab heading="Week">Weekly view</GoabTab>
        <GoabTab heading="Month">Monthly view</GoabTab>
      </GoabTabs>

      <h3>Initial tab</h3>
      <GoabTabs initialTab={2}>
        <GoabTab heading="First">First tab content.</GoabTab>
        <GoabTab heading="Second">Second tab content (initially shown).</GoabTab>
        <GoabTab heading="Third">Third tab content.</GoabTab>
      </GoabTabs>

      <h3>With badge in heading</h3>
      <GoabTabs>
        <GoabTab heading="Messages">
          <GoabText>Your messages will appear here.</GoabText>
        </GoabTab>
        <GoabTab
          heading={
            <>
              Notifications{" "}
              <GoabBadge type="default" emphasis="subtle" icon={false} content="3" />
            </>
          }
        >
          <GoabText>You have 3 unread notifications.</GoabText>
        </GoabTab>
        <GoabTab heading="Settings">
          <GoabText>Manage your preferences.</GoabText>
        </GoabTab>
      </GoabTabs>

      <h3>Disabled tab</h3>
      <GoabTabs>
        <GoabTab heading="Active">
          <GoabText>This tab is active.</GoabText>
        </GoabTab>
        <GoabTab heading="Disabled" disabled>
          <GoabText>This content is not accessible.</GoabText>
        </GoabTab>
        <GoabTab heading="Another tab">
          <GoabText>This tab is also available.</GoabText>
        </GoabTab>
      </GoabTabs>

      <h3>Horizontal on mobile</h3>
      <GoabTabs initialTab={1} orientation="horizontal">
        <GoabTab heading="Tab 1">Content 1</GoabTab>
        <GoabTab heading="Tab 2">Content 2</GoabTab>
        <GoabTab heading="Tab 3">Content 3</GoabTab>
      </GoabTabs>
    </div>
  );
}
