import { GoabDivider, GoabTab, GoabText } from "@abgov/react-components";
import { GoabxTabs } from "@abgov/react-components/experimental";

export function Feat2885NavigationTabsRoute() {
  return (
    <div>
      <GoabText tag="h1" mt="m">
        Feature #2885: Tabs navigation prop
      </GoabText>
      <GoabText tag="p">
        Showcases the new <code>navigation</code> prop on <code>GoabxTabs</code>. When set
        to <code>"none"</code>, tabs act as a UI switcher without updating the browser URL
        hash.
      </GoabText>

      <GoabDivider mt="l" mb="l" />

      <GoabText tag="h2">Test 1: Segmented + navigation="none"</GoabText>
      <GoabText tag="p">
        Tabs switch content without changing the URL hash. Used inside notification
        panels.
      </GoabText>
      <GoabxTabs
        variant="segmented"
        navigation="none"
        onChange={(detail) => console.log("Tab changed:", detail)}
      >
        <GoabTab heading="Unread">
          <GoabText tag="p">Unread notifications content</GoabText>
        </GoabTab>
        <GoabTab heading="Urgent">
          <GoabText tag="p">Urgent notifications content</GoabText>
        </GoabTab>
        <GoabTab heading="All">
          <GoabText tag="p">All notifications content</GoabText>
        </GoabTab>
      </GoabxTabs>

      <GoabDivider mt="l" mb="l" />

      <GoabText tag="h2">Test 2: Segmented + navigation="url" (default)</GoabText>
      <GoabText tag="p">
        Default behavior: tabs update the browser URL hash when switched.
      </GoabText>
      <GoabxTabs
        variant="segmented"
        onChange={(detail) => console.log("Tab changed:", detail)}
      >
        <GoabTab heading="Tab A">
          <GoabText tag="p">Tab A content with URL navigation</GoabText>
        </GoabTab>
        <GoabTab heading="Tab B">
          <GoabText tag="p">Tab B content with URL navigation</GoabText>
        </GoabTab>
        <GoabTab heading="Tab C">
          <GoabText tag="p">Tab C content with URL navigation</GoabText>
        </GoabTab>
      </GoabxTabs>

      <GoabDivider mt="l" mb="l" />

      <GoabText tag="h2">Test 3: Default (non-segmented) + navigation="none"</GoabText>
      <GoabText tag="p">Standard tab style with URL navigation disabled.</GoabText>
      <GoabxTabs
        navigation="none"
        onChange={(detail) => console.log("Tab changed:", detail)}
      >
        <GoabTab heading="Overview">
          <GoabText tag="p">Overview content</GoabText>
        </GoabTab>
        <GoabTab heading="Details">
          <GoabText tag="p">Details content</GoabText>
        </GoabTab>
        <GoabTab heading="History">
          <GoabText tag="p">History content</GoabText>
        </GoabTab>
      </GoabxTabs>

      <GoabDivider mt="l" mb="l" />

      <GoabText tag="h2">
        Test 4: Default (non-segmented) + navigation="url" (default)
      </GoabText>
      <GoabText tag="p">Standard tab style with default URL navigation.</GoabText>
      <GoabxTabs onChange={(detail) => console.log("Tab changed:", detail)}>
        <GoabTab heading="Section 1">
          <GoabText tag="p">Section 1 content with URL navigation</GoabText>
        </GoabTab>
        <GoabTab heading="Section 2">
          <GoabText tag="p">Section 2 content with URL navigation</GoabText>
        </GoabTab>
        <GoabTab heading="Section 3">
          <GoabText tag="p">Section 3 content with URL navigation</GoabText>
        </GoabTab>
      </GoabxTabs>
    </div>
  );
}

export default Feat2885NavigationTabsRoute;
