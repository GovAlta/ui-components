import { GoabTabs, GoabTab, GoabButtonGroup, GoabButton } from "@abgov/react-components";

export default function Feat2611TabsDisabled() {
  const setHash = (hash: string) => {
    window.location.hash = `#${hash}`;
  };

  const clearHash = () => {
    window.history.replaceState(
      {},
      "",
      window.location.pathname + window.location.search,
    );
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Feature 2611 - Disabled Tab Edge Cases</h1>

      <h2>Test Case 1: initialTab=1 with first tab disabled</h2>
      <p>Expected: Tab 2 should be selected (first enabled tab), not Tab 1 (disabled)</p>
      <GoabTabs initialTab={1} testId={"test-tabs"}>
        <GoabTab heading="Tab 1 (disabled)" disabled>
          <p>Content 1 - This should NOT be visible</p>
        </GoabTab>
        <GoabTab heading="Tab 2">
          <p>Content 2 - This SHOULD be visible on load</p>
        </GoabTab>
        <GoabTab heading="Tab 3">
          <p>Content 3</p>
        </GoabTab>
      </GoabTabs>

      <h2>Test Case 2: no initialTab with first tab disabled</h2>
      <p>
        Expected: Tab 2 should be selected (first enabled tab), not Tab 1 (disabled), even
        without initialTab.
      </p>
      <GoabTabs testId={"test-tabs-no-initial"}>
        <GoabTab heading="Tab 1 (disabled)" disabled>
          <p>Content 1 - This should NOT be visible</p>
        </GoabTab>
        <GoabTab heading="Tab 2">
          <p>Content 2 - This SHOULD be visible on load</p>
        </GoabTab>
        <GoabTab heading="Tab 3">
          <p>Content 3</p>
        </GoabTab>
      </GoabTabs>

      <h2>Test Case 3: hash change to disabled tab</h2>
      <p>
        Expected: If the hash is set to a disabled tab (for example #tab-0), selection
        should not move to the disabled tab. The URL should ideally normalize back to the
        current enabled tab hash.
      </p>
      <GoabButtonGroup alignment="start" mb="l">
        <GoabButton onClick={() => setHash("tab-0")}>
          Set hash to #tab-0 (disabled)
        </GoabButton>
        <GoabButton onClick={() => setHash("tab-1")}>
          Set hash to #tab-1 (enabled)
        </GoabButton>
        <GoabButton onClick={() => setHash("tab-2")}>
          Set hash to #tab-2 (enabled)
        </GoabButton>
        <GoabButton onClick={clearHash}>Clear hash</GoabButton>
      </GoabButtonGroup>
      <GoabTabs initialTab={2} testId={"test-tabs-hash"}>
        <GoabTab heading="Disabled (tab-0)" disabled>
          <p>Content A - This should NOT be visible</p>
        </GoabTab>
        <GoabTab heading="Enabled (tab-1)">
          <p>Content B - This SHOULD stay visible when hash targets disabled tab</p>
        </GoabTab>
        <GoabTab heading="Enabled (tab-2)">
          <p>Content C - Should also stay visible if hash is changed to disabled tab</p>
        </GoabTab>
      </GoabTabs>
    </div>
  );
}
